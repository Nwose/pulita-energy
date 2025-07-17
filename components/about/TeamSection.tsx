import React from "react";
import TeamCard, { TeamMember } from "./TeamCard";

const teamMembers: TeamMember[] = [
  {
    name: "John Wang",
    role: "CEO",
    image: "/assets/john.JPG",
    email: "marcus@pulita.com",
    bio: "Passionate about creating innovative solutions that make a real impact on businesses and the environment.",
  },
  {
    name: "Eric Zhao",
    role: "SALES MANAGER",
    image: "/assets/eric.jpeg",
    email: "eric@hitepower.com",
    bio: "Dedicated to helping clients find the perfect energy solutions for their unique needs and requirements.",
  },
  {
    name: "Richard Chinemelum Arannonu",
    role: "CTO",
    image: "/assets/richard.JPG",
    email: "david@pulita.com",
    bio: "Expert in renewable energy systems with a focus on innovative and scalable solutions.",
  },
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-600 font-medium mb-6">
          Our Team
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Meet The Pulita Team
        </h2>
      </div>
      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {teamMembers.map((member, idx) => (
          <TeamCard key={member.email || idx} member={member} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
