import type { UserRole } from "../modules/user/user.model.js"

declare global {
 namespace Express {
  interface Request {
   user?: {
    userId: string,
    role: UserRole
   }
  }
 }
}

export { }