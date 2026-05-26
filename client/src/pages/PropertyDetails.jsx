import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Heart, MapPin, BedDouble, Bath, Sofa, Star, CalendarDays,
  Share, ChevronLeft, ChevronRight, Maximize, Home, Wind, 
  WashingMachine, Utensils, Refrigerator, Zap, ShieldCheck, 
  Car, ArrowUpDown, Dog, CheckCircle2, ChevronDown
} from "lucide-react";
import useAuthStore from "../features/auth/authStore";

// Replace these imports with your actual service paths
import { getPropertyById } from "../services/property.service";
import { createBooking } from "../services/booking.service";
import { addReview, getReviews } from "../services/review.service";
import { addToFavorites, removeFromFavorites } from "../services/favorite.service";

import NearbyProperties from "../components/property/NearbyProperties";

const PropertyDetails = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(user?.favorites?.includes(id));

  /* --- QUERIES & MUTATIONS (Kept from your original code) --- */
  const { data, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
  });

  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id),
  });

  const bookingMutation = useMutation({
    mutationFn: () => createBooking(id),
    onSuccess: () => toast.success("Booking request sent"),
    onError: (error) => toast.error(error?.response?.data?.message || "Booking failed"),
  });

  const favoriteMutation = useMutation({
    mutationFn: () => (isFavorite ? removeFromFavorites(id) : addToFavorites(id)),
    onSuccess: (resData) => {
      toast.success(resData.message || "Favorites updated");
      setIsFavorite(!isFavorite);
      const newFavorites = isFavorite
        ? user.favorites.filter((fav) => fav !== property._id)
        : [...(user.favorites || []), property._id];
      setUser({ ...user, favorites: newFavorites });
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Action failed"),
  });

  const reviewMutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      toast.success("Review added successfully");
      setRating(5);
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
    },
    onError: (error) => toast.error(error?.response?.data?.message || "Failed to add review"),
  });

  const handleReviewSubmit = () => {
    reviewMutation.mutate({ propertyId: id, reviewData: { rating, comment } });
  };

  /* --- RENDER STATES --- */
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center text-xl font-semibold">Loading...</div>;
  }
  if (error) {
    return <div className="h-screen flex items-center justify-center text-xl font-semibold text-red-500">Error loading property</div>;
  }

  const property = data?.property || {};

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* BREADCRUMBS & TOP ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="text-sm font-medium text-gray-500 flex items-center flex-wrap gap-2">
            <span className="hover:text-indigo-600 cursor-pointer">Home</span> 
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-indigo-600 cursor-pointer">Properties</span> 
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-indigo-600 cursor-pointer">{property.city || "Bangalore"}</span> 
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{property.title || "Modern 2BHK Apartment"}</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium">
            <button className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition">
              <Share className="w-4 h-4" /> Share
            </button>
            <button 
              onClick={() => favoriteMutation.mutate()}
              className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} /> 
              {isFavorite ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-8">
            
            {/* IMAGE GALLERY */}
            <div className="flex flex-col gap-3">
              {/* Main Image */}
              <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden group">
                <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-md z-10">
                  FEATURED
                </span>
                <img 
                  src={property.images?.[0] || "/api/placeholder/800/500"} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition opacity-0 group-hover:opacity-100">
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition opacity-0 group-hover:opacity-100">
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="relative h-20 sm:h-24 rounded-xl overflow-hidden cursor-pointer">
                    <img 
                      src={property.images?.[index] || `/api/placeholder/150/100`} 
                      alt={`Thumbnail ${index}`} 
                      className="w-full h-full object-cover hover:opacity-90 transition"
                    />
                    {index === 5 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium text-sm sm:text-base">
                        +18 Photos
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK STATS BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-gray-100 text-gray-700">
              <div className="flex items-center gap-3"><BedDouble className="w-5 h-5" /> <span className="font-medium">{property.bedrooms || 2} Bedrooms</span></div>
              <div className="flex items-center gap-3"><Bath className="w-5 h-5" /> <span className="font-medium">{property.bathrooms || 2} Bathrooms</span></div>
              <div className="flex items-center gap-3"><Maximize className="w-5 h-5" /> <span className="font-medium">{property.area || 1200} sq ft</span></div>
              <div className="flex items-center gap-3"><Home className="w-5 h-5" /> <span className="font-medium">Apartment</span></div>
              <div className="flex items-center gap-3"><Sofa className="w-5 h-5" /> <span className="font-medium">{property.furnished ? "Furnished" : "Unfurnished"}</span></div>
            </div>

            {/* ABOUT */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">About this property</h3>
              <p className="text-gray-600 leading-relaxed">
                {property.description || "Experience comfortable living in this beautiful apartment located in the heart of the city. This fully furnished apartment comes with modern amenities and a great view of the city. Perfect for families, working professionals, or anyone looking for a cozy and convenient home."}
              </p>
              <button className="text-indigo-600 font-medium mt-2 hover:underline flex items-center gap-1">
                Show more <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* AMENITIES */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6 gap-x-4">
                <div className="flex items-center gap-3 text-gray-700"><Wind className="w-5 h-5 text-gray-400" /> WiFi</div>
                <div className="flex items-center gap-3 text-gray-700"><Wind className="w-5 h-5 text-gray-400" /> AC</div>
                <div className="flex items-center gap-3 text-gray-700"><WashingMachine className="w-5 h-5 text-gray-400" /> Washing Machine</div>
                <div className="flex items-center gap-3 text-gray-700"><Utensils className="w-5 h-5 text-gray-400" /> Kitchen</div>
                <div className="flex items-center gap-3 text-gray-700"><Refrigerator className="w-5 h-5 text-gray-400" /> Refrigerator</div>
                <div className="flex items-center gap-3 text-gray-700"><Zap className="w-5 h-5 text-gray-400" /> Power Backup</div>
                <div className="flex items-center gap-3 text-gray-700"><ShieldCheck className="w-5 h-5 text-gray-400" /> 24/7 Security</div>
                <div className="flex items-center gap-3 text-gray-700"><Car className="w-5 h-5 text-gray-400" /> Parking</div>
                <div className="flex items-center gap-3 text-gray-700"><ArrowUpDown className="w-5 h-5 text-gray-400" /> Lift</div>
                <div className="flex items-center gap-3 text-gray-700"><Dog className="w-5 h-5 text-gray-400" /> Pet Friendly</div>
              </div>
            </div>

            {/* LOCATION & RULES */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-500 mb-4">{property.location || "Koramangala 4th Block, Bangalore, Karnataka 560034"}</p>
                <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
                   {/* Placeholder for map image */}
                   <img src="/api/placeholder/400/200" alt="Map" className="w-full h-full object-cover opacity-70" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-indigo-600 fill-indigo-100" />
                   </div>
                </div>
                <button className="w-full py-2.5 border border-gray-300 rounded-lg text-indigo-600 font-medium hover:bg-gray-50 transition">
                  View on Maps
                </button>
              </div>

              {/* House Rules */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">House Rules</h3>
                <div className="flex flex-col gap-4 text-gray-700">
                  <div className="flex items-center gap-3"><CalendarDays className="w-5 h-5 text-gray-400" /> Check-in after 12:00 PM</div>
                  <div className="flex items-center gap-3"><CalendarDays className="w-5 h-5 text-gray-400" /> Checkout before 11:00 AM</div>
                  <div className="flex items-center gap-3"><Wind className="w-5 h-5 text-gray-400" /> No smoking</div>
                  <div className="flex items-center gap-3"><Sofa className="w-5 h-5 text-gray-400" /> No parties or events</div>
                  <div className="flex items-center gap-3"><Dog className="w-5 h-5 text-gray-400" /> Pets allowed</div>
                </div>
                <button className="text-indigo-600 font-medium mt-4 hover:underline flex items-center gap-1">
                  View all rules <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (SIDEBAR) */}
          <div>
            <div className="sticky top-6 flex flex-col gap-6">
              
              {/* PRICING & BOOKING CARD */}
              <div className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-white">
                <div className="flex items-end gap-1 mb-4">
                  <h2 className="text-3xl font-bold text-indigo-600">₹{property.rent || "22,000"}</h2>
                  <span className="text-gray-500 mb-1">/ month</span>
                </div>
                
                <h1 className="text-xl font-bold text-gray-900 mb-2">{property.title || "Modern 2BHK Apartment"}</h1>
                <div className="flex items-center gap-1 text-gray-500 mb-4 text-sm">
                  <MapPin className="w-4 h-4" /> {property.location || "Koramangala, Bangalore"}
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{property.averageRating || "4.7"}</span>
                    <span className="text-gray-500 text-sm">({reviewsData?.reviews?.length || 128} Reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Check Availability</h3>
                  <div className="border border-gray-300 rounded-xl overflow-hidden mb-3">
                    <div className="flex border-b border-gray-300">
                      <div className="flex-1 p-3 border-r border-gray-300">
                        <label className="block text-xs font-bold text-gray-900 mb-1">Move In</label>
                        <input type="date" className="w-full outline-none text-sm text-gray-600 bg-transparent" />
                      </div>
                      <div className="flex-1 p-3">
                        <label className="block text-xs font-bold text-gray-900 mb-1">Move Out</label>
                        <input type="date" className="w-full outline-none text-sm text-gray-600 bg-transparent" />
                      </div>
                    </div>
                    <div className="p-3">
                      <label className="block text-xs font-bold text-gray-900 mb-1">Guests</label>
                      <select className="w-full outline-none text-sm text-gray-600 bg-transparent cursor-pointer">
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => bookingMutation.mutate()}
                  disabled={bookingMutation.isPending}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition mb-3"
                >
                  {bookingMutation.isPending ? "Processing..." : "Request Booking"}
                </button>
                <button className="w-full bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3.5 rounded-xl transition mb-4">
                  Contact Owner
                </button>
                <p className="text-center text-gray-500 text-sm flex items-center justify-center gap-1">
                  <CalendarDays className="w-4 h-4" /> Response time: Within a few hours
                </p>
              </div>

              {/* HOST INFO */}
              <div className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={property.owner?.avatar || "/api/placeholder/50/50"} 
                    alt="Host" 
                    className="w-14 h-14 rounded-full object-cover bg-gray-200"
                  />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Hosted by</p>
                    <h3 className="font-bold text-gray-900">{property.owner?.name || "Arjun Mehta"}</h3>
                    <p className="text-xs text-gray-500">Joined in Jan 2022</p>
                    <div className="flex items-center gap-1 mt-1 text-sm">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-700">4.8</span>
                      <span className="text-gray-500">(56 Reviews)</span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-2 border border-gray-300 rounded-lg text-indigo-600 font-medium hover:bg-gray-50 transition">
                  View Profile
                </button>
              </div>

              {/* WHY BOOK THIS PROPERTY */}
              <div className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-4">Why book this property?</h3>
                <div className="flex flex-col gap-3 text-sm text-gray-700">
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                    <p>Great location with easy access to IT parks, cafes & metro</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                    <p>Fully furnished with modern amenities</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                    <p>Safe & secure locality</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                    <p>Trusted by 100+ tenants</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* NEARBY PROPERTIES (Horizantal Scroll from Image) */}
        {property.city && <NearbyProperties city={property.city} />}
      </div>
    </div>
  );
};

export default PropertyDetails;