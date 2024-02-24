//main
import dotenv from "dotenv"
import { connectDB } from "./db/index.js"
import { app } from "./app.js"

dotenv.config()

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 4000 
    app.listen(PORT, console.log(`Server started on PORT: ${PORT}`))
  })
  .catch((error) => {
    console.log("MongoDB connection failed!", error)
  })
