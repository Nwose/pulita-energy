import { FiMail } from "react-icons/fi";
import Image from "next/image";
import React from "react";

export interface ProjectMember {
  name: string;
  role: string;
  bio: string;
  email: string;
  image: string;
}

const ProjectCard: React.FC<{ member: ProjectMember }> = ({ member }) => {
  return (
    <div className="drop-vec relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg group">
      {/* Background Image */}
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      {/* Drop Vector Background with Content */}
      <div className="drop-vec-inner absolute bottom-0 left-0 w-full z-30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-t-2xl backdrop-blur-sm bg-white/90 text-gray-900">
        <div className="drop-vec-content pl-5 pb-5 text-left pt-4">
          <h3 className="text-base font-bold">{member.name}</h3>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {member.role}
          </p>
          <p className="text-sm text-gray-600 mt-2 mb-3 line-clamp-2">
            {member.bio}
          </p>
          <div className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
            <FiMail className="w-4 h-4 mr-2" />
            <span>{member.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
