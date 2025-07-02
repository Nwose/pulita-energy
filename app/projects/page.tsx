import React from "react";
import PowerUp from "../../components/Products/PowerUp";
import ProjectSectionCard from "../../components/Projects/ProjectSectionCard";
import ServiceProjectHead from "../../components/Projects/ServiceProjectHead";

const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <ServiceProjectHead />
      <ProjectSectionCard />
      <div className="-mx-4">
        <PowerUp />
      </div>
    </div>
  );
};

export default ProjectsPage;
