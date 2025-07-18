"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Project", path: "/projects" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header className="w-full bg-white bg-opacity-95 backdrop-blur-sm border-gray-200 sticky top-0 z-50 mb-12">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between md:justify-evenly md:space-x-0 lg:justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 ">
            <Link href="/">
              <Image
                src="/assets/footer.png"
                alt="Pulita Logo"
                width={80}
                height={40}
                className="h-18 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 md:space-x-2 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button (Desktop) */}
          <div className="hidden md:flex">
            <Link href="/contact">
              <button className="btn relative overflow-hidden group bg-black text-white px-6 py-2 rounded-full flex items-center">
                {/* Animated Blue Overlay */}
                <p className="font-bold relative z-10 group-hover:text-white transition-colors duration-300">
                  Contact us
                </p>
                <span
                  className="btn-circle absolute right-0 top-0 h-full w-12 bg-[#2563EB] transition-all duration-300 ease-in-out group-hover:w-full z-0 rounded-full"
                  style={{ minWidth: "3rem" }}
                >
                  <FaArrowRight size={15} className="text-white " />
                </span>
              </button>
            </Link>
          </div>

          {/* Hamburger (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mt-4 md:hidden flex flex-col space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <button className="btn relative overflow-hidden group bg-black text-white px-6 py-2 rounded-full flex items-center">
                {/* Animated Blue Overlay */}
                <p className="font-bold relative z-10 group-hover:text-white transition-colors duration-300">
                  Contact us
                </p>
                <span
                  className="btn-circle absolute right-0 top-0 h-full w-12 bg-[#2563EB] transition-all duration-300 ease-in-out group-hover:w-full z-0 rounded-full"
                  style={{ minWidth: "3rem" }}
                >
                  <FaArrowRight size={15} className="text-white " />
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
