import { motion } from "framer-motion";
import {
  FaBolt,
  FaHome,
  FaLeaf,
  FaRecycle,
  FaGlobe,
  FaPowerOff,
} from "react-icons/fa";

const EnergyIcons = () => {
  const icons = [
    { Icon: FaPowerOff, className: "top-20 left-20", delay: 0 },
    { Icon: FaHome, className: "top-32 right-32", delay: 0.5 },
    { Icon: FaLeaf, className: "top-1/2 left-16", delay: 1 },
    { Icon: FaRecycle, className: "top-1/2 right-20", delay: 1.5 },
    { Icon: FaBolt, className: "bottom-32 left-24", delay: 2 },
    { Icon: FaGlobe, className: "bottom-20 right-28", delay: 2.5 },
    { Icon: FaPowerOff, className: "top-1/3 left-1/4", delay: 3 },
    { Icon: FaBolt, className: "top-2/3 right-1/4", delay: 3.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, className, delay }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{
            delay,
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={`absolute ${className}`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg scale-150"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-full p-3 border border-cyan-400/30">
              <Icon size={24} className="text-cyan-400" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EnergyIcons;
