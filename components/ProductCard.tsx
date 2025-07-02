import {
  FaGasPump,
  FaPlug,
  FaLeaf,
  FaBolt,
  FaHome,
  FaCog,
  FaBus,
  FaGlobe,
  FaFlask,
  FaTachometerAlt,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

// Card Props
interface CardProps {
  title: string;
  text: string;
  image: string; // path relative to /public/assets
  icons: React.ComponentType<{ size?: number }>[];
}

const Card: React.FC<CardProps> = ({ title, text, image, icons }) => {
  return (
    <motion.div
      whileHover="hover"
      className="relative overflow-hidden rounded-2xl shadow-lg flex flex-col md:flex-row-reverse w-full max-w-[660px] h-[205px] mx-auto group bg-white"
    >
      {/* SVG Background - Left Side Vertical Line */}
      <motion.div
        variants={{
          hover: { x: 0, opacity: 1 },
          initial: { x: "-100%", opacity: 0 },
        }}
        initial="initial"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-full w-14 bg-no-repeat bg-contain z-0 rounded-l-2xl"
        style={{
          backgroundImage: `url(/assets/VectorVertical.svg)`,
          backgroundPosition: "center left",
          backgroundSize: "cover",
        }}
      />

      {/* Image */}
      <div className="w-full md:w-1/2 h-40 md:h-full">
        <Image
          src={image}
          alt={title}
          width={300}
          height={160}
          className="w-full h-full object-cover rounded-none md:rounded-r-2xl"
        />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-between bg-[#efeded] relative z-10 rounded-l-2xl md:rounded-none">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600 mt-2 flex-1">{text}</p>

        {/* Icon Row */}
        <div className="flex gap-3 mt-3">
          {icons.map((Icon, index) => (
            <div
              key={index}
              className="p-2 bg-[#1f1f1f]/70 text-white rounded-full"
            >
              <Icon size={16} />
            </div>
          ))}
        </div>

        <button className="mt-3 bg-[#28231d] text-gray-100 px-4 py-2 rounded-full text-sm w-fit font-bold">
          Learn More
        </button>
      </div>
    </motion.div>
  );
};

// CardGrid
const CardGrid: React.FC = () => {
  const cards = [
    {
      title: "LPG Generator Sets",
      text: "Save money, reduce emissions, and ensure peace of mind.",
      image: "/assets/lpg.png",
      icons: [FaGasPump, FaPlug, FaLeaf],
    },
    {
      title: "CNG Generator Sets",
      text: "No more fuel stress or blackouts—just sustainable power.",
      image: "/assets/cng.png",
      icons: [FaBolt, FaLeaf, FaHome],
    },
    {
      title: "CNG Cylinder",
      text: "Enjoy clean energy without the noise or high cost.",
      image: "/assets/cylinder.png",
      icons: [FaCog, FaBus, FaGlobe],
    },
    {
      title: "PRMS",
      text: "Advanced pressure reduction and metering solutions.",
      image: "/assets/prms.png",
      icons: [FaFlask, FaTachometerAlt, FaLock],
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          text={card.text}
          image={card.image}
          icons={card.icons}
        />
      ))}
    </div>
  );
};

// ProductShowcase
const ProductShowcase: React.FC = () => {
  return (
    <section className="bg-gray-50 px-6 py-16 font-satoshi">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-[#dad8d8] text-[#666666] rounded-full text-sm font-bold shadow-sm mb-6">
            Our Product
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Smart Power For a Cleaner Future
          </h2>
          <p className="text-gray-500 mt-2">
            Pulita Energy delivers sustainable, high-performance power solutions
            built for durability, efficiency, and global standards.
          </p>
        </div>

        <CardGrid />

        {/* Centered Button */}
        <button className="btn relative overflow-hidden group bg-black text-white px-6 py-2 rounded-full flex items-center mx-auto my-10">
          <p className="font-bold relative z-10 group-hover:text-white transition-colors duration-300">
            See All Services
          </p>
          <span
            className="btn-circle absolute right-0 top-0 h-full w-12 bg-[#2563EB] transition-all duration-300 ease-in-out group-hover:w-full z-0 rounded-full"
            style={{ minWidth: "3rem" }}
          >
            <FaArrowRight size={15} className="text-white " />
          </span>
        </button>
      </div>
    </section>
  );
};

export default ProductShowcase;
