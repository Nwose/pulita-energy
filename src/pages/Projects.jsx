import ProjectSectionCard from "../components/Projects/ProjectSectionCard";
import ServiceProjectHead from "../components/Projects/ServiceProjectHead";

const Projects = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <ServiceProjectHead />
      <ProjectSectionCard />
    </div>
  );
};

export default Projects;
