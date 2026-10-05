import { Router } from "express"
import { validate } from "../../common/middleware/validate.js"
import { asyncHandler } from "../../common/middleware/async.handler.js"
import { sectionController } from "./section.controller.js"
import { createSectionSchema, updateSectionSchema, sectionIdSchema, paginationSchema, } from "./section.validation.js"

const router = Router()

// Create section
router.post(
 "/",
 validate(createSectionSchema, "body"),
 asyncHandler(sectionController.createSection.bind(sectionController))
)

// Update section
router.put(
 "/:id",
 validate(sectionIdSchema, "params"),
 validate(updateSectionSchema, "body"),
 asyncHandler(sectionController.updateSection.bind(sectionController))
)

// Delete section
router.delete(
 "/:id",
 validate(sectionIdSchema, "params"),
 asyncHandler(sectionController.deleteSection.bind(sectionController))
)

// Toggle section status
router.patch(
 "/:id/toggle",
 validate(sectionIdSchema, "params"),
 asyncHandler(sectionController.toggleSection.bind(sectionController))
)

// Get single section
router.get(
 "/:id",
 validate(sectionIdSchema, "params"),
 asyncHandler(sectionController.getSection.bind(sectionController))
)

// Get paginated sections
router.post(
 "/paging",
 validate(paginationSchema, "body"),
 asyncHandler(sectionController.getSections.bind(sectionController))
)

// Get all sections
router.get(
 "/all",
 asyncHandler(sectionController.getAllActiveSections.bind(sectionController))
)

export default router