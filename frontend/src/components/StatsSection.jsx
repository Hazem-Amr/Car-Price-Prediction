import React from "react";
import { Car, Users, BadgeCheck, Headphones } from "lucide-react";

const stats = [
  {
    value: "25K+",
    label: "Cars Listed",
    icon: Car,
  },
  {
    value: "10K+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    value: "120+",
    label: "Brands",
    icon: BadgeCheck,
  },
  {
    value: "24/7",
    label: "Support",
    icon: Headphones,
  },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-5">
            Trusted By Thousands
          </h2>

          <p className="text-xl text-gray-500">
            Egypt's leading car marketplace platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-8">
                  <Icon size={32} className="text-gray-900" />
                </div>

                {/* Number */}
                <h3 className="text-5xl font-black text-gray-900 mb-4">
                  {item.value}
                </h3>

                {/* Label */}
                <p className="text-gray-500 text-lg">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
