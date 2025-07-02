"use client";

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
import {
  cng,
  cylinder,
  lpg,
  prms,
  Dual,
  skids,
  kits,
} from "../Products/assests/index";
import Electric from "../Products/assests/VectorVertical.svg";
import type { StaticImageData } from "next/image";
import Image from "next/image";

type CardProps = {
  title: string;
  text: string;
  image: string | StaticImageData;
  icons: React.ElementType[];
};

// 🔹 Card Component
const Card = ({ title, text, image, icons }: CardProps) => (
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
        backgroundImage: `url(${Electric})`,
        backgroundPosition: "center left",
        backgroundSize: "cover",
      }}
    />

    {/* Image */}
    <div className="w-full md:w-1/2 h-40 md:h-full">
      <Image
        src={image}
        alt={title}
        width={
          typeof image === "object" && "width" in image ? image.width : 200
        }
        height={
          typeof image === "object" && "height" in image ? image.height : 200
        }
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

//  CardGrid Component
const CardGrid = () => {
  const cards = [
    {
      title: "LPG Generator Sets",
      text: "Save money, reduce emissions, and ensure peace of mind.",
      image: lpg,
      icons: [FaGasPump, FaPlug, FaLeaf],
    },
    {
      title: "CNG Generator Sets",
      text: "No more fuel stress or blackouts—just sustainable power.",
      image: cng,
      icons: [FaBolt, FaLeaf, FaHome],
    },
    {
      title: "CNG Cylinder",
      text: "Enjoy clean energy without the noise or high cost.",
      image: cylinder,
      icons: [FaCog, FaBus, FaGlobe],
    },
    {
      title: "PRMS",
      text: "Advanced pressure reduction and metering solutions.",
      image: prms,
      icons: [FaFlask, FaTachometerAlt, FaLock],
    },
    {
      title: "Mobile Daughter Gas Station",
      text: "The daughter gas refil station consists of gas cylinder group...",
      image: kits,
      icons: [FaFlask, FaTachometerAlt, FaLock],
    },
    {
      title: "Gas Station",
      text: "We provide one-stop gas station EPC solutions customizable high-standard design...",
      image: Dual,
      icons: [FaFlask, FaTachometerAlt, FaLock],
    },
    {
      title: "CNG Vehicles Conversion Kits",
      text: "CNG cylinders are installed under chassisat vehicle to store fuel, High-pressure..",
      image: skids,
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

//  ProductShowcase Component
const ProjectSub = () => {
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
      </div>
    </section>
  );
};

export default ProjectSub;
