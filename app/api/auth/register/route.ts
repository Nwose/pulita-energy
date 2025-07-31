import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    // TODO: Check if current user is superadmin (session/cookie)
    const { email, password, role } = await req.json();
    if (!email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await convex.mutation(api.auth.register, {
      email,
      password,
      role,
    });

    return NextResponse.json({
      id: result.id,
      email,
      role,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 400 }
    );
  }
}
