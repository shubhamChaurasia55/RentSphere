import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },

    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    comment: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;