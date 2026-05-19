import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { acceptBooking, getBookingRequests, getMyBookings, rejectBooking, requestBooking } from "../controllers/booking.controllers.js";

const bookingRouter = Router();

bookingRouter.post("/:propertyId", protect, authorizeRole("tenant"), requestBooking);

bookingRouter.get("/my-bookings", protect, authorizeRole("tenant"), getMyBookings);


bookingRouter.get("/requests", protect, authorizeRole("landlord"), getBookingRequests);

bookingRouter.patch("/:id/accept", protect, authorizeRole("landlord"), acceptBooking);

bookingRouter.patch("/:id/reject", protect, authorizeRole("landlord"), rejectBooking);




export default bookingRouter;