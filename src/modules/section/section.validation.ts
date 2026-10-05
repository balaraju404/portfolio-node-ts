import { z } from "zod"
import { FieldType } from "./section.model.js"

/**
 * Field option validation
 */
const optionSchema = z.object({
 label: z
  .string()
  .trim()
  .min(1, "Option label is required"),

 value: z
  .string()
  .trim()
  .min(1, "Option value is required")
})

/**
 * Section field validation
 */
const fieldSchema = z.object({
 key: z
  .string()
  .trim()
  .min(1, "Field key is required"),

 label: z
  .string()
  .trim()
  .min(1, "Field label is required"),

 type: z.enum(FieldType),

 required: z
  .boolean()
  .optional()
  .default(false),

 placeholder: z
  .string()
  .trim()
  .optional(),

 defaultValue: z
  .unknown()
  .optional(),

 options: z
  .array(optionSchema)
  .optional()
})

/**
 * Create section validation
 */
export const createSectionSchema = z.object({
 name: z
  .string()
  .trim()
  .min(1, "Section name is required"),

 slug: z
  .string()
  .trim()
  .min(1, "Section slug is required")
  .regex(
   /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
   "Slug must contain only lowercase letters, numbers and hyphens"
  ),

 description: z
  .string()
  .trim()
  .optional(),

 fields: z
  .array(fieldSchema)
  .optional()
  .default([]),

 isActive: z
  .boolean()
  .optional()
  .default(true),

 order: z
  .number()
  .int("Order must be an integer")
  .min(0, "Order cannot be negative")
  .optional()
  .default(0)
})

/**
 * Update section validation
 *
 * All fields are optional because this is a partial update.
 */
export const updateSectionSchema = z
 .object({
  name: z
   .string()
   .trim()
   .min(1, "Section name cannot be empty")
   .optional(),

  slug: z
   .string()
   .trim()
   .min(1, "Section slug cannot be empty")
   .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain only lowercase letters, numbers and hyphens"
   )
   .optional(),

  description: z
   .string()
   .trim()
   .optional(),

  fields: z
   .array(fieldSchema)
   .optional(),

  isActive: z
   .boolean()
   .optional(),

  order: z
   .number()
   .int("Order must be an integer")
   .min(0, "Order cannot be negative")
   .optional()
 })
 .refine(
  (data) => Object.keys(data).length > 0,
  {
   message: "At least one field is required for update"
  }
 )

/**
 * MongoDB ObjectId validation
 */
export const sectionIdSchema = z.object({
 id: z
  .string()
  .regex(
   /^[0-9a-fA-F]{24}$/,
   "Invalid section ID"
  )
})

/**
 * Pagination validation
 *
 * Keep this only if your repository/controller
 * supports paginated section fetching.
 */
export const paginationSchema = z.object({
 page: z
  .number()
  .int("Page must be an integer")
  .min(1, "Page must be at least 1")
  .optional()
  .default(1),

 limit: z
  .number()
  .int("Limit must be an integer")
  .min(1, "Limit must be at least 1")
  .max(100, "Limit cannot exceed 100")
  .optional()
  .default(10)
})

export type CreateSectionInput = z.infer<typeof createSectionSchema>
export type UpdateSectionInput = z.infer<typeof updateSectionSchema>
export type SectionIdInput = z.infer<typeof sectionIdSchema>
export type PaginationInput = z.infer<typeof paginationSchema>