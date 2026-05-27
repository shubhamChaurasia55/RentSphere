import React, { useState } from "react";

import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
  MapPin,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  IndianRupee,
  Home,
} from "lucide-react";

import PropertyCard from "../components/property/PropertyCard";

import { getProperties } from "../services/property.service";

const Properties = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [cityInput, setCityInput] = useState(
    searchParams.get("city") || ""
  );

  const queryParams = Object.fromEntries([
    ...searchParams,
  ]);

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["properties", queryParams],

    queryFn: () =>
      getProperties(queryParams),
  });

  /* UPDATE FILTER */
  const updateFilter = (key, value) => {

    const params = Object.fromEntries([
      ...searchParams,
    ]);

    if (value) {
      params[key] = value;
    } else {
      delete params[key];
    }

    params.page = 1;

    setSearchParams(params);
  };

  /* CLEAR */
  const clearFilters = () => {
    setSearchParams({});
    setCityInput("");
  };

  /* SEARCH */
  const handleSearch = (e) => {

    e.preventDefault();

    updateFilter("city", cityInput);
  };

  const properties =
    data?.properties || [];

  const pagination =
    data?.pagination || {};

  return (
    <div className="min-h-screen bg-[#f8f8fb] py-5">

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP SEARCH */}
        <form
          onSubmit={handleSearch}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-2 flex flex-col lg:flex-row items-center gap-2 mb-5"
        >

          {/* LOCATION */}
          <div className="flex items-center gap-3 flex-1 w-full px-4 py-2 rounded-xl hover:bg-slate-50 transition-all duration-300">

            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>

            <div className="flex-1">

              <p className="text-[11px] font-semibold text-slate-900">
                Location
              </p>

              <input
                type="text"
                placeholder="Search city"
                value={cityInput}
                onChange={(e) =>
                  setCityInput(e.target.value)
                }
                className="w-full bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* TYPE */}
          <div className="flex items-center gap-3 flex-1 w-full px-4 py-2 rounded-xl hover:bg-slate-50 transition-all duration-300">

            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Home className="w-4 h-4" />
            </div>

            <div className="flex-1">

              <p className="text-[11px] font-semibold text-slate-900">
                Property Type
              </p>

              <select
                value={
                  searchParams.get("category") ||
                  ""
                }
                onChange={(e) =>
                  updateFilter(
                    "category",
                    e.target.value
                  )
                }
                className="w-full bg-transparent outline-none text-sm text-slate-600 appearance-none cursor-pointer"
              >
                <option value="">
                  All Types
                </option>

                <option value="Apartments">
                  Apartment
                </option>

                <option value="Houses">
                  House
                </option>

                <option value="Villas">
                  Villa
                </option>
              </select>
            </div>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-3 flex-1 w-full px-4 py-2 rounded-xl hover:bg-slate-50 transition-all duration-300">

            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <IndianRupee className="w-4 h-4" />
            </div>

            <div className="flex-1">

              <p className="text-[11px] font-semibold text-slate-900">
                Budget
              </p>

              <select
                value={
                  searchParams.get("maxRent") ||
                  ""
                }
                onChange={(e) =>
                  updateFilter(
                    "maxRent",
                    e.target.value
                  )
                }
                className="w-full bg-transparent outline-none text-sm text-slate-600 appearance-none cursor-pointer"
              >
                <option value="">
                  Any Budget
                </option>

                <option value="10000">
                  ₹10k
                </option>

                <option value="20000">
                  ₹20k
                </option>

                <option value="40000">
                  ₹40k
                </option>

                <option value="80000">
                  ₹80k
                </option>
              </select>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full lg:w-auto h-[52px] px-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Search className="w-4 h-4" />

            Search
          </button>
        </form>

        {/* MAIN */}
        <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-5 items-start">

          {/* SIDEBAR */}
          <aside className="">

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">

              {/* HEADER */}
              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-2">

                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <SlidersHorizontal className="w-4 h-4 text-slate-700" />
                  </div>

                  <h2 className="font-semibold text-slate-900">
                    Filters
                  </h2>
                </div>

                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Clear
                </button>
              </div>

              {/* BEDROOMS */}
              <div className="mb-5">

                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Bedrooms
                </h3>

                <div className="grid grid-cols-2 gap-2">

                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        updateFilter(
                          "bedrooms",
                          String(num)
                        )
                      }
                      className={`h-10 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        searchParams.get(
                          "bedrooms"
                        ) === String(num)
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {num} BHK
                    </button>
                  ))}
                </div>
              </div>

              {/* FURNISHED */}
              <div className="mb-5">

                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Furnishing
                </h3>

                <button
                  onClick={() =>
                    updateFilter(
                      "furnished",
                      searchParams.get(
                        "furnished"
                      ) === "true"
                        ? ""
                        : "true"
                    )
                  }
                  className={`w-full h-11 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    searchParams.get(
                      "furnished"
                    ) === "true"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  Fully Furnished
                </button>
              </div>

              {/* SORT */}
              <div>

                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Sort By
                </h3>

                <select
                  value={
                    searchParams.get("sort") ||
                    "-createdAt"
                  }
                  onChange={(e) =>
                    updateFilter(
                      "sort",
                      e.target.value
                    )
                  }
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-slate-50 text-sm font-medium outline-none"
                >
                  <option value="-createdAt">
                    Newest
                  </option>

                  <option value="rent">
                    Price: Low to High
                  </option>

                  <option value="-rent">
                    Price: High to Low
                  </option>
                </select>
              </div>
            </div>
          </aside>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">

            {/* TOP BAR */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-5 py-3 flex items-center justify-between">

              <div>

                <h2 className="font-semibold text-slate-900 text-lg">
                  {pagination.totalProperties || 0} Properties
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Find your perfect stay
                </p>
              </div>

              <div className="hidden md:flex items-center gap-2">

                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>

                <span className="text-sm text-slate-500">
                  Updated live
                </span>
              </div>
            </div>

            {/* GRID */}
            {isLoading ? (

              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>

            ) : error ? (

              <div className="bg-white rounded-2xl border border-red-100 text-red-500 font-semibold py-20 text-center">
                Error loading properties
              </div>

            ) : properties.length === 0 ? (

              <div className="bg-white rounded-2xl border border-gray-200 text-slate-500 font-semibold py-20 text-center">
                No properties found
              </div>

            ) : (

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">

                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {pagination.totalPages > 1 && (

              <div className="flex items-center justify-center gap-2 mt-2">

                <button
                  disabled={
                    pagination.currentPage === 1
                  }
                  onClick={() =>
                    updateFilter(
                      "page",
                      pagination.currentPage - 1
                    )
                  }
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[...Array(
                  pagination.totalPages
                )].map((_, idx) => (

                  <button
                    key={idx}
                    onClick={() =>
                      updateFilter(
                        "page",
                        idx + 1
                      )
                    }
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      pagination.currentPage ===
                      idx + 1
                        ? "bg-indigo-600 text-white"
                        : "bg-white border border-gray-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  disabled={
                    pagination.currentPage ===
                    pagination.totalPages
                  }
                  onClick={() =>
                    updateFilter(
                      "page",
                      pagination.currentPage + 1
                    )
                  }
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;