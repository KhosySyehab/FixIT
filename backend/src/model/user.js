import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: { type: Array, default: [] },
  role: { type: String, default: "user" },
  reports_created: { type: Number, default: 0 },
  reports_verified: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
