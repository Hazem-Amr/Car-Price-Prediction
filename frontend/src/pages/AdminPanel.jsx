import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RotateCcw, Trash2, Car } from "lucide-react";

export default function AdminPanel() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deletedCars, setDeletedCars] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");

  // Redirect non-admins
  useEffect(() => {
    if (!loading && (!user || user.email !== "admin@tara.com")) {
      navigate("/");
    }
  }, [user, loading]);

  const fetchDeleted = async () => {
    const token = localStorage.getItem("token");
    setFetching(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/cars/deleted", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDeletedCars(data);
      }
    } catch (e) {
      console.error("Failed to fetch deleted cars:", e);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (user?.email === "admin@tara.com") {
      fetchDeleted();
    }
  }, [user]);

  const handleRestore = async (carId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://127.0.0.1:8000/admin/cars/${carId}/restore`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessage("✅ Car restored successfully and is now visible in the marketplace!");
        fetchDeleted();
        setTimeout(() => setMessage(""), 4000);
      }
    } catch (e) {
      setMessage("❌ Failed to restore car.");
    }
  };

  if (loading || !user) return null;

  return (
    <section className="pt-36 pb-24 bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Car size={16} />
            Admin Panel
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-3">Trash Bin</h1>
          <p className="text-lg text-gray-500">
            Deleted cars are kept here safely. You can restore them any time.
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 mb-8 font-semibold text-gray-900 shadow-sm">
            {message}
          </div>
        )}

        {/* Content */}
        {fetching ? (
          <div className="text-center text-xl text-gray-500 py-20">Loading...</div>
        ) : deletedCars.length === 0 ? (
          <div className="bg-white rounded-[32px] p-20 text-center border border-gray-100 shadow-sm">
            <Trash2 size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-3xl font-black text-gray-900 mb-2">Trash is Empty</h2>
            <p className="text-lg text-gray-500">No deleted cars at the moment.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {deletedCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center gap-6"
              >
                {/* Image */}
                <img
                  src={
                    car.image_path
                      ? car.image_path.startsWith("http")
                        ? car.image_path
                        : `http://127.0.0.1:8000${car.image_path}`
                      : "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80"
                  }
                  alt={`${car.brand} ${car.model_name}`}
                  className="w-32 h-24 object-cover rounded-2xl flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {car.brand} {car.model_name}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <span>{car.registration_year}</span>
                    <span>•</span>
                    <span>{Number(car.mileage).toLocaleString()} km</span>
                    <span>•</span>
                    <span>{car.fuel_type}</span>
                    <span>•</span>
                    <span>{car.transmission_type}</span>
                  </div>
                  <div className="mt-2 text-lg font-black text-gray-900">
                    {Number(car.asking_price).toLocaleString()} EGP
                  </div>
                </div>

                {/* Restore Button */}
                <button
                  onClick={() => handleRestore(car.id)}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex-shrink-0"
                >
                  <RotateCcw size={18} />
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
