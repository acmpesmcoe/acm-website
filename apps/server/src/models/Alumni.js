import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    batch: { type: String, required: true },
    role: { type: String, required: true },
    currentPosition: { type: String, default: "" },
    image: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Alumni", alumniSchema);
