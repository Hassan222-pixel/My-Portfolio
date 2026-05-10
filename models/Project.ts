// models/Project.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  workType: string;
  description: string[]; // Array of strings for bullet points
  languages: string;
  profileImage: string;
  projectImages: string[]; // Array of base64 image strings
  order: number;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    workType: { type: String, required: true },
    description: { type: [String], required: true },
    languages: { type: String, required: true },
    profileImage: { type: String, required: true },
    projectImages: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
