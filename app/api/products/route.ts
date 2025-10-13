import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

export async function GET() {
  try {
    // Check if Convex URL is available
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
      console.error("NEXT_PUBLIC_CONVEX_URL is not defined");
      return NextResponse.json(
        { error: "Convex configuration missing" },
        { status: 500 }
      );
    }

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    console.log("Connecting to Convex at:", process.env.NEXT_PUBLIC_CONVEX_URL);

    // Fetch from Convex with timeout
    const products = await Promise.race([
      convex.query(api.products.getProducts),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Convex query timeout')), 8000)
      )
    ]) as any[];

    console.log("Raw products from Convex:", products);

    // Transform the data to match the frontend expected format
    const transformedProducts = products.map((product: any) => {
      console.log("Processing product:", product);
      console.log("Product _id:", product._id);
      console.log("Product id:", product.id);
      console.log("Product images field:", product.images);
      console.log("Product image field:", product.image);

      const transformed = {
        id: product._id, // Use _id from Convex
        title: product.title,
        text: product.text,
        images: (product.images && product.images.length > 0)
          ? product.images
          : (product.image ? [product.image] : ["/placeholder-product.png"]),
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
      { error: "Failed to fetch products from Convex", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
