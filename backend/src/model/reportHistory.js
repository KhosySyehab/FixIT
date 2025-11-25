import mongoose from "mongoose";

const reportHistorySchema = new mongoose.Schema({
  report_id: { type: mongoose.Schema.Types.ObjectId, ref: "Report", required: true },
  old_status: String,
  new_status: String,
  changed_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ReportHistory", reportHistorySchema);
