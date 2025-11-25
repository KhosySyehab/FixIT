import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  report_id: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
  value: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model("Vote", voteSchema);
