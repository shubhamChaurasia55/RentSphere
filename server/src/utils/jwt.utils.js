import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user, expiresIn = "7d") => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, config.JWT_SECRET, { expiresIn })
}

export const verifyToken = (token) => {
    return jwt.verify(token, config.JWT_SECRET)
}
