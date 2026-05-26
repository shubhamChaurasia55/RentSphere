import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { 
    MapPin, 
    BedDouble, 
    Bath, 
    Maximize, 
    Star, 
    Trash2, 
    Home 
} from "lucide-react";

import { getFavorites, removeFromFavorites } from "../../services/favorite.service";
import useAuthStore from "../../features/auth/authStore";

const Favorites = () => {
    const queryClient = useQueryClient();
    
    // 1. Bring in Zustand store to update the Navbar
    const { user, setUser } = useAuthStore();

    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites
    });

    const removeMutation = useMutation({
        mutationFn: removeFromFavorites,

        // 2. Access the propertyId (variables) passed into the mutation
        onSuccess: (responseData, propertyId) => {
            toast.success(responseData.message || "Removed from favorites");

            // Update the screen by refetching the favorites list
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            });

            // Update the Zustand store so the Navbar counter changes INSTANTLY
            if (user && user.favorites) {
                setUser({
                    ...user,
                    favorites: user.favorites.filter((id) => id !== propertyId)
                });
            }
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to remove favorite"
            );
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-lg font-semibold text-gray-500">
                Loading your favorites...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-lg font-semibold text-red-500">
                Error loading favorites. Please try again.
            </div>
        );
    }

    const favorites = data?.favorites || [];

    return (
        <div className="bg-slate-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Saved Properties
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
                    </p>
                </div>

                {/* EMPTY STATE */}
                {favorites.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center shadow-sm min-h-[40vh]">
                        <div className="bg-indigo-50 p-4 rounded-full mb-4">
                            <Home className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">No favorites yet</h2>
                        <p className="text-gray-500 max-w-md mb-6">
                            You haven't saved any properties to your favorites. Start exploring and save the ones you love!
                        </p>
                        <Link 
                            to="/" 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md"
                        >
                            Explore Properties
                        </Link>
                    </div>
                ) : (
                    
                    /* GRID LAYOUT */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((property) => (
                            
                            /* INDIVIDUAL CARD (Matching your new design) */
                            <div 
                                key={property._id} 
                                className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white relative group flex flex-col"
                            >
                                {/* IMAGE SECTION */}
                                <div className="relative h-56 block overflow-hidden">
                                    
                                    {/* STATUS BADGE */}
                                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg z-10 uppercase shadow-sm">
                                        {property.status || "Listed"}
                                    </span>

                                    {/* REMOVE BUTTON */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeMutation.mutate(property._id);
                                        }}
                                        disabled={removeMutation.isPending}
                                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 rounded-xl z-10 shadow-sm transition-all duration-300 group/btn"
                                        title="Remove from favorites"
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-400 group-hover/btn:text-red-500 transition-colors" />
                                    </button>

                                    {/* IMAGE LINK */}
                                    <Link to={`/property/${property._id}`}>
                                        <img
                                            src={property.images?.[0] || "/api/placeholder/400/300"}
                                            alt={property.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                </div>

                                {/* CONTENT SECTION */}
                                <Link to={`/property/${property._id}`} className="p-5 flex flex-col flex-grow">
                                    
                                    {/* TITLE & LOCATION */}
                                    <h4 className="font-bold text-gray-900 text-lg line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors">
                                        {property.title}
                                    </h4>
                                    
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4 truncate">
                                        <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                                        <span className="truncate">{property.location}, {property.city}</span>
                                    </div>
                                    
                                    {/* PRICE */}
                                    <div className="mt-auto">
                                        <div className="text-xl font-bold text-indigo-600 mb-4">
                                            ₹{property.rent}{" "}
                                            <span className="text-sm text-gray-500 font-medium">/ month</span>
                                        </div>
                                        
                                        {/* FEATURES FOOTER */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
                                            <span className="flex items-center gap-1.5">
                                                <BedDouble className="w-4 h-4 text-gray-400" /> {property.bedrooms || 0}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Bath className="w-4 h-4 text-gray-400" /> {property.bathrooms || 0}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Maximize className="w-4 h-4 text-gray-400" /> {property.area || 1200} sqft
                                            </span>
                                            <span className="flex items-center gap-1 text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md">
                                                <Star className="w-3 h-3 fill-green-600" /> {property.averageRating || 0}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;