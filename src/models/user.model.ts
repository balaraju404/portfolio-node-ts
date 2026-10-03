import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
 name: string;
 email: string;
 age: number;
}

const userSchema = new Schema<IUser>(
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
   trim: true
  },

  age: {
   type: Number,
   required: true
  }
 },
 {
  timestamps: true
 }
);

export const User = mongoose.model<IUser>("User", userSchema);