import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

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

    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },

    message: {
        type: String
    },

    moveInDate: Date

}, {
    timestamps: true
});

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;