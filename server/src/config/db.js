import mongoose from "mongoose";
import config from "./config.js";

async function connectDB(){
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to db!");
    }catch(err){
        console.log("Something went wrong while connecting to db", err);
        process.exit(1);
    }
}

export default connectDB;