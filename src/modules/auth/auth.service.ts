import { comparePassword } from "../../common/helpers/bcrypt.helper.js"
import { AppError } from "../../common/utils/error.js"
import { IUser, UserRole } from "../user/user.model.js"
import { userRepository } from "../user/user.repository.js"
import { userService } from "../user/user.service.js"

export class AuthService {
 async register(data: Partial<IUser>) {
  return userService.createUser({ ...data, role: UserRole.USER })
 }

 async login(email: string, password: string) {
  const user = await userRepository.findOne({ email }, { select: "+password" })

  if (!user) {
   throw new AppError("Invalid email or password", 401)
  }

  const isMatch = await comparePassword(password, user.password)

  if (!isMatch) {
   throw new AppError("Invalid email or password", 401)
  }

  const userData = user.toObject()
  return userData
 }
}

export const authService = new AuthService()