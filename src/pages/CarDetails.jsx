import { useParams } from "react-router-dom";

import { cars } from "../data/cars";
import { userListings } from "../data/userListings";

export default function CarDetails() {
  const { id } = useParams();

  // Merge Marketplace Cars + User Listings
  const allCars = [...userListings, ...cars];

  // Find Current Car
  const car = allCars.find((c) => c.id.toString() === id);

  // Not Found
  if (!car) {
    return (
      <div className="pt-40 text-center text-5xl font-black">Car Not Found</div>
    );
  }

  return (
    <section className="pt-36 pb-24 bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          {/* Image */}
          <div>
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-[550px] object-cover rounded-[40px] shadow-xl"
            />
          </div>

          {/* Main Info */}
          <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
            {/* Name */}
            <h1 className="text-5xl font-black text-gray-900 mb-5">
              {car.name}
            </h1>

            {/* Price */}
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl font-black text-gray-900">{car.price}</h2>

              {/* Body Type Badge */}
              <div className="bg-gray-900 text-white px-5 py-3 rounded-2xl font-semibold">
                {car.bodyType}
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Brand</p>

                <h3 className="text-xl font-bold text-gray-900">
                  {car.name.split(" ")[0]}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Model</p>

                <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Year</p>

                <h3 className="text-xl font-bold text-gray-900">{car.year}</h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Mileage</p>

                <h3 className="text-xl font-bold text-gray-900">{car.km}</h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Fuel Type</p>

                <h3 className="text-xl font-bold text-gray-900">
                  {car.fuelType || "Petrol"}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Transmission</p>

                <h3 className="text-xl font-bold text-gray-900">
                  {car.transmission}
                </h3>
              </div>

              {/* Body Type */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Body Type</p>

                <h3 className="text-xl font-bold text-gray-900">
                  {car.bodyType}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Color</p>

                <h3 className="text-xl font-bold text-gray-900">
                  {car.color || "Black"}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Condition</p>

                <h3 className="text-xl font-bold text-gray-900">
                  {car.condition || "Excellent"}
                </h3>
              </div>
            </div>

            {/* Call Seller */}
            <a
              href={`tel:${car.phone}`}
              className="mt-10 h-16 rounded-2xl bg-gray-900 hover:bg-black transition text-white text-lg font-semibold shadow-xl flex items-center justify-center"
            >
              Call Seller — {car.phone}
            </a>
          </div>
        </div>

        {/* CAR DETAILS SECTION */}
        <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
          <h2 className="text-4xl font-black text-gray-900 mb-10">
            Car Details
          </h2>

          {/* Details Tables */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* LEFT TABLE */}
            <div className="border border-gray-200 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="bg-gray-100 p-5 font-semibold">Brand</div>

                <div className="p-5">{car.name.split(" ")[0]}</div>

                <div className="bg-gray-100 p-5 font-semibold">Model</div>

                <div className="p-5">{car.name}</div>

                <div className="bg-gray-100 p-5 font-semibold">Body Type</div>

                <div className="p-5">{car.bodyType}</div>

                <div className="bg-gray-100 p-5 font-semibold">Condition</div>

                <div className="p-5">{car.condition || "Excellent"}</div>

                <div className="bg-gray-100 p-5 font-semibold">Color</div>

                <div className="p-5">{car.color || "Black"}</div>
              </div>
            </div>

            {/* RIGHT TABLE */}
            <div className="border border-gray-200 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="bg-gray-100 p-5 font-semibold">Posted On</div>

                <div className="p-5">2026-05-13</div>

                <div className="bg-gray-100 p-5 font-semibold">Location</div>

                <div className="p-5">Cairo, Egypt</div>

                <div className="bg-gray-100 p-5 font-semibold">Fuel Type</div>

                <div className="p-5">{car.fuelType || "Petrol"}</div>

                <div className="bg-gray-100 p-5 font-semibold">
                  Transmission
                </div>

                <div className="p-5">{car.transmission}</div>

                <div className="bg-gray-100 p-5 font-semibold">Mileage</div>

                <div className="p-5">{car.km}</div>
              </div>
            </div>
          </div>

          {/* Seller Description */}
          <div className="leading-10 text-xl text-gray-700 whitespace-pre-line">
            {car.description ||
              "Premium vehicle in excellent condition. Contact seller for more details."}
          </div>

          {/* Contact */}
          <div className="mt-12 text-2xl font-bold text-gray-900">
            Contact Seller: <span className="underline">{car.phone}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
