import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { getProperties } from "../../services/property.service";

const NearbyProperties = ({ city }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["properties", city],
    queryFn: () =>
      getProperties({
        city,
        limit: 5, // Request max 5 properties
      }),
  });

  if (isLoading) {
    return null;
  }

  // Ensure we only map a maximum of 5 items just in case the API returns more
  const properties = data?.properties?.slice(0, 5) || [];

  if (!properties.length) {
    return null; 
  }

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 w-full overflow-hidden">
      
      <div className="flex items-center justify-between mb-6 pr-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Nearby Properties
        </h2>

        <button className="text-indigo-600 font-medium hover:underline flex items-center gap-1">
          View all <span className="hidden sm:inline">properties</span> <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* HORIZONTAL SCROLL CAROUSEL */}
      <div 
        className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides scrollbar in Firefox/IE
      >
        {/* Hide webkit scrollbar */}
        <style dangerouslySetInnerHTML={{__html: `
          ::-webkit-scrollbar { display: none; }
        `}} />

        {properties.map((property) => (
          <div 
            key={property._id} 
            className="min-w-[280px] sm:min-w-[320px] max-w-[320px] flex-none snap-start"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default NearbyProperties;