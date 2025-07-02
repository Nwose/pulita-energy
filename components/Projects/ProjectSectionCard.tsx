"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  name: string;
  summary: string;
  date: string;
  images: string[];
}

const ProjectSectionCard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []));
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="text-center mb-16">
        <span className="inline-block px-5 py-2 bg-gray-200 rounded-full text-sm text-gray-600 font-medium mb-4">
          Our Project
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.slice(0, 4).map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block group hover:scale-105 transition-transform"
          >
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg bg-white">
              {/* Clipped/angled background */}
              <div
                className="absolute inset-0 bg-white z-0"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                }}
              />
              {project.images && project.images[0] && (
                <Image
                  src={project.images[0]}
                  alt={project.name}
                  fill
                  className="object-cover object-center z-10"
                  style={{ borderRadius: "inherit" }}
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {project.name}
                </h3>
                <p className="text-gray-700 text-base font-medium mb-2 line-clamp-2">
                  {project.summary}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectSectionCard;
