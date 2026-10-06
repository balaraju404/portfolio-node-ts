import app from "./app.js"
import { config } from "./config/config.js"
import { connectDatabase } from "./config/database.js"

const startServer = async (): Promise<void> => {
 await connectDatabase()

 app.listen(config.server.port, () => {
  console.log(`Server running on http://localhost:${config.server.port}`)
 })
}

startServer()