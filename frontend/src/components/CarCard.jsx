import React from "react";
import { Calendar, Gauge, Heart, MapPin, Fuel, Phone } from "lucide-react";

import { Link } from "react-router-dom";

export default function CarCard({ car, isAdmin, onDelete }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Featured Badge */}
        <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
          Featured
        </div>

        {/* Favorite */}
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-gray-900 hover:text-white transition">
          <Heart size={16} />
        </button>

        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-1.5 text-xs opacity-90 mb-1.5">
            <MapPin size={14} />
            Cairo, Egypt
          </div>

          <p className="text-[10px] bg-white/20 backdrop-blur px-2.5 py-0.5 rounded-full inline-block uppercase tracking-wider font-semibold">
            Verified Seller
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{car.name}</h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-black text-gray-900">{car.price}</h4>

          <span className="bg-gray-100 text-gray-700 font-semibold px-3 py-1 rounded-lg text-xs">
            {car.bodyType}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-4"></div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-3">
          {/* Year */}
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <Calendar size={18} className="mx-auto text-gray-700 mb-1.5" />
            <p className="text-xs text-gray-500 mb-0.5">Year</p>
            <h5 className="font-semibold text-gray-900 text-sm">{car.year}</h5>
          </div>

          {/* Mileage */}
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <Gauge size={18} className="mx-auto text-gray-700 mb-1.5" />
            <p className="text-xs text-gray-500 mb-0.5">Mileage</p>
            <h5 className="font-semibold text-gray-900 text-sm">{car.km}</h5>
          </div>

          {/* Fuel */}
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <Fuel size={18} className="mx-auto text-gray-700 mb-1.5" />
            <p className="text-xs text-gray-500 mb-0.5">Fuel</p>
            <h5 className="font-semibold text-gray-900 text-sm truncate">
              {car.fuelType || "Petrol"}
            </h5>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 mt-5">
          {isAdmin && (
            <button
              onClick={() => onDelete(car.id)}
              className="w-12 h-12 rounded-xl bg-red-100 hover:bg-red-200 transition-all duration-300 flex items-center justify-center text-red-600 shadow-sm flex-shrink-0"
              title="Delete Car"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          )}

          {/* View Details */}
          <Link to={`/cars/${car.id}`} className="flex-1">
            <button className="w-full bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-xl py-3 font-semibold text-sm">
              View Details
            </button>
          </Link>

          {/* Call Seller */}
          <a
            href={`tel:${car.phone}`}
            className="w-12 h-12 rounded-xl bg-gray-900 hover:bg-black transition-all duration-300 flex items-center justify-center text-white shadow-md flex-shrink-0"
          >
            <Phone size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
