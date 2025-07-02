"use client";

import PowerUp from "../../components/Products/PowerUp";
import ProjectSub from "../../components/Products/ProjectSub";
import ServiceHeader from "../../components/Products/ServiceHeader";

const Products = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <ServiceHeader />

      <ProjectSub />
      <PowerUp />
    </div>
  );
};

export default Products;
