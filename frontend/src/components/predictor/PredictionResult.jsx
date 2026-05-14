import React from "react";
import { ShieldCheck } from "lucide-react";

export default function PredictionResult({ prediction }) {
  if (!prediction) return null;

  return (
    <div className="mt-8 border border-gray-200 rounded-[28px] p-8 bg-gray-50">
      <div className="flex items-start gap-5">
        <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
          <ShieldCheck size={34} className="text-gray-900" />
        </div>

        <div>
          <p className="text-gray-500 text-lg mb-2">Estimated market value</p>

          <h2 className="text-5xl font-black text-gray-900 mb-4">
            {prediction.estimatedPrice}
          </h2>

          <p className="text-gray-500 text-lg mb-2">
            Confidence range: {prediction.minPrice} - {prediction.maxPrice}
          </p>

          <div className="inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium mt-3">
            Accuracy: {prediction.confidence}
          </div>
        </div>
      </div>
    </div>
  );
}
