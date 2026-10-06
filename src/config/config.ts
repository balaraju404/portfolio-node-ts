import "dotenv/config"
import { SignOptions } from "jsonwebtoken"

const requiredEnv = (key: string): string => {
 const value = process.env[key]

 if (!value) {
  throw new Error(`Missing required environment variable: ${key}`)
 }

 return value
}

const parseOrigins = (value: string): string[] => {
 return value
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)
}

export const config = {
 env: process.env.NODE_ENV || "development",

 server: {
  port: Number(process.env.PORT) || 3000
 },

 cors: {
  allowedOrigins: parseOrigins(process.env.ALLOWED_ORIGINS || "")
 },

 database: {
  username: requiredEnv("MONGODB_USERNAME"),
  password: requiredEnv("MONGODB_PASSWORD"),
  cluster: requiredEnv("MONGODB_CLUSTER"),
  database: requiredEnv("MONGODB_DATABASE")
 },

 jwt: {
  secret: requiredEnv("JWT_SECRET"),
  expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"]
 }
}