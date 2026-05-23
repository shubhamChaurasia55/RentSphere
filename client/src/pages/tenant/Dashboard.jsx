import {

    useQuery

} from "@tanstack/react-query";

import {

    getMyBookings

} from "../../services/booking.service";

import {

    getFavorites

} from "../../services/favorite.service";

import {

    getNotifications

} from "../../services/notification.service";

import {

    Link

} from "react-router-dom";

import useAuthStore

    from "../../features/auth/authStore";

const TenantDashboard = () => {

    const { user } = useAuthStore();

    const {

        data: bookingsData

    } = useQuery({

        queryKey: ["my-bookings"],

        queryFn: getMyBookings

    });

    const {

        data: favoritesData

    } = useQuery({

        queryKey: ["favorites"],

        queryFn: getFavorites

    });

    const {

        data: notificationsData

    } = useQuery({

        queryKey: ["notifications"],

        queryFn: getNotifications

    });

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

                    Manage your bookings,

                    favorites and notifications

                </p>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6">

                <div className="border rounded-2xl p-6">

                    <h2 className="text-gray-500">

                        Total Bookings

                    </h2>

                    <p className="text-4xl font-bold mt-3">

                        {

                            bookingsData?.bookings?.length || 0

                        }

                    </p>

                </div>

                <div className="border rounded-2xl p-6">

                    <h2 className="text-gray-500">

                        Favorites

                    </h2>

                    <p className="text-4xl font-bold mt-3">

                        {

                            favoritesData?.favorites?.length || 0

                        }

                    </p>

                </div>

                <div className="border rounded-2xl p-6">

                    <h2 className="text-gray-500">

                        Notifications

                    </h2>

                    <p className="text-4xl font-bold mt-3">

                        {

                            notificationsData?.notifications?.length || 0

                        }

                    </p>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="flex gap-4">

                <Link
                    to="/tenant/bookings"
                    className="bg-black text-white px-6 py-3 rounded-xl"
                >
                    My Bookings
                </Link>

                <Link
                    to="/tenant/favorites"
                    className="border px-6 py-3 rounded-xl"
                >
                    Favorites
                </Link>

            </div>

            {/* Recent Bookings */}

            <div className="flex flex-col gap-5">

                <h2 className="text-2xl font-bold">

                    Recent Bookings

                </h2>

                {

                    bookingsData?.bookings
                        ?.slice(0, 3)
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

                                            booking.property?.city

                                        }

                                    </p>

                                </div>

                                <span className={`px-4 py-2 rounded-full text-sm

                                    ${booking.status === "pending"

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

    );

};

export default TenantDashboard;