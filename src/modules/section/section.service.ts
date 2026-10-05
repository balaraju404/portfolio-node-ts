import { AppError } from "../../common/utils/error.js"
import { ISection } from "./section.model.js"
import { sectionRepository } from "./section.repository.js"

export class SectionService {
 async createSection(data: Partial<ISection>) {
  if (!data.name?.trim()) {
   throw new AppError("Section name is required", 400)
  }

  if (!data.slug?.trim()) {
   throw new AppError("Section slug is required", 400)
  }

  const slug = data.slug.trim().toLowerCase()

  const existingSection = await sectionRepository.findOne({ slug })

  if (existingSection) {
   throw new AppError("Section already exists", 409)
  }

  return sectionRepository.create({
   ...data,
   name: data.name.trim(),
   slug
  })
 }

 async updateSection(id: string, data: Partial<ISection>) {
  const section = await sectionRepository.findById(id)

  if (!section) {
   throw new AppError("Section not found", 404)
  }

  const updateData = { ...data }

  if (updateData.name) {
   updateData.name = updateData.name.trim()
  }

  if (updateData.slug) {
   updateData.slug = updateData.slug.trim().toLowerCase()

   const existingSection = await sectionRepository.findOne({ slug: updateData.slug })

   if (existingSection && existingSection._id.toString() !== id) {
    throw new AppError("Section slug already exists", 409)
   }
  }

  return sectionRepository.updateById(id, updateData)
 }

 async deleteSection(id: string) {
  const section = await sectionRepository.findById(id)

  if (!section) {
   throw new AppError("Section not found", 404)
  }

  return sectionRepository.deleteById(id)
 }

 async toggleSection(id: string) {
  const section = await sectionRepository.findById(id)

  if (!section) {
   throw new AppError("Section not found", 404)
  }

  return sectionRepository.updateById(id, { isActive: !section.isActive })
 }

 async getSection(id: string) {
  const section = await sectionRepository.findById(id)

  if (!section) {
   throw new AppError("Section not found", 404)
  }

  return section
 }

 async getSections(page = 1, limit = 10) {
  return sectionRepository.paginate(
   {},
   {
    page,
    limit,
    sort: { order: 1, createdAt: 1 }
   }
  )
 }

 async getAllActiveSections() {
  return sectionRepository.findAll(
   { isActive: true },
   { sort: { order: 1, createdAt: 1 } }
  )
 }

}

export const sectionService = new SectionService()