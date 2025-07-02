import { useParams, Link } from "react-router-dom";
import projects from "../data/projects.json";

const sectionTitles = {
  "Solutions Provided": "Solutions Provided",
  "Project Impact": "Project Impact",
  "After-Sales Service": "After-Sales Service",
};

const ProjectDetails = () => {
  const { id } = useParams();
  const projectIndex = projects.findIndex((p) => String(p.id) === id);
  const project = projects[projectIndex];

  if (!project) {
    return <div className="p-10 text-center">Project not found.</div>;
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const renderSection = (key) => {
    const cleanKey = Object.keys(project).find((k) => k.trim() === key);
    const items = project[cleanKey];
    if (Array.isArray(items) && items.length > 0) {
      return (
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4 text-left">
            {sectionTitles[key]}
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-left">
            {items.map((item, idx) => (
              <li key={idx} className="leading-relaxed text-base">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6 max-w-6xl mx-auto">
      {/* Top Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
        {project.name}
      </h1>

      {project.summary && (
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-2">
          {project.summary}
        </p>
      )}

      {project.date && (
        <p className="text-sm text-center text-gray-400 mb-10">
          {project.date}
        </p>
      )}

      {/* Images */}
      {project.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {project.images.map((img, index) => (
            <img
              key={index}
              src={`/assets/${img}`}
              alt={`Project image ${index + 1}`}
              className="w-full h-80 object-cover rounded-xl"
            />
          ))}
        </div>
      )}

      {/* Project Details Section (Name + Paragraph) */}
      {project.details && (
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-3">{project.name}</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {project.details}
          </p>
        </div>
      )}

      {/* Challenges */}
      {project.challenges?.length > 0 && (
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4 text-left">
            Challenges Faced
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-left">
            {project.challenges.map((item, index) => (
              <li key={index} className="leading-relaxed text-base">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Other Sections */}
      {renderSection("Solutions Provided")}
      {renderSection("Project Impact")}
      {renderSection("After-Sales Service")}

      {/* Previous / Next Navigation */}
      <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-300 text-sm md:text-base">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.id}`}
            className="text-blue-700 font-semibold hover:text-blue-900 transition duration-200"
          >
            ← {prevProject.name}
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            to={`/projects/${nextProject.id}`}
            className="text-blue-700 font-semibold hover:text-blue-900 transition duration-200 ml-auto"
          >
            {nextProject.name} →
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectDetails;
