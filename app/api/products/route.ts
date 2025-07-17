import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Fetch from database, oldest first
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });

    // Transform the data to match the frontend expected format
    const transformedProducts = products.map((product: any) => ({
      title: product.title || product.name || "",
      text: product.text || product.description || "",
      image: product.image,
      icons: product.icons || [],
      details: product.details,
      pdfs: product.pdfs ? JSON.parse(JSON.stringify(product.pdfs)) : [],
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error("Error fetching products from database:", error);
    return NextResponse.json(
      { error: "Failed to fetch products from database" },
      { status: 500 }
    );
  }
}
