"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import projectCards from "../../data/projectCards.json";

interface Project {
  id: string | number;
  name: string;
  summary?: string;
  details?: string;
  date?: string;
  images?: string[];
  image?: string;
}

const ProjectSectionCard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        if (data && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          setProjects(projectCards as Project[]);
        }
      })
      .catch(() => {
        setProjects(projectCards as Project[]);
      });
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="text-center mb-16">
        <span className="inline-block px-5 py-2 bg-gray-300 rounded-full text-sm text-gray-700 font-medium mb-4">
          Our Project
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Featured Projects
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.slice(0, 4).map((project) => {
          // Prefer images[0] if available, else fallback to image field
          const imageSrc = project.images && project.images[0]
            ? project.images[0]
            : project.image
            ? `/assets/${project.image}`
            : "/assets/project1.png";
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="drop-vec group relative overflow-hidden rounded-3xl shadow-lg"
            >
              {/* Background Image */}
              <Image
                src={imageSrc}
                alt={project.name}
                width={600}
                height={320}
                className="w-full h-[320px] object-cover rounded-3xl transform group-hover:scale-105 transition duration-500"
                priority={true}
              />
              {/* Drop vector hover overlay */}
              <div className="drop-vec-inner absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-[159px] transition-all duration-500 ease-in-out rounded-b-3xl">
                <div className="drop-vec-content pl-5 pb-5 text-left">
                  <p className="text-base font-bold text-gray-900 mt-6">
                    {project.name}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {project.summary || project.details}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectSectionCard;
