import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  getDashboardStats,
  getLeaderboard,
  getUserProfile,
  getAllUsers,
  getReportsByArea
} from "../controller/admin.controller.js";

const router = Router();

router.get("/dashboard/stats", auth, getDashboardStats);
router.get("/leaderboard", getLeaderboard);
router.get("/users/:id?", auth, getUserProfile);
router.get("/users-list", auth, getAllUsers);
router.get("/reports/area", getReportsByArea);

export default router;
