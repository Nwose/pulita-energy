import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Project {
  _id: string;
  name: string;
  summary: string;
  date: string;
  images: string[];
  details: string;
  challenges: string[];
  createdAt: number;
  updatedAt: number;
  authorId?: string;
}

async function getProject(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  try {
    const res = await fetch(`${baseUrl}/api/projects/${id}`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.project;
  } catch (err) {
    console.error("Fetch project error:", err);
    return null;
  }
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectData = await getProject(id);

  console.log(projectData);

  if (!projectData) {
    notFound();
  }

  const project = projectData;
  const prevProject = projectData.prev;
  const nextProject = projectData.next;

  return (
    <div className="min-h-screen bg-white py-10 px-6 max-w-6xl mx-auto">
      {/* Top Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
        {project.title}
      </h1>
      {project.description && (
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-2">
          {project.description}
        </p>
      )}
      {project.date && (
        <p className="text-sm text-center text-gray-400 mb-10">
          {project.date}
        </p>
      )}
      {/* Images */}
      {(project.images?.length ?? 0) > 0 && (
  <div
    className={`mb-10 gap-6 ${
      project.images.length === 1
        ? "flex justify-center" // center single image
        : "grid grid-cols-1 md:grid-cols-2 justify-items-center" // row/grid for multiple
    }`}
  >
    {(project.images ?? []).map((img: string, index: number) => {
      // Ensure image URL is properly formatted for Next.js Image component
      let imageSrc = img;
      if (
        imageSrc &&
        !imageSrc.startsWith("http") &&
        !imageSrc.startsWith("/")
      ) {
        imageSrc = `/assets/${imageSrc}`;
      }

      return (
        <Image
          key={`project-image-${index}`}
          src={imageSrc}
          alt={`Project image ${index + 1}`}
          width={600}
          height={320}
          className={`h-80 object-cover rounded-xl ${
            project.images.length === 1 ? "w-auto max-w-full" : "w-full"
          }`}
        />
      );
    })}
  </div>
)}


      {/* Details */}
      {project.details && (
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4 text-left">Details</h2>
          <p className="text-gray-700 text-left leading-relaxed text-base">
            {project.details}
          </p>
        </div>
      )}

      {/* Challenges */}
      {project.challenges && project.challenges.length > 0 && (
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4 text-left">Challenges</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-left">
            {project.challenges.map((challenge: string, idx: number) => (
              <li
                key={`project-challenge-${idx}`}
                className="leading-relaxed text-base"
              >
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 text-sm">
        {prevProject ? (
          <Link href={`/projects/${prevProject.id}`} className="text-blue-500">
            ← {prevProject.title}
          </Link>
        ) : (
          <div />
        )}
        {nextProject ? (
          <Link href={`/projects/${nextProject.id}`} className="text-blue-500">
            {nextProject.title} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
