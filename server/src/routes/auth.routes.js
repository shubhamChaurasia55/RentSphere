import {Router} from "express";
import {getMe, loginUser, logoutUser, registerUser} from "../controllers/auth.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/get-me", protect, getMe);
authRouter.post("/logout", protect, logoutUser)

// Example role-based routes:
// authRouter.get("/admin/dashboard", protect, authorizeRole("admin"), adminDashboard);
// authRouter.post("/property", protect, authorizeRole("landlord", "admin"), createProperty);
// authRouter.post("/booking", protect, authorizeRole("tenant"), createBooking);

export default authRouter;