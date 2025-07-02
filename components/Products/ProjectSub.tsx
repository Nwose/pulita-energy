import React from "react";
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
import productData from "../../data/productData.json";
import Image from "next/image";

// Icon and image maps
const iconMap: Record<string, React.ElementType> = {
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
};

const imageMap: Record<string, string> = {
  cng: "/assets/cng.png",
  cylinder: "/assets/cylinder.png",
  lpg: "/assets/lpg.png",
  prms: "/assets/prms.png",
  Dual: "/assets/Dual.png",
  skids: "/assets/skids.png",
  kits: "/assets/kits.png",
};

interface CardProps {
  title: string;
  text: string;
  image: string;
  icons: string[];
  details?: string;
  pdfs?: { name: string; file: string }[];
}

const Card: React.FC<CardProps> = ({
  title,
  text,
  image,
  icons,
  details,
  pdfs,
}) => {
  const primaryPdf = pdfs?.[0];
  return (
    <motion.div
      whileHover="hover"
      className="relative overflow-hidden rounded-2xl shadow-md flex flex-col md:flex-row-reverse w-full max-w-[640px] mx-auto group bg-white h-[180px]"
    >
      {/* SVG Line */}
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
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-full">
        <Image
          src={image}
          alt={title}
          width={300}
          height={180}
          className="w-full h-full object-cover rounded-none md:rounded-r-2xl"
        />
      </div>
      {/* Text + Buttons */}
      <div className="w-full md:w-1/2 p-3 flex flex-col justify-between bg-[#efeded] relative z-10 rounded-l-2xl md:rounded-none">
        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-600 mt-1 leading-snug">{text}</p>
        </div>
        {/* Icons */}
        <div className="flex gap-2 mt-2">
          {icons.map((icon, index) => {
            const Icon = iconMap[icon];
            return (
              <div
                key={index}
                className="p-1.5 bg-[#1f1f1f]/70 text-white rounded-full"
              >
                {Icon && <Icon size={14} />}
              </div>
            );
          })}
        </div>
        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <button className="bg-[#28231d] text-white px-3 py-1 rounded-full text-xs font-semibold">
            Learn More
          </button>
          {primaryPdf && (
            <a
              href={`/pdfs/cng/${primaryPdf.file}`}
              download
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
            >
              Download
              <FaArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CardGrid: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {productData.map((item, index) => (
      <Card
        key={index}
        title={item.title}
        text={item.text}
        image={imageMap[item.image]}
        icons={item.icons}
        details={item.details}
        pdfs={item.pdfs}
      />
    ))}
  </div>
);

const ProjectSub: React.FC = () => (
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

export default ProjectSub;
