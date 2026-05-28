import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Brands from "./pages/Brands";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PricePredictor from "./pages/PricePredictor";
import SellCar from "./pages/SellCar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/price-predictor" element={<PricePredictor />} />
        <Route path="/sell-car" element={<SellCar />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Route>
    </Routes>
  );
}
