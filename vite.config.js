/** @type {import('tailwindcss').Config} */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D71920",
        dark: "#1F2937",
        light: "#F9FAFB",
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [react()],
};
