import mongoose, { InferSchemaType } from "mongoose"
import { COLLECTIONS } from "../../common/constants/collections.js"

export enum UserRole {
 ADMIN = "admin",
 USER = "user"
}

const userSchema = new mongoose.Schema(
 {
  name: {
   type: String,
   required: true,
   trim: true
  },

  email: {
   type: String,
   required: true,
   unique: true,
   lowercase: true,
   trim: true
  },

  role: {
   type: String,
   required: true,
   enum: Object.values(UserRole),
   default: UserRole.USER
  },

  password: {
   type: String,
   required: true,
   minlength: 6,
   select: false
  },
 },
 {
  timestamps: true
 }
)

export type IUser = InferSchemaType<typeof userSchema>

export const User = mongoose.model(
 "User",
 userSchema,
 COLLECTIONS.USERS
)