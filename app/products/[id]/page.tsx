"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  id?: string;
  title: string;
  text: string;
  images: string[];
  icons: string[];
  details?: string;
  pdfs?: { name: string; file: string; downloadUrl?: string }[];
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
  authorId?: string;
}

async function getProduct(id: string): Promise<Product | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  // Check if ID looks like a Convex database ID (long alphanumeric string)
  const isConvexId = /^[a-z0-9]{20,}$/.test(id);

  try {
    if (isConvexId) {
      // Try to fetch by ID first (for URLs with database IDs)
      const res = await fetch(`${baseUrl}/api/products/${encodeURIComponent(id)}`, {
        cache: "no-store",
        next: { revalidate: 0 },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (res.ok) {
        const product = await res.json();
        console.log("getProduct - Found product by ID:", product);
        return product;
      }

      console.log("getProduct - Product not found by ID, trying by title...");
    }

    // Fetch all products and find by title
    const allRes = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!allRes.ok) return null;
    const data = await allRes.json();
    console.log("getProduct - API response:", data);
    console.log("getProduct - Looking for product with title:", decodeURIComponent(id));
    const product = data.find((p: any) => p.title === decodeURIComponent(id));
    console.log("getProduct - Found product by title:", product);
    return product;
  } catch (err) {
    console.error("Fetch product error:", err);
    return null;
  }
}

async function getAllProducts(): Promise<Product[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Fetch products error:", err);
    return [];
  }
}

export default function ProductDetailsPage() {
  const router = useRouter();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    // Extract ID from pathname
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/');
    const productId = pathSegments[pathSegments.length - 1];
    setId(decodeURIComponent(productId));
  }, []);

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const productData = await getProduct(id);
        if (!productData) {
          setError("Product not found");
          return;
        }

        setProduct(productData);

        const allProductsData = await getAllProducts();
        setAllProducts(allProductsData);
      } catch (err) {
        setError("Failed to load product");
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mx-auto mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link href="/products" className="text-blue-600 hover:text-blue-800">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Product Not Found</h1>
            <Link href="/products" className="text-blue-600 hover:text-blue-800">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  console.log("Product detail page - product data:", product);
  console.log("Product detail page - product.images:", product?.images);

  const index = allProducts.findIndex((p) => p.title === product.title);
  const prevProduct = index > 0 ? allProducts[index - 1] : null;
  const nextProduct =
    index < allProducts.length - 1 ? allProducts[index + 1] : null;

  // Ensure image URL is properly formatted for Next.js Image component
  let imageSrc = product?.images && product.images.length > 0
    ? product.images[0]
    : "/placeholder-product.png";
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

        {/* Image Gallery */}
        {product.images && product.images.length > 0 ? (
          <div className="mb-8">
            {product.images.length === 1 ? (
              <div className="relative w-full h-[24rem] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={true}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.images.map((image: string, index: number) => {
                  // Ensure image URL is properly formatted for Next.js Image component
                  let processedImageSrc = image;
                  if (processedImageSrc && !processedImageSrc.startsWith("http") && !processedImageSrc.startsWith("/")) {
                    processedImageSrc = `/assets/${processedImageSrc}`;
                  }

                  return (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={processedImageSrc}
                        alt={`${product.title} - Image ${index + 1}`}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-8">
            <div className="relative w-full h-[24rem] rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p>No images available</p>
              </div>
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
              <p className="text-gray-700 text-base">{product.details}</p>
            </div>
          </div>
        )}

        {/* PDF Cards */}
        {product.pdfs && product.pdfs.length > 0 && (
          <div className="max-w-5xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900">
              Documentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.pdfs.map((pdf, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-blue-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center leading-tight">
                    <span className="block max-w-full break-words" title={pdf.name}>
                      {pdf.name}
                    </span>
                  </h3>
                </div>
              ))}
            </div>
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
