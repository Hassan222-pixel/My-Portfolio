import mongoose, { Schema, Document } from "mongoose";

export interface IFooter extends Document {
  aboutText: string;
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  copyrightName: string;
}

const FooterSchema: Schema = new Schema(
  {
    aboutText: {
      type: String,
      default:
        "Building fast, scalable, and visually engaging digital experiences. Turning complex problems into elegant solutions.",
    },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    email: { type: String, default: "" },
    copyrightName: { type: String, default: "Hassan Awad" },
  },
  { timestamps: true },
);

export default mongoose.models.Footer ||
  mongoose.model<IFooter>("Footer", FooterSchema);
