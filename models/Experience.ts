// models/Experience.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  description: string;
  skills: string; // We will use a comma-separated string for easy input
  order: number;
}

const ExperienceSchema: Schema = new Schema(
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

export default mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);
