import footer from "../assets/footer.png";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50  font-satoshi px-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center space-x-2">
              <Image
                src={footer}
                alt="Pulita Logo"
                className="h-18 w-auto"
                width={footer.width || 100}
                height={footer.height || 40}
              />
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Contact
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gray-500 mt-1" />
                <div>
                  <p>57B, Akintunde, Adeyemi Dr,</p>
                  <p>Lekki Phase 1, Lagos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-gray-500" />
                <a
                  href="tel:+2348030800999"
                  className="hover:text-blue-600 transition-colors"
                >
                  +234 8030800999
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-500" />
                <a
                  href="mailto:info@pulitaenergy.ng"
                  className="hover:text-blue-600 transition-colors"
                >
                  info@pulitaenergy.ng
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaClock className="text-gray-500 mt-1" />
                <div>
                  <p>Working Hours:</p>
                  <p>Mon-Fri (9 am - 8 pm)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "LPG Generator Sets",
                "CNG Generator Sets",
                "PRMS Units",
                "Mobile Refilling Units",
                "Gas Stations",
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {["Home", "About Us", "Services", "Contact", "Projects"].map(
                (nav, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="hover:text-blue-600 transition-colors"
                    >
                      {nav}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Social Media
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                { icon: FaFacebook, label: "Facebook" },
                { icon: FaTwitter, label: "X (formerly Twitter)" },
                { icon: FaLinkedin, label: "LinkedIn" },
                { icon: FaPinterest, label: "Pinterest" },
              ].map(({ icon: Icon, label }, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center gap-3 hover:text-blue-600 transition-colors"
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
      </div>
      <div className="mt-12 w-full py-4 bg-black flex flex-col sm:flex-row justify-center items-center px-0">
        <p className="text-white text-sm">
          2025 © All Rights Reserved by Pulita Energy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
