import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(req: NextRequest, context: any) {
  try {
    const { slug } = context.params;

    const blog = await convex.query(api.blogs.getBlog, { slug });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const transformedBlog = {
      id: blog._id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      authorAvatar: blog.authorAvatar,
      date: blog.date,
      createdAt: blog.createdAt,
    };

    return NextResponse.json({ blog: transformedBlog });
  } catch (error) {
    console.error("Error fetching blog from Convex:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog from Convex" },
      { status: 500 }
    );
  }
}
