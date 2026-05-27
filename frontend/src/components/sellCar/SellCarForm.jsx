import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Upload, Sparkles, CheckCircle2 } from "lucide-react";

import { predictVehiclePrice, submitCarListing } from "../../services/predictorApi";

const conditions = ["Excellent", "Good", "Fair"];

const bodyTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Pickup",
  "Convertible",
];

export default function SellCarForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [success, setSuccess] = useState(false);

  // Backend dropdown options (same as AI pricing page)
  const [options, setOptions] = useState({
    brands: [],
    brand_models: {},
    colors: [],
    fuel_types: [],
    transmission_types: [],
  });

  // Pre-fill from AI pricing page if navigated with state
  const prefill = location.state || {};

  const [formData, setFormData] = useState({
    make: prefill.brand || "",
    model: prefill.model || "",
    year: prefill.registration_year || "",
    mileage: prefill.mileage || "",
    condition: "",
    color: prefill.color || "",
    fuelType: prefill.fuel_type || "",
    transmission: prefill.transmission_type || "",
    powerPs: prefill.power_ps || "",
    fuelConsumption: prefill.fuel_consumption || "",
    bodyType: "",
    description: "",
    price: "",
    phone: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  // Fetch dropdown options from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/options")
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((err) => console.error("Failed to load options:", err));
  }, []);

  // Handle Inputs — reset model when brand changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "make") {
      setFormData({ ...formData, make: value, model: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Upload Images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Validation
  const validateForm = () => {
    return (
      formData.make &&
      formData.model &&
      formData.year &&
      formData.mileage &&
      formData.condition &&
      formData.color &&
      formData.fuelType &&
      formData.transmission &&
      formData.bodyType &&
      formData.description &&
      formData.price &&
      formData.phone &&
      formData.images.length > 0
    );
  };

  // Predict Price
  const handlePredictPrice = async () => {
    if (!validateForm()) {
      alert("Please complete all required fields first.");
      return;
    }

    try {
      setPredictionLoading(true);
      const result = await predictVehiclePrice(formData);
      setPrediction(result);
    } catch (error) {
      console.error(error);
      alert("Prediction failed: " + error.message);
    } finally {
      setPredictionLoading(false);
    }
  };

  // Submit Listing
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Send the first uploaded image file to the backend
      const imageFile = formData.images.length > 0 ? formData.images[0] : null;
      const predictedPrice = prediction ? prediction.rawPrice : null;

      await submitCarListing(formData, imageFile, predictedPrice);

      setSuccess(true);

      setTimeout(() => {
        navigate("/cars");
      }, 2000);
    } catch (error) {
      console.error("Failed to submit listing:", error);
      alert("Failed to publish listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-14">
          {/* LEFT */}
          <div className="space-y-10">
            {/* Car Details */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                Car Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Brand (Dropdown from backend) */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Brand
                  </label>
                  <select
                    name="make"
                    value={formData.make}
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

                {/* Model (Filtered by selected brand) */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Model
                  </label>
                  <select
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    disabled={!formData.make}
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition disabled:opacity-50"
                  >
                    <option value="">Select model</option>
                    {formData.make &&
                      options.brand_models?.[formData.make]?.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Year */}
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

                {/* Mileage */}
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
              </div>
            </div>

            {/* Vehicle Specs */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                Vehicle Specs
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Condition */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Condition
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                  >
                    <option value="">Select condition</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color (Dropdown from backend) */}
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

                {/* Fuel Type (Dropdown from backend) */}
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
                    {options.fuel_types?.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transmission (Dropdown from backend) */}
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
                    {options.transmission_types?.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Body Type */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Body Type
                  </label>
                  <select
                    name="bodyType"
                    value={formData.bodyType}
                    onChange={handleChange}
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                  >
                    <option value="">Select body type</option>
                    {bodyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Power (HP) */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Power (HP)
                  </label>
                  <input
                    type="number"
                    name="powerPs"
                    value={formData.powerPs}
                    onChange={handleChange}
                    placeholder="e.g. 180"
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                  />
                </div>
              </div>
            </div>

            {/* Fuel Consumption */}
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

          {/* RIGHT */}
          <div className="space-y-10">
            {/* Description */}
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                Description / Notes
              </label>

              <textarea
                rows="8"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell buyers more about your car..."
                className="w-full rounded-[28px] border border-gray-200 bg-gray-50 px-5 py-5 text-lg outline-none focus:border-gray-900 transition resize-none"
              ></textarea>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                Asking Price (EGP)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 1850000"
                className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
              />
            </div>

            {/* Seller Phone */}
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                Seller Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+20 100 000 0000"
                className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
              />
            </div>

            {/* Upload */}
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
                Upload Images
              </label>

              <label className="border-2 border-dashed border-gray-300 rounded-[28px] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-gray-900 transition bg-gray-50">
                <Upload size={40} className="text-gray-500 mb-4" />

                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Upload Car Images
                </p>

                <p className="text-gray-500 text-center">
                  Support multiple images
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {previewImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-2xl"
                  />
                ))}
              </div>
            )}

            {/* Prediction */}
            {prediction && (
              <div className="bg-gray-900 rounded-[32px] p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles size={22} />

                  <h3 className="text-2xl font-black">AI Suggested Price</h3>
                </div>

                <h2 className="text-5xl font-black mb-4">
                  {prediction.estimatedPrice}
                </h2>

                <p className="text-gray-300 leading-8">
                  Confidence Range: {prediction.minPrice}
                  {" - "}
                  {prediction.maxPrice}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="grid md:grid-cols-2 gap-5 pt-4">
              {/* Predict */}
              <button
                type="button"
                onClick={handlePredictPrice}
                disabled={predictionLoading}
                className="h-16 rounded-2xl bg-gray-100 hover:bg-gray-900 hover:text-white transition text-lg font-semibold"
              >
                {predictionLoading ? "Predicting..." : "Predict Price"}
              </button>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="h-16 rounded-2xl bg-gray-900 hover:bg-black transition text-white text-lg font-semibold shadow-xl"
              >
                {loading ? "Publishing..." : "Sell Your Car"}
              </button>
            </div>

            {/* Success */}
            {success && (
              <div className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl p-5 text-green-700">
                <CheckCircle2 size={28} />

                <div>
                  <h4 className="font-bold text-lg mb-1">
                    Listing Published Successfully
                  </h4>

                  <p>Redirecting to marketplace...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
