import {

    useMutation,

    useQuery,

    useQueryClient

} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {

    acceptBooking,

    getBookingRequests,

    rejectBooking

} from "../../services/booking.service";

const BookingRequests = () => {

    const queryClient = useQueryClient();

    const {

        data,

        isLoading,

        error

    } = useQuery({

        queryKey: ["booking-requests"],

        queryFn: getBookingRequests

    });

    const acceptMutation = useMutation({

        mutationFn: acceptBooking,

        onSuccess: () => {

            toast.success(

                "Booking accepted"

            );

            queryClient.invalidateQueries({

                queryKey: ["booking-requests"]

            });

        }

    });

    const rejectMutation = useMutation({

        mutationFn: rejectBooking,

        onSuccess: () => {

            toast.success(

                "Booking rejected"

            );

            queryClient.invalidateQueries({

                queryKey: ["booking-requests"]

            });

        }

    });

    if (isLoading) {

        return <div>Loading...</div>;

    }

    if (error) {

        return <div>Error loading requests</div>;

    }

    return (

        <div className="p-10 flex flex-col gap-6">

            <h1 className="text-3xl font-bold">

                Booking Requests

            </h1>

            {

                !data?.bookings?.length && (

                    <p>

                        No booking requests

                    </p>

                )

            }

            {

                data?.bookings?.map(

                    (booking) => (

                        <div

                            key={booking._id}

                            className="border rounded-xl p-6 flex flex-col gap-4"

                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="text-2xl font-semibold">

                                        {

                                            booking.property?.title

                                        }

                                    </h2>

                                    <p>

                                        {

                                            booking.property?.location

                                        }

                                    </p>

                                    <p>

                                        ₹ {

                                            booking.property?.rent

                                        }/month

                                    </p>

                                </div>

                                <span className={`px-4 py-2 rounded-full text-sm font-semibold

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

                            <div className="flex flex-col gap-1">

                                <p className="font-medium">

                                    Tenant

                                </p>

                                <p>

                                    {

                                        booking.tenant?.name

                                    }

                                </p>

                                <p>

                                    {

                                        booking.tenant?.email

                                    }

                                </p>

                            </div>

                            {

                                booking.status === "pending" && (

                                    <div className="flex gap-4">

                                        <button

                                            className="bg-green-600 text-white px-5 py-2 rounded-lg"

                                            onClick={() =>

                                                acceptMutation.mutate(

                                                    booking._id

                                                )

                                            }

                                        >

                                            Accept

                                        </button>

                                        <button

                                            className="bg-red-600 text-white px-5 py-2 rounded-lg"

                                            onClick={() =>

                                                rejectMutation.mutate(

                                                    booking._id

                                                )

                                            }

                                        >

                                            Reject

                                        </button>

                                    </div>

                                )

                            }

                        </div>

                    )

                )

            }

        </div>

    );

};

export default BookingRequests;