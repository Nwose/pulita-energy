import React from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const ContactGridSection = () => {
  return (
    <section className="bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 - Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FiPhone className="text-blue-600 w-6 h-6" />
            <div>
              <p className="font-bold text-gray-700">Phone Number</p>
              <p className="text-gray-500">+234 904 867 297</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FiMail className="text-blue-600 w-6 h-6" />
            <div>
              <p className="font-bold text-gray-700">Email</p>
              <p className="text-gray-500">info@example.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FiMapPin className="text-blue-600 w-6 h-6" />
            <div>
              <p className="font-bold text-gray-700">Address</p>
              <p className="text-gray-500">123 Energy Street, Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Column 2 - Location Detail or Landmark */}
        <div className="text-gray-600">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Find Us</h3>
          <p className="mb-4">
            We’re located at the heart of the Lagos Island Business District.
            Close to Eko Atlantic, near the waterfront. You can visit anytime
            between 9 AM – 5 PM on weekdays.
          </p>
          <p className="italic text-gray-400">“Clean power starts here.”</p>
        </div>

        {/* Column 3 - Mobile Map Hover Interaction */}
        <div className="group relative w-full flex justify-center">
          <div className="w-[250px] h-[500px] rounded-[2.5rem] border-8 border-black overflow-hidden relative shadow-2xl">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=Lagos%20Island&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="absolute top-0 left-0 w-full h-full scale-100 group-hover:scale-[1.25] transition-transform duration-500 ease-in-out"
              allowFullScreen
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactGridSection;
