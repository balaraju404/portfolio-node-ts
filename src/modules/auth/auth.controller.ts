import { Request, Response } from "express"
import { authService } from "./auth.service.js"
import { sendCreated, sendOk } from "../../common/utils/response.js"

export class AuthController {
 async register(req: Request, res: Response) {
  const user = await authService.register(req.body)
  return sendCreated(res, "User registered successfully", user)
 }

 async login(req: Request, res: Response) {
  const { email, password } = req.body
  const token = await authService.login(email, password)
  return sendOk(res, "User logged in successfully", { token })
 }
}

export const authController = new AuthController()