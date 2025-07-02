import { FaArrowRight } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import HeroImage from "../assets/HeroImage.png";
import IconsAndLines from "../assets/IconsAndLines.png";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as any },
  },
};

const HeroSection = () => {
  return (
    <section
      className="w-full min-h-screen relative overflow-hidden font-satoshi bg-no-repeat mb-0"
      style={{ backgroundImage: `url(${IconsAndLines})` }}
    >
      <div className="" />

      <div className="relative z-10 container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            className="space-y-4 ml-6"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="bg-gray-100 text-gray-800 px-4 py-2 text-sm font-medium flex w-fit items-center gap-2 rounded-full"
              variants={fadeInUp}
            >
              <GrStatusGood className="text-[#2563EB]" size={21} /> Global
              Certified ISO 9001:2015
            </motion.span>

            <motion.div className="space-y-2" variants={fadeInUp}>
              <h1 className="text-[45px] text-[#2E2E2E] font-bold leading-tight">
                Reliable Clean Energy,
                <br />
                <span>Without the Noise or Cost</span>
              </h1>
            </motion.div>

            <motion.p
              className="font-[500] text-[18px] text-[#2E2E2E] max-w-lg leading-relaxed"
              variants={fadeInUp}
            >
              We offer LPG & CNG generators that save money, reduce emissions,
              and ensure peace of mind. No more fuel stress or blackouts—just
              sustainable power.
            </motion.p>

            <motion.button
              className="btn relative overflow-hidden group bg-black text-white px-6 py-2 rounded-full flex items-center"
              variants={fadeInUp}
            >
              <p className="font-bold relative z-10 group-hover:text-white transition-colors duration-300">
                Get a Quote
              </p>
              <span
                className="btn-circle absolute right-0 top-0 h-full w-12 bg-[#2563EB] transition-all duration-300 ease-in-out group-hover:w-full z-0 rounded-full"
                style={{ minWidth: "3rem" }}
              >
                <FaArrowRight size={15} className="text-white" />
              </span>
            </motion.button>
          </motion.div>

          {/* Right - Generator Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as any, delay: 0.2 }}
          >
            <Image
              src={HeroImage}
              alt="Hero"
              width={HeroImage.width || 600}
              height={HeroImage.height || 400}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
