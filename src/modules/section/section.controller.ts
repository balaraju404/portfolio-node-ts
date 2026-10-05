import { Request, Response } from "express"
import { sendCreated, sendOk } from "../../common/utils/response.js"
import { sectionService } from "./section.service.js"

export class SectionController {
 async createSection(req: Request, res: Response) {
  const section = await sectionService.createSection(req.body)
  return sendCreated(res, "Section created successfully", section)
 }

 async updateSection(req: Request, res: Response) {
  const { id } = req.params
  const section = await sectionService.updateSection(id as string, req.body)
  return sendOk(res, "Section updated successfully", section)
 }

 async getSection(req: Request, res: Response) {
  const { id } = req.params
  const section = await sectionService.getSection(id as string)
  return sendOk(res, "Section fetched successfully", section)
 }

 async getSections(req: Request, res: Response) {
  const page = Number(req.body.page)
  const limit = Number(req.body.limit)
  const sections = await sectionService.getSections(page, limit)
  return sendOk(res, "Sections fetched successfully", sections)
 }

 async getAllActiveSections(req: Request, res: Response) {
  const sections = await sectionService.getAllActiveSections()
  return sendOk(res, "All sections fetched successfully", sections)
 }

 async deleteSection(req: Request, res: Response) {
  const { id } = req.params
  await sectionService.deleteSection(id as string)
  return sendOk(res, "Section deleted successfully")
 }

 async toggleSection(req: Request, res: Response) {
  const { id } = req.params
  const section = await sectionService.toggleSection(id as string)
  return sendOk(res, "Section status updated successfully", section)
 }
}

export const sectionController = new SectionController()