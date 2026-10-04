import bcrypt from "bcrypt"
import { userRepository } from "./user.repository.js"
import { IUser } from "./user.model.js"

export class UserService {
 async createUser(data: Partial<IUser>) {
  if (!data.password) {
   throw new Error("Password is required")
  }

  const password = await bcrypt.hash(data.password, 12)

  return userRepository.create({ ...data, password })
 }

 async updateUser(id: string, data: Partial<IUser>) {
  const updateData = { ...data }

  if (updateData.password) {
   updateData.password = await bcrypt.hash(updateData.password, 12)
  }

  return userRepository.updateById(id, updateData)
 }

 async getUser(id: string) {
  return userRepository.findById(id, { select: "-password" })
 }

 async getUsers(page: number, limit: number) {
  return userRepository.paginate(
   {},
   {
    page,
    limit,
    select: "-password",
    sort: { createdAt: -1 }
   }
  )
 }
}

export const userService = new UserService()