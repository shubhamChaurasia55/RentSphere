import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-white flex items-center justify-center px-4 sm:px-6 py-6 lg:py-10">
      
      {/* CONTAINER */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-3">
          
          {/* HEADING */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
              Find Your Perfect <br />

              <span className="text-indigo-600">
                Place to Live
              </span>
            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-7 max-w-lg">
              Discover 1000+ verified rental properties across top cities.
              Easy booking, secure payments, and a seamless rental experience.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg">
              Explore Properties
            </button>

            <button className="border border-gray-300 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 px-7 py-3.5 rounded-xl font-semibold">
              Learn More
            </button>
          </div>

          {/* USERS */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-3">
            
            {/* AVATARS */}
            <div className="flex -space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt=""
                className="w-11 h-11 rounded-full border-4 border-white object-cover"
              />

              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
                className="w-11 h-11 rounded-full border-4 border-white object-cover"
              />

              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt=""
                className="w-11 h-11 rounded-full border-4 border-white object-cover"
              />
            </div>

            {/* TEXT */}
            <p className="text-gray-600 font-medium text-sm md:text-base">
              Trusted by{" "}
              <span className="font-bold text-slate-900">
                10,000+
              </span>{" "}
              happy customers
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          
          {/* IMAGE */}
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"
              alt="Apartment"
              className="w-full h-[320px] sm:h-[350px] lg:h-[360px] object-cover"
            />
          </div>

          {/* PROPERTY CARD */}
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center justify-between">
            
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900">
                Modern 2BHK Apartment
              </h3>

              <p className="text-gray-500 text-sm">
                Koramangala, Bengaluru
              </p>
            </div>

            <div className="text-right">
              <h2 className="text-xl md:text-2xl font-bold text-indigo-600">
                $850
              </h2>

              <p className="text-gray-500 text-xs md:text-sm">
                / month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;