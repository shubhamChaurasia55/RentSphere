import { useParams } from "react-router-dom";

import {

    useMutation,

    useQuery

} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {

    getPropertyById

} from "../services/property.service";

import {

    createBooking

} from "../services/booking.service";

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

    const bookingMutation = useMutation({

        mutationFn: () => createBooking(id),

        onSuccess: () => {

            toast.success(

                "Booking request sent"

            );

        },

        onError: (error) => {

            toast.error(

                error?.response?.data?.message ||

                "Booking failed"

            );

        }

    });

    if (isLoading) {

        return <div>Loading...</div>;

    }

    if (error) {

        return <div>Error loading property</div>;

    }

    const property = data?.property;

    return (

        <div className="max-w-7xl mx-auto p-10 flex flex-col gap-8">

            <div className="grid grid-cols-2 gap-4">

                {

                    property.images?.map(

                        (image, index) => (

                            <img

                                key={index}

                                src={image}

                                alt={property.title}

                                className="w-full h-80 object-cover rounded-xl"

                            />

                        )

                    )

                }

            </div>

            <div className="flex flex-col gap-4">

                <h1 className="text-4xl font-bold">

                    {property.title}

                </h1>

                <p>

                    {property.location},

                    {" "}

                    {property.city}

                </p>

                <p className="text-2xl font-semibold">

                    ₹ {property.rent}/month

                </p>

                <p>

                    {property.description}

                </p>

            </div>

            <button

                className="bg-black text-white px-6 py-3 rounded-xl w-fit"

                onClick={() =>

                    bookingMutation.mutate()

                }

                disabled={bookingMutation.isPending}

            >

                {

                    bookingMutation.isPending

                        ? "Sending..."

                        : "Request Booking"

                }

            </button>

        </div>

    );

};

export default PropertyDetails;