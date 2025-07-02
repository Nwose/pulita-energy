import { FiMail } from "react-icons/fi";
import Image, { StaticImageData } from "next/image";

type ProjectMember = {
  name: string;
  role: string;
  image: string | StaticImageData;
  email?: string;
};

type ProjectCardProps = {
  member: ProjectMember;
};

const ProjectCard = ({ member }: ProjectCardProps) => {
  const width =
    typeof member.image === "object" && "width" in member.image
      ? member.image.width
      : 300;
  const height =
    typeof member.image === "object" && "height" in member.image
      ? member.image.height
      : 300;

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg group">
      {/* Background Image */}
      <Image
        src={member.image}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        width={width}
        height={height}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
      <div className="relative z-20 flex flex-col justify-end h-full p-6">
        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-blue-200 text-lg font-medium mb-2">{member.role}</p>
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

export default ProjectCard;
