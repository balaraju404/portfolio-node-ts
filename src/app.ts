import express from "express"
import cors from "cors"
import routes from "./routes/index.js"
import { errorHandler } from "./common/middleware/error.handler.js"
import { config } from "./config/config.js"

const app = express()
console.log(config.cors.allowedOrigins);

app.use(
 cors({
  origin: (origin, callback) => {
   if (!origin || config.cors.allowedOrigins.includes(origin)) {
    callback(null, true)
   } else {
    callback(new Error("Not allowed by CORS"))
   }
  },
  credentials: true
 })
)

app.use(express.json())

// API entry point
app.use("/api", routes)

app.get("/", (_req, res) => {
 res.json({ success: true, message: "API is running" })
})

app.use(errorHandler)

export default app