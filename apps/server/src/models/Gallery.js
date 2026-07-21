import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
