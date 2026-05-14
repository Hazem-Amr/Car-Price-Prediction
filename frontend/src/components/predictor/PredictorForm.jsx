import React, { useState } from "react";
import LoadingState from "./LoadingState";
import PredictionResult from "./PredictionResult";
import usePrediction from "../../hooks/usePrediction";

const brands = ["BMW", "Mercedes", "Audi", "Toyota", "Kia"];

const fuelTypes = ["Petrol", "Diesel", "Hybrid"];

const transmissions = ["Automatic", "Manual"];

export default function PredictorForm() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    mileage: "",
    power: "",
    fuelType: "",
    transmission: "",
    fuelConsumption: "",
  });

  const { loading, prediction, predict } = usePrediction();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await predict(formData);
  };

  return (
    <div className="bg-white rounded-[40px] p-10 md:p-12 shadow-sm border border-gray-100 flex flex-col justify-between">
      <div>
        <h2 className="text-5xl font-black text-gray-900 mb-12">
          Vehicle Information
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Brand
                </label>

                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                >
                  <option value="">Select brand</option>

                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Model
                </label>

                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. X5"
                  className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Color
                </label>

                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g. Black"
                  className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Registration Year
                </label>

                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g. 2021"
                  className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[2px] text-gray-400 mb-5">
                Performance
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Mileage (KM)
                  </label>

                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Power (HP)
                  </label>

                  <input
                    type="number"
                    name="power"
                    value={formData.power}
                    onChange={handleChange}
                    placeholder="e.g. 180"
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Fuel Type
                </label>

                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                >
                  <option value="">Select fuel type</option>

                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Transmission
                </label>

                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                >
                  <option value="">Select transmission</option>

                  {transmissions.map((transmission) => (
                    <option key={transmission} value={transmission}>
                      {transmission}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                Fuel Consumption (L/100KM)
              </label>

              <input
                type="number"
                step="0.1"
                name="fuelConsumption"
                value={formData.fuelConsumption}
                onChange={handleChange}
                placeholder="e.g. 6.5"
                className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 mt-6 rounded-2xl bg-gray-900 hover:bg-black transition text-white text-xl font-semibold shadow-xl disabled:opacity-60"
          >
            {loading ? "Predicting..." : "✦ Predict vehicle price"}
          </button>
        </form>

        {loading && <LoadingState />}

        {!loading && prediction && <PredictionResult prediction={prediction} />}
      </div>
    </div>
  );
}
