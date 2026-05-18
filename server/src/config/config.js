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

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT
}

export default config;