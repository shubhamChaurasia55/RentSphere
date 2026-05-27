import React from "react";

import { Link } from "react-router-dom";

import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8f8fb] to-white">

      {/* BLUR BACKGROUND */}
      <div className="absolute top-[-120px] right-[-80px] w-[320px] h-[320px] bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

      <div className="absolute bottom-[-120px] left-[-80px] w-[280px] h-[280px] bg-blue-100 rounded-full blur-3xl opacity-40"></div>

      {/* MAIN */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-4 py-4 lg:py-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">

          {/* LEFT */}
          <div className="flex flex-col">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-5">

              <ShieldCheck className="w-4 h-4" />

              Trusted Rental Platform
            </div>

            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-slate-900 max-w-2xl">

              Discover Your
              <span className="text-indigo-600">
                {" "}Perfect Home
              </span>
              <br />
              For Better Living
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-5 text-[15px] sm:text-base leading-7 text-slate-500 max-w-xl">
              Explore premium verified rentals, apartments, villas,
              and modern homes across top cities with seamless
              booking and secure experiences.
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap items-center gap-4 mt-7">

              {/* PRIMARY */}
              <Link
                to="/properties"
                className="group h-12 px-7 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all duration-300"
              >
                Browse Properties

                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* SECONDARY */}
              <button className="h-12 px-7 rounded-2xl border border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-7 mt-8">

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  12k+
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Verified Listings
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  8k+
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Happy Tenants
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  4.9
                </h3>

                <div className="flex items-center gap-1 mt-1">

                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />

                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />

                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />

                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />

                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* MAIN IMAGE */}
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200 border border-white/50">

              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"
                alt="Luxury Apartment"
                className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent"></div>

              {/* FLOATING PROPERTY CARD */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/50">

                <div className="flex items-center justify-between gap-4">

                  {/* LEFT */}
                  <div className="min-w-0">

                    <h3 className="text-lg font-bold text-slate-900 truncate">
                      Modern Luxury Apartment
                    </h3>

                    <div className="flex items-center gap-1 mt-1 text-slate-500 text-sm">

                      <MapPin className="w-3.5 h-3.5 text-indigo-600" />

                      <span>
                        Koramangala, Bengaluru
                      </span>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right shrink-0">

                    <h2 className="text-2xl font-bold text-indigo-600">
                      ₹45k
                    </h2>

                    <p className="text-xs text-slate-500 mt-1">
                      per month
                    </p>
                  </div>
                </div>

                {/* FEATURES */}
                <div className="grid grid-cols-3 gap-3 mt-4">

                  <div className="bg-slate-50 rounded-2xl py-2 flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-900">
                      3
                    </span>

                    <span className="text-[11px] text-slate-500 mt-1">
                      Beds
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl py-2 flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-900">
                      2
                    </span>

                    <span className="text-[11px] text-slate-500 mt-1">
                      Baths
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl py-2 flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-900">
                      1800
                    </span>

                    <span className="text-[11px] text-slate-500 mt-1">
                      sqft
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING MINI CARD */}
            <div className="hidden lg:flex absolute -left-10 top-8 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                ✓
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 text-sm">
                  Verified Listings
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  Trusted & secure homes
                </p>
              </div>
            </div>

            {/* FLOATING USERS */}
            <div className="hidden lg:flex absolute -right-8 bottom-24 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 items-center gap-4">

              <div className="flex -space-x-3">

                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />

                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />

                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 text-sm">
                  10,000+
                </h4>

                <p className="text-xs text-slate-500">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;