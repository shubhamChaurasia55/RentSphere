import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Building2, Home, Palmtree, Trees, Waves, 
  Tent, Castle, Coffee, Sparkles, Key
} from "lucide-react";

const categories = [
  { label: "All", icon: Sparkles },
  { label: "Apartments", icon: Building2 },
  { label: "Houses", icon: Home },
  { label: "Villas", icon: Castle },
  { label: "Beachfront", icon: Waves },
  { label: "Cabins", icon: Trees },
  { label: "Tropical", icon: Palmtree },
  { label: "Camping", icon: Tent },
  { label: "Bed & Breakfast", icon: Coffee },
  { label: "New", icon: Key },
];

const CategorySlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the current category from the URL to highlight the active icon
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category") || "All";

  const handleCategoryClick = (label) => {
    // If they click "All", take them to the unfiltered properties page
    if (label === "All") {
      navigate("/properties");
    } else {
      // Otherwise, take them to the properties page with the category filter applied
      navigate(`/properties?category=${label}`);
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-20 z-40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div 
          className="flex items-center gap-8 overflow-x-auto pt-5 pb-4 snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />

          {categories.map((category) => {
            const Icon = category.icon;
            
            // Only highlight if we are actually ON the /properties page with that category
            const isActive = location.pathname.includes('/properties') && currentCategory === category.label;

            return (
              <button
                key={category.label}
                onClick={() => handleCategoryClick(category.label)}
                className={`flex flex-col items-center gap-2 min-w-max snap-start transition-all duration-300 ${
                  isActive 
                    ? "text-slate-900 border-b-2 border-slate-900 pb-2" 
                    : "text-gray-500 border-b-2 border-transparent pb-2 hover:text-slate-900 hover:border-gray-300"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-slate-900" : "text-gray-500"}`} />
                <span className={`text-sm font-medium ${isActive ? "text-slate-900" : "text-gray-500"}`}>
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CategorySlider;