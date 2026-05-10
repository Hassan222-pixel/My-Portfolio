// models/Education.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  description: string;
  skills: string;
  order: number;
}

const EducationSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    isCurrent: { type: Boolean, default: false },
    location: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema);
