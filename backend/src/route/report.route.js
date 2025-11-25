import { Router } from "express";
import multer from "multer";
import path from "path";
import { auth } from "../middleware/auth.js";
import { createReport, getReports, voteReport, updateStatus, getReportById, getReportHistory, deleteReport, updateReport } from "../controller/report.controller.js";

const router = Router();

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/upload/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "report-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diizinkan"));
    }
  }
});

router.post("/", auth, upload.single("photo"), createReport);
router.get("/", auth, getReports);
router.get("/:id", auth, getReportById);
router.get("/:id/history", auth, getReportHistory);
router.post("/:id/vote", auth, voteReport);
router.put("/:id/status", auth, updateStatus);
router.put("/:id", auth, updateReport);
router.delete("/:id", auth, deleteReport);

export default router;
