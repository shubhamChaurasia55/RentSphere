import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getPropertyById } from "../services/property.service";

const PropertyDetails = () => {

    const { id } = useParams();

    const {

        data,

        isLoading,

        error

    } = useQuery({

        queryKey: ["property", id],

        queryFn: () => getPropertyById(id)

    });

    if (isLoading) {

        return <div>Loading...</div>;

    }

    if (error) {

        return <div>Error loading property</div>;

    }

    const property = data.property;

    return (

        <div className="max-w-7xl mx-auto px-4 py-10">

            <div className="grid grid-cols-2 gap-4">

                {

                    property.images.map((image, index) => (

                        <img

                            key={index}

                            src={image}

                            alt={property.title}

                            className="w-full h-80 object-cover rounded-xl"

                        />

                    ))

                }

            </div>
            <div className="flex flex-col gap-4">

                <h1 className="text-4xl font-bold">

                    {property.title}

                </h1>

                <p className="text-gray-500">

                    {property.location}, {property.city}

                </p>

                <p className="text-2xl font-semibold">

                    ₹ {property.rent}/month

                </p>

                <div className="flex gap-6">

                    <span>{property.bedrooms} Beds</span>

                    <span>{property.bathrooms} Baths</span>

                    <span>

                        {property.furnished
                            ? "Furnished"
                            : "Unfurnished"}

                    </span>

                </div>

                <p className="text-gray-700">

                    {property.description}

                </p>

            </div>

            <div className="flex flex-wrap gap-3">

                {

                    property.amenities.map((item, index) => (

                        <span

                            key={index}

                            className="border px-4 py-2 rounded-full"

                        >

                            {item}

                        </span>

                    ))

                }

            </div>

            <button className="bg-black text-white px-6 py-3 rounded-xl">

                Request Booking

            </button>

            <div>

                <h2 className="text-2xl font-bold">

                    Reviews

                </h2>

            </div>

        </div>

    );

};

export default PropertyDetails;