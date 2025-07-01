import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const ExtraProjectDetails = () => {
  const project = {
    name: "25kVA CNG Generator, 2x500 SCUM Skids & PRMS – Telecom Tower",
    summary:
      "In a rural telecom site where diesel generators had become unreliable and costly, Pulita Nigeria stepped in to deploy a 25kVA Compressed Natural Gas (CNG) generator backed by two 500 SCUM gas skids and a high-efficiency Pressure Reducing & Metering Station (PRMS).",
    date: "May 2024",
    images: ["project1.png", "project2.png"],
    challenges: [
      "The site had <strong>zero grid access</strong> and was experiencing over <strong>50% downtime</strong> due to diesel supply inconsistencies.",
      "Local temperature variations were affecting fuel pressure and causing voltage drops.",
      "Space constraints meant we needed to <strong>optimize the layout</strong> of skids and the PRMS without disrupting tower infrastructure.",
    ],
    solutions: [
      "Pre-assembled PRMS skid reduced installation time by 40%.",
      "Real-time pressure monitoring system installed for remote diagnostics.",
      "Compact gas layout with modular cabling to fit tight telecom compound footprint.",
    ],
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6 md:px-12">
      {/* Images Row */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-6xl mx-auto"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.2 }}
      >
        {project.images.map((img, index) => (
          <motion.img
            key={index}
            src={`/assets/${img}`}
            alt={`Project image ${index + 1}`}
            className="w-full h-80 object-cover rounded-xl"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="max-w-4xl mx-auto text-left"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900 leading-tight"
          variants={fadeUp}
        >
          {project.name}
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg leading-relaxed mb-4"
          variants={fadeUp}
        >
          {project.summary}
        </motion.p>

        <motion.p className="text-sm text-gray-400 mb-10" variants={fadeUp}>
          {project.date}
        </motion.p>

        {/* Challenges */}
        <motion.h2
          className="text-xl font-semibold text-gray-900 mb-4"
          variants={fadeUp}
        >
          Challenges Faced:
        </motion.h2>
        <motion.ul
          className="list-disc pl-6 space-y-4 text-gray-700 mb-10"
          variants={fadeUp}
        >
          {project.challenges.map((item, idx) => (
            <li
              key={idx}
              dangerouslySetInnerHTML={{ __html: item }}
              className="leading-relaxed"
            />
          ))}
        </motion.ul>

        {/* Solutions */}
        <motion.h2
          className="text-xl font-semibold text-gray-900 mb-4"
          variants={fadeUp}
        >
          Solutions Provided:
        </motion.h2>
        <motion.ul
          className="list-disc pl-6 space-y-4 text-gray-700 mb-10"
          variants={fadeUp}
        >
          {project.solutions.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </motion.ul>

        {/* Back Button */}
        <motion.div className="text-center mt-12" variants={fadeUp}>
          <Link
            to="/projects/1"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Back to Project Details
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExtraProjectDetails;
