import { Link } from "react-router-dom";
import pulitaIcon from "../assets/pulitaIcon.png";
import { FaArrowRight } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="w-full bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src={pulitaIcon} alt="Pulita Energy Logo" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-900 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              to="/products"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              to="/projects"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Project
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Blog
            </Link>
          </nav>

          <Link to="/contact">
            <button className="btn relative overflow-hidden group bg-black text-white px-6 py-2 rounded-full flex items-center">
              <p className="font-bold relative z-10 group-hover:text-white transition-colors duration-300">
                Contact Us
              </p>
              <span
                className="btn-circle absolute right-0 top-0 h-full w-12 bg-[#2563EB] transition-all duration-300 ease-in-out group-hover:w-full z-0 rounded-full items-center justify-center"
                style={{ minWidth: "3rem" }}
              >
                <FaArrowRight size={15} className="text-white" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
