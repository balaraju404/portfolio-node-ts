import { Router } from "express"

import authRouter from "../modules/auth/auth.routes.js"
import userRouter from "../modules/user/user.routes.js"

const router = Router()

// Public authentication APIs
router.use("/auth", authRouter)

// Protected APIs
router.use("/users", userRouter)

export default router