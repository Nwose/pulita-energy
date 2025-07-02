import { PiHandshake, PiUsersThree, PiBagSimpleBold } from "react-icons/pi";
import AboutStatsCard from "./AboutstatsCard";
import React from "react";

const AboutStatsSection: React.FC = () => {
  const stats = [
    {
      icon: PiBagSimpleBold,
      number: "90+",
      title: "Projects",
      description:
        "We've successfully delivered clean energy solutions in multiple states, powering industries, communities, and businesses nationwide.",
    },
    {
      icon: PiUsersThree,
      number: "80+",
      title: "Clients",
      description:
        "From top-tier corporations to growing enterprises, our clients rely on Pulita for efficient, sustainable power systems.",
    },
    {
      icon: PiHandshake,
      number: "92.5+",
      title: "Satisfaction",
      description:
        "We pride ourselves on delivering energy solutions that meet expectations and build lasting trust through performance.",
    },
  ];

  return (
    <section className="px-6 py-16 font-satoshi bg-white">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex justify-center">
          <div className="inline-flex items-center px-6 py-3 bg-gray-200 rounded-full text-sm text-gray-600 font-bold shadow-sm">
            Our Achievements
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <AboutStatsCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              title={stat.title}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
