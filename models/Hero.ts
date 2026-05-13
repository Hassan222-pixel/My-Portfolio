import mongoose, { Schema, Document } from "mongoose";

export interface IHero extends Document {
  topBadge: string;
  greeting: string;
  name: string;
  headline: string;
  smallDescription: string;
  imageUrl: string;
  badges: { iconUrl: string; title: string; subtitle: string }[];
}

const HeroSchema: Schema = new Schema(
  {
    topBadge: { type: String, default: "COMPUTER ENGINEERING GRADUATE" },
    greeting: { type: String, default: "Hi, I'm" },
    name: { type: String, required: true },
    headline: { type: String, required: true },
    smallDescription: { type: String, required: true },
    imageUrl: { type: String, required: true },
    badges: [
      {
        iconUrl: { type: String },
        title: { type: String },
        subtitle: { type: String },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Hero ||
  mongoose.model<IHero>("Hero", HeroSchema);
