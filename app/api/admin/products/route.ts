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
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { title, text, image, icons, details, pdfs, isActive } =
    await req.json();
  if (!title || !text || !image || !icons) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.create({
      data: {
        title,
        text,
        image,
        icons,
        details,
        pdfs: pdfs ? JSON.parse(JSON.stringify(pdfs)) : null,
        isActive: isActive !== undefined ? isActive : true,
        authorId: user.id,
      },
    });
    return NextResponse.json({ product });
  } catch (error: any) {
    // If the new schema doesn't exist, try with old schema
    if (error.message?.includes("title") || error.message?.includes("text")) {
      const product = await prisma.product.create({
        data: {
          name: title,
          description: text,
          image,
          category: "Product",
          features: details,
          specifications: "",
          price: null,
          isActive: isActive !== undefined ? isActive : true,
          authorId: user.id,
        } as any,
      });
      return NextResponse.json({ product });
    }
    throw error;
  }
}

export async function PUT(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id, ...data } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  // Handle pdfs field properly
  if (data.pdfs) {
    data.pdfs = JSON.parse(JSON.stringify(data.pdfs));
  }

  try {
    const product = await prisma.product.update({ where: { id }, data });
    return NextResponse.json({ product });
  } catch (error: any) {
    // If the new schema doesn't exist, try with old schema
    if (error.message?.includes("title") || error.message?.includes("text")) {
      const oldData = {
        name: data.title,
        description: data.text,
        image: data.image,
        category: "Product",
        features: data.details,
        specifications: "",
        price: null,
        isActive: data.isActive,
      };
      const product = await prisma.product.update({
        where: { id },
        data: oldData as any,
      });
      return NextResponse.json({ product });
    }
    throw error;
  }
}

export async function DELETE(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
