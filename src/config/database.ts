import mongoose from "mongoose"
import { config } from "./config.js"

const connectDatabase = async (): Promise<void> => {
 if (mongoose.connection.readyState === 1) {
  return
 }

 const { username, password, cluster, database } = config.database

 if (!username || !password || !cluster || !database) {
  throw new Error("MongoDB configuration is incomplete. Please check your environment variables.")
 }

 const encodedUsername = encodeURIComponent(username)
 const encodedPassword = encodeURIComponent(password)

 const mongoUri = `mongodb+srv://${encodedUsername}:${encodedPassword}@${cluster}/${database}`

 try {
  await mongoose.connect(mongoUri, {
   serverSelectionTimeoutMS: 30000
  })

  console.log("MongoDB connected successfully")
  console.log(`Database: ${mongoose.connection.name}`)
 } catch (error) {
  console.error("MongoDB connection failed:", error)
  throw error
 }
}

export { connectDatabase }