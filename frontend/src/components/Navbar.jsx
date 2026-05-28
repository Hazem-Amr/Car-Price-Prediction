import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, User as UserIcon } from "lucide-react";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Cars", path: "/cars" },
  { name: "Brands", path: "/brands" },
  { name: "AI Pricing", path: "/price-predictor" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);

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

            {/* Auth / CTA */}
            {!loading && (
              <div className="flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <Link to="/admin-panel" className="text-gray-500 hover:text-gray-900 font-semibold transition text-sm flex items-center gap-1.5">
                      {user.email === "admin@tara.com" && (
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">Admin</span>
                      )}
                      {user.email === "admin@tara.com" ? "Trash Bin" : ""}
                    </Link>
                    <div className="flex items-center gap-2 text-gray-900 font-semibold bg-gray-50 px-4 py-2 rounded-2xl">
                      <UserIcon size={20} />
                      {user.full_name.split(" ")[0]}
                    </div>
                    <button
                      onClick={logout}
                      className="text-gray-500 hover:text-red-600 font-semibold transition"
                    >
                      Logout
                    </button>
                    <Link to="/sell-car">
                      <button className="bg-gray-900 hover:bg-black text-white px-7 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg ml-2">
                        Sell Your Car
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link to="/login" className="text-gray-900 font-semibold hover:text-black transition">
                      Log In
                    </Link>
                    <Link to="/signup">
                      <button className="bg-gray-900 hover:bg-black text-white px-7 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}
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

            <div className="border-t border-gray-100 pt-5 mt-2 flex flex-col gap-4">
              {!loading && user ? (
                <>
                  <div className="flex items-center gap-2 text-gray-900 font-semibold bg-gray-50 p-4 rounded-2xl">
                    <UserIcon size={20} />
                    {user.full_name}
                  </div>
                  {user.email === "admin@tara.com" && (
                    <Link to="/admin-panel" onClick={() => setIsOpen(false)}>
                      <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 h-14 rounded-2xl font-semibold transition">
                        🗑 Trash Bin
                      </button>
                    </Link>
                  )}
                  <Link to="/sell-car" onClick={() => setIsOpen(false)}>
                    <button className="w-full bg-gray-900 hover:bg-black text-white h-14 rounded-2xl font-semibold transition">
                      Sell Your Car
                    </button>
                  </Link>
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 h-14 rounded-2xl font-semibold transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 h-14 rounded-2xl font-semibold transition">
                      Log In
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <button className="w-full bg-gray-900 hover:bg-black text-white h-14 rounded-2xl font-semibold transition">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
