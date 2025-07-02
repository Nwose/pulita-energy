import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
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
  const user = getUserFromRequest(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ blogs });
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { title, slug, excerpt, content, image, authorAvatar, date } =
    await req.json();
  if (!title || !slug || !excerpt || !content || !image || !date) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const blog = await prisma.blog.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
      author: user.email,
      authorAvatar: authorAvatar || "",
      date: new Date(date),
      authorId: user.id,
    },
  });
  return NextResponse.json({ blog });
}

export async function PUT(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id, ...data } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const blog = await prisma.blog.update({ where: { id }, data });
  return NextResponse.json({ blog });
}

export async function DELETE(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await prisma.blog.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
