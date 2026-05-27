import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Heart,
  Star,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
} from "lucide-react";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import useAuthStore from "../../features/auth/authStore";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../services/favorite.service";

const PropertyCard = ({ property }) => {

  const { user, setUser } = useAuthStore();

  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.includes(property._id)
  );

  /* FAVORITE */
  const favoriteMutation = useMutation({

    mutationFn: () => {

      if (isFavorite) {
        return removeFromFavorites(property._id);
      }

      return addToFavorites(property._id);
    },

    onSuccess: (data) => {

      toast.success(data.message);

      setIsFavorite(!isFavorite);

      if (isFavorite) {

        setUser({
          ...user,
          favorites: user.favorites.filter(
            (fav) => fav !== property._id
          ),
        });

      } else {

        setUser({
          ...user,
          favorites: [
            ...(user.favorites || []),
            property._id,
          ],
        });
      }
    },

    onError: (error) => {

      toast.error(
        error?.response?.data?.message ||
        "Action failed"
      );
    },
  });

  return (
    <div className="group/card relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">

      {/* FAVORITE */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          favoriteMutation.mutate();
        }}
        disabled={favoriteMutation.isPending}
        className="absolute top-2.5 right-2.5 z-20 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <Heart
          className={`w-[18px] h-[18px] drop-shadow-md transition-all duration-300 ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "fill-black/20 text-white hover:fill-black/40"
          }`}
        />
      </button>

      <Link
        to={`/property/${property._id}`}
        className="flex flex-col h-full"
      >

        {/* IMAGE */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

          <img
            src={
              property.images?.[0] ||
              "/api/placeholder/400/300"
            }
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>

          {/* STATUS */}
          <div className="absolute bottom-2.5 left-2.5">
            <span className="px-2 py-1 rounded-full bg-white/95 backdrop-blur-md text-[9px] font-semibold text-slate-800 capitalize shadow-sm">
              {property.status || "available"}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col p-2.5 flex-grow">

          {/* TOP */}
          <div className="flex items-start justify-between gap-2">

            {/* TITLE + LOCATION */}
            <div className="min-w-0 flex-1">

              <h3 className="font-semibold text-slate-900 text-[12px] leading-[16px] line-clamp-1 tracking-tight">
                {property.title}
              </h3>

              <div className="flex items-center gap-1 text-slate-500 text-[10px] mt-1 min-w-0">

                <MapPin className="w-2.5 h-2.5 shrink-0" />

                <span className="truncate">
                  {property.location}, {property.city}
                </span>
              </div>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-1 shrink-0 bg-slate-100 px-1.5 py-[5px] rounded-lg">

              <Star className="w-2.5 h-2.5 fill-slate-900 text-slate-900" />

              <span className="text-[10px] font-semibold text-slate-800 leading-none">
                {property.averageRating || "New"}
              </span>
            </div>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-3 gap-2 mt-2.5">

            {/* BEDS */}
            <div className="bg-slate-50 rounded-xl py-2 px-1 flex flex-col items-center justify-center">

              <BedDouble className="w-3 h-3 text-slate-500 mb-1" />

              <span className="text-[10px] font-bold text-slate-800 leading-none">
                {property.bedrooms || 0}
              </span>

              <span className="text-[8px] text-slate-500 mt-1 leading-none">
                Beds
              </span>
            </div>

            {/* BATHS */}
            <div className="bg-slate-50 rounded-xl py-2 px-1 flex flex-col items-center justify-center">

              <Bath className="w-3 h-3 text-slate-500 mb-1" />

              <span className="text-[10px] font-bold text-slate-800 leading-none">
                {property.bathrooms || 0}
              </span>

              <span className="text-[8px] text-slate-500 mt-1 leading-none">
                Baths
              </span>
            </div>

            {/* AREA */}
            <div className="bg-slate-50 rounded-xl py-2 px-1 flex flex-col items-center justify-center">

              <Maximize className="w-3 h-3 text-slate-500 mb-1" />

              <span className="text-[10px] font-bold text-slate-800 leading-none">
                {property.area || 1200}
              </span>

              <span className="text-[8px] text-slate-500 mt-1 leading-none">
                sqft
              </span>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-2.5 flex items-end justify-between">

            {/* PRICE */}
            <div className="flex items-baseline gap-1">

              <span className="text-[15px] font-extrabold tracking-tight text-slate-900">
                ₹{property.rent}
              </span>

              <span className="text-[10px] text-slate-500 font-medium">
                / month
              </span>
            </div>

            {/* VIEW */}
            <span className="text-[10px] font-semibold text-indigo-600 group-hover/card:translate-x-1 transition-all duration-300">
              View →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;