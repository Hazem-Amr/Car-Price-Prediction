import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },

  {
    name: "Cars",
    path: "/cars",
  },

  {
    name: "Brands",
    path: "/brands",
  },

  {
    name: "AI Pricing",
    path: "/price-predictor",
  },

  {
    name: "About",
    path: "/about",
  },

  {
    name: "Contact",
    path: "/contact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Tara Logo" className="h-14 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* CTA */}
            <Link to="/sell-car">
              <button className="bg-gray-900 hover:bg-black text-white px-7 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg">
                Sell Your Car
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center"
          >
            {isOpen ? (
              <X size={26} className="text-gray-900" />
            ) : (
              <Menu size={26} className="text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-6 py-8 flex flex-col gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold transition ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile CTA */}
            <Link to="/sell-car" onClick={() => setIsOpen(false)}>
              <button className="mt-4 w-full bg-gray-900 hover:bg-black text-white h-14 rounded-2xl font-semibold transition">
                Sell Your Car
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
