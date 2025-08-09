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
import Link from "next/link";
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
  pdfs?: { name: string; file: string; downloadUrl?: string }[];
  id?: string;
}

const Card: React.FC<CardProps> = ({ title, text, image, icons }) => {
  return (
    <Link href={`/products/${encodeURIComponent(title)}`} className="block">
      <motion.div
        whileHover="hover"
        className="relative overflow-hidden rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-[660px] mx-auto group bg-white cursor-pointer h-[280px]"
      >
        {/* Image */}
        <div className="w-full md:w-1/2 h-32 md:h-full">
          <Image
            src={image}
            alt={title}
            width={330}
            height={280}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 h-full flex flex-col p-6 bg-white relative z-10">
          <div className="flex-1 flex flex-col">
            <h2 className="text-xl font-bold mb-3 text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600 mb-4">{text}</p>

            {/* Icon Row */}
            <div className="flex gap-2 mb-6">
              {icons.map((iconName, index) => {
                const IconComponent = iconMap[iconName];
                return IconComponent ? (
                  <div
                    key={index}
                    className="p-2 bg-gray-900 text-white rounded-full"
                  >
                    <IconComponent size={14} />
                  </div>
                ) : null;
              })}
            </div>
          </div>

          <button
            className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-semibold w-fit hover:bg-gray-800 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Learn More
          </button>
        </div>
      </motion.div>
    </Link>
  );
};

interface CardGridProps {
  limit?: number;
}

const CardGrid: React.FC<CardGridProps> = ({ limit }) => {
  const [products, setProducts] = useState<
    Array<{
      id: string;
      title: string;
      text: string;
      image: string;
      icons: string[];
      details: string;
      pdfs: Array<{
        name: string;
        file: string;
        downloadUrl?: string;
      }>;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched products data:", data);
          setProducts(data);
        } else {
          setError("Failed to fetch products from database");
        }
      } catch {
        setError("Failed to fetch products from database");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full h-[280px] mx-auto bg-gray-200 rounded-2xl animate-pulse"
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {(limit ? products.slice(0, limit) : products).map((item, index) => {
        console.log(`Product ${index}:`, item);
        console.log(`Product ${index} ID:`, item.id);
        return (
          <Card
            key={index}
            title={item.title}
            text={item.text}
            image={
              imageMap[item.image] ||
              (item.image &&
              !item.image.startsWith("http") &&
              !item.image.startsWith("/")
                ? `/assets/${item.image}`
                : item.image)
            }
            icons={item.icons}
            details={item.details}
            pdfs={item.pdfs}
            id={item.id}
          />
        );
      })}
    </div>
  );
};

export default CardGrid;
