import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import reviewRoutes from "./routes/review.routes.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors())


app.use("/api/auth", authRoutes);

app.use("/api/property", propertyRoutes);

app.use("/api/booking", bookingRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/review", reviewRoutes);




export default app;