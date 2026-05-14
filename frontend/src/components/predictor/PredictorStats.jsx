import React from "react";
import { CarFront, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: CarFront,
    value: "25K+",
    label: "Cars Analyzed",
  },

  {
    icon: ShieldCheck,
    value: "98%",
    label: "Prediction Accuracy",
  },
];

export default function PredictorStats() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="border border-white/10 bg-white/5 rounded-[28px] p-6"
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
              <Icon size={26} />
            </div>

            {/* Value */}
            <h3 className="text-4xl font-black mb-2">{stat.value}</h3>

            {/* Label */}
            <p className="text-gray-300 leading-7">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
