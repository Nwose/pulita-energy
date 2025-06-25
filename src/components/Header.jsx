import { useState } from "react";
import { Link } from "react-router-dom";
import pulitaIcon from "../assets/pulitaIcon.png";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Project", path: "/projects" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header className="w-full bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between md:justify-evenly md:space-x-0 lg:justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 ">
            <Link to="/">
              <img
                src={pulitaIcon}
                alt="Pulita Energy Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 md:space-x-2 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex">
            <Link to="/contact">
              {/* <button className="relative overflow-hidden group bg-black text-white px-10 py-2 rounded-full flex items-center">
                <p className=" relative z-10 group-hover:text-white transition-colors duration-300 md:pr-5">
                  Contact Us
                </p>
                <span
                  className="absolute right-0 top-0 h-full w-12 bg-[#2563EB] transition-all duration-300 ease-in-out group-hover:w-full z-0 rounded-full flex items-center justify-center"
                  style={{ minWidth: "3rem" }}
                >
                  <FaArrowRight size={15} className="text-white " />
                </span>

              </button> */}
              <button className="relative overflow-hidden group bg-black text-white px-10 py-2 rounded-full flex items-center justify-center">
                {/* Text on top of animated background */}
                <p className="relative z-10 group-hover:text-white transition-colors duration-300 md:pr-5">
                  Contact Us
                </p>

                {/* Expanding background behind content */}
                <span className="absolute left-0 top-0 h-full w-0 bg-[#2563EB] transition-all duration-300 ease-in-out group-hover:w-full z-0 rounded-full" />

                {/* Fixed-position arrow on the right */}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                  <FaArrowRight size={15} className="text-white" />
                </span>
              </button>
            </Link>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mt-4 md:hidden flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <button className="bg-black text-white px-6 py-2 rounded-full flex items-center justify-center">
                <span className="mr-2 font-bold">Contact Us</span>
                <FaArrowRight size={15} />
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
