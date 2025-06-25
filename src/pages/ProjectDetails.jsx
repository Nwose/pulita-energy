import { useParams } from "react-router-dom";
import projects from "../data/projects.json";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div className="p-10 text-center">Project not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white py-16 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
        {project.name}
      </h1>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-2">
        {project.summary}
      </p>
      <p className="text-sm text-center text-gray-400 mb-10">{project.date}</p>

      {/* Images Row */}
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

      {/* Description */}
      <p className="text-gray-700 mb-6">{project.details}</p>

      {/* Challenges */}
      <h2 className="text-xl font-semibold mb-3">Challenges Faced:</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {project.challenges.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
