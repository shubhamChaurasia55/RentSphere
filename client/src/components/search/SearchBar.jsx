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

                className="border rounded-xl px-4 py-3 w-full"

            />

            <button

                onClick={handleSearch}

                className="bg-black text-white px-6 rounded-xl"

            >

                Search

            </button>

        </div>

    );

};

export default SearchBar;