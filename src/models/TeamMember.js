import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    category: { type: String, enum: ["faculty", "core"], default: "core" },
    image: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("TeamMember", teamMemberSchema);
