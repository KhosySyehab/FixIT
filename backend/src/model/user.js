import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  points: { type: Number, default: 0 },
  badges: { type: Array, default: [] }
});

export default mongoose.model("User", userSchema);
