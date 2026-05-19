import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { addToFavorites, getFavorites, removeFromFavorites } from "../controllers/favorites.controllers.js";

const favoriteRouter = Router();

favoriteRouter.post("/:propertyId", protect, authorizeRole("tenant"), addToFavorites);

favoriteRouter.get("/", protect, authorizeRole("tenant"), getFavorites);

favoriteRouter.delete("/:propertyId", protect, authorizeRole("tenant"), removeFromFavorites);



export default favoriteRouter;