import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(req: NextRequest) {
  try {
    const blogs = await convex.query(api.blogs.getBlogs);

    const transformedBlogs = blogs.map((blog: any) => ({
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
    }));

    return NextResponse.json({ blogs: transformedBlogs });
  } catch (error) {
    console.error("Error fetching blogs from Convex:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs from Convex" },
      { status: 500 }
    );
  }
}
