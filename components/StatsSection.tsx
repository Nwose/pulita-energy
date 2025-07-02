import { PiHandshake, PiUsersThree, PiBagSimpleBold } from "react-icons/pi";
import StatsCard from "./StatsCard";
import React from "react";

const StatsSection: React.FC = () => {
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
    <section className=" px-4 font-satoshi">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {stats.map((stat, index) => (
            <StatsCard
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

export default StatsSection;
