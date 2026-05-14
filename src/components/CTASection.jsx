import React from "react";
import { Link } from "react-router-dom";
import ctaCar from "../assets/cta-car.png";

export default function CTASection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* CTA Card */}
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] px-10 py-20 md:px-20">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>

          {/* Grid */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT CONTENT */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-5 py-2 rounded-full text-white text-sm font-medium mb-8">
                Premium Marketplace
              </div>

              {/* Heading */}
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
                Ready To Find
                <br />
                Your Dream Car?
              </h2>

              {/* Text */}
              <p className="text-xl text-gray-300 leading-9 mb-12 max-w-2xl">
                Browse thousands of verified premium listings from trusted
                dealers across Egypt.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-5">
                {/* Explore Cars */}
                <Link to="/cars">
                  <button className="bg-white text-gray-900 hover:bg-gray-200 transition-all duration-300 px-8 py-5 rounded-2xl text-lg font-semibold shadow-xl">
                    Explore Cars
                  </button>
                </Link>

                {/* Sell Your Car */}
                <Link to="/sell-car">
                  <button className="bg-white/10 hover:bg-white hover:text-gray-900 text-white transition-all duration-300 px-8 py-5 rounded-2xl text-lg font-semibold backdrop-blur border border-white/10">
                    Sell Your Car
                  </button>
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Large Glow */}
              <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

              {/* Car PNG */}
              <img
                src={ctaCar}
                alt="Luxury Car"
                className="relative z-10 w-[720px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)] hover:scale-105 transition duration-700"
              />

              {/* Floating Card */}
              <div className="absolute bottom-10 left-0 bg-white rounded-3xl px-6 py-5 shadow-2xl z-20">
                <p className="text-gray-500 text-sm mb-1">Premium Listings</p>

                <h3 className="text-4xl font-black text-gray-900">25K+</h3>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-16 right-10 bg-white/10 backdrop-blur border border-white/10 text-white px-5 py-3 rounded-2xl z-20">
                Verified Dealers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
