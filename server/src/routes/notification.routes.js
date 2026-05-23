import { Router } from "express";

import { protect }

from "../middlewares/auth.middleware.js";

import {

    getNotifications,

    markAsRead

} from "../controllers/notification.controllers.js";

const notificationRouter = Router();

notificationRouter.get(
    "/",
    protect,
    getNotifications
);

notificationRouter.patch(
    "/:id/read",
    protect,
    markAsRead
);

export default notificationRouter;