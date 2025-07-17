import React from "react";
import PowerUp from "../../components/Products/PowerUp";
import ProjectSub from "../../components/Products/ProjectSub";
import ServiceHeader from "../../components/Products/ServiceHeader";

const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <ServiceHeader />
      <section className="bg-gray-50 px-6 py-16 font-satoshi">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#dad8d8] text-[#666666] rounded-full text-sm font-bold shadow-sm mb-6">
              Our Product
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Smart Power For a Cleaner Future
            </h2>
            <p className="text-gray-500 mt-2">
              Pulita Energy delivers sustainable, high-performance power
              solutions built for durability, efficiency, and global standards.
            </p>
          </div>
          <ProjectSub />
        </div>
      </section>
      {/* Full-width PowerUp Section */}
      <div className="-mx-4">
        <PowerUp />
      </div>
    </div>
  );
};

export default ProductsPage;
