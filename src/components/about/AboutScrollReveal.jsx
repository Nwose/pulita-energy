import { FaMicrochip, FaWrench, FaShieldAlt, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaMicrochip className="w-7 h-7 text-[#2563EB]" />,
    title: "Advanced Technology",
    description:
      "We leverage cutting-edge innovations to deliver smarter, more efficient energy systems.",
  },
  {
    icon: <FaWrench className="w-7 h-7 text-[#2563EB]" />,
    title: "Expert Engineering",
    description:
      "Our team of experienced engineers designs power solutions tailored to your industry's needs.",
  },
  {
    icon: <FaShieldAlt className="w-7 h-7 text-[#2563EB]" />,
    title: "Reliable Performance",
    description:
      "Count on our proven track record of delivering consistent, high-quality energy solutions.",
  },
  {
    icon: <FaBolt className="w-7 h-7 text-[#2563EB]" />,
    title: "Custom Solutions",
    description:
      "Every project is unique. We create tailored approaches that fit your specific requirements.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const AboutScrollRevealCard = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 font-satoshi">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Why Pulita
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Pulita Energy?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
              We combine advanced technology with expert engineering to deliver
              reliable, sustainable energy solutions. Our commitment to
              innovation and customer support makes us the trusted partner for
              your energy needs.
            </p>
          </div>

          {/* Right Scrollable & Animated Cards */}
          <div className="space-y-6 max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white 2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] sticky border border-gray-300 rounded-2xl"
                style={{ top: `${index * 10}px` }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={cardVariants}
                custom={index}
              >
                <div className="mb-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutScrollRevealCard;
