import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Heart, MapPin, BedDouble, Bath, Sofa, Star, CalendarDays,
  Share, Maximize, Home, Wind, ShieldCheck, Car, CheckCircle2,
  ChevronRight, MessageSquare
} from "lucide-react";
import useAuthStore from "../features/auth/authStore";

// Services (Ensure these match your actual paths)
import { getPropertyById } from "../services/property.service";
import { createBooking } from "../services/booking.service";
import { addToFavorites, removeFromFavorites } from "../services/favorite.service";
import { addReview, getReviews } from "../services/review.service";

import NearbyProperties from "../components/property/NearbyProperties";

const PropertyDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();
  
  // Interactive Gallery State
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Review State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [isFavorite, setIsFavorite] = useState(user?.favorites?.includes(id));

  /* --- QUERIES --- */
  const { data, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
  });

  const { data: reviewsData } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id),
  });

  /* --- MUTATIONS --- */
  const bookingMutation = useMutation({
    mutationFn: () => createBooking(id),
    onSuccess: () => toast.success("Booking request sent successfully!"),
    onError: (error) => toast.error(error?.response?.data?.message || "Booking failed"),
  });

  const favoriteMutation = useMutation({
    mutationFn: () => (isFavorite ? removeFromFavorites(id) : addToFavorites(id)),
    onSuccess: (resData) => {
      toast.success(resData.message || "Favorites updated");
      setIsFavorite(!isFavorite);
      const newFavorites = isFavorite
        ? user.favorites.filter((fav) => fav !== id)
        : [...(user.favorites || []), id];
      setUser({ ...user, favorites: newFavorites });
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Action failed"),
  });

  const reviewMutation = useMutation({
    mutationFn: (reviewData) => addReview({ propertyId: id, reviewData }),
    onSuccess: () => {
      toast.success("Review added successfully");
      setRating(5);
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to add review"),
  });

  /* --- RENDER STATES --- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        Property not found or an error occurred.
      </div>
    );
  }

  const property = data?.property || {};
  const images = property.images?.length > 0 ? property.images : Array(5).fill("/api/placeholder/800/500");
  const reviews = reviewsData?.reviews || [];

  return (
    <div className="bg-white min-h-screen pb-20 pt-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER & TITLE ================= */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-4 text-slate-600 text-[15px] font-medium">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
                  <span className="font-semibold text-slate-900">{property.averageRating || "New"}</span> 
                  <span className="underline cursor-pointer">({reviews.length} reviews)</span>
                </span>
                <span className="text-slate-400">•</span>
                <span className="flex items-center gap-1 underline cursor-pointer">
                  {property.location}, {property.city}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 text-sm font-medium transition">
                <Share className="w-4 h-4" /> Share
              </button>
              <button 
                onClick={() => favoriteMutation.mutate()}
                disabled={favoriteMutation.isPending}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 text-sm font-medium transition"
              >
                <Heart className={`w-4 h-4 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : ""}`} /> 
                {isFavorite ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= MAIN LAYOUT (Left: Content, Right: Booking Card) ================= */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* ================= LEFT COLUMN (Gallery + Details + Reviews) ================= */}
          <div className="flex-1 w-full lg:w-[60%]">
            
            {/* INTERACTIVE GALLERY */}
            <div className="mb-8 flex flex-col gap-2">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md z-10 uppercase shadow-sm">
                  {property.status || "Listed"}
                </span>
                <img 
                  src={images[activeImageIndex]} 
                  alt={`Property view ${activeImageIndex + 1}`} 
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {images.slice(0, 5).map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-200 ${
                      activeImageIndex === index 
                        ? "opacity-100 ring-2 ring-slate-900 ring-offset-1" 
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="flex flex-col gap-8 text-slate-700">
              
              {/* Quick Stats */}
              <div className="pb-6 border-b border-slate-200 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                <span>{property.bedrooms || 0} guests</span>
                <span className="text-slate-300">•</span>
                <span>{property.bedrooms || 0} bedrooms</span>
                <span className="text-slate-300">•</span>
                <span>{property.bathrooms || 0} baths</span>
                <span className="text-slate-300">•</span>
                <span>{property.area || 0} sqft</span>
              </div>

              {/* Host Info Summary */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                 <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-lg uppercase shrink-0">
                    {property.owner?.name?.charAt(0) || "H"}
                 </div>
                 <div>
                    <h3 className="font-semibold text-slate-900 text-base">Hosted by {property.owner?.name || "Verified Host"}</h3>
                    <p className="text-sm text-slate-500">Superhost • 4 years hosting</p>
                 </div>
              </div>

              {/* Description */}
              <div className="pb-8 border-b border-slate-200">
                <p className="text-[15px] leading-relaxed whitespace-pre-line font-light">
                  {property.description || "No description provided by the host."}
                </p>
              </div>

              {/* Amenities List */}
              <div className="pb-8 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-5">What this place offers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[15px] font-light">
                  <div className="flex items-center gap-4"><Wind className="w-6 h-6 stroke-[1.5] text-slate-600" /> Fast WiFi & AC</div>
                  <div className="flex items-center gap-4"><Car className="w-6 h-6 stroke-[1.5] text-slate-600" /> Free parking on premises</div>
                  <div className="flex items-center gap-4"><CheckCircle2 className="w-6 h-6 stroke-[1.5] text-slate-600" /> Power Backup</div>
                  <div className="flex items-center gap-4"><ShieldCheck className="w-6 h-6 stroke-[1.5] text-slate-600" /> 24/7 Security</div>
                </div>
              </div>

              {/* REVIEWS SECTION */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-5 h-5 fill-slate-900 text-slate-900" />
                  <h2 className="text-xl font-semibold text-slate-900">{property.averageRating || "No ratings"} • {reviews.length} reviews</h2>
                </div>

                {/* List of Reviews (Shows up to 4) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mb-10">
                  {reviews.slice(0, 4).map((review, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600 text-sm">
                          {review.user?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-slate-900">{review.user?.name || "Anonymous User"}</h4>
                          <span className="text-xs text-slate-500">October 2025</span>
                        </div>
                      </div>
                      <p className="text-[14px] text-slate-700 leading-relaxed font-light line-clamp-3">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                  {reviews.length === 0 && <p className="text-sm text-slate-500 italic">No reviews yet. Be the first!</p>}
                </div>

                {/* Add Review Form */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mt-4">
                  <h3 className="font-semibold text-slate-900 mb-4 text-sm flex items-center gap-2">
                     <MessageSquare className="w-4 h-4" /> Write a Review
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        onClick={() => setRating(star)}
                        className={`w-5 h-5 cursor-pointer transition-colors ${rating >= star ? "fill-slate-900 text-slate-900" : "text-slate-300"}`} 
                      />
                    ))}
                  </div>
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was your stay?"
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-slate-400 bg-white resize-none mb-3 text-sm"
                    rows="2"
                  ></textarea>
                  <button 
                    onClick={() => reviewMutation.mutate({ rating, comment })}
                    disabled={reviewMutation.isPending || !comment.trim()}
                    className="bg-slate-900 hover:bg-black text-white text-sm font-semibold py-2 px-5 rounded-lg transition disabled:opacity-50"
                  >
                    {reviewMutation.isPending ? "Submitting..." : "Post Review"}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT COLUMN (Sticky Booking Card) ================= */}
          <div className="w-full lg:w-[350px] shrink-0  lg:block relative">
            
            <div className="sticky top-28 bg-white border border-slate-200 p-6 rounded-2xl shadow-[0_6px_16px_rgb(0,0,0,0.08)]">
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-[22px] font-semibold text-slate-900">₹{property.rent}</span>
                <span className="text-slate-500 text-[15px]"> month</span>
              </div>
              
              {/* Form Inputs (Compact) */}
              <div className="border border-slate-300 rounded-lg overflow-hidden mb-4 bg-white">
                <div className="flex border-b border-slate-300">
                  <div className="flex-1 p-2.5 border-r border-slate-300">
                    <label className="block text-[9px] font-bold uppercase text-slate-800 mb-0.5">Check-In</label>
                    <input type="date" className="w-full outline-none text-[13px] text-slate-700 bg-transparent cursor-pointer" />
                  </div>
                  <div className="flex-1 p-2.5">
                    <label className="block text-[9px] font-bold uppercase text-slate-800 mb-0.5">Checkout</label>
                    <input type="date" className="w-full outline-none text-[13px] text-slate-700 bg-transparent cursor-pointer" />
                  </div>
                </div>
                <div className="p-2.5">
                  <label className="block text-[9px] font-bold uppercase text-slate-800 mb-0.5">Guests</label>
                  <select className="w-full outline-none text-[13px] text-slate-700 bg-transparent cursor-pointer">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={() => bookingMutation.mutate()}
                disabled={bookingMutation.isPending}
                className="w-full bg-[#E51D53] hover:bg-[#D91B4E] text-white font-semibold py-3.5 rounded-lg transition-all mb-3 text-[15px]"
              >
                {bookingMutation.isPending ? "Processing..." : "Reserve"}
              </button>
              
              <p className="text-center text-slate-500 text-[13px] mb-4">
                You won't be charged yet
              </p>

            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;