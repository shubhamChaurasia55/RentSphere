import { useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";

import toast from "react-hot-toast";

import { getPropertyById } from "../services/property.service";

import { createBooking } from "../services/booking.service";


import { addReview, getReviews } from "../services/review.service";


const PropertyDetails = () => {

    const { id } = useParams();

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const queryClient = useQueryClient();

    const {

        data,

        isLoading,

        error

    } = useQuery({

        queryKey: ["property", id],

        queryFn: () => getPropertyById(id)

    });

    const {

        data: reviewsData,

        isLoading: reviewsLoading

    } = useQuery({

        queryKey: ["reviews", id],

        queryFn: () => getReviews(id)

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

    const reviewMutation = useMutation({

        mutationFn: addReview,

        onSuccess: () => {

            toast.success(

                "Review added successfully"

            );

            setRating(5);

            setComment("");

            queryClient.invalidateQueries({

                queryKey: ["reviews", id]

            });

        },

        onError: (error) => {

            toast.error(

                error?.response?.data?.message ||

                "Failed to add review"

            );

        }

    });

    const handleReviewSubmit = () => {

        reviewMutation.mutate({

            propertyId: id,

            reviewData: {

                rating,

                comment

            }

        });

    };

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

            {/* Reviews Section */}

            <div className="flex flex-col gap-8">

                <h2 className="text-3xl font-bold">

                    Reviews

                </h2>

                {/* Add Review Form */}

                <div className="border rounded-2xl p-6 flex flex-col gap-4">

                    <h3 className="text-xl font-semibold">

                        Add Review

                    </h3>

                    <select

                        value={rating}

                        onChange={(e) =>

                            setRating(

                                Number(e.target.value)

                            )

                        }

                        className="border p-3 rounded-lg"

                    >

                        <option value={5}>5 Stars</option>

                        <option value={4}>4 Stars</option>

                        <option value={3}>3 Stars</option>

                        <option value={2}>2 Stars</option>

                        <option value={1}>1 Star</option>

                    </select>

                    <textarea

                        placeholder="Write your review..."

                        value={comment}

                        onChange={(e) =>

                            setComment(e.target.value)

                        }

                        className="border p-4 rounded-lg"

                    />

                    <button

                        className="bg-black text-white px-6 py-3 rounded-xl w-fit"

                        onClick={handleReviewSubmit}

                        disabled={reviewMutation.isPending}

                    >

                        {

                            reviewMutation.isPending

                                ? "Submitting..."

                                : "Submit Review"

                        }

                    </button>

                </div>

                {/* Review List */}

                {

                    reviewsLoading ? (

                        <p>Loading reviews...</p>

                    ) : (

                        <div className="flex flex-col gap-5">

                            {

                                reviewsData?.reviews?.map(

                                    (review) => (

                                        <div

                                            key={review._id}

                                            className="border rounded-2xl p-5 flex flex-col gap-3"

                                        >

                                            <div className="flex items-center justify-between">

                                                <h3 className="font-semibold text-lg">

                                                    {

                                                        review.tenant?.name

                                                    }

                                                </h3>

                                                <span className="font-semibold">

                                                    ⭐ {review.rating}

                                                </span>

                                            </div>

                                            <p className="text-gray-700">

                                                {review.comment}

                                            </p>

                                        </div>

                                    )

                                )

                            }

                            {

                                !reviewsData?.reviews?.length && (

                                    <p className="text-gray-500">

                                        No reviews yet

                                    </p>

                                )

                            }

                        </div>

                    )

                }

            </div>

        </div>

    );

};

export default PropertyDetails;