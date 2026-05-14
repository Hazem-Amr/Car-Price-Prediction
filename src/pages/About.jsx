import React from "react";
import { ShieldCheck, Car, Users, BadgeCheck } from "lucide-react";

export default function About() {
  return (
    <section className="bg-[#f5f5f7] min-h-screen py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-28">
          {/* Left */}
          <div>
            <div className="inline-flex items-center bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium mb-8">
              About Tara
            </div>

            <h1 className="text-6xl font-black text-gray-900 leading-tight mb-8">
              Egypt's Modern
              <br />
              Car Marketplace
            </h1>

            <p className="text-xl text-gray-600 leading-9 mb-10">
              Tara helps people discover, buy, and sell cars with a premium
              digital experience built for the modern automotive market.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="bg-gray-900 hover:bg-black text-white px-8 py-5 rounded-2xl text-lg font-semibold transition">
                Explore Cars
              </button>

              <button className="bg-white border border-gray-200 hover:border-gray-900 px-8 py-5 rounded-2xl text-lg font-semibold transition">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>

            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
              alt="Luxury Car"
              className="relative z-10 rounded-[40px] shadow-2xl object-cover h-[550px] w-full"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-28">
          {/* Card */}
          <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-8">
              <Car size={30} className="text-gray-900" />
            </div>

            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Premium Cars
            </h3>

            <p className="text-gray-600 leading-8">
              Discover thousands of premium vehicles from trusted dealers across
              Egypt.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-8">
              <ShieldCheck size={30} className="text-gray-900" />
            </div>

            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Verified Listings
            </h3>

            <p className="text-gray-600 leading-8">
              Every listing is reviewed to provide a safer and more trusted
              buying experience.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-8">
              <Users size={30} className="text-gray-900" />
            </div>

            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Trusted Community
            </h3>

            <p className="text-gray-600 leading-8">
              Join thousands of buyers and sellers using Tara every day.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-8">
              <BadgeCheck size={30} className="text-gray-900" />
            </div>

            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Premium Experience
            </h3>

            <p className="text-gray-600 leading-8">
              Designed with a modern UI experience focused on speed, trust, and
              simplicity.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gray-900 rounded-[40px] px-10 py-20 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Drive Your Next Journey With Tara
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-9 mb-10">
            Explore the future of automotive marketplaces with a modern platform
            built for buyers and sellers.
          </p>

          <button className="bg-white text-gray-900 hover:bg-gray-200 transition px-10 py-5 rounded-2xl text-lg font-semibold">
            Start Exploring
          </button>
        </div>
      </div>
    </section>
  );
}
