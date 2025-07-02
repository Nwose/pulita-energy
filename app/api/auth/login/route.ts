import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  const res = NextResponse.json({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
