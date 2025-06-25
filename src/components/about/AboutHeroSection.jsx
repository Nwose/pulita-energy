import { FiArrowRight } from "react-icons/fi";

const AboutHeroSection = ({ src, isVisible }) => (
  <div className="relative rounded-3xl overflow-visible shadow-xl mb-28">
    <img
      src={src}
      alt="PULITA NEW ENERGY team"
      className="w-full h-[500px] sm:h-[600px] object-cover rounded-3xl"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />

    {/* Animated Info Card - halfway below the image */}
    <div
      className={`absolute -bottom-24 left-5 right-5 lg:left-12 lg:right-auto lg:max-w-2xl transform transition-all duration-1000 ease-out z-10 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
          About Us
        </h2>
        <div className="text-slate-700 space-y-4 leading-relaxed text-base sm:text-lg">
          <p>
            <span className="font-semibold text-blue-600">
              PULITA NEW ENERGY
            </span>{" "}
            is a Chinese manufacturer of multi-energy power solutions like LPG,
            CNG, dual-fuel generator sets, PRMS, and modular CNG stations.
          </p>
          <p>
            Our China workshop spans over 30,000 sqm, producing up to 4,000
            units annually ranging from 10kVA–4000kVA. We comply with ISO 9001
            standards and are EU CE certified, ensuring quality from design to
            delivery.
          </p>
        </div>
        <div className="mt-6">
          <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 font-medium transition-all hover:shadow-lg">
            Download Brochure
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AboutHeroSection;
