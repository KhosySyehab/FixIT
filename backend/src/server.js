import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

import authRoute from "./route/auth.route.js";
import reportRoute from "./route/report.route.js";
import adminRoute from "./route/admin.route.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
// serve uploaded files
app.use('/uploads', express.static('src/upload'));

app.use("/auth", authRoute);
app.use("/report", reportRoute);
app.use("/admin", adminRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
