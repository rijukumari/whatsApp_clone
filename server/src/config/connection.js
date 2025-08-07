import mongoose from "mongoose";
import User from "../models/user.model.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(" ✅ Database connected successfully");
  } catch (error) {
    console.log(" ❌ Database is not connected", error);
  }
};

export default connectDB;
