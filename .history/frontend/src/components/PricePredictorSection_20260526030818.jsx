import React, { useState, useEffect } from "react";
import {
  Sparkles,
  CarFront,
  ShieldCheck,
  Lock,
  CheckCircle2,
} from "lucide-react";

export default function PricePredictorSection() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    color: "",
    registration_year: "",
    mileage: "",
    power_ps: "",
    fuel_type: "",
    transmission_type: "",
    fuel_consumption: "",
  });

  const [options, setOptions] = useState({
    brands: [],
    brand_models: {},
    colors: [],
    fuel_types: [],
    transmission_types: [],
  });

  const [loading, setLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch dropdown options from backend
    fetch("http://127.0.0.1:8000/options")
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((err) => console.error("Failed to load options:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      setFormData({ ...formData, brand: value, model: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePredict = async () => {
    try {
      setLoading(true);
      setError("");
      setPredictedPrice(null);

      const payload = {
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        color: formData.color.toLowerCase(),
        registration_year: parseInt(formData.registration_year, 10),
        power_ps: parseFloat(formData.power_ps),
        fuel_type: formData.fuel_type,
        transmission_type: formData.transmission_type,
        fuel_consumption: parseFloat(formData.fuel_consumption),
        mileage: parseFloat(formData.mileage.replace(/,/g, "")),
      };

      // Basic validation
      if (
        Object.values(payload).some(
          (val) => val === "" || Number.isNaN(val) || val === undefined,
        )
      ) {
        throw new Error("Please fill in all fields with valid data.");
      }

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Prediction failed");
      }

      const data = await res.json();
      setPredictedPrice(data.predicted_price);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f5f5f7] min-h-screen py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-gray-200 bg-white px-5 py-3 rounded-full shadow-sm mb-8">
            <Sparkles size={16} className="text-gray-900" />
            <span className="text-sm font-semibold text-gray-900">
              AI Vehicle Pricing
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1 mb-6">
            <h1 className="text-5xl md:text-6xl font-medium text-gray-900 tracking-tight">
              Predict Your
            </h1>
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight leading-none">
              Car Market Value
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-gray-500 leading-9 max-w-3xl mx-auto">
            Get an intelligent estimate of your vehicle’s market value using
            Tara’s AI-powered pricing engine.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT PANEL */}
          <div className="bg-[#0f172a] rounded-[40px] p-10 md:p-12 text-white flex flex-col justify-between min-h-full shadow-xl">
            <div>
              {/* Icon */}
              <div className="w-24 h-24 rounded-[30px] border border-white/10 bg-white/5 flex items-center justify-center mb-10">
                <CarFront size={46} />
              </div>

              {/* Title */}
              <h2 className="text-5xl font-black leading-tight mb-6">
                Smart Car
                <br />
                Valuation
              </h2>

              {/* Description */}
              <p className="text-xl text-gray-300 leading-9 max-w-lg">
                Advanced AI models analyze thousands of data points to deliver
                accurate market price predictions.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/20 my-12"></div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-5">
                {/* Stat */}
                <div className="border border-white/10 bg-white/5 rounded-[28px] p-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                    <CarFront size={26} />
                  </div>
                  <h3 className="text-4xl font-black mb-2">75K+</h3>
                  <p className="text-gray-300 leading-7">Cars Analyzed</p>
                </div>

                {/* Stat */}
                <div className="border border-white/10 bg-white/5 rounded-[28px] p-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                    <ShieldCheck size={26} />
                  </div>
                  <h3 className="text-4xl font-black mb-2">97%</h3>
                  <p className="text-gray-300 leading-7">Prediction Accuracy</p>
                </div>
              </div>
            </div>

            {/* Bottom Label */}
            <div className="flex items-center gap-3 mt-16 text-gray-400">
              <Sparkles size={18} />
              <span className="text-sm font-medium">Powered by AI</span>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-white rounded-[40px] p-10 md:p-12 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              {/* Heading */}
              <h2 className="text-5xl font-black text-gray-900 mb-12">
                Vehicle Information
              </h2>

              {/* Form */}
              <div className="space-y-10">
                {/* Group 1 */}
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
                      {options.brands?.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                      Model
                    </label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      disabled={!formData.brand}
                      className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition disabled:opacity-50"
                    >
                      <option value="">Select model</option>
                      {formData.brand &&
                        options.brand_models?.[formData.brand]?.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Group 2 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                      Color
                    </label>
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                    >
                      <option value="">Select color</option>
                      {options.colors?.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                      Registration Year
                    </label>
                    <input
                      type="text"
                      name="registration_year"
                      value={formData.registration_year}
                      onChange={handleChange}
                      placeholder="e.g. 2021"
                      className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                    />
                  </div>
                </div>

                {/* Performance */}
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
                        type="text"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        placeholder="e.g. 50,000"
                        className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                        Power (HP)
                      </label>
                      <input
                        type="text"
                        name="power_ps"
                        value={formData.power_ps}
                        onChange={handleChange}
                        placeholder="e.g. 180"
                        className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Group 4 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                      Fuel Type
                    </label>
                    <select
                      name="fuel_type"
                      value={formData.fuel_type}
                      onChange={handleChange}
                      className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                    >
                      <option value="">Select fuel type</option>
                      {options.fuel_types?.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                      Transmission
                    </label>
                    <select
                      name="transmission_type"
                      value={formData.transmission_type}
                      onChange={handleChange}
                      className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                    >
                      <option value="">Select transmission</option>
                      {options.transmission_types?.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Fuel Consumption */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Fuel Consumption (L/100KM)
                  </label>
                  <input
                    type="text"
                    name="fuel_consumption"
                    value={formData.fuel_consumption}
                    onChange={handleChange}
                    placeholder="e.g. 6.5"
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 text-red-500 text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full h-16 mt-6 rounded-2xl bg-gray-900 hover:bg-black transition text-white text-xl font-semibold shadow-xl disabled:bg-gray-400"
              >
                {loading ? "Calculating..." : "✦ Predict vehicle price"}
              </button>

              {/* Result Preview */}
              <div
                className={`mt-8 border ${predictedPrice ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"} rounded-[28px] p-6 transition-colors`}
              >
                <div className="flex items-center gap-5">
                  {/* Lock */}
                  <div
                    className={`w-20 h-20 rounded-full bg-white border ${predictedPrice ? "border-green-200" : "border-gray-200"} flex items-center justify-center`}
                  >
                    {predictedPrice ? (
                      <CheckCircle2 size={30} className="text-green-500" />
                    ) : (
                      <Lock size={30} className="text-gray-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-gray-500 text-lg mb-2">
                      Estimated market value:
                    </p>

                    {predictedPrice ? (
                      <div className="mb-3 text-4xl font-black text-gray-900">
                        {predictedPrice.toLocaleString()} EGP
                      </div>
                    ) : (
                      <div className="h-10 w-72 bg-gray-200 rounded-xl animate-pulse mb-3"></div>
                    )}

                    {predictedPrice ? (
                      <p className="text-green-600 font-medium">
                        Based on current market analysis
                      </p>
                    ) : (
                      <p className="text-gray-400">
                        Confidence range: ███,███ – ███,███ EGP
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
