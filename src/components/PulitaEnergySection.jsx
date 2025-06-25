import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-xl bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <button
        className="w-full flex justify-between items-center px-6 py-6 text-left text-lg font-medium text-gray-700 focus:outline-none transition-colors duration-300 hover:bg-gray-50"
        onClick={onClick}
      >
        <span>{title}</span>
        <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 transition">
          {isOpen ? (
            <FaMinus className="text-gray-500" />
          ) : (
            <FaPlus className="text-gray-500" />
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 px-6 pb-6"
            : "max-h-0 opacity-0 px-6 pb-0"
        } text-gray-600 leading-relaxed`}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

const PulitaEnergySection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    const isClosing = openIndex === index;
    setOpenIndex(isClosing ? null : index);
  };

  const items = [
    {
      title: "Switching to LPG and CNG Power Sources",
      content:
        "Transitioning to LPG and CNG power sources offers significant advantages including reduced emissions, lower operating costs, and improved reliability. Our advanced systems are designed to seamlessly integrate with your existing infrastructure while providing cleaner, more efficient power generation.",
    },
    {
      title: "LPG Generator Advantage",
      content:
        "LPG generators provide exceptional fuel efficiency, reduced maintenance requirements, and lower emissions compared to traditional diesel generators. They offer instant startup capabilities, quieter operation, and longer engine life, making them ideal for both residential and commercial applications.",
    },
    {
      title: "CNG Generator Advantage",
      content:
        "CNG generators deliver outstanding environmental benefits with up to 25% lower CO2 emissions and virtually zero particulate matter. They provide consistent power output, reduced fuel costs, and extended maintenance intervals, making them the sustainable choice for modern power generation needs.",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 font-satoshi">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <button className="mb-8 rounded-full px-6 py-2 text-gray-600 border border-gray-300 hover:bg-gray-100 transition">
            Find Out More
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Power Smarter with Pulita Energy
          </h1>
          <div className="space-y-2 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            <p>Customized, efficient, and eco-friendly power solutions.</p>
            <p>
              We specialize in advanced generator systems powered by LPG and
              CNG, engineered for reliability, cost-efficiency, and
              sustainability.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onClick={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PulitaEnergySection;
