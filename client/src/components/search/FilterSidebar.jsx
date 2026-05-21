import {

    useState

} from "react";

import {

    useSearchParams

} from "react-router-dom";

const FilterSidebar = () => {

    const [

        searchParams,

        setSearchParams

    ] = useSearchParams();

    const [

        city,

        setCity

    ] = useState(

        searchParams.get("city") || ""

    );

    const [

        bedrooms,

        setBedrooms

    ] = useState(

        searchParams.get("bedrooms") || ""

    );

    const [

        furnished,

        setFurnished

    ] = useState(

        searchParams.get("furnished") || ""

    );

    const applyFilters = () => {

        const params = {};

        if (city) {

            params.city = city;

        }

        if (bedrooms) {

            params.bedrooms = bedrooms;

        }

        if (furnished) {

            params.furnished = furnished;

        }

        setSearchParams(params);

    };

    return (

        <div className="flex flex-col gap-5">

            <div>

                <label>City</label>

                <input

                    type="text"

                    value={city}

                    onChange={(e) =>

                        setCity(e.target.value)

                    }

                    className="border px-4 py-2 rounded-lg w-full"

                />

            </div>

            <div>

                <label>Bedrooms</label>

                <select

                    value={bedrooms}

                    onChange={(e) =>

                        setBedrooms(e.target.value)

                    }

                    className="border px-4 py-2 rounded-lg w-full"

                >

                    <option value="">

                        Any

                    </option>

                    <option value="1">

                        1

                    </option>

                    <option value="2">

                        2

                    </option>

                    <option value="3">

                        3

                    </option>

                </select>

            </div>

            <div>

                <label>Furnished</label>

                <select

                    value={furnished}

                    onChange={(e) =>

                        setFurnished(e.target.value)

                    }

                    className="border px-4 py-2 rounded-lg w-full"

                >

                    <option value="">

                        Any

                    </option>

                    <option value="true">

                        Furnished

                    </option>

                    <option value="false">

                        Unfurnished

                    </option>

                </select>

            </div>

            <button

                onClick={applyFilters}

                className="bg-black text-white py-3 rounded-xl"

            >

                Apply Filters

            </button>

        </div>

    );

};

export default FilterSidebar;