import React from "react";

const ServiceHeader: React.FC = () => {
  return (
    <div className="mb-12 px-4 md:px-0 text-center font-satoshi">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center">
        Powering Progress with End-to-End
        <br className="hidden md:block" />
        Energy Solutions
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed text-center">
        At Pulita Energy, we go beyond just products — we deliver complete,
        dependable services that ensure your power systems run efficiently,
        sustainably, and with total peace of mind.
      </p>
    </div>
  );
};

export default ServiceHeader;
