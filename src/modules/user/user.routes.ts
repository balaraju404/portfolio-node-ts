import { Router } from "express"
import { userController } from "./user.controller.js"
import { createUserSchema, updateUserSchema, userIdSchema, paginationSchema } from "./user.validation.js"
import { validate } from "../../common/middleware/validate.js"
import { asyncHandler } from "../../common/middleware/async.handler.js"

const router = Router()

router.post("/", validate(createUserSchema, "body"), asyncHandler(userController.createUser.bind(userController)))
router.put("/:id", validate(userIdSchema, "params"), validate(updateUserSchema, "body"), asyncHandler(userController.updateUser.bind(userController)))
router.get("/:id", validate(userIdSchema, "params"), asyncHandler(userController.getUser.bind(userController)))
router.post("/paging", validate(paginationSchema, "body"), asyncHandler(userController.getUsers.bind(userController)))

export default router