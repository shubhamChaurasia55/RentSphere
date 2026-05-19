import dotenv from "dotenv";

dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI not found");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET not found");
}

if(!process.env.PORT){
    throw new Error("PORT not found");
}

if(!process.env.CLOUDINARY_CLOUD_NAME){
    throw new Error("CLOUDINARY_CLOUD_NAME not found");
}

if(!process.env.CLOUDINARY_API_KEY){
    throw new Error("CLOUDINARY_API_KEY not found");
}

if(!process.env.CLOUDINARY_API_SECRET){
    throw new Error("CLOUDINARY_API_SECRET not found");
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}

export default config;