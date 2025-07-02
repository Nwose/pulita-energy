"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const AboutPulita = () => {
  return (
    <section className="text-center mt-16 font-satoshi px-4">
      <div className=" rounded-3xl p-12 text-[#666666] max-w-5xl mx-auto">
        <div className="inline-flex items-center px-4 py-2 bg-[#dad8d8] text-[#666666] rounded-full text-sm font-bold shadow-sm mb-6">
          About Pulita
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          From our <span className="text-[#2563EB]">30,000 sq. meter</span>{" "}
          facility in Weifang, China
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
          We engineer advanced multi-energy solutions—LPG, CNG, and dual-fuel
          generators, PRMS, cylinder groups, and modular daughter stations—all
          built for performance, sustainability, and global standards. We're
          powering the transition to a cleaner future, one generator at a time.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="btn relative overflow-hidden group bg-black text-white px-6 py-2 rounded-full flex items-center">
            {/* Animated Blue Overlay */}
            <p className="font-bold relative z-10 group-hover:text-white transition-colors duration-300">
              Get a Quote
            </p>
            <span
              className="btn-circle absolute right-0 top-0 h-full w-12 bg-[#2563EB] transition-all duration-300 ease-in-out group-hover:w-full z-0 rounded-full"
              style={{ minWidth: "3rem" }}
            >
              <FaArrowRight size={15} className="text-white " />
            </span>
          </button>
          <button className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#2563EB] transition-colors duration-300 inline-flex items-center justify-center">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPulita;
