import { MongooseRepository } from "../../common/repositories/mongoose.repository.js"
import { ISection, Section } from "./section.model.js"

export const sectionRepository = new MongooseRepository<ISection>(Section)