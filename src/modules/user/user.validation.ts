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

export const createUserSchema = z.object({
 name: z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must not exceed 100 characters"),

 email: emailSchema,

 role: z
  .enum(["admin", "user"])
  .default("user"),

 password: passwordSchema,
})

export const updateUserSchema = z
 .object({
  name: z
   .string()
   .trim()
   .min(2, "Name must be at least 2 characters")
   .max(100, "Name must not exceed 100 characters")
   .optional(),

  email: emailSchema.optional(),

  role: z
   .enum(["admin", "user"])
   .optional(),

  password: passwordSchema.optional(),
 })
 .strict()

export const userIdSchema = z.object({
 id: z
  .string()
  .regex(
   /^[0-9a-fA-F]{24}$/,
   "Invalid user ID"
  )
})

export const paginationSchema = z.object({
 page: z.coerce
  .number()
  .int()
  .min(1)
  .default(1),

 limit: z.coerce
  .number()
  .int()
  .min(1)
  .max(100)
  .default(10)
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>