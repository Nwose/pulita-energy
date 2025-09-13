import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import jwt from "jsonwebtoken";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const blogs = await convex.query(api.blogs.getBlogs);
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs from Convex:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs from Convex" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { title, slug, excerpt, content, image, author, authorAvatar, date } =
      await req.json();
    if (!title || !slug || !excerpt || !content || !image || !date) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const blogId = await convex.mutation(api.blogs.createBlog, {
      title,
      slug,
      excerpt,
      content,
      image,
      author,
      authorAvatar: authorAvatar || "",
      date: new Date(date).getTime(),
      authorId: user.id,
    });

    return NextResponse.json({ blog: { id: blogId } });
  } catch (error) {
    console.error("Error creating blog in Convex:", error);
    return NextResponse.json(
      { error: "Failed to create blog in Convex" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id, ...data } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await convex.mutation(api.blogs.updateBlog, {
      id,
      ...data,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating blog in Convex:", error);
    return NextResponse.json(
      { error: "Failed to update blog in Convex" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await convex.mutation(api.blogs.deleteBlog, { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog in Convex:", error);
    return NextResponse.json(
      { error: "Failed to delete blog in Convex" },
      { status: 500 }
    );
  }
}
