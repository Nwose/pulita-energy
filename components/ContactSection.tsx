import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  FaBolt,
  FaHome,
  FaLeaf,
  FaRecycle,
  FaGlobe,
  FaPowerOff,
} from "react-icons/fa";
import CircuitLines from "./CircuitLines";
import EnergyIcons from "./EnergyIcons";

interface FormData {
  name: string;
  phone: string;
  email: string;
  productType: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    productType: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <CircuitLines />
      <EnergyIcons />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 ">
        <div className="text-center mb-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight font-satoshi">
            Power Smarter with Pulita Energy
          </h1>
          <div className="text-lg md:text-xl text-gray-300 space-y-2">
            <p>Customized, efficient, and eco-friendly power solutions.</p>
            <p>
              We specialize in advanced generator systems powered by LPG
              <br />
              and CNG, engineered for reliability, cost-efficiency, and
              <br />
              sustainability.
            </p>
          </div>
        </div>

        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="09038475866"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Product Type
              </label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="lpg-generator">LPG Generator</option>
                <option value="cng-generator">CNG Generator</option>
                <option value="hybrid-system">Hybrid System</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default ContactSection;
