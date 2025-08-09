import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import jwt from "jsonwebtoken";

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

    const { title, text, image, icons, details, pdfs, isActive } =
      await req.json();
    if (!title || !text || !image || !icons) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const productId = await convex.mutation(api.products.createProduct, {
      title,
      text,
      image,
      icons,
      details,
      pdfs: pdfs ? JSON.parse(JSON.stringify(pdfs)) : null,
      isActive: isActive !== undefined ? isActive : true,
      authorId: user.id,
    });

    return NextResponse.json({ product: { id: productId } });
  } catch (error) {
    console.error("Error creating product in Convex:", error);
    return NextResponse.json(
      { error: "Failed to create product in Convex" },
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

    const { id, ...data } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // Handle pdfs field properly
    if (data.pdfs) {
      data.pdfs = JSON.parse(JSON.stringify(data.pdfs));
    }

    await convex.mutation(api.products.updateProduct, {
      id,
      ...data,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating product in Convex:", error);
    return NextResponse.json(
      { error: "Failed to update product in Convex" },
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

    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // Convert string ID to Convex ID
    const convexId = id as Id<"products">;
    await convex.mutation(api.products.deleteProduct, { id: convexId });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product in Convex:", error);
    return NextResponse.json(
      { error: "Failed to delete product in Convex" },
      { status: 500 }
    );
  }
}
