import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Sparkles, CheckCircle2 } from "lucide-react";

import { userListings } from "../../data/userListings";
import { predictVehiclePrice } from "../../services/predictorApi";

const conditions = ["Excellent", "Good", "Fair"];

const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];

const transmissions = ["Automatic", "Manual"];

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

  const [loading, setLoading] = useState(false);

  const [predictionLoading, setPredictionLoading] = useState(false);

  const [prediction, setPrediction] = useState(null);

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    color: "",
    fuelType: "",
    transmission: "",
    bodyType: "",
    description: "",
    price: "",
    phone: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  // Handle Inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Upload Images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setFormData({
      ...formData,
      images: files,
    });

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
      console.log(error);
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

      const newCar = {
        id: Date.now(),

        name: `${formData.make} ${formData.model}`,

        price: `${formData.price} EGP`,

        image: previewImages[0],

        year: formData.year,

        km: formData.mileage,

        transmission: formData.transmission,

        bodyType: formData.bodyType,

        condition: formData.condition,

        color: formData.color,

        fuelType: formData.fuelType,

        description: formData.description,

        phone: formData.phone,

        gallery: previewImages,
      };

      userListings.unshift(newCar);

      setSuccess(true);

      setTimeout(() => {
        navigate("/cars");
      }, 2000);
    } catch (error) {
      console.log(error);
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
                {/* Make */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Car Make
                  </label>

                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="e.g. BMW"
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                  />
                </div>

                {/* Model */}
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

                {/* Year */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Year
                  </label>

                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2023"
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
                    placeholder="50000"
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

                {/* Color */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    Color
                  </label>

                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Black"
                    className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
                  />
                </div>

                {/* Fuel */}
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

                {/* Transmission */}
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
              </div>
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
