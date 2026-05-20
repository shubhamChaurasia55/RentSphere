import reviewModel from "../models/review.model.js";
import propertyModel from "../models/property.model.js";
import bookingModel from "../models/booking.model.js";
import mongoose from "mongoose";


const updatePropertyRating = async (propertyId) => {

    try {

        const reviews = await reviewModel.aggregate([

            {
                $match: {
                    property: new mongoose.Types.ObjectId(propertyId),
                },
            },

            {
                $group: {
                    _id: null,
                    totalRating: { $sum: "$rating" },
                    totalReviews: { $sum: 1 },
                },
            },

        ]);

        const totalRating = reviews[0]?.totalRating || 0;
        const totalReviews = reviews[0]?.totalReviews || 0;

        const averageRating =
            totalReviews > 0
                ? Number((totalRating / totalReviews).toFixed(1))
                : 0;

        await propertyModel.findByIdAndUpdate(propertyId, {
            averageRating,
            totalReviews
        });

    } catch (error) {

        console.error(error);

    }

};

export const addReview = async (req, res) => {

    try {
        const { propertyId } = req.params;
        const { rating, comment } = req.body;
        const tenantId = req.user._id;

        // check if user has booked the property
        const booking = await bookingModel.findOne({ property: propertyId, tenant: tenantId, status: "accepted" });

        if (!booking) {
            return res.status(400).json({
                success: false,
                message: "You can only review properties that you have booked"
            });
        }

        // check if user has already reviewed the property
        const review = await reviewModel.findOne({ property: propertyId, tenant: tenantId });

        if (review) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this property"
            });
        }

        // create review
        const newReview = new reviewModel({
            property: propertyId,
            tenant: tenantId,
            rating,
            comment
        });

        await newReview.save();

        await updatePropertyRating(propertyId);

        return res.status(200).json({
            success: true,
            message: "Review added successfully",
            review: newReview
        });
        
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
        
    

}

export const getReviews = async (req, res) => {

    try {
        const { propertyId } = req.params;
        const reviews = await reviewModel.find({ property: propertyId }).populate("tenant", "name");
        return res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            reviews
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export const updateReview = async (req, res) => {

    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const tenantId = req.user._id;

        // check if review belongs to the user
        const review = await reviewModel.findById(reviewId);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.tenant.toString() !== tenantId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this review"
            });
        }

        // update review
        review.rating = rating;
        review.comment = comment;
        await review.save();

        await updatePropertyRating(review.property);

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export const deleteReview = async (req, res) => {

    try {
        const { reviewId } = req.params;
        const tenantId = req.user._id;

        // check if review belongs to the user
        const review = await reviewModel.findById(reviewId);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.tenant.toString() !== tenantId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this review"
            });
        }

        // delete review
        await review.deleteOne();


        await updatePropertyRating(review.property);

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}
