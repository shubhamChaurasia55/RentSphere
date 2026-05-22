import {

    useQuery

} from "@tanstack/react-query";

import {

    getMyBookings

} from "../../services/booking.service";

const MyBookings = () => {

    const {

        data,

        isLoading,

        error

    } = useQuery({

        queryKey: ["my-bookings"],

        queryFn: getMyBookings

    });

    if (isLoading) {

        return <div>Loading...</div>;

    }

    if (error) {

        return <div>Error loading bookings</div>;

    }

    return (

        <div className="p-10 flex flex-col gap-6">

            <h1 className="text-3xl font-bold">

                My Bookings

            </h1>

            {

                data?.bookings?.map(

                    (booking) => (

                        <div

                            key={booking._id}

                            className="border rounded-xl p-6 flex flex-col gap-4"

                        >

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

                            <div>

                                Status:

                                {" "}

                                <span className="font-semibold">

                                    {booking.status}

                                </span>

                            </div>

                        </div>

                    )

                )

            }

        </div>

    );

};

export default MyBookings;