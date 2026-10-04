import { Router } from "express"
import { validate } from "../../common/middleware/validate.js"
import { asyncHandler } from "../../common/middleware/async.handler.js"
import { authController } from "./auth.controller.js"
import { loginSchema, registerSchema } from "./auth.validation.js"

const router = Router()

router.post("/register", validate(registerSchema, "body"), asyncHandler(authController.register.bind(authController)))
router.post("/login", validate(loginSchema, "body"), asyncHandler(authController.login.bind(authController)))

export default router