import { FiMail } from "react-icons/fi";
import Image from "next/image";
import React from "react";
import { TeamMember } from "./TeamSection";

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="slide-up relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg group">
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
      {/* Hover Card (slides up to replace Z-shape label) */}
      <div className="slide-up-object absolute bottom-20 left-0 w-full z-30 transform translate-y-full transition-transform duration-500 ease-in-out text-gray-800 pt-0 pb-5 rounded-t-2xl backdrop-blur-sm">
        <h3 className="text-lg font-bold position-relative">{member.name}</h3>
        <div className="slide-inner p-3">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {member.role}
          </p>
          <p className="text-sm text-gray-600 mt-3 mb-4">{member.bio}</p>
          <div className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
            <FiMail className="w-4 h-4 mr-2" />
            <span>{member.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
