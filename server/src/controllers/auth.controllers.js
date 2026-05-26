import userModel from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/password.utils.js";
import { generateToken } from "../utils/jwt.utils.js";

export const registerUser = async (req, res) =>{
    if(!req.body){
        return res.status(400).json({
            message: "Request body is empty. Send JSON with Content-Type: application/json"
        })
    }

    const {name, email, password, role} = req.body;

    const isAllreadyRegistered = await userModel.findOne({email})

    if(isAllreadyRegistered){
        return res.status(400).json({
            message: "Email allready registered"
        })
    }

    // Only allow tenant/landlord during registration — admin is assigned manually
    const allowedRoles = ["tenant", "landlord"];
    const safeRole = allowedRoles.includes(role) ? role : "tenant";

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role: safeRole
    })

    const token = generateToken(user, "1d")

    
    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })

}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isMatch = await comparePassword(password, user.password);

    if(!isMatch){
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = generateToken(user, "7d")

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message: "User logged in successfully",
        user,
        token
    })
}

export const getMe = async (req, res) => {
    const user = await userModel.findById(req.user._id).select("-password");

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        message: "User data fetched successfully",
        user
    })
}

export const logoutUser = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        message: "User logged out successfully"
    })
}
