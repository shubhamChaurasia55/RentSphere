import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { addReview, getReviews, updateReview, deleteReview } from "../controllers/review.controllers.js";

const reviewRouter = Router();

reviewRouter.post("/:propertyId", protect, authorizeRole("tenant"), addReview);

reviewRouter.put("/:reviewId", protect, authorizeRole("tenant"), updateReview);

reviewRouter.delete("/:reviewId", protect, authorizeRole("tenant"), deleteReview);

reviewRouter.get("/:propertyId", getReviews);


export default reviewRouter;