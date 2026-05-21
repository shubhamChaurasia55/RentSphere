import {Router} from "express";
import {getMe, loginUser, logoutUser, registerUser} from "../controllers/auth.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/get-me", protect, getMe);
authRouter.post("/logout", protect, logoutUser)

export default authRouter;