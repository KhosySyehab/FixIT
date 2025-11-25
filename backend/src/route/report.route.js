import { Router } from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import { createReport, getReports, voteReport, updateStatus, getReportById, getReportHistory } from "../controller/report.controller.js";

const router = Router();
const upload = multer({ dest: "src/upload/" });

router.post("/", auth, upload.single("photo"), createReport);
router.get("/", auth, getReports);
router.get("/:id", auth, getReportById);
router.get("/:id/history", auth, getReportHistory);
router.post("/:id/vote", auth, voteReport);
router.put("/:id/status", auth, updateStatus);

export default router;
