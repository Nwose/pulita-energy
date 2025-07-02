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
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { name, summary, date, images, details, challenges } = await req.json();
  if (
    !name ||
    !summary ||
    !date ||
    !images ||
    !Array.isArray(images) ||
    images.length === 0 ||
    !details ||
    !challenges ||
    !Array.isArray(challenges)
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const project = await prisma.project.create({
    data: {
      name,
      summary,
      date,
      images,
      details,
      challenges,
      authorId: user.id,
    },
  });
  return NextResponse.json({ project });
}

export async function PUT(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id, ...data } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  // Only allow updating the new fields
  const allowedFields = [
    "name",
    "summary",
    "date",
    "images",
    "details",
    "challenges",
  ];
  const updateData: any = {};
  for (const key of allowedFields) {
    if (key in data) updateData[key] = data[key];
  }
  const project = await prisma.project.update({
    where: { id },
    data: updateData,
  });
  return NextResponse.json({ project });
}

export async function DELETE(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
