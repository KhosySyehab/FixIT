import { Router } from "express";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import {
  getDashboardStats,
  getLeaderboard,
  getUserProfile,
  getAllUsers,
  getReportsByArea,
  updateUserProfile
} from "../controller/admin.controller.js";

// Setup multer untuk upload foto profil
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/upload/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "profile-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diizinkan"));
    }
  }
});

const router = Router();

router.get("/dashboard/stats", auth, getDashboardStats);
router.get("/leaderboard", getLeaderboard);
router.get("/users/:id?", auth, getUserProfile);
router.post("/users/:id?/update", auth, upload.single("profile_photo"), updateUserProfile);
router.get("/users-list", auth, getAllUsers);
router.get("/reports/area", getReportsByArea);

export default router;
