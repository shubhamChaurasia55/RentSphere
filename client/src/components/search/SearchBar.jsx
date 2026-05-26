import {

    useState

} from "react";

import {

    useSearchParams

} from "react-router-dom";

const SearchBar = () => {

    const [

        searchParams,

        setSearchParams

    ] = useSearchParams();

    const [

        keyword,

        setKeyword

    ] = useState(

        searchParams.get("keyword") || ""

    );

    const handleSearch = () => {

        const params = Object.fromEntries(

            [...searchParams]

        );

        if (keyword) {

            params.keyword = keyword;

        } else {

            delete params.keyword;

        }

        setSearchParams(params);

    };

    return (

        <div className="flex gap-3">

            <input

                type="text"

                placeholder="Search properties..."

                value={keyword}

                onChange={(e) =>

                    setKeyword(e.target.value)

                }

                className="border border-slate-400 rounded-xl px-4 py-3 w-full bg-white text-black"

            />

            <button

                onClick={handleSearch}

                className="border border-slate-400 rounded-xl px-6 py-3 bg-white text-black"

            >   

                Search

            </button>

        </div>

    );

};

export default SearchBar;