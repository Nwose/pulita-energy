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
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const projects = await convex.query(api.projects.getProjects);
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error fetching projects from Convex:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects from Convex" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { name, summary, date, images, details, challenges } =
      await req.json();
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

    const projectId = await convex.mutation(api.projects.createProject, {
      name,
      summary,
      date,
      images,
      details,
      challenges,
      authorId: user.id,
    });

    return NextResponse.json({ project: { id: projectId } });
  } catch (error) {
    console.error("Error creating project in Convex:", error);
    return NextResponse.json(
      { error: "Failed to create project in Convex" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
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

    await convex.mutation(api.projects.updateProject, {
      id,
      ...updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating project in Convex:", error);
    return NextResponse.json(
      { error: "Failed to update project in Convex" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await convex.mutation(api.projects.deleteProject, { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project in Convex:", error);
    return NextResponse.json(
      { error: "Failed to delete project in Convex" },
      { status: 500 }
    );
  }
}
