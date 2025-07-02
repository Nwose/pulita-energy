"use client";
import { FaArrowRight } from "react-icons/fa";
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "25kVA CNG Generator, 2x500 SCUM Skids & PRMS",
    imageUrl: project1,
  },
  {
    id: 2,
    title: "MRU & CNG Conversion Center — Portland, Ojota",
    imageUrl: project2,
  },
];

const RecentProjects = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 font-satoshi">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gray-200 text-gray-700 font-medium">
          Our Projects
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Recent Projects
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Innovation is at the heart of everything we do. Our products are
          engineered to meet the evolving energy needs of industries around the
          globe, ensuring efficiency, durability, and minimal environmental
          impact.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="drop-vec group relative overflow-hidden rounded-3xl shadow-lg "
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-[320px] object-cover rounded-3xl transform group-hover:scale-105 transition duration-500"
                width={project.imageUrl.width || 400}
                height={project.imageUrl.height || 320}
              />
              <div className="drop-vec-inner absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-[-20] transition-all duration-500 ease-in-out rounded-b-3xl">
                <div className="drop-vec-content pl-5 pb-5 text-left">
                  <h4 className="">Case Installation </h4>
                  <p className="text-sm font-medium text-gray-900 mt-8">
                    {project.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Button */}

        <button className="btn relative overflow-hidden group bg-black text-white px-6 py-2 rounded-full flex items-center mx-auto my-10">
          {/* Animated Blue Overlay */}
          <p className="font-bold relative z-10 group-hover:text-white transition-colors duration-300">
            See Projects
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

export default RecentProjects;
