import mongoose, { Schema, Document } from "mongoose";

export interface IContactInfo extends Document {
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

const ContactInfoSchema: Schema = new Schema(
  {
    subtitle: {
      type: String,
      default: "Let's build something amazing together.",
    },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.ContactInfo ||
  mongoose.model<IContactInfo>("ContactInfo", ContactInfoSchema);
