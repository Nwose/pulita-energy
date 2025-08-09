import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(req: NextRequest, context: any) {
  try {
    const { id } = await context.params;

    // Get the specific project
    const project = await convex.query(api.projects.getProject, { id });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get all projects for navigation
    const allProjects = await convex.query(api.projects.getProjects);

    const transformedProject = {
      id: project._id,
      title: project.name,
      description: project.summary,
      date: project.date,
      images: project.images,
      details: project.details,
      challenges: project.challenges,
      createdAt: project.createdAt,
    };

    const all = allProjects.map((p: any) => ({
      id: p._id,
      title: p.name,
    }));
    const idx = all.findIndex((p: any) => p.id === id);
    const prev = idx > 0 ? all[idx - 1] : null;
    const next = idx < all.length - 1 ? all[idx + 1] : null;

    // Related: any 2 others
    const related = all.filter((p: any) => p.id !== id).slice(0, 2);

    return NextResponse.json({
      project: transformedProject,
      related,
      prev,
      next,
    });
  } catch (error) {
    console.error("Error fetching project from Convex:", error);
    return NextResponse.json(
      { error: "Failed to fetch project from Convex" },
      { status: 500 }
    );
  }
}
