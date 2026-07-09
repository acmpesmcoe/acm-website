import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    tag: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    registrationLink: { type: String, default: "" },
    status: { type: String, enum: ["upcoming", "past"], default: "upcoming" },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
