import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBar = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); // <-- Added useNavigate
    
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

    const handleSearch = (e) => {
        e.preventDefault(); 
        
        // 1. Copy current URL parameters (preserves existing filters if they are already on /properties)
        const params = new URLSearchParams(searchParams);
        
        // 2. Set or remove the keyword
        if (keyword.trim()) {
            params.set("keyword", keyword.trim());
        } else {
            params.delete("keyword");
        }
        
        // 3. FORCE navigation to the /properties page with the new parameters
        navigate(`/properties?${params.toString()}`);
    };

    return (
        <form 
            onSubmit={handleSearch}
            className="relative flex items-center w-full min-w-[250px] lg:min-w-[300px] group"
        >
            {/* SEARCH ICON */}
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>

            {/* INPUT FIELD */}
            <input
                type="text"
                placeholder="Search by city, title, or location..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-transparent rounded-full text-sm text-slate-900 placeholder-slate-500 focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300"
            />
            
            {/* HIDDEN SUBMIT BUTTON (Allows pressing 'Enter' to search) */}
            <button type="submit" className="hidden">Search</button>
        </form>
    );
};

export default SearchBar;