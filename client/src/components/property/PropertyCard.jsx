import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BedDouble,
  Bath,
  Heart,
  Star,
  Maximize,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../features/auth/authStore";
import toast from "react-hot-toast";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../services/favorite.service";

const PropertyCard = ({ property }) => {
  const { user, setUser } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.includes(property._id)
  );

  /* FAVORITE MUTATION */
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
          favorites: user.favorites.filter((fav) => fav !== property._id),
        });
      } else {
        setUser({
          ...user,
          favorites: [...(user.favorites || []), property._id],
        });
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Action failed");
    },
  });

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition bg-white relative">
      
      {/* IMAGE SECTION */}
      <div className="relative h-48 block">
        
        {/* STATUS BADGE */}
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded z-10 uppercase shadow-sm">
          {property.status || "Listed"}
        </span>

        {/* FAVORITE BUTTON */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            favoriteMutation.mutate();
          }}
          disabled={favoriteMutation.isPending}
          className="absolute top-3 right-3 p-1.5 bg-white rounded-full z-10 shadow-sm transition-all hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>

        {/* IMAGE LINK */}
        <Link to={`/property/${property._id}`}>
          <img
            src={property.images?.[0] || "/api/placeholder/400/300"}
            alt={property.title}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      {/* CONTENT SECTION */}
      <Link to={`/property/${property._id}`} className="block p-4">
        
        {/* TITLE & LOCATION */}
        <h4 className="font-bold text-gray-900 truncate">{property.title}</h4>
        <p className="text-xs text-gray-500 mb-2 truncate">
          {property.location}, {property.city}
        </p>
        
        {/* PRICE */}
        <div className="text-lg font-bold text-indigo-600 mb-3">
          ₹{property.rent}{" "}
          <span className="text-xs text-gray-500 font-normal">/ month</span>
        </div>
        
        {/* FEATURES FOOTER */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1">
            <BedDouble className="w-3 h-3" /> {property.bedrooms || 0} Beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3 h-3" /> {property.bathrooms || 0} Baths
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="w-3 h-3" /> {property.area || 1200} sq ft
          </span>
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <Star className="w-3 h-3 fill-green-600" /> {property.averageRating || 0}
          </span>
        </div>
        
      </Link>
    </div>
  );
};

export default PropertyCard;