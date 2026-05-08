// models/Project.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    githubUrl: { type: String, required: false },
    liveUrl: { type: String, required: false },
    technologies: { type: [String], required: true },
  },
  { timestamps: true },
);

// Check if the model exists before compiling it to prevent OverwriteModelError
export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
