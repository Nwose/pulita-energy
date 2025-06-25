import ProjectCard from "./ProjectCard";
import { project1, project2, project3, project4 } from "./assets";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    id: 1,
    name: "Marcus Johnson",
    role: "CEO & FOUNDER",
    image: project1,
    email: "marcus@pulita.com",
    bio: "Passionate about creating innovative solutions that make a real impact on businesses and the environment.",
  },
  {
    id: 2,
    name: "Eric Zhao",
    role: "SALES MANAGER",
    image: project2,
    email: "eric@hitepower.com",
    bio: "Dedicated to helping clients find the perfect energy solutions for their unique needs and requirements.",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "CTO",
    image: project3,
    email: "david@pulita.com",
    bio: "Expert in renewable energy systems with a focus on innovative and scalable solutions.",
  },
  {
    id: 4,
    name: "Jane Smith",
    role: "PROJECT MANAGER",
    image: project4,
    email: "jane@pulita.com",
    bio: "Driven to deliver sustainable energy projects on time and within budget.",
  },
];

const ProjectSectionCard = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="text-center mb-16">
        <span className="inline-block px-5 py-2 bg-gray-200 rounded-full text-sm text-gray-600 font-medium mb-4">
          Our Project
        </span>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {teamMembers.map((teamMember) => (
          <Link
            key={teamMember.id}
            to={`/projects/${teamMember.id}`}
            className="block hover:scale-105 transition-transform"
          >
            <ProjectCard member={teamMember} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectSectionCard;
