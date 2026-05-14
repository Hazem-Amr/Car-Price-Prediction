import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarCard from "./CarCard";
import { cars } from "../data/cars";

const tabs = [
  {
    id: "all",
    label: "Featured Cars",
  },

  {
    id: "latest",
    label: "Latest Listings",
  },

  {
    id: "luxury",
    label: "Luxury Cars",
  },

  {
    id: "budget",
    label: "Budget Cars",
  },
];

export default function FeaturedCars() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCars =
    activeTab === "all"
      ? cars
      : cars.filter((car) => car.category === activeTab);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14">
          {/* Title */}
          <div>
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Explore Cars
            </h2>

            <p className="text-xl text-gray-500">
              Discover premium listings tailored for you
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="hover:-translate-y-2 transition duration-300"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-16">
          <Link to="/cars">
            <button className="bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-lg">
              View All Cars
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
