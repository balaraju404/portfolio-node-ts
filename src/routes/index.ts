import { Router } from "express"

import authRouter from "../modules/auth/auth.routes.js"
import userRouter from "../modules/user/user.routes.js"
import { authMiddleware } from "../common/middleware/auth.middleware.js"

const router = Router()

// Public authentication APIs
router.use("/auth", authRouter)

// Protected APIs
router.use(authMiddleware)
router.use("/users", userRouter)

export default router