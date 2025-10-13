import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Fetch single product from Convex with timeout
    const product = (await Promise.race([
      convex.query(api.products.getProduct, { id: params.id as any }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Convex query timeout")), 8000)
      ),
    ])) as any;

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Raw product from Convex:", product);

    // Transform the data to match the frontend expected format
    console.log("Processing product:", product);
    console.log("Product _id:", product._id);
    console.log("Product id:", product.id);
    console.log("Product images field:", product.images);
    console.log("Product image field:", product.image);

    const transformed = {
      id: product._id, // Use _id from Convex
      title: product.title,
      text: product.text,
      images:
        product.images && product.images.length > 0
          ? product.images
          : product.image
            ? [product.image]
            : ["/placeholder-product.png"],
      icons: product.icons,
      details: product.details,
      pdfs: product.pdfs ? JSON.parse(JSON.stringify(product.pdfs)) : [],
    };
    console.log("Transformed product:", transformed);

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Error fetching product from Convex:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch product from Convex",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
