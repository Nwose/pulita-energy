import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;
  const project = await prisma.project.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      summary: true,
      date: true,
      images: true,
      details: true,
      challenges: true,
      createdAt: true,
    },
  });
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  // Get all projects ordered by createdAt
  const all = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  });
  const idx = all.findIndex((p) => p.id === id);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  // Related: any 2 others
  const related = all.filter((p) => p.id !== id).slice(0, 2);
  return NextResponse.json({ project, related, prev, next });
}
