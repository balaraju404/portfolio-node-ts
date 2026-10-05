import { comparePassword } from "../../common/helpers/bcrypt.helper.js"
import { generateAccessToken } from "../../common/helpers/jwt.helper.js"
import { AppError } from "../../common/utils/error.js"
import { IUser, UserRole } from "../user/user.model.js"
import { userRepository } from "../user/user.repository.js"
import { userService } from "../user/user.service.js"

export class AuthService {
 async register(data: Partial<IUser>) {
  return userService.createUser({ ...data, role: UserRole.USER })
 }

 async login(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase()

  const user = await userRepository.findOne(
   { email: normalizedEmail },
   { select: "+password" }
  )

  if (!user?.password) {
   throw new AppError("Invalid email or password", 401)
  }

  const isPasswordValid = await comparePassword(password, user.password)

  if (!isPasswordValid) {
   throw new AppError("Invalid email or password", 401)
  }

  const token = generateAccessToken({
   userId: user._id.toString(),
   role: user.role
  })

  const userData = user.toObject()
  const { password: _, ...userWithoutPassword } = userData

  return {
   user: userWithoutPassword,
   token
  }
 }
}

export const authService = new AuthService()