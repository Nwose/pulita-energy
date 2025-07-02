import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // TODO: Check if current user is superadmin (session/cookie)
  const { email, password, role } = await req.json();
  if (!email || !password || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, role },
  });
  return NextResponse.json({ id: user.id, email: user.email, role: user.role });
}
