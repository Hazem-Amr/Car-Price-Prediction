import React from "react";
import SellCarForm from "../components/sellCar/SellCarForm";

export default function SellCar() {
  return (
    <section className="bg-[#f5f5f7] min-h-screen py-24 pt-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gray-900 text-white px-5 py-3 rounded-full text-sm font-medium mb-8">
            Sell On Tara
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight mb-6">
            Sell Your Car
          </h1>

          <p className="text-xl text-gray-500 leading-9 max-w-3xl mx-auto">
            Create your listing, predict market value, and publish your vehicle
            on Tara marketplace.
          </p>
        </div>

        <SellCarForm />
      </div>
    </section>
  );
}
