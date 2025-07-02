import React from "react";
import Image from "next/image";

const AboutWhoWeAre: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 md:mt-72">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            About Pulita
          </h2>
        </div>
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Who We Are Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gray-200">
              <Image
                src="/assets/Images.png"
                alt="CNG Station Operations"
                width={600}
                height={256}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Who We Are
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We are a leading provider of clean energy solutions,
                specializing in CNG (Compressed Natural Gas) and alternative
                fuel infrastructure. Our commitment to sustainable
                transportation drives us to deliver innovative, reliable, and
                environmentally friendly fuel solutions that help reduce carbon
                emissions and promote cleaner air quality in our communities.
              </p>
            </div>
          </div>
          {/* What We Do Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gray-200">
              <Image
                src="/assets/Images.png"
                alt="Fuel Service Operations"
                width={600}
                height={256}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                What We Do
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We operate and maintain state-of-the-art CNG refueling stations,
                providing comprehensive fuel solutions for commercial and
                private vehicles. Our services include station installation,
                maintenance, safety inspections, and 24/7 customer support. We
                ensure reliable, safe, and efficient fuel delivery while
                maintaining the highest industry standards for quality and
                safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWhoWeAre;
