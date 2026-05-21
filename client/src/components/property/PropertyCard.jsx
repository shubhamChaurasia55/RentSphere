import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {

    return (

        <Link
            to={`/property/${property._id}`}
            className="border rounded-2xl overflow-hidden hover:shadow-lg transition block"
        >

            <img

                src={property.images?.[0]}

                alt={property.title}

                className="w-full h-56 object-cover"

            />

            <div className="p-4 flex flex-col gap-2">

                <h2 className="text-xl font-semibold">

                    {property.title}

                </h2>

                <p className="text-gray-500">

                    {property.city}

                </p>

                <p className="font-bold text-lg">

                    ₹ {property.rent}/month

                </p>

                <div className="flex gap-4 text-sm text-gray-600">

                    <span>

                        {property.bedrooms} Beds

                    </span>

                    <span>

                        {property.bathrooms} Baths

                    </span>

                </div>

            </div>

        </Link>

    );

};

export default PropertyCard;