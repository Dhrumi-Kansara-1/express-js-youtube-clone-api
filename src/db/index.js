//db connection
import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

export const connectDB = async () => {
  try {
    // const connectInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log("MongoDB connected!")
  } catch (error) {
    console.error("MongoDB connection ERROR: ", error)
    process.exit(1)
  }
}
