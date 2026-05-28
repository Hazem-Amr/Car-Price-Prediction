import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { userListings } from "../data/userListings";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/cars")
      .then((res) => res.json())
      .then((data) => {
        const dbCars = data.map((car) => ({
          id: `db-${car.id}`,
          image: car.image_path ? (car.image_path.startsWith('http') ? car.image_path : `http://127.0.0.1:8000${car.image_path}`) : "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
          name: `${car.brand} ${car.model_name}`,
          price: `${Number(car.asking_price).toLocaleString()} EGP`,
          bodyType: car.body_type || "Unknown",
          year: car.registration_year,
          km: Number(car.mileage).toLocaleString(),
          fuelType: car.fuel_type,
          transmission: car.transmission_type,
          phone: car.phone || "N/A",
          color: car.color,
          condition: car.condition,
          description: car.description,
          powerPs: car.power_ps,
          fuelConsumption: car.fuel_consumption,
        }));
        
        const allCars = [...dbCars, ...userListings];
        const foundCar = allCars.find((c) => c.id.toString() === id);
        setCar(foundCar);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cars:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="pt-40 text-center text-3xl font-semibold">Loading car details...</div>;
  }

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

              {car.powerPs && (
                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="text-sm text-gray-500 mb-2">Power</p>
                  <h3 className="text-xl font-bold text-gray-900">{car.powerPs} HP</h3>
                </div>
              )}

              {car.fuelConsumption && (
                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="text-sm text-gray-500 mb-2">Fuel Consumption</p>
                  <h3 className="text-xl font-bold text-gray-900">{car.fuelConsumption} L/100km</h3>
                </div>
              )}
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

                {car.powerPs && (
                  <>
                    <div className="bg-gray-100 p-5 font-semibold">Power</div>
                    <div className="p-5">{car.powerPs} HP</div>
                  </>
                )}
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

                {car.fuelConsumption && (
                  <>
                    <div className="bg-gray-100 p-5 font-semibold">Fuel Consumption</div>
                    <div className="p-5">{car.fuelConsumption} L/100km</div>
                  </>
                )}
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
