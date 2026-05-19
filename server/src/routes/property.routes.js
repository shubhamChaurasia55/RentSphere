import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

import { createProperty, searchProperties } from "../controllers/property.controllers.js";
import { getMyProperties } from "../controllers/property.controllers.js";
import { updateProperty } from "../controllers/property.controllers.js";
import { deleteProperty } from "../controllers/property.controllers.js";
import { getAllProperties } from "../controllers/property.controllers.js";
import { getPropertyById } from "../controllers/property.controllers.js";
import upload from "../middlewares/upload.middleware.js";

const propertyRouter = Router();

propertyRouter.post("/", protect, authorizeRole("landlord"), upload.array("images", 5), createProperty);

propertyRouter.get("/my-properties", protect, authorizeRole("landlord"), getMyProperties);

propertyRouter.put("/:id", protect, authorizeRole("landlord"), updateProperty);

propertyRouter.delete("/:id", protect, authorizeRole("landlord"), deleteProperty);



propertyRouter.get("/", getAllProperties);

propertyRouter.get("/search", searchProperties);

propertyRouter.get("/:id", getPropertyById);




export default propertyRouter;
