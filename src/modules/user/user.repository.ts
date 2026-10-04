import { MongooseRepository } from "../../common/repositories/mongoose.repository.js"
import { IUser, User } from "./user.model.js"

export const userRepository = new MongooseRepository<IUser>(User)