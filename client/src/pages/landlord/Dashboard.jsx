import {
    useQuery
} from "@tanstack/react-query";

import {
    Link
} from "react-router-dom";

import {
    getMyProperties
} from "../../services/property.service";

import {
    getBookingRequests
} from "../../services/booking.service";

import useAuthStore
from "../../features/auth/authStore";

const LandlordDashboard = () => {

    const { user } = useAuthStore();

    const {
        data: propertiesData
    } = useQuery({
        queryKey: ["my-properties"],
        queryFn: getMyProperties
    });

    const {
        data: bookingData
    } = useQuery({
        queryKey: ["booking-requests"],
        queryFn: getBookingRequests
    });

    const totalProperties =
        propertiesData?.properties?.length || 0;

    const totalRequests =
        bookingData?.bookings?.length || 0;

    const acceptedBookings =
        bookingData?.bookings?.filter(
            (booking) =>
                booking.status === "accepted"
        )?.length || 0;

    return (

        <div className="p-10 flex flex-col gap-10">

            {/* Header */}

            <div className="flex flex-col gap-2">

                <h1 className="text-4xl font-bold">

                    Welcome back,
                    {" "}
                    {user?.name}

                </h1>

                <p className="text-gray-500">

                    Manage properties,
                    bookings and requests

                </p>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6">

                <div className="border rounded-2xl p-6">

                    <h2 className="text-gray-500">
                        Total Properties
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {totalProperties}
                    </p>

                </div>

                <div className="border rounded-2xl p-6">

                    <h2 className="text-gray-500">
                        Booking Requests
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {totalRequests}
                    </p>

                </div>

                <div className="border rounded-2xl p-6">

                    <h2 className="text-gray-500">
                        Accepted Bookings
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {acceptedBookings}
                    </p>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="flex gap-4">

                <Link
                    to="/landlord/add-property"
                    className="bg-black text-white px-6 py-3 rounded-xl"
                >
                    Add Property
                </Link>

                <Link
                    to="/landlord/properties"
                    className="border px-6 py-3 rounded-xl"
                >
                    My Properties
                </Link>

                <Link
                    to="/landlord/booking-requests"
                    className="border px-6 py-3 rounded-xl"
                >
                    Booking Requests
                </Link>

            </div>

            {/* Recent Properties */}

            <div className="flex flex-col gap-5">

                <h2 className="text-2xl font-bold">

                    Recent Properties

                </h2>

                <div className="grid grid-cols-3 gap-6">

                    {
                        propertiesData?.properties
                            ?.slice(0, 3)
                            ?.map((property) => (

                                <div
                                    key={property._id}
                                    className="border rounded-2xl overflow-hidden"
                                >

                                    <img
                                        src={property.images?.[0]}
                                        alt={property.title}
                                        className="w-full h-52 object-cover"
                                    />

                                    <div className="p-5 flex flex-col gap-2">

                                        <h3 className="text-xl font-semibold">
                                            {property.title}
                                        </h3>

                                        <p className="text-gray-500">
                                            {property.city}
                                        </p>

                                        <p className="font-semibold">
                                            ₹ {property.rent}/month
                                        </p>

                                    </div>

                                </div>

                            ))
                    }

                </div>

            </div>

            {/* Recent Booking Requests */}

            <div className="flex flex-col gap-5">

                <h2 className="text-2xl font-bold">

                    Recent Booking Requests

                </h2>

                <div className="flex flex-col gap-4">

                    {
                        bookingData?.bookings
                            ?.slice(0, 5)
                            ?.map((booking) => (

                                <div
                                    key={booking._id}
                                    className="border rounded-xl p-5 flex justify-between items-center"
                                >

                                    <div>

                                        <h3 className="font-semibold text-lg">
                                            {
                                                booking.property?.title
                                            }
                                        </h3>

                                        <p className="text-gray-500">
                                            {
                                                booking.tenant?.name
                                            }
                                        </p>

                                    </div>

                                    <span className={`px-4 py-2 rounded-full text-sm

                                        ${
                                            booking.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : booking.status === "accepted"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }

                                    `}
                                    >

                                        {booking.status}

                                    </span>

                                </div>

                            ))
                    }

                </div>

            </div>

        </div>

    );

};

export default LandlordDashboard;