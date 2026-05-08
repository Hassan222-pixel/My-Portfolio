import mongoose, { Schema, Document } from "mongoose";

export interface IHero extends Document {
  name: string;
  headline: string;
  smallDescription: string;
  imageUrl: string;
}

const HeroSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    headline: { type: String, required: true },
    smallDescription: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Stores the image link
  },
  { timestamps: true },
);

export default mongoose.models.Hero ||
  mongoose.model<IHero>("Hero", HeroSchema);
