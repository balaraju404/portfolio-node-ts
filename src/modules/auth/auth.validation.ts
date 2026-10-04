import { z } from "zod"

const emailSchema = z
 .string()
 .trim()
 .email("Invalid email address")
 .toLowerCase()

const passwordSchema = z
 .string()
 .min(6, "Password must be at least 6 characters")
 .max(100, "Password must not exceed 100 characters")

export const registerSchema = z
 .object({
  name: z
   .string()
   .trim()
   .min(2, "Name must be at least 2 characters")
   .max(100, "Name must not exceed 100 characters"),

  email: emailSchema,

  password: passwordSchema,

  confirmPassword: z
   .string()
   .min(6, "Confirm password must be at least 6 characters"),
 })
 .refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
 })

export const loginSchema = z.object({
 email: emailSchema,
 password: passwordSchema,
})