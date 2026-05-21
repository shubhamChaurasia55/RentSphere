import { Link } from "react-router-dom";

const DashboardPropertyCard = ({

    property,

    onDelete

}) => {

    return (

        <div className="border rounded-2xl overflow-hidden">

            <img

                src={property.images?.[0]}

                alt={property.title}

                className="w-full h-52 object-cover"

            />

            <div className="p-4 flex flex-col gap-3">

                <h2 className="text-xl font-semibold">

                    {property.title}

                </h2>

                <p className="text-gray-500">

                    {property.city}

                </p>

                <p className="font-bold">

                    ₹ {property.rent}/month

                </p>

                <div className="flex gap-3">

                    <Link

                        to={`/landlord/edit-property/${property._id}`}

                        className="border px-4 py-2 rounded-lg"

                    >

                        Edit

                    </Link>

                    <button

                        onClick={() => onDelete(property._id)}

                        className="bg-red-500 text-white px-4 py-2 rounded-lg"

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

};

export default DashboardPropertyCard;