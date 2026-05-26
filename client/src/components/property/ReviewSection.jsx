import { useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { Star } from "lucide-react";

import {
  addReview,
  getReviews,
} from "../../services/review.service";

const ReviewSection = ({ propertyId }) => {

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const {
    data: reviewsData,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", propertyId],
    queryFn: () => getReviews(propertyId),
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
        queryKey: ["reviews", propertyId],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to add review"
      );
    },
  });

  const handleSubmit = () => {
    reviewMutation.mutate({
      propertyId,

      reviewData: {
        rating,
        comment,
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        Reviews
      </h2>

      {/* ADD REVIEW */}
      <div className="bg-slate-50 rounded-3xl p-6 flex flex-col gap-5">

        <h3 className="text-xl font-semibold">
          Add Review
        </h3>

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-indigo-500"
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
          className="border border-gray-200 rounded-2xl px-4 py-4 min-h-[140px] outline-none focus:border-indigo-500"
        />

        <button
          onClick={handleSubmit}
          disabled={reviewMutation.isPending}
          className="w-fit bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white px-7 py-3 rounded-2xl font-semibold"
        >
          {reviewMutation.isPending
            ? "Submitting..."
            : "Submit Review"}
        </button>
      </div>

      {/* REVIEW LIST */}
      <div className="flex flex-col gap-5 mt-10">

        {isLoading ? (
          <p>Loading reviews...</p>
        ) : reviewsData?.reviews?.length ? (
          reviewsData.reviews.map((review) => (
            <div
              key={review._id}
              className="border border-gray-100 rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-4">

                <div>
                  <h3 className="font-semibold text-lg text-slate-900">
                    {review.tenant?.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Tenant Review
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-500" />

                  <span className="font-semibold">
                    {review.rating}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 leading-7">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No reviews yet
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;