import mongoose from "mongoose"

export const connectDatabase = async (): Promise<void> => {
 const username = process.env.MONGODB_USERNAME
 const password = process.env.MONGODB_PASSWORD
 const cluster = process.env.MONGODB_CLUSTER
 const database = process.env.MONGODB_DATABASE

 if (!username || !password || !cluster || !database) {
  console.error("MongoDB configuration is incomplete. Please check MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER and MONGODB_DATABASE.")
  process.exit(1)
 }

 const encodedUsername = encodeURIComponent(username)
 const encodedPassword = encodeURIComponent(password)

 const mongoUri = `mongodb+srv://${encodedUsername}:${encodedPassword}@${cluster}/${database}`

 try {
  await mongoose.connect(mongoUri)

  console.log("MongoDB connected successfully")
  console.log(`Database: ${mongoose.connection.name}`)
 } catch (error) {
  console.error("MongoDB connection failed.")

  if (error instanceof Error) {
   console.error(error.message)
  } else {
   console.error(error)
  }

  process.exit(1)
 }
}