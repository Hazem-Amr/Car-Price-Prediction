import { useState } from "react";
import { predictVehiclePrice } from "../services/predictorApi";

export default function usePrediction() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const predict = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const result = await predictVehiclePrice(formData);

      setPrediction(result);
    } catch (err) {
      setError("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    prediction,
    error,
    predict,
  };
}
