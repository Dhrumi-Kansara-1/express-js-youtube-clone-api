//app
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
//routes import
import router from "../src/routes/index.js"

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
) 

app.use(express.json({ limit: "16kb" })) 
app.use(express.urlencoded({ extended: true, limit: "16kb" })) 
app.use(express.static("public")) 
app.use(cookieParser())

//routes declaration
app.use("/api/v1/",router)

export { app }
