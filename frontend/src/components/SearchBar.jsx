import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cars } from "../data/cars";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");

  const navigate = useNavigate();

  // Dynamic Brands From cars.js
  const brands = [...new Set(cars.map((car) => car.name.split(" ")[0]))];

  // Handle Search
  const handleSearch = () => {
    navigate(
      `/cars?search=${encodeURIComponent(
        search,
      )}&brand=${encodeURIComponent(brand)}`,
    );
  };

  return (
    <section className="relative -mt-16 z-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Container */}
        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 p-6 md:p-8">
          {/* Search Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-center">
            {/* Search Input */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search cars..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full h-16 rounded-2xl border border-gray-200 px-6 text-lg outline-none focus:border-gray-900 transition"
              />
            </div>

            {/* Dynamic Brand Select */}
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="h-16 rounded-2xl border border-gray-200 px-5 text-lg outline-none focus:border-gray-900 transition bg-white"
            >
              <option value="">Brand</option>

              {brands.map((brandName) => (
                <option key={brandName} value={brandName}>
                  {brandName}
                </option>
              ))}
            </select>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="h-16 rounded-2xl bg-gray-900 hover:bg-black transition text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-lg"
            >
              <Search size={22} />
              Search
            </button>
          </div>

          {/* Bottom Filters */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <button
              onClick={() => navigate("/cars?search=suv")}
              className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition font-medium"
            >
              SUV
            </button>

            <button
              onClick={() => navigate("/cars?search=sedan")}
              className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition font-medium"
            >
              Sedan
            </button>

            <button
              onClick={() => navigate("/cars?search=automatic")}
              className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition font-medium"
            >
              Automatic
            </button>

            <button
              onClick={() => navigate("/cars")}
              className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition font-medium"
            >
              Used Cars
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
