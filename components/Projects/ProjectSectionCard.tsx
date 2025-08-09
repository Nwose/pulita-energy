"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  description: string;
  images?: string[];
  name?: string;
  summary?: string;
  details?: string;
  date?: string;
  challenges?: string[];
  createdAt?: number;
  updatedAt?: number;
  authorId?: string;
}

interface ProjectSectionCardProps {
  limit?: number;
}

const ProjectSectionCard: React.FC<ProjectSectionCardProps> = ({ limit }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects || []);
        } else {
          setError("Failed to load projects");
        }
      } catch {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
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
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[320px] bg-gray-200 rounded-3xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
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
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

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
      {projects.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">No projects available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {(limit ? projects.slice(0, limit) : projects).map((project, idx) => {
            if (!project._id) return null;
            // Use the first image from the images array
            let imageSrc =
              project.images && project.images[0]
                ? project.images[0]
                : "/assets/project1.png";

            // Ensure imageSrc is properly formatted for Next.js Image component
            if (
              imageSrc &&
              !imageSrc.startsWith("http") &&
              !imageSrc.startsWith("/")
            ) {
              imageSrc = `/assets/${imageSrc}`;
            }

            return (
              <Link
                key={project._id || idx}
                href={`/projects/${project._id}`}
                className="drop-vec group relative overflow-hidden rounded-3xl shadow-lg"
              >
                {/* Background Image */}
                <Image
                  src={imageSrc}
                  alt={project.title}
                  width={600}
                  height={320}
                  className="w-full h-[320px] object-cover rounded-3xl transform group-hover:scale-105 transition duration-500"
                  priority={true}
                />
                {/* Drop vector hover overlay */}
                <div className="drop-vec-inner absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-[159px] transition-all duration-500 ease-in-out rounded-b-3xl">
                  <div className="drop-vec-content pl-5 pb-5 text-left">
                    <p className="text-base font-bold text-gray-900 mt-6">
                      {project.title}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProjectSectionCard;
