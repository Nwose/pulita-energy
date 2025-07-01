import { Link } from "react-router-dom";
import projectCards from "../../data/projectCards.json";

const ProjectSectionCard = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="text-center mb-16">
        <span className="inline-block px-5 py-2 bg-gray-300 rounded-full text-sm text-gray-700 font-medium mb-4">
          Our Project
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projectCards.map((card) => (
          <Link
            key={card.id}
            to={`/projects/${card.id}`}
            className="block group rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-80 md:h-[360px]">
              {/* Background Image */}
              <img
                src={`/assets/${card.image}`}
                alt={card.name}
                className="w-full h-full object-cover"
              />

              {/* Overlay with light background and dark text */}
              <div className="absolute inset-x-0 bottom-0 overflow-hidden">
                <div
                  className="
                    bg-gray-200 text-black px-6
                    h-16 group-hover:h-32
                    transition-all duration-300 ease-in-out
                    flex flex-col justify-center
                  "
                >
                  <div
                    className="
                      transform translate-y-4 group-hover:translate-y-0
                      transition-transform duration-300 ease-in-out
                    "
                  >
                    <span className="font-bold text-lg block truncate">
                      {card.name}
                    </span>
                    <span
                      className="
                        text-sm mt-1 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 ease-in-out
                      "
                    >
                      {card.details}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectSectionCard;
