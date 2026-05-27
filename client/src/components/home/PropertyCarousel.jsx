import React, { useRef } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import PropertyCard from "../property/PropertyCard";

import { getProperties } from "../../services/property.service";

const PropertyCarousel = ({
  title,
  filters,
  viewAllLink,
}) => {

  const scrollRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["properties", "carousel", filters],

    queryFn: () =>
      getProperties({
        ...filters,
        limit: 14,
      }),
  });

  /* SCROLL */
  const scroll = (direction) => {

    if (scrollRef.current) {

      const { current } = scrollRef;

      const scrollAmount =
        direction === "left"
          ? -current.offsetWidth / 1.15
          : current.offsetWidth / 1.15;

      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) return null;

  const properties = data?.properties || [];

  if (!properties.length) return null;

  return (
    <section className="flex flex-col gap-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        {/* TITLE */}
        <Link
          to={viewAllLink || "/properties"}
          className="group flex items-center gap-2"
        >
          <h2 className="text-[22px] md:text-2xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>

          <ArrowRight className="w-5 h-5 text-slate-700 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </Link>

        {/* CONTROLS */}
        <div className="hidden md:flex items-center gap-2">

          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md flex items-center justify-center transition-all duration-300 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-slate-800" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md flex items-center justify-center transition-all duration-300 active:scale-95"
          >
            <ChevronRight className="w-4 h-4 text-slate-800" />
          </button>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="relative">

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 scroll-smooth snap-x snap-mandatory pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >

          {/* HIDE SCROLLBAR */}
          <style
            dangerouslySetInnerHTML={{
              __html:
                "::-webkit-scrollbar { display: none; }",
            }}
          />

          {properties.map((property) => (
            <div
              key={property._id}
              className="
                flex-none
                snap-start

                w-[82vw]

                sm:w-[48%]

                md:w-[32%]

                lg:w-[24%]

                xl:w-[19%]

                2xl:w-[15.5%]
              "
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCarousel;