import {
 HydratedDocument,
 Model,
 PipelineStage,
 PopulateOptions,
 QueryFilter,
 QueryOptions,
 UpdateQuery
} from "mongoose"

export class MongooseRepository<T> {
 constructor(private readonly model: Model<T>) { }

 /**
  * Create single record
  */
 async create(data: Partial<T>): Promise<HydratedDocument<T>> {
  return this.model.create(data)
 }

 /**
  * Create multiple records
  */
 async createMany(data: Partial<T>[]): Promise<HydratedDocument<T>[]> {
  const result = await this.model.insertMany(data)
  return result as HydratedDocument<T>[]
 }

 /**
  * Find single record by ID
  */
 async findById(
  id: string,
  options?: {
   populate?: PopulateOptions | PopulateOptions[],
   select?: string
  }
 ): Promise<HydratedDocument<T> | null> {
  const query = this.model.findById(id)

  if (options?.populate) {
   query.populate(options.populate)
  }

  if (options?.select) {
   query.select(options.select)
  }

  return query.exec()
 }

 /**
  * Find single record
  */
 async findOne(
  filter: QueryFilter<T>,
  options?: {
   populate?: PopulateOptions | PopulateOptions[],
   select?: string
  }
 ): Promise<HydratedDocument<T> | null> {
  const query = this.model.findOne(filter)

  if (options?.populate) {
   query.populate(options.populate)
  }

  if (options?.select) {
   query.select(options.select)
  }

  return query.exec()
 }

 /**
  * Find all records
  */
 async findAll(
  filter: QueryFilter<T> = {},
  options?: {
   populate?: PopulateOptions | PopulateOptions[],
   select?: string,
   sort?: Record<string, 1 | -1>
  }
 ): Promise<HydratedDocument<T>[]> {
  const query = this.model.find(filter)

  if (options?.populate) {
   query.populate(options.populate)
  }

  if (options?.select) {
   query.select(options.select)
  }

  if (options?.sort) {
   query.sort(options.sort)
  }

  return query.exec()
 }

 /**
  * Update by ID
  */
 async updateById(
  id: string,
  data: UpdateQuery<T>,
  options?: QueryOptions
 ): Promise<HydratedDocument<T> | null> {
  const query = this.model.findByIdAndUpdate(
   id,
   data,
   {
    new: true,
    runValidators: true,
    ...options
   }
  )

  return query.exec()
 }

 /**
  * Update one record
  */
 async updateOne(
  filter: QueryFilter<T>,
  data: UpdateQuery<T>,
  options?: QueryOptions
 ): Promise<HydratedDocument<T> | null> {
  const query = this.model.findOneAndUpdate(
   filter,
   data,
   {
    new: true,
    runValidators: true,
    ...options
   }
  )

  return query.exec()
 }

 /**
  * Delete by ID
  */
 async deleteById(id: string): Promise<HydratedDocument<T> | null> {
  return this.model
   .findByIdAndDelete(id)
   .exec()
 }

 /**
  * Delete one record
  */
 async deleteOne(filter: QueryFilter<T>): Promise<HydratedDocument<T> | null> {
  return this.model
   .findOneAndDelete(filter)
   .exec()
 }

 /**
  * Pagination
  */
 async paginate(
  filter: QueryFilter<T> = {},
  options?: {
   page?: number,
   limit?: number,
   sort?: Record<string, 1 | -1>,
   populate?: PopulateOptions | PopulateOptions[],
   select?: string
  }
 ) {

  const page = Math.max(options?.page ?? 1, 1)
  const limit = Math.max(options?.limit ?? 10, 1)
  const skip = (page - 1) * limit

  const query = this.model
   .find(filter)
   .skip(skip)
   .limit(limit)

  if (options?.populate) {
   query.populate(options.populate)
  }

  if (options?.select) {
   query.select(options.select)
  }

  if (options?.sort) {
   query.sort(options.sort)
  }

  const [data, total] = await Promise.all([
   query.exec(),
   this.model.countDocuments(filter).exec()
  ])

  const totalPages = Math.ceil(total / limit)

  return {
   data,
   pagination: {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
   }
  }
 }

 /**
  * Aggregation
  */
 async aggregate<R = T>(pipeline: PipelineStage[]): Promise<R[]> {
  return this.model
   .aggregate<R>(pipeline)
   .exec()
 }

 /**
  * Count
  */
 async count(filter: QueryFilter<T> = {}): Promise<number> {
  return this.model
   .countDocuments(filter)
   .exec()
 }

 /**
  * Check record exists
  */
 async exists(filter: QueryFilter<T>): Promise<boolean> {
  const result = await this.model.exists(filter)
  return result !== null
 }
}