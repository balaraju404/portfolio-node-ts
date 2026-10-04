import express from "express"
import routes from "./routes/index.js"
import { errorHandler } from "./common/middleware/error.handler.js"

const app = express()

app.use(express.json())

// API entry point
app.use("/api", routes)

app.get("/", (_req, res) => {
 res.json({ success: true, message: "API is running" })
})

app.use(errorHandler)

export default app