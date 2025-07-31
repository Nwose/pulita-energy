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
    if (!user || user.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const users = await convex.query(api.auth.getUsers);
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users from Convex:", error);
    return NextResponse.json(
      { error: "Failed to fetch users from Convex" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || user.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await convex.mutation(api.auth.deleteUser, { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user in Convex:", error);
    return NextResponse.json(
      { error: "Failed to delete user in Convex" },
      { status: 500 }
    );
  }
}
