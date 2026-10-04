import { userRepository } from "./user.repository.js"
import { IUser } from "./user.model.js"
import { hashPassword } from "../../common/helpers/bcrypt.helper.js"

export class UserService {
 async createUser(data: Partial<IUser>) {
  if (!data.password) {
   throw new Error("Password is required")
  }

  const password = await hashPassword(data.password)

  return userRepository.create({ ...data, password })
 }

 async updateUser(id: string, data: Partial<IUser>) {
  const updateData = { ...data }

  if (updateData.password) {
   updateData.password = await hashPassword(updateData.password)
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