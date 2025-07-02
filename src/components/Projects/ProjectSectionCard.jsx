// import { Link } from "react-router-dom";
// import projectCards from "../../data/projectCards.json";

// const ProjectSectionCard = () => {
//   return (
//     <section className="py-16 px-4 bg-gray-100">
//       <div className="text-center mb-16">
//         <span className="inline-block px-5 py-2 bg-gray-300 rounded-full text-sm text-gray-700 font-medium mb-4">
//           Our Project
//         </span>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
//         {projectCards.map((card) => (
//           <Link
//             key={card.id}
//             to={`/projects/${card.id}`}
//             className="drop-vec group relative overflow-hidden rounded-3xl shadow-lg"
//           >
//             {/* Background Image */}
//             <img
//               src={`/assets/${card.image}`}
//               alt={card.name}
//               className="w-full h-[320px] object-cover rounded-3xl transform group-hover:scale-105 transition duration-500"
//             />

//             {/* Drop vector inner with vector background */}
//             <div className="drop-vec-inner absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-[159px] transition-all duration-500 ease-in-out rounded-b-3xl">
//               <div className="drop-vec-content pl-5 pb-5 text-left">
//                 <h4 className="text-sm font-semibold text-gray-600">
//                   Case Installation
//                 </h4>
//                 <p className="text-sm font-medium text-gray-900 mt-8">
//                   {card.name}
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ProjectSectionCard;

import { Link } from "react-router-dom";
import projectCards from "../../data/projectCards.json";

const ProjectSectionCard = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="text-center mb-16">
        <span className="inline-block px-5 py-2 bg-gray-300 rounded-full text-sm text-gray-700 font-medium mb-4">
          Our Project
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Featured Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projectCards.map((card) => (
          <Link
            key={card.id}
            to={`/projects/${card.id}`}
            className="drop-vec group relative overflow-hidden rounded-3xl shadow-lg"
          >
            {/* Background Image */}
            <img
              src={`/assets/${card.image}`}
              alt={card.name}
              className="w-full h-[320px] object-cover rounded-3xl transform group-hover:scale-105 transition duration-500"
            />

            {/* Drop vector hover overlay */}
            <div className="drop-vec-inner absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-[159px] transition-all duration-500 ease-in-out rounded-b-3xl">
              <div className="drop-vec-content pl-5 pb-5 text-left">
                <p className="text-base font-bold text-gray-900 mt-6">
                  {card.name}
                </p>
                <p className="text-sm text-gray-700 mt-2">{card.details}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectSectionCard;
