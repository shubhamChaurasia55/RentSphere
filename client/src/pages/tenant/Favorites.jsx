import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Heart, Loader2, AlertCircle } from "lucide-react";

// Import your reusable card component
import PropertyCard from "../../components/property/PropertyCard";
import { getFavorites } from "../../services/favorite.service";

const Favorites = () => {
    
    // We only need to fetch the data. The PropertyCard handles the mutations!
    const { data, isLoading, error } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites
    });

    const favorites = data?.favorites || [];

    return (
        <div className="min-h-[101vh] bg-slate-50 py-10">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* HEADER (Styled like the /properties page) */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Saved Properties
                    </h1>
                    <span className="text-gray-500 font-medium text-sm">
                        {favorites.length} {favorites.length === 1 ? 'result' : 'results'}
                    </span>
                </div>

                {/* CONDITIONAL RENDERING (Loading / Error / Empty / Grid) */}
                {isLoading ? (
                    
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                        <p className="font-semibold text-lg">Loading your favorites...</p>
                    </div>

                ) : error ? (

                    <div className="flex flex-col items-center justify-center py-20 text-red-500 bg-red-50 rounded-3xl border border-red-100">
                        <AlertCircle className="w-10 h-10 mb-4" />
                        <p className="font-semibold text-lg">Failed to load favorites.</p>
                    </div>

                ) : favorites.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
                        <div className="bg-red-50 p-5 rounded-full mb-5">
                            <Heart className="w-8 h-8 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No favorites yet</h3>
                        <p className="text-gray-500 max-w-sm text-center mb-6">
                            You haven't saved any properties to your favorites. Start exploring and save the ones you love!
                        </p>
                        <Link 
                            to="/properties" 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
                        >
                            Explore Properties
                        </Link>
                    </div>

                ) : (
                    
                    /* EXACT SAME GRID AS THE PROPERTIES PAGE */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {favorites.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                    
                )}
            </div>
        </div>
    );
};

export default Favorites;