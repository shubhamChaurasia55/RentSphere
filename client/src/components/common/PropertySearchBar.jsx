import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  MapPin,
  Home,
  CalendarDays,
  ChevronDown,
  Search,
} from "lucide-react";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    keyword: searchParams.get("keyword") || "",
    minRent: searchParams.get("minRent") || "",
    maxRent: searchParams.get("maxRent") || "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    const params = {};

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params[key] = filters[key];
      }
    });

    setSearchParams(params);
  };

  return (
    <div className="w-full bg-[#f8f8f8] px-4 py-6">
      <div className="max-w-7xl mx-auto bg-white border border-gray-100 shadow-md rounded-3xl p-4">

        {/* SEARCH GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          {/* LOCATION */}
          <div className="border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-indigo-500 transition-all duration-300">
            
            <div className="flex-1">
              <label className="text-sm font-semibold text-slate-900 block mb-1">
                Location
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter city or locality"
                value={filters.city}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400"
              />
            </div>

            <MapPin
              size={18}
              className="text-gray-400"
            />
          </div>

          {/* PROPERTY TYPE / KEYWORD */}
          <div className="border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-indigo-500 transition-all duration-300">
            
            <div className="flex-1">
              <label className="text-sm font-semibold text-slate-900 block mb-1">
                Property Type
              </label>

              <input
                type="text"
                name="keyword"
                placeholder="Apartment, Villa..."
                value={filters.keyword}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400"
              />
            </div>

            <Home
              size={18}
              className="text-gray-400"
            />
          </div>

          {/* MIN RENT */}
          <div className="border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-indigo-500 transition-all duration-300">
            
            <div className="flex-1">
              <label className="text-sm font-semibold text-slate-900 block mb-1">
                Min Rent
              </label>

              <input
                type="number"
                name="minRent"
                placeholder="$ Minimum"
                value={filters.minRent}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400"
              />
            </div>

            <CalendarDays
              size={18}
              className="text-gray-400"
            />
          </div>

          {/* MAX RENT */}
          <div className="border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-indigo-500 transition-all duration-300">
            
            <div className="flex-1">
              <label className="text-sm font-semibold text-slate-900 block mb-1">
                Max Rent
              </label>

              <input
                type="number"
                name="maxRent"
                placeholder="$ Maximum"
                value={filters.maxRent}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400"
              />
            </div>

            <ChevronDown
              size={18}
              className="text-gray-400"
            />
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 py-5 shadow-lg"
          >
            <Search size={20} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;