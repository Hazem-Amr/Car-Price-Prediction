import React from "react";
import { Link } from "react-router-dom";

const brands = [
  {
    name: "Mercedes",
    count: 1459,
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  },

  {
    name: "Kia",
    count: 793,
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Kia-logo.png",
  },

  {
    name: "BMW",
    count: 631,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  },

  {
    name: "Nissan",
    count: 614,
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Nissan_2020_logo.svg",
  },

  {
    name: "Fiat",
    count: 434,
    logo: "https://cdn.worldvectorlogo.com/logos/fiat-3.svg",
  },

  {
    name: "Toyota",
    count: 421,
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
  },

  {
    name: "Skoda",
    count: 384,
    logo: "https://cdn.worldvectorlogo.com/logos/skoda-2.svg",
  },

  {
    name: "Volkswagen",
    count: 354,
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg",
  },

  {
    name: "Hyundai",
    count: 986,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg",
  },

  {
    name: "Renault",
    count: 690,
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Renault_2021_Text.svg",
  },

  {
    name: "Chevrolet",
    count: 623,
    logo: "https://cdn.simpleicons.org/chevrolet",
  },

  {
    name: "Opel",
    count: 451,
    logo: "https://cdn.worldvectorlogo.com/logos/opel-9.svg",
  },
];

export default function BrandGrid() {
  return (
    <section className="bg-[#f5f5f7] py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-3">
              Browse By Brand
            </h2>

            <p className="text-gray-500 text-lg">
              Explore thousands of cars from top brands
            </p>
          </div>

          {/* View All */}
          <Link
            to="/cars"
            className="hidden md:flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all"
          >
            View All
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={`/cars?brand=${brand.name}`}
              className="group"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl h-[120px] flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-gray-300 transition-all duration-300">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-14 object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Info */}
              <div className="text-center mt-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {brand.name}
                </h3>

                <p className="text-gray-500">({brand.count})</p>
              </div>
            </Link>
          ))}

          {/* All Brands */}
          <Link to="/cars" className="group">
            <div className="bg-white rounded-2xl h-[120px] flex items-center justify-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-gray-300 transition-all duration-300">
              <div className="grid grid-cols-2 gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
              </div>
            </div>

            <div className="text-center mt-4">
              <h3 className="font-semibold text-lg text-gray-900">
                All Brands
              </h3>

              <p className="text-gray-500">Explore more</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
