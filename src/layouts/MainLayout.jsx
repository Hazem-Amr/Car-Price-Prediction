import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      <main className="w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
