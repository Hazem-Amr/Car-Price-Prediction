import React from "react";
import { Calendar, Gauge, Heart, MapPin, Fuel, Phone } from "lucide-react";

import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <div className="group bg-white rounded-[32px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Featured Badge */}
        <div className="absolute top-5 left-5 bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
          Featured
        </div>

        {/* Favorite */}
        <button className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-gray-900 hover:text-white transition">
          <Heart size={20} />
        </button>

        {/* Bottom Info */}
        <div className="absolute bottom-5 left-5 text-white">
          <div className="flex items-center gap-2 text-sm opacity-90 mb-2">
            <MapPin size={16} />
            Cairo, Egypt
          </div>

          <p className="text-sm bg-white/20 backdrop-blur px-3 py-1 rounded-full inline-block">
            Verified Seller
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        {/* Title */}
        <h3 className="text-3xl font-black text-gray-900 mb-3">{car.name}</h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-4xl font-black text-gray-900">{car.price}</h4>

          <span className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-xl text-sm">
            {car.bodyType}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-6"></div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-4">
          {/* Year */}
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <Calendar size={22} className="mx-auto text-gray-700 mb-2" />

            <p className="text-sm text-gray-500 mb-1">Year</p>

            <h5 className="font-bold text-gray-900">{car.year}</h5>
          </div>

          {/* Mileage */}
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <Gauge size={22} className="mx-auto text-gray-700 mb-2" />

            <p className="text-sm text-gray-500 mb-1">Mileage</p>

            <h5 className="font-bold text-gray-900">{car.km}</h5>
          </div>

          {/* Fuel */}
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <Fuel size={22} className="mx-auto text-gray-700 mb-2" />

            <p className="text-sm text-gray-500 mb-1">Fuel</p>

            <h5 className="font-bold text-gray-900">
              {car.fuelType || "Petrol"}
            </h5>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4 mt-7">
          {/* View Details */}
          <Link to={`/cars/${car.id}`} className="flex-1">
            <button className="w-full bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-2xl py-4 font-semibold text-lg">
              View Details
            </button>
          </Link>

          {/* Call Seller */}
          <a
            href={`tel:${car.phone}`}
            className="w-16 h-16 rounded-2xl bg-gray-900 hover:bg-black transition-all duration-300 flex items-center justify-center text-white shadow-lg"
          >
            <Phone size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
