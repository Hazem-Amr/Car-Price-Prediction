import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { userListings } from "../data/userListings";

import CarCard from "../components/CarCard";
import CarsFilter from "../components/CarsFilter";
import { AuthContext } from "../context/AuthContext";

export default function Cars() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const isAdmin = user?.email === "admin@tara.com";

  const params = new URLSearchParams(location.search);

  // URL Params
  const search = params.get("search") || "";
  const brand = params.get("brand") || "";
  const maxPrice = params.get("maxPrice") || "";
  const body = params.get("body") || "";
  const fuel = params.get("fuel") || "";
  const transmission = params.get("transmission") || "";

  const [dbCars, setDbCars] = useState([]);

  const fetchCars = () => {
    fetch("http://127.0.0.1:8000/cars")
      .then((res) => res.json())
      .then((data) => {
        const formattedCars = data.map((car) => ({
          id: `db-${car.id}`,
          rawId: car.id,
          image: car.image_path ? (car.image_path.startsWith('http') ? car.image_path : `http://127.0.0.1:8000${car.image_path}`) : "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
          name: `${car.brand} ${car.model_name}`,
          price: `${Number(car.asking_price).toLocaleString()} EGP`,
          bodyType: car.body_type || "Unknown",
          year: car.registration_year,
          km: Number(car.mileage).toLocaleString(),
          fuelType: car.fuel_type,
          transmission: car.transmission_type,
          phone: car.phone || "N/A"
        }));
        setDbCars(formattedCars);
      })
      .catch((err) => console.error("Failed to fetch cars from database:", err));
  };

  useEffect(() => { fetchCars(); }, []);

  const handleDelete = async (carId) => {
    // carId is like "db-5", extract the numeric part
    const rawId = carId.replace("db-", "");
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/cars/${rawId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchCars(); // Refresh list
      } else {
        const err = await res.json();
        alert(`Error: ${err.detail}`);
      }
    } catch (e) {
      alert("Failed to delete car.");
    }
  };

  // Merge Marketplace + User Listings + Database Cars
  const mergedCars = [...dbCars, ...userListings];

  // Filter Cars
  const filteredCars = mergedCars.filter((car) => {
    const carName = car.name?.toLowerCase() || "";

    // SEARCH
    const matchesSearch = !search || carName.includes(search.toLowerCase());

    // BRAND
    const matchesBrand = !brand || carName.includes(brand.toLowerCase());

    // BODY TYPE
    const matchesBody =
      !body || car.bodyType?.toLowerCase() === body.toLowerCase();

    // PRICE
    const numericPrice = Number(car.price.replace(/[^0-9]/g, ""));

    const matchesPrice = !maxPrice || numericPrice <= Number(maxPrice);

    // FUEL
    const matchesFuel =
      !fuel || car.fuelType?.toLowerCase() === fuel.toLowerCase();

    // TRANSMISSION
    const matchesTransmission =
      !transmission ||
      car.transmission?.toLowerCase() === transmission.toLowerCase();

    return (
      matchesSearch &&
      matchesBrand &&
      matchesBody &&
      matchesPrice &&
      matchesFuel &&
      matchesTransmission
    );
  });

  return (
    <section className="pt-36 pb-24 bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-6xl font-black text-gray-900 mb-4">
            Car Marketplace
          </h1>

          <p className="text-xl text-gray-500">
            Explore premium vehicles listed on Tara
          </p>
        </div>

        {/* Active Filters */}
        {(search || brand || maxPrice || body || fuel || transmission) && (
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {search && (
              <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl text-gray-900 font-semibold">
                Search: {search}
              </div>
            )}

            {brand && (
              <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl text-gray-900 font-semibold">
                Brand: {brand}
              </div>
            )}

            {body && (
              <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl text-gray-900 font-semibold">
                Body: {body}
              </div>
            )}

            {fuel && (
              <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl text-gray-900 font-semibold">
                Fuel: {fuel}
              </div>
            )}

            {transmission && (
              <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl text-gray-900 font-semibold">
                Transmission: {transmission}
              </div>
            )}

            {maxPrice && (
              <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl text-gray-900 font-semibold">
                Max Price: {Number(maxPrice).toLocaleString()} EGP
              </div>
            )}
          </div>
        )}

        {/* Layout */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-10">
          {/* Sidebar */}
          <CarsFilter />

          {/* Results */}
          <div>
            {filteredCars.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} isAdmin={isAdmin} onDelete={handleDelete} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[32px] p-20 text-center border border-gray-100">
                <h2 className="text-4xl font-black text-gray-900 mb-4">
                  No Cars Found
                </h2>

                <p className="text-xl text-gray-500">
                  Try another filter or search term.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
