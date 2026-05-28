import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signup(fullName, email, password);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <section className="bg-[#f5f5f7] min-h-screen py-32 pt-40 flex items-center justify-center">
      <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-sm border border-gray-100 max-w-lg w-full mx-6">
        <h1 className="text-5xl font-black text-gray-900 mb-4 text-center">
          Create Account
        </h1>
        <p className="text-lg text-gray-500 mb-10 text-center">
          Join the Tara marketplace
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 px-5 py-3 rounded-2xl mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 rounded-2xl bg-gray-900 hover:bg-black transition text-white text-lg font-semibold shadow-xl mt-4"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-900 underline hover:text-black">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
