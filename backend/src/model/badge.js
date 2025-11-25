import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  points_required: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Badge", badgeSchema);
