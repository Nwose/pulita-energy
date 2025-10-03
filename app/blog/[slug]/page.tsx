export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getBlog(slug: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  try {
    const res = await fetch(
      `${baseUrl}/api/blogs/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) return null;
    return res.json();
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
        <div className="relative w-full h-72 mb-8 rounded-xl overflow-hidden">
          <Image
            src={blog.image || "/placeholder-blog.png"}
            alt={blog.title}
            fill
            className="object-contain w-full h-auto rounded-xl"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={true}
          />
        </div>
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
