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
    <header className="w-full bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 mb-12">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between md:justify-evenly md:space-x-0 lg:justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 ">
            <Link href="/">
              <Image
                src="/assets/pulitaIcon.png"
                alt="Pulita Energy Logo"
                width={56}
                height={56}
                className="h-14 w-auto"
                priority
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
              <button className="bg-[#2E2E2E] text-white px-2 py-2 rounded-full flex items-center justify-center">
                <p className="text-[16px]">Contact us</p>
                <FaArrowRight
                  size={24}
                  className="text-white bg-[#2563EB] rounded-full p-1 ml-2"
                />
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
              <button className="bg-[#2E2E2E] text-white px-2 py-2 rounded-full flex items-center justify-center">
                <p className="text-[16px]">Contact us</p>
                <FaArrowRight
                  size={24}
                  className="text-white bg-[#2563EB] rounded-full p-1 ml-2"
                />
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
