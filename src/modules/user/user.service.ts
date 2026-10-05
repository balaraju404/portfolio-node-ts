import { hashPassword } from "../../common/helpers/bcrypt.helper.js"
import { AppError } from "../../common/utils/error.js"
import { IUser } from "./user.model.js"
import { userRepository } from "./user.repository.js"

export class UserService {
 async createUser(data: Partial<IUser>) {
  if (!data.email) {
   throw new AppError("Email is required", 400)
  }

  if (!data.password) {
   throw new AppError("Password is required", 400)
  }

  const email = data.email.trim().toLowerCase()
  const isExists = await this.checkUserExists(email)

  if (isExists) {
   throw new AppError("User already exists", 409)
  }

  const hashedPassword = await hashPassword(data.password)

  return userRepository.create({ ...data, email, password: hashedPassword })
 }

 async updateUser(id: string, data: Partial<IUser>) {
  const updateData = { ...data }

  if (updateData.email) {
   updateData.email = updateData.email.trim().toLowerCase()

   const existingUser = await userRepository.findOne({ email: updateData.email })

   if (existingUser && existingUser._id.toString() !== id) {
    throw new AppError("Email already in use", 409)
   }
  }

  if (updateData.password) {
   updateData.password = await hashPassword(updateData.password)
  }

  return userRepository.updateById(id, updateData)
 }

 async getUser(id: string) {
  const user = await userRepository.findById(id, { select: "-password" })

  if (!user) {
   throw new AppError("User not found", 404)
  }

  return user
 }

 async getUsers(page = 1, limit = 10) {
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

 async checkUserExists(email: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase()
  return Boolean(await userRepository.exists({ email: normalizedEmail }))
 }
}

export const userService = new UserService()