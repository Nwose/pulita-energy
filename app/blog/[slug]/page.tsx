export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getBlog(slug: string) {
  // Use explicit localhost URL for development server
  const baseUrl = "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/blogs/${encodeURIComponent(slug)}`;

  console.log("Fetching from:", apiUrl);

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      console.error("Fetch failed with status:", res.status);
      const errorText = await res.text();
      console.error("Response text:", errorText);
      return null;
    }

    const data = await res.json();
    console.log("Raw response data:", data);

    return data;
  } catch (err) {
    console.error("Fetch blog error:", err);
    return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("Blog slug:", slug);
  if (!slug) return notFound();

  const data = await getBlog(slug);
  console.log("Fetched blog data:", data);
  const blog = data?.blog;

  if (!blog) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <Link
          href="/blog"
          className="text-blue-700 hover:underline mb-4 inline-block"
        >
          &larr; Back to Blogs
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
          {blog.title}
        </h1>
        <div className="flex items-center mb-6">
          <Image
            src={blog.authorAvatar || "/placeholder-avatar.png"}
            alt={blog.author}
            width={32}
            height={32}
            className="rounded-full mr-2"
          />
          <span className="text-gray-500 text-sm">{blog.author}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-400 text-xs">
            {new Date(blog.date).toLocaleDateString()}
          </span>
        </div>
        {/* Image Gallery */}
        {blog.images && blog.images.length > 0 ? (
          <div className="mb-8">
            {blog.images.length === 1 ? (
              <div className="relative w-full h-[24rem] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={blog.images[0]}
                  alt={blog.title}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={true}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blog.images.map((image: string, index: number) => (
                  <div key={index} className="relative aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={image}
                      alt={`${blog.title} - Image ${index + 1}`}
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                ))}
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
        <div className="prose max-w-none text-gray-800">
          {blog.content.split("\n").map((p: string, i: number) => (
            <p key={`blog-content-${i}`} className="mb-4">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
