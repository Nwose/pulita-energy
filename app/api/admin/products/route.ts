import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import jwt from "jsonwebtoken";
import { Id } from "../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };
  } catch {
    return null;
  }
}

// Validate that PDF URLs use the correct Cloudinary raw endpoint
function validatePdfUrls(productData: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check main product PDF if it exists
  if (productData.pdfUrl && !productData.pdfUrl.includes('/raw/upload/')) {
    errors.push(`Product PDF URL must use Cloudinary raw upload endpoint: ${productData.pdfUrl}`);
  }
  
  // Check additional PDFs if they exist
  if (productData.pdfs && Array.isArray(productData.pdfs)) {
    productData.pdfs.forEach((pdf: any, index: number) => {
      if (pdf.file && !pdf.file.includes('/raw/upload/')) {
        errors.push(`PDF ${index + 1} (${pdf.name}) must use Cloudinary raw upload endpoint: ${pdf.file}`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Helper function to convert image URLs to raw URLs if needed
function convertToRawUrl(url: string): string {
  if (url.includes('/image/upload/') && !url.includes('/raw/upload/')) {
    return url.replace('/image/upload/', '/raw/upload/');
  }
  return url;
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const products = await convex.query(api.products.getProducts);
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products from Convex:", error);
    return NextResponse.json(
      { error: "Failed to fetch products from Convex" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    
    // Validate PDF URLs
    const validation = validatePdfUrls(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Invalid PDF URLs", details: validation.errors },
        { status: 400 }
      );
    }
    
    // Auto-convert any image URLs to raw URLs (optional - you might want to remove this)
    const processedData = {
      ...body,
      pdfUrl: body.pdfUrl ? convertToRawUrl(body.pdfUrl) : body.pdfUrl,
      pdfs: body.pdfs ? body.pdfs.map((pdf: any) => ({
        ...pdf,
        file: convertToRawUrl(pdf.file)
      })) : body.pdfs
    };
    
    const productId = await convex.mutation(api.products.createProduct, processedData);
    
    return NextResponse.json({ 
      success: true, 
      id: productId,
      message: "Product created successfully" 
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    
    if (!body.id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Validate PDF URLs
    const validation = validatePdfUrls(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Invalid PDF URLs", details: validation.errors },
        { status: 400 }
      );
    }
    
    // Auto-convert any image URLs to raw URLs (optional - you might want to remove this)
    const processedData = {
      ...body,
      pdfUrl: body.pdfUrl ? convertToRawUrl(body.pdfUrl) : body.pdfUrl,
      pdfs: body.pdfs ? body.pdfs.map((pdf: any) => ({
        ...pdf,
        file: convertToRawUrl(pdf.file)
      })) : body.pdfs,
      id: body.id as Id<"products">
    };
    
    await convex.mutation(api.products.updateProduct, processedData);
    
    return NextResponse.json({ 
      success: true, 
      message: "Product updated successfully" 
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const searchParams = new URL(req.url).searchParams;
    let id = searchParams.get("id");
    
    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch (bodyError) {
        console.log("No body found or body parsing failed");
      }
    }

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const productId = id as Id<"products">;
    
    await convex.mutation(api.products.deleteProduct, { id: productId });
    
    return NextResponse.json({ 
      success: true, 
      message: "Product deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}