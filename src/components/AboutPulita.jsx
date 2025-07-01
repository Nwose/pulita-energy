import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const AboutPulita = () => {
  return (
    <section className="text-center mt-16 font-satoshi px-4">
      <motion.div
        className="rounded-3xl p-12 text-[#666666] max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="inline-flex items-center px-4 py-2 bg-[#dad8d8] text-[#666666] rounded-full text-sm font-bold shadow-sm mb-6"
          variants={fadeLeft}
        >
          About Pulita
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          variants={fadeRight}
        >
          From our <span className="text-[#2563EB]">30,000 sq. meter</span>{" "}
          facility in Weifang, China
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
          variants={fadeLeft}
        >
          We engineer advanced multi-energy solutions—LPG, CNG, and dual-fuel
          generators, PRMS, cylinder groups, and modular daughter stations—all
          built for performance, sustainability, and global standards. We're
          powering the transition to a cleaner future, one generator at a time.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={fadeUp}
        >
          <button className="btn relative overflow-hidden group bg-black text-white px-6 py-2 rounded-full flex items-center">
            {/* Animated Blue Overlay */}
            <p className="font-bold relative z-10 group-hover:text-white transition-colors duration-300">
              Get a Quote
            </p>
            <span
              className="btn-circle absolute right-0 top-0 h-full w-12 bg-[#2563EB] transition-all duration-300 ease-in-out group-hover:w-full z-0 rounded-full"
              style={{ minWidth: "3rem" }}
            >
              <FaArrowRight size={15} className="text-white " />
            </span>
          </button>
          <button className="bg-black text-white px-8 py-2 md:py-4 rounded-full  font-semibold text-lg hover:bg-[#2563EB] transition-colors duration-300 inline-flex items-center justify-center">
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutPulita;
