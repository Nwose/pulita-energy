import TeamCard from "./TeamCard";
import Bio from "./assets/Bio.png";
const teamMembers = [
  {
    id: 1,
    name: "Marcus Johnson",
    role: "CEO & FOUNDER",
    image: Bio,
    description:
      "Marcus leads Pulita with over 15 years of experience in sustainable technology and business development.",
    email: "marcus@pulita.com",
    bio: "Passionate about creating innovative solutions that make a real impact on businesses and the environment.",
  },
  {
    id: 2,
    name: "Eric Zhao",
    role: "SALES MANAGER",
    image: Bio,
    description:
      "Eric develops smart energy solutions for homes and businesses.",
    email: "eric@hitepower.com",
    bio: "Dedicated to helping clients find the perfect energy solutions for their unique needs and requirements.",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "CTO",
    image: Bio,
    description:
      "David oversees all technical operations and product development at Pulita.",
    email: "david@pulita.com",
    bio: "Expert in renewable energy systems with a focus on innovative and scalable solutions.",
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-600 font-medium mb-6">
          Our Team
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Meet The Pulita Team
        </h2>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
