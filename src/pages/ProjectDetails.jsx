import { useParams, Link } from "react-router-dom";
import projects from "../data/projects.json";

const sectionTitles = {
  "Solutions Provided": "Solutions Provided",
  "Project Impact": "Project Impact",
  "After-Sales Service": "After-Sales Service",
};

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => String(p.id) === id);

  if (!project) {
    return <div className="p-10 text-center">Project not found.</div>;
  }

  // Helper to render array sections by key (handles leading spaces)
  const renderSection = (key) => {
    const cleanKey = Object.keys(project).find((k) => k.trim() === key);
    const items = project[cleanKey];
    if (Array.isArray(items) && items.length > 0) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-3">{sectionTitles[key]}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6 max-w-6xl mx-auto">
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

      {/* Images Row */}
      {project.images && project.images.length > 0 && (
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

      {/* Details */}
      {project.details && (
        <p className="text-gray-700 mb-6">{project.details}</p>
      )}

      {/* Challenges */}
      {project.challenges && project.challenges.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-3">Challenges Faced:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            {project.challenges.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {/* Solutions Provided */}
      {renderSection("Solutions Provided")}

      {/* Project Impact */}
      {renderSection("Project Impact")}

      {/* After-Sales Service */}
      {renderSection("After-Sales Service")}

      <div className="mt-6 text-center">
        <Link
          to="/extra-project-details"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Go to Extra Project Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetails;
