import { useQuery } from "@tanstack/react-query";

import { getProperties } from "../services/property.service";

import PropertyGrid from "../components/property/PropertyGrid";

const Home = () => {

    const {

        data,

        isLoading,

        error

    } = useQuery({

        queryKey: ["properties"],

        queryFn: getProperties

    });

    if (isLoading) {

        return (

            <div className="p-10">

                Loading properties...

            </div>

        );

    }

    if (error) {

        return (

            <div className="p-10">

                Failed to load properties

            </div>

        );

    }

    if (!data?.properties?.length) {

        return (

            <div className="p-10">

                No properties found

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-4 py-10">

            <h1 className="text-4xl font-bold mb-8">

                Explore Properties

            </h1>

            <PropertyGrid
                properties={data.properties}
            />

        </div>

    );

};

export default Home;