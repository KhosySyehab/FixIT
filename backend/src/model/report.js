import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  category: String,
  severity: Number,
  photo_url: String,
  latitude: Number,
  longitude: Number,
  status: { type: String, default: "pending" },
  priority_score: Number
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);
