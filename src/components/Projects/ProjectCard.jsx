import { FiMail } from "react-icons/fi";

const ProjectCard = ({ member }) => {
  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg group">
      {/* Background Image */}
      <img
        src={member.image}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Hover Content */}
      <div className="absolute bottom-0 left-0 w-full z-30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out  pt-0 pb-4 rounded-t-2xl backdrop-blur-sm bg-white/90 text-gray-900">
        <h3 className="text-base font-bold px-4 pt-4">{member.name}</h3>
        <div className="px-4 pb-4">
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
