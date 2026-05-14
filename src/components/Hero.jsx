import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="w-full bg-[#f5f5f7] py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-6xl font-black leading-tight text-gray-900 mb-8">
            Find Your
            <br />
            Perfect Car
          </h1>

          <p className="text-xl text-gray-600 leading-9 mb-10">
            Buy and sell used cars easily with a modern marketplace experience.
          </p>

          <Link to="/cars">
            <button className="bg-[#111827] hover:bg-black text-white px-8 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-lg">
              Browse Cars
            </button>
          </Link>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
            alt="car"
            className="w-full h-[500px] object-cover rounded-[40px] shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
