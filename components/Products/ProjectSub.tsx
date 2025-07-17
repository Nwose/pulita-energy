"use client";
import React, { useEffect, useState } from "react";
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
  return (
    <motion.div
      whileHover="hover"
      className="relative overflow-hidden rounded-2xl shadow-lg flex flex-col md:flex-row-reverse w-full max-w-[660px] mx-auto group bg-white"
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
      <div className="w-full md:w-1/2 h-full flex flex-col p-4 bg-[#efeded] relative z-10 rounded-l-2xl md:rounded-none">
        <div className="flex-1 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-4">{text}</p>

          {/* Icon Row */}
          <div className="flex gap-3 mb-4">
            {icons.map((iconName, index) => {
              const IconComponent = iconMap[iconName];
              return IconComponent ? (
                <div
                  key={index}
                  className="p-2 bg-[#1f1f1f]/70 text-white rounded-full"
                >
                  <IconComponent size={16} />
                </div>
              ) : null;
            })}
          </div>

          {/* PDF Downloads */}
          {pdfs && pdfs.length > 0 && (
            <div className="space-y-2 mb-2">
              {pdfs.map((pdf, index) => (
                <a
                  key={index}
                  href={pdf.file}
                  download
                  className="block text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  📄 {pdf.name}
                </a>
              ))}
            </div>
          )}
        </div>
        <button className="bg-[#28231d] text-gray-100 px-4 py-2 rounded-full text-sm w-fit font-bold mt-2">
          Learn More
        </button>
      </div>
    </motion.div>
  );
};

const CardGrid: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError("Failed to fetch products from database");
        }
      } catch (err) {
        setError("Failed to fetch products from database");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full max-w-[660px] h-[205px] mx-auto bg-gray-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-gray-500 text-sm">
          Please check your database connection or contact an administrator.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">No products available yet.</p>
        <p className="text-gray-500 text-sm">
          Products will appear here once they are added through the admin panel.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {products.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          text={item.text}
          image={imageMap[item.image] || item.image}
          icons={item.icons}
          details={item.details}
          pdfs={item.pdfs}
        />
      ))}
    </div>
  );
};

export default CardGrid;
