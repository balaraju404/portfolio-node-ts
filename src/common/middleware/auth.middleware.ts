import { RequestHandler } from "express"

import { AppError } from "../utils/error.js"
import { verifyAccessToken } from "../helpers/jwt.helper.js"

export const authMiddleware: RequestHandler = (req, _res, next) => {
 const authorization = req.headers.authorization

 if (!authorization) {
  return next(new AppError("Authorization token is required", 401))
 }

 const [scheme, token] = authorization.trim().split(/\s+/)

 if (scheme?.toLowerCase() !== "bearer" || !token) {
  return next(new AppError("Invalid authorization format", 401))
 }

 try {
  const payload = verifyAccessToken(token)

  req.user = {
   userId: payload.userId,
   role: payload.role
  }

  return next()
 } catch {
  return next(new AppError("Invalid or expired token", 401))
 }
}