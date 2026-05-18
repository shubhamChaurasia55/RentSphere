import userModel from "../models/user.model.js";
import { verifyToken } from "../utils/jwt.utils.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: Token not provided"
            });
        }

        const decoded = verifyToken(token);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token"
        });
    }
}