import mongoose, { InferSchemaType } from "mongoose"
import { COLLECTIONS } from "../../common/constants/collections.js"

export enum FieldType {
 TEXT = "text",
 TEXTAREA = "textarea",
 RICH_TEXT = "rich_text",
 NUMBER = "number",
 EMAIL = "email",
 URL = "url",
 DATE = "date",
 IMAGE = "image",
 FILE = "file",
 BOOLEAN = "boolean",
 SELECT = "select",
 MULTI_SELECT = "multi_select"
}

const optionSchema = new mongoose.Schema(
 {
  label: {
   type: String,
   required: true,
   trim: true
  },

  value: {
   type: String,
   required: true,
   trim: true
  }
 },
 {
  _id: false
 }
)

const fieldSchema = new mongoose.Schema(
 {
  key: {
   type: String,
   required: true,
   trim: true
  },

  label: {
   type: String,
   required: true,
   trim: true
  },

  type: {
   type: String,
   required: true,
   enum: Object.values(FieldType)
  },

  required: {
   type: Boolean,
   default: false
  },

  placeholder: {
   type: String,
   trim: true
  },

  defaultValue: {
   type: mongoose.Schema.Types.Mixed
  },

  options: {
   type: [optionSchema],
   default: undefined
  }
 },
 {
  _id: false
 }
)

const sectionSchema = new mongoose.Schema(
 {
  name: {
   type: String,
   required: true,
   trim: true
  },

  slug: {
   type: String,
   required: true,
   unique: true,
   lowercase: true,
   trim: true
  },

  description: {
   type: String,
   trim: true
  },

  fields: {
   type: [fieldSchema],
   default: []
  },

  isActive: {
   type: Boolean,
   default: true
  },

  order: {
   type: Number,
   default: 0
  }
 },
 {
  timestamps: true
 }
)

export type ISection = InferSchemaType<typeof sectionSchema>

export const Section = mongoose.model<ISection>(
 "Section",
 sectionSchema,
 COLLECTIONS.SECTIONS
)