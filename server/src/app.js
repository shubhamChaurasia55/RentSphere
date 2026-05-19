import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors())

app.use("/api/auth", authRoutes);

app.use("/api/property", propertyRoutes);

app.use("/api/booking", bookingRoutes);



export default app;