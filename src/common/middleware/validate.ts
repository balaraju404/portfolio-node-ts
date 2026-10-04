import { Request, Response, NextFunction } from "express"
import { ZodType } from "zod"

export const validate = (
 schema: ZodType,
 target: "body" | "params" | "query" = "body"
) => {
 return (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const result = schema.safeParse(req[target])

  if (!result.success) {
   return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: result.error.issues.map((issue) => ({
     field: issue.path.join("."),
     message: issue.message
    })),
   })
  }

  req[target] = result.data

  next()
 }
}