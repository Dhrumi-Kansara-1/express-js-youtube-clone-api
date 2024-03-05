//main
import dotenv from "dotenv"
dotenv.config({
  path: "./.env",
})

import { connectDB } from "./db/index.js"
import { app } from "./app.js"

console.log("index.js - process.env:", process.env.CLOUDINARY_CLOUD_NAME)

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => {
      console.log(`Server is running at PORT : ${PORT}`)
    })
  })
  .catch((error) => {
    console.log("MongoDB connection failed!", error)
  })
