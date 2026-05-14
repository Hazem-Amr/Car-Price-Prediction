import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { cars } from "../data/cars";
import { userListings } from "../data/userListings";

export default function CarsFilter() {
  const navigate = useNavigate();

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const mergedCars = [...userListings, ...cars];

  // Dynamic Options
  const brands = [...new Set(mergedCars.map((car) => car.name.split(" ")[0]))];

  const bodyTypes = [...new Set(mergedCars.map((car) => car.bodyType))];

  const fuelTypes = [...new Set(mergedCars.map((car) => car.fuelType))];

  const transmissions = [...new Set(mergedCars.map((car) => car.transmission))];

  // Handle Filter Change
  const updateFilter = (key, value) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    navigate(`/cars?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 sticky top-32">
      {/* Title */}
      <h2 className="text-3xl font-black text-gray-900 mb-8">Filters</h2>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Search
          </label>

          <input
            type="text"
            placeholder="Search cars..."
            defaultValue={params.get("search") || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-gray-900 transition"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Brand
          </label>

          <select
            value={params.get("brand") || ""}
            onChange={(e) => updateFilter("brand", e.target.value)}
            className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-gray-900 transition"
          >
            <option value="">All Brands</option>

            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Body Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Body Type
          </label>

          <select
            value={params.get("body") || ""}
            onChange={(e) => updateFilter("body", e.target.value)}
            className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-gray-900 transition"
          >
            <option value="">All Types</option>

            {bodyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Max Price
          </label>

          <select
            value={params.get("maxPrice") || ""}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-gray-900 transition"
          >
            <option value="">Any Price</option>

            <option value="300000">Under 300K</option>

            <option value="500000">Under 500K</option>

            <option value="1000000">Under 1M</option>

            <option value="2000000">Under 2M</option>

            <option value="5000000">Under 5M</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Fuel Type
          </label>

          <select
            value={params.get("fuel") || ""}
            onChange={(e) => updateFilter("fuel", e.target.value)}
            className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-gray-900 transition"
          >
            <option value="">All Fuel Types</option>

            {fuelTypes.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Transmission
          </label>

          <select
            value={params.get("transmission") || ""}
            onChange={(e) => updateFilter("transmission", e.target.value)}
            className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-gray-900 transition"
          >
            <option value="">All Transmissions</option>

            {transmissions.map((transmission) => (
              <option key={transmission} value={transmission}>
                {transmission}
              </option>
            ))}
          </select>
        </div>

        {/* Clear */}
        <button
          onClick={() => navigate("/cars")}
          className="w-full h-14 rounded-2xl bg-gray-900 hover:bg-black transition text-white font-semibold"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
