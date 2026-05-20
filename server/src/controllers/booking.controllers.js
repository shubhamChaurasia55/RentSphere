import bookingModel from "../models/booking.model.js";
import propertyModel from "../models/property.model.js";

export const requestBooking = async (req, res) => {
    const {propertyId} = req.params;

    const property = await propertyModel.findById(propertyId);

    if(!property){
        return res.status(404).json({
            message: "Property not found"
        });
    }

    const booking = await bookingModel.create({
        property: property._id,
        tenant: req.user._id,
        landlord: property.owner,
        status: "pending",
        message: req.body?.message,
        moveInDate: req.body?.moveInDate
    });

    return res.status(201).json({
        message: "Booking request sent successfully",
        booking
    });

}

export const getMyBookings = async (req, res) => {
    const myBookings = await bookingModel.find({
        tenant: req.user._id
    }).populate("property", "_id title images");

    return res.status(200).json({
        message: "My bookings fetched successfully",
        count: myBookings.length,
        bookings: myBookings
    });
}

export const getBookingRequests = async (req, res) => {
    const bookingRequests = await bookingModel.find({
        landlord: req.user._id
    }).populate("property", "_id title images").populate("tenant", "_id name email");

    return res.status(200).json({
        message: "Booking requests fetched successfully",
        count: bookingRequests.length,
        requests: bookingRequests
    });
}

export const acceptBooking = async (req, res) => {
    const {id} = req.params;

    const booking = await bookingModel.findById(id);

    if(!booking){
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    // Only the landlord who owns this booking can accept it
    if(booking.landlord.toString() !== req.user._id.toString()){
        return res.status(403).json({
            message: "Unauthorized - You can only manage your own bookings"
        });
    }

    // Only pending bookings can be accepted
    if(booking.status !== "pending"){
        return res.status(400).json({
            message: `Booking already ${booking.status}`
        });
    }

    booking.status = "accepted";
    await booking.save();

    return res.status(200).json({
        message: "Booking accepted successfully",
        booking
    });
}

export const rejectBooking = async (req, res) => {
    const {id} = req.params;

    const booking = await bookingModel.findById(id);

    if(!booking){
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    // Only the landlord who owns this booking can reject it
    if(booking.landlord.toString() !== req.user._id.toString()){
        return res.status(403).json({
            message: "Unauthorized - You can only manage your own bookings"
        });
    }

    // Only pending bookings can be rejected
    if(booking.status !== "pending"){
        return res.status(400).json({
            message: `Booking already ${booking.status}`
        });
    }

    booking.status = "rejected";
    await booking.save();

    return res.status(200).json({
        message: "Booking rejected successfully",
        booking
    });
}


