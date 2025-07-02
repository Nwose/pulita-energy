import { motion } from "framer-motion";
import React from "react";
import {
  FaBolt,
  FaHome,
  FaLeaf,
  FaRecycle,
  FaGlobe,
  FaPowerOff,
  FaArrowRight,
} from "react-icons/fa";
import CircuitLines from "./CircuitLines";
import EnergyIcons from "./EnergyIcons";

const PowerUp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <CircuitLines />
      <EnergyIcons />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 ">
        <div className="text-center mb-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight font-satoshi">
            Ready to Power Up?
          </h1>
          <div className="text-lg md:text-xl text-gray-300 space-y-2">
            <p>
              Get a custom energy solution built for your needs. Looking for
              reliable,
            </p>
            <p>
              efficient, and clean power? Fill out the form below and our team
              will reach
              <br />
              out with the perfect solution for your business or project.
              <br />
            </p>
          </div>
        </div>
        <div className="w-full max-w-lg"></div>
        <div className="h-16">
          <button className="btn relative overflow-hidden group bg-white text-black px-6 py-2 rounded-full flex items-center">
            <p className="font-bold relative z-10 group-hover:text-white transition-colors duration-300">
              Get a Quote
            </p>
            <span
              className="btn-circle absolute right-0 top-0 h-full w-12 bg-[#2563EB] transition-all duration-300 ease-in-out group-hover:w-full z-0 rounded-full items-center justify-center"
              style={{ minWidth: "3rem" }}
            >
              <FaArrowRight size={15} className="text-white" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PowerUp;
