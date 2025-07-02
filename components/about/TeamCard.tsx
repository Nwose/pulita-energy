import { FiMail } from "react-icons/fi";
import Image, { StaticImageData } from "next/image";
import React from "react";

export interface TeamMember {
  name: string;
  role: string;
  image: string | StaticImageData;
  email?: string;
  bio?: string;
}

export interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  // Default width/height if not available
  const width =
    typeof member.image === "object" && "width" in member.image
      ? member.image.width
      : 300;
  const height =
    typeof member.image === "object" && "height" in member.image
      ? member.image.height
      : 300;

  return (
    <div className="slide-up relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg group">
      {/* Background Image */}
      <Image
        src={member.image}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        width={width}
        height={height}
        draggable={false}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      {/* Info Card */}
      <div className="relative z-20 flex flex-col justify-end h-full p-6">
        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-blue-200 text-lg font-medium mb-2">{member.role}</p>
        {member.bio && (
          <p className="text-sm text-blue-100 mb-2">{member.bio}</p>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center text-blue-400 hover:text-blue-200"
          >
            <FiMail className="mr-2" />
            {member.email}
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
