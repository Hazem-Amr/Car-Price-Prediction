const API_BASE = "http://localhost:8000";

/**
 * Call the real AI backend to predict a car's price.
 * Maps the frontend form field names to what the backend expects.
 */
export const predictVehiclePrice = async (formData) => {
  const payload = {
    brand: formData.make.toLowerCase(),
    model: formData.model,
    color: formData.color.toLowerCase(),
    registration_year: parseInt(formData.year),
    power_ps: parseFloat(formData.powerPs) || 100,
    fuel_type: formData.fuelType,
    transmission_type: formData.transmission,
    fuel_consumption: parseFloat(formData.fuelConsumption) || 7.0,
    mileage: parseFloat(formData.mileage),
  };

  const response = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Prediction failed");
  }

  const data = await response.json();
  const price = data.predicted_price;

  // Format the price and calculate a confidence range (±8%)
  const minPrice = Math.round(price * 0.92);
  const maxPrice = Math.round(price * 1.08);

  return {
    estimatedPrice: `${price.toLocaleString()} EGP`,
    minPrice: `${minPrice.toLocaleString()} EGP`,
    maxPrice: `${maxPrice.toLocaleString()} EGP`,
    rawPrice: price,
    confidence: "92%",
  };
};

/**
 * Submit a car listing to be saved in the database.
 * Sends form data + image as multipart/form-data.
 */
export const submitCarListing = async (formData, imageFile, predictedPrice) => {
  const body = new FormData();

  body.append("brand", formData.make.toLowerCase());
  body.append("model_name", formData.model);
  body.append("color", formData.color.toLowerCase());
  body.append("registration_year", formData.year);
  body.append("power_ps", formData.powerPs || "100");
  body.append("fuel_type", formData.fuelType);
  body.append("transmission_type", formData.transmission);
  body.append("fuel_consumption", formData.fuelConsumption || "7.0");
  body.append("mileage", formData.mileage);
  body.append("asking_price", formData.price);
  body.append("condition", formData.condition || "");
  body.append("body_type", formData.bodyType || "");
  body.append("description", formData.description || "");
  body.append("phone", formData.phone || "");

  if (imageFile) {
    body.append("image", imageFile);
  }

  const response = await fetch(`${API_BASE}/cars/sell`, {
    method: "POST",
    body: body,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to submit listing");
  }

  return await response.json();
};
