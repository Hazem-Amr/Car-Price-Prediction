import { Link } from "react-router-dom";

export default function MobileMenu({ open }) {
  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 ${
        open ? "max-h-96" : "max-h-0"
      }`}
    >
      <div className="px-4 pb-4 flex flex-col gap-4 bg-white">
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/brands">Brands</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}
