import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <section className="bg-[#f5f5f7] min-h-screen py-32 pt-40 flex items-center justify-center">
      <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-sm border border-gray-100 max-w-lg w-full mx-6">
        <h1 className="text-5xl font-black text-gray-900 mb-4 text-center">
          Welcome Back
        </h1>
        <p className="text-lg text-gray-500 mb-10 text-center">
          Log in to your Tara account
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 px-5 py-3 rounded-2xl mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-lg outline-none focus:border-gray-900 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 rounded-2xl bg-gray-900 hover:bg-black transition text-white text-lg font-semibold shadow-xl mt-4"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 font-medium">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gray-900 underline hover:text-black">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
