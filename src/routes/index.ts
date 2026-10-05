import { Router } from "express"

import { authMiddleware } from "../common/middleware/auth.middleware.js"
import authRouter from "../modules/auth/auth.routes.js"
import userRouter from "../modules/user/user.routes.js"
import sectionRouter from "../modules/section/section.routes.js"

const router = Router()

// Public authentication APIs
router.use("/auth", authRouter)

// Protected APIs
router.use(authMiddleware)
router.use("/user", userRouter)
router.use("/section", sectionRouter)

export default router