import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import projects from "../../../data/projects.json";

interface Project {
  id: string | number;
  name: string;
  summary?: string;
  date?: string;
  images?: string[];
  details?: string;
  challenges?: string[];
  [key: string]: any;
}

const sectionTitles: Record<string, string> = {
  "Solutions Provided": "Solutions Provided",
  "Project Impact": "Project Impact",
  "After-Sales Service": "After-Sales Service",
};

function getProjectById(id: string): {
  project: Project | undefined;
  index: number;
} {
  const index = (projects as Project[]).findIndex((p) => String(p.id) === id);
  return { project: (projects as Project[])[index], index };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { project, index: projectIndex } = getProjectById(id);

  if (!project) {
    notFound();
  }

  const prevProject =
    projectIndex > 0 ? (projects as Project[])[projectIndex - 1] : null;
  const nextProject =
    projectIndex < (projects as Project[]).length - 1
      ? (projects as Project[])[projectIndex + 1]
      : null;

  const renderSection = (key: string) => {
    const cleanKey = Object.keys(project).find((k) => k.trim() === key);
    const items = project[cleanKey!];
    if (Array.isArray(items) && items.length > 0) {
      return (
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4 text-left">
            {sectionTitles[key]}
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-left">
            {items.map((item: string, idx: number) => (
              <li key={idx} className="leading-relaxed text-base">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6 max-w-6xl mx-auto">
      {/* Top Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
        {project.name}
      </h1>
      {project.summary && (
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-2">
          {project.summary}
        </p>
      )}
      {project.date && (
        <p className="text-sm text-center text-gray-400 mb-10">
          {project.date}
        </p>
      )}
      {/* Images */}
      {(project.images?.length ?? 0) > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {(project.images ?? []).map((img: string, index: number) => (
            <Image
              key={index}
              src={img.startsWith("/assets/") ? img : `/assets/${img}`}
              alt={`Project image ${index + 1}`}
              width={600}
              height={320}
              className="w-full h-80 object-cover rounded-xl"
            />
          ))}
        </div>
      )}
      {/* Project Details Section (Name + Paragraph) */}
      {project.details && (
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-3">{project.name}</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {project.details}
          </p>
        </div>
      )}
      {/* Challenges */}
      {(project.challenges?.length ?? 0) > 0 && (
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4 text-left">
            Challenges Faced
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-left">
            {(project.challenges ?? []).map((item: string, index: number) => (
              <li key={index} className="leading-relaxed text-base">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Other Sections */}
      {renderSection("Solutions Provided")}
      {renderSection("Project Impact")}
      {renderSection("After-Sales Service")}
      {/* Previous / Next Navigation */}
      <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-300 text-sm md:text-base">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.id}`}
            className="text-blue-700 font-semibold hover:text-blue-900 transition duration-200"
          >
            ← {prevProject.name}
          </Link>
        ) : (
          <div />
        )}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.id}`}
            className="text-blue-700 font-semibold hover:text-blue-900 transition duration-200 ml-auto"
          >
            {nextProject.name} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
