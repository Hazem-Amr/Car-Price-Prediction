import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Car, Truck, Caravan } from "lucide-react";

const priceRanges = [
  {
    label: "Under 200,000 EGP",
    value: 200000,
  },

  {
    label: "Under 300,000 EGP",
    value: 300000,
  },

  {
    label: "Under 500,000 EGP",
    value: 500000,
  },

  {
    label: "Under 1,000,000 EGP",
    value: 1000000,
  },

  {
    label: "Under 2,000,000 EGP",
    value: 2000000,
  },

  {
    label: "Under 5,000,000 EGP",
    value: 5000000,
  },
];

const bodyStyles = [
  {
    name: "Sedan",
    icon: Car,
  },

  {
    name: "SUV",
    icon: Truck,
  },

  {
    name: "Hatchback",
    icon: Car,
  },

  {
    name: "Coupe",
    icon: Car,
  },

  {
    name: "Pickup",
    icon: Truck,
  },

  {
    name: "Convertible",
    icon: Caravan,
  },
];

export default function BrowseCategories() {
  const [activeTab, setActiveTab] = useState("price");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-14">
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Browse Marketplace
          </h2>

          <p className="text-xl text-gray-500">
            Explore vehicles by budget or body style
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-10 border-b border-gray-200 mb-10">
          <button
            onClick={() => setActiveTab("price")}
            className={`pb-5 text-xl font-bold transition ${
              activeTab === "price"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400"
            }`}
          >
            Price Ranges
          </button>

          <button
            onClick={() => setActiveTab("body")}
            className={`pb-5 text-xl font-bold transition ${
              activeTab === "body"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400"
            }`}
          >
            Body Styles
          </button>
        </div>

        {/* PRICE TAB */}
        {activeTab === "price" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {priceRanges.map((item) => (
              <Link
                key={item.value}
                to={`/cars?maxPrice=${item.value}`}
                className="group"
              >
                <div className="bg-[#f5f5f7] hover:bg-gray-900 hover:text-white rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
                  <p className="text-sm opacity-70 mb-3">Under</p>

                  <h3 className="text-2xl font-black">
                    {item.label.replace("Under ", "")}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* BODY TAB */}
        {activeTab === "body" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {bodyStyles.map((item) => (
              <Link
                key={item.name}
                to={`/cars?body=${item.name}`}
                className="group"
              >
                <div className="bg-[#f5f5f7] rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <item.icon
                    size={58}
                    strokeWidth={1.8}
                    className="mx-auto mb-6 text-gray-900 group-hover:scale-110 transition duration-300"
                  />

                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    {item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
