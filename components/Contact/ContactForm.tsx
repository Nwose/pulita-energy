import React, { useState, ChangeEvent, FormEvent } from "react";
import { HiChevronDown } from "react-icons/hi";
import emailjs from "emailjs-com";

interface FormData {
  [key: string]: string;
  name: string;
  phone: string;
  email: string;
  productType: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    productType: "",
    message: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const productTypes = [
    "Solar Panels",
    "Battery Storage",
    "Electric Vehicle Charging",
    "Smart Home Solutions",
    "Commercial Solar",
    "Consultation",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductTypeSelect = (productType: string) => {
    setFormData((prev) => ({
      ...prev,
      productType,
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    emailjs
      .send(
        "service_n52a19z",
        "template_md5c3pf",
        formData,
        "bQE5kBBTyQzSNZDPp"
      )
      .then(
        (result) => {
          setSuccess(
            "Thank you for contacting us! We have received your message and will respond soon."
          );
          setFormData({
            name: "",
            phone: "",
            email: "",
            productType: "",
            message: "",
          });
        },
        (error) => {
          setError("Sorry, something went wrong. Please try again later.");
        }
      );
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Let's Power <span className="text-blue-700"> Something Great </span>
            Together
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Looking for a custom power solution or have questions? Our team is
            here to help. Reach out to start building your energy future.
          </p>
        </div>

        {/* Success/Error Message */}
        {success && (
          <div className="mb-6 text-green-600 font-semibold text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Jane Smith"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="0904867297"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="jane@framer.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* Product Type Dropdown */}
            <div className="relative">
              <label
                htmlFor="productType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Type
              </label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-left flex items-center justify-between"
              >
                <span
                  className={
                    formData.productType ? "text-gray-900" : "text-gray-400"
                  }
                >
                  {formData.productType || "Choose Product Type"}
                </span>
                <HiChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {productTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleProductTypeSelect(type)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter Message"
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Your Project with Us
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
