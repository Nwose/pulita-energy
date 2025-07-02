import React from "react";

export interface AboutStatsCardProps {
  icon: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { className?: string }
  >;
  number: string;
  title: string;
  description: string;
}

const AboutStatsCard: React.FC<AboutStatsCardProps> = ({
  icon: Icon,
  number,
  title,
  description,
}) => {
  return (
    <div className="relative group bg-[#efeded] rounded-xl p-4 shadow-lg border border-gray-100 font-satoshi mb-6 mx-2 overflow-hidden ">
      {/* Background SVG (initially hidden off-screen left) */}
      <img
        src="/Effect.svg"
        alt="Effect background"
        className="absolute top-0 left-[-100%] w-full h-full object-cover  transition-all duration-700 ease-in-out group-hover:left-0 z-0"
      />
      {/* Foreground Content (above background SVG) */}
      <div className="relative z-10 flex flex-col items-start">
        <Icon className="w-8 h-8 text-blue-600" />
        <div className="space-y-2">
          <h3 className="text-4xl font-bold text-gray-900">{number}</h3>
          <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
        </div>
        <p className="text-gray-600 leading-relaxed text-base">{description}</p>
      </div>
    </div>
  );
};

export default AboutStatsCard;
