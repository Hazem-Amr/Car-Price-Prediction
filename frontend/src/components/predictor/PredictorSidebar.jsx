import React from "react";
import { CarFront, ShieldCheck, Sparkles } from "lucide-react";

export default function PredictorSidebar() {
  return (
    <div className="bg-[#0f172a] rounded-[40px] p-10 md:p-12 text-white flex flex-col justify-between min-h-full shadow-xl">
      <div>
        <div className="w-24 h-24 rounded-[30px] border border-white/10 bg-white/5 flex items-center justify-center mb-10">
          <CarFront size={46} />
        </div>

        <h2 className="text-5xl font-black leading-tight mb-6">
          Smart Car
          <br />
          Valuation
        </h2>

        <p className="text-xl text-gray-300 leading-9 max-w-lg">
          Advanced AI models analyze thousands of data points to estimate
          vehicle market value.
        </p>

        <div className="w-full h-px bg-white/20 my-12"></div>

        <div className="grid grid-cols-2 gap-5">
          <div className="border border-white/10 bg-white/5 rounded-[28px] p-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
              <CarFront size={26} />
            </div>

            <h3 className="text-4xl font-black mb-2">25K+</h3>

            <p className="text-gray-300">Cars Analyzed</p>
          </div>

          <div className="border border-white/10 bg-white/5 rounded-[28px] p-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
              <ShieldCheck size={26} />
            </div>

            <h3 className="text-4xl font-black mb-2">98%</h3>

            <p className="text-gray-300">Prediction Accuracy</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-16 text-gray-400">
        <Sparkles size={18} />

        <span className="text-sm font-medium">Powered by AI</span>
      </div>
    </div>
  );
}
