import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      summary: true,
      date: true,
      images: true,
      details: true,
      challenges: true,
    },
  });
  return NextResponse.json({ projects });
}
