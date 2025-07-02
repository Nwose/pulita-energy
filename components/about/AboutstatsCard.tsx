import React from "react";

type AboutStatsCardProps = {
  icon: React.ElementType;
  number: number | string;
  title: string;
  description: string;
};

const AboutStatsCard = ({
  icon: Icon,
  number,
  title,
  description,
}: AboutStatsCardProps) => {
  return (
    <div className="relative group bg-[#efeded] rounded-xl p-4 shadow-lg border border-gray-100 font-satoshi mb-6 mx-2 overflow-hidden ">
      {/* Background SVG (initially hidden off-screen left) */}
      <div className="absolute -left-10 top-0 h-full w-20 bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Icon className="text-blue-600 text-2xl" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{number}</h3>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default AboutStatsCard;
