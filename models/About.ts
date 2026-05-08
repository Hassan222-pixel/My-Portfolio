import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  title: string;
  location: string;
  fullBiography: string;
}

const AboutSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    fullBiography: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.About ||
  mongoose.model<IAbout>("About", AboutSchema);
