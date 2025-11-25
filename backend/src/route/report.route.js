import { Router } from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import { createReport, getReports } from "../controller/report.controller.js";

const router = Router();
const upload = multer({ dest: "src/upload/" });

router.post("/", auth, upload.single("photo"), createReport);
router.get("/", auth, getReports);

export default router;
