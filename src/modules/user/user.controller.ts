import { Request, Response } from "express"
import { userService } from "./user.service.js"
import { sendCreated, sendOk } from "../../common/utils/response.js"

export class UserController {
 async createUser(req: Request, res: Response) {
  const user = await userService.createUser(req.body)
  return sendCreated(res, "User created successfully", user)
 }

 async updateUser(req: Request, res: Response) {
  const { id } = req.params
  const user = await userService.updateUser(id as string, req.body)
  return sendOk(res, "User updated successfully", user)
 }

 async getUser(req: Request, res: Response) {
  const { id } = req.params
  const user = await userService.getUser(id as string)
  return sendOk(res, "User fetched successfully", user)
 }

 async getUsers(req: Request, res: Response) {
  const page = Number(req.body.page)
  const limit = Number(req.body.limit)
  const result = await userService.getUsers(page, limit)
  return sendOk(res, "Users fetched successfully", result)
 }
}

export const userController = new UserController()