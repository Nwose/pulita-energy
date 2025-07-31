import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(req: NextRequest) {
  try {
    const projects = await convex.query(api.projects.getProjects);

    const transformedProjects = projects.map((project: any) => ({
      id: project._id,
      name: project.name,
      summary: project.summary,
      date: project.date,
      images: project.images,
      details: project.details,
      challenges: project.challenges,
    }));

    return NextResponse.json({ projects: transformedProjects });
  } catch (error) {
    console.error("Error fetching projects from Convex:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects from Convex" },
      { status: 500 }
    );
  }
}
