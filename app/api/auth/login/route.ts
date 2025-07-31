import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import jwt from "jsonwebtoken";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await convex.mutation(api.auth.login, { email, password });

    // Create a proper JWT token
    const token = jwt.sign(
      { id: result.id, email: result.email, role: result.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({
      id: result.id,
      email: result.email,
      role: result.role,
    });

    // Set the JWT token as a cookie
    res.cookies.set("admin-token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid credentials" },
      { status: 401 }
    );
  }
}
