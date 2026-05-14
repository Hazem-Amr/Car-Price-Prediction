import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
          {/* Brand */}
          <div>
            <img src={logo} alt="Logo" className="h-20 brightness-0 invert" />

            <p className="text-gray-400 leading-8 text-lg">
              Egypt's leading used car marketplace with thousands of premium
              listings every day.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-gray-900 transition flex items-center justify-center">
                <Facebook size={20} />
              </button>

              <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-gray-900 transition flex items-center justify-center">
                <Instagram size={20} />
              </button>

              <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-gray-900 transition flex items-center justify-center">
                <Twitter size={20} />
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>

            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-white transition cursor-pointer">
                Home
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Cars
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Brands
              </li>

              <li className="hover:text-white transition cursor-pointer">
                About
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-6">Support</h3>

            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-white transition cursor-pointer">
                Help Center
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Contact Us
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>

            <p className="text-gray-400 mb-6 leading-7">
              Subscribe to get latest car listings and offers.
            </p>

            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-400 outline-none focus:border-red-500 transition"
              />

              <button className="bg-gray-900 hover:bg-black transition rounded-2xl py-4 font-semibold text-lg shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
            © 2026 Tara. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <span className="hover:text-white transition cursor-pointer">
              Privacy
            </span>

            <span className="hover:text-white transition cursor-pointer">
              Terms
            </span>

            <span className="hover:text-white transition cursor-pointer">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
