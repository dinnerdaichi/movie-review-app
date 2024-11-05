import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const MONGO_URI = process.env.MONGO_URI;


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("接続成功");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;