import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

import { createProperty, searchProperties } from "../controllers/property.controllers.js";
import { getMyProperties } from "../controllers/property.controllers.js";
import { updateProperty } from "../controllers/property.controllers.js";
import { deleteProperty } from "../controllers/property.controllers.js";
import { getAllProperties } from "../controllers/property.controllers.js";
import { getPropertyById } from "../controllers/property.controllers.js";

const propertyRouter = Router();

propertyRouter.post("/", protect, authorizeRole("landlord"), createProperty);

propertyRouter.get("/my-properties", protect, authorizeRole("landlord"), getMyProperties);

propertyRouter.put("/:id", protect, authorizeRole("landlord"), updateProperty);

propertyRouter.delete("/:id", protect, authorizeRole("landlord"), deleteProperty);



propertyRouter.get("/", getAllProperties);

propertyRouter.get("/search", searchProperties);

propertyRouter.get("/:id", getPropertyById);




export default propertyRouter;
