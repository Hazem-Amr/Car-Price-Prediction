import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section className="bg-[#f5f5f7] min-h-screen py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium mb-8">
            Contact Tara
          </div>

          <h1 className="text-6xl font-black text-gray-900 mb-8">Let's Talk</h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-9">
            Have questions about buying or selling a car? Our team is here to
            help you anytime.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT INFO */}
          <div className="bg-gray-900 rounded-[40px] p-10 md:p-14 text-white relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6">Get In Touch</h2>

              <p className="text-gray-300 text-lg leading-8 mb-12">
                Reach out to Tara support for inquiries, partnerships,
                dealership registrations, or platform assistance.
              </p>

              {/* Contact Items */}
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Mail size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Email</h3>

                    <p className="text-gray-300">support@tara.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Phone size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Phone</h3>

                    <p className="text-gray-300">+20 100 123 4567</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <MapPin size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Location</h3>

                    <p className="text-gray-300">Cairo, Egypt</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Clock size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Working Hours</h3>

                    <p className="text-gray-300">
                      Sunday - Thursday | 9AM - 6PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-sm border border-gray-100">
            <h2 className="text-4xl font-black text-gray-900 mb-10">
              Send Message
            </h2>

            <form className="space-y-7">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-16 rounded-2xl border border-gray-200 px-6 text-lg outline-none focus:border-gray-900 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-16 rounded-2xl border border-gray-200 px-6 text-lg outline-none focus:border-gray-900 transition"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full h-16 rounded-2xl border border-gray-200 px-6 text-lg outline-none focus:border-gray-900 transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Message
                </label>

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full rounded-2xl border border-gray-200 px-6 py-5 text-lg outline-none focus:border-gray-900 transition resize-none"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full h-16 rounded-2xl bg-gray-900 hover:bg-black transition text-white text-lg font-semibold shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
