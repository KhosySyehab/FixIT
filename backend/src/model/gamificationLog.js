import mongoose from "mongoose";

const gamificationLogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: String, // "report_created", "vote", "report_verified", "report_completed"
  points_earned: Number,
  report_id: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("GamificationLog", gamificationLogSchema);
