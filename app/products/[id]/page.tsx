import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PdfCards from "./PdfCards";

interface Product {
  _id: string;
  id?: string;
  title: string;
  text: string;
  image: string;
  icons: string[];
  details?: string;
  pdfs?: { name: string; file: string; downloadUrl?: string }[];
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
  authorId?: string;
}

async function getProduct(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    console.log("All products:", data);
    console.log("Looking for product with title:", decodeURIComponent(id));
    const product = data.find((p: any) => p.title === decodeURIComponent(id));
    console.log("Found product:", product);
    return product;
  } catch (err) {
    console.error("Fetch product error:", err);
    return null;
  }
}

async function getAllProducts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Fetch products error:", err);
    return [];
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const index = allProducts.findIndex((p: any) => p.title === product.title);
  const prevProduct = index > 0 ? allProducts[index - 1] : null;
  const nextProduct =
    index < allProducts.length - 1 ? allProducts[index + 1] : null;

  // Ensure image URL is properly formatted for Next.js Image component
  let imageSrc = product.image;
  if (imageSrc && !imageSrc.startsWith("http") && !imageSrc.startsWith("/")) {
    imageSrc = `/assets/${imageSrc}`;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Top Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
          {product.title}
        </h1>
        {product.text && (
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8 text-lg">
            {product.text}
          </p>
        )}

        {/* Main Image */}
        {product.image && (
          <div className="mb-10 flex justify-center">
            <div className="max-w-2xl w-full">
              <Image
                src={imageSrc}
                alt={product.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Details */}
        {product.details && (
          <div className="max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
              Details
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {product.details}
              </p>
            </div>
          </div>
        )}

        {/* PDF Cards */}
        {product.pdfs && product.pdfs.length > 0 && (
          <div className="max-w-5xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900">
              Documentation
            </h2>
            <PdfCards pdfs={product.pdfs} />
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          {prevProduct ? (
            <Link
              href={`/products/${encodeURIComponent(prevProduct.title)}`}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ← {prevProduct.title}
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/products"
            className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            Back to Products
          </Link>
          {nextProduct ? (
            <Link
              href={`/products/${encodeURIComponent(nextProduct.title)}`}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              {nextProduct.title} →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
