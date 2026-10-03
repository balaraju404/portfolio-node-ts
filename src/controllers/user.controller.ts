import { Request, Response } from "express";
import { User } from "../models/user.model.js";

export const createUser = async (
 req: Request,
 res: Response
): Promise<void> => {
 try {
  const { name, email, age } = req.body;

  const user = await User.create({
   name,
   email,
   age
  });

  res.status(201).json({
   success: true,
   data: user
  });
 } catch (error) {
  res.status(500).json({
   success: false,
   message: "Failed to create user",
   error
  });
 }
};

export const getUsers = async (
 _req: Request,
 res: Response
): Promise<void> => {
 try {
  const users = await User.find();

  res.status(200).json({
   success: true,
   data: users
  });
 } catch (error) {
  res.status(500).json({
   success: false,
   message: "Failed to get users",
   error
  });
 }
};