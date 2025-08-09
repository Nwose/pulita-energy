import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET() {
  try {
    // Fetch from Convex
    const products = await convex.query(api.products.getProducts);
    console.log("Raw products from Convex:", products);

    // Transform the data to match the frontend expected format
    const transformedProducts = products.map((product: any) => {
      console.log("Processing product:", product);
      console.log("Product _id:", product._id);
      console.log("Product id:", product.id);
      const transformed = {
        id: product._id, // Use _id from Convex
        title: product.title,
        text: product.text,
        image: product.image,
        icons: product.icons,
        details: product.details,
        pdfs: product.pdfs ? JSON.parse(JSON.stringify(product.pdfs)) : [],
      };
      console.log("Transformed product:", transformed);
      return transformed;
    });

    console.log("Transformed products:", transformedProducts);
    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error("Error fetching products from Convex:", error);
    return NextResponse.json(
      { error: "Failed to fetch products from Convex" },
      { status: 500 }
    );
  }
}
