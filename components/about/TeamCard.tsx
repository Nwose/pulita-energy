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
    <div className="group relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
      {/* Background Image */}
      <Image
        src={member.image}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        width={width}
        height={height}
        draggable={false}
      />
      {/* Info Card Strip & Expand on Hover */}
      <div
        className="absolute bottom-0 left-0 w-full z-20 p-0 transition-all duration-500 ease-in-out overflow-hidden max-h-[90px] group-hover:max-h-[500px]"
        style={{ minHeight: "90px" }}
      >
        {/* Notched/cut-corner effect using clip-path */}
        <div
          className="relative bg-white rounded-b-2xl px-6 pt-6 pb-6 flex flex-col justify-end h-full"
          style={{
            clipPath: "polygon(0 0, 50% 0, 100% 32px, 100% 100%, 0 100%)",
          }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {member.name}
          </h3>
          <p className="text-gray-500 text-base font-medium mb-2">
            {member.role}
          </p>
          <div className="transition-opacity duration-500 opacity-0 group-hover:opacity-100">
            {member.bio && (
              <p className="text-sm text-gray-700 mb-2">{member.bio}</p>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-400"
              >
                <FiMail className="mr-2" />
                {member.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
