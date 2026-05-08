import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
  icon: string;
  featured: boolean;
  order: number;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String, required: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Skill ||
  mongoose.model<ISkill>("Skill", SkillSchema);
