import Report from "../model/report.js";
import Vote from "../model/vote.js";
import User from "../model/user.js";
import ReportHistory from "../model/reportHistory.js";
import { recalcPriority } from "../utils/priorityCalc.js";
import { awardPoints, checkAndAwardBadges } from "../utils/gamificationUtil.js";
import { sendStatusUpdateEmail } from "../utils/emailUtil.js";

export const createReport = async (req, res) => {
  try {
    const { title, description, category, severity, latitude, longitude } = req.body;

    const report = await Report.create({
      user_id: req.user.id,
      title,
      description,
      category,
      severity,
      latitude,
      longitude,
      photo_url: req.file?.path || null,
      priority_score: severity * 3
    });

    // Award points for creating report
    await awardPoints(req.user.id, 10, "report_created", report._id);

    // Update user reports_created count
    const user = await User.findById(req.user.id);
    user.reports_created = (user.reports_created || 0) + 1;
    await user.save();

    // Check for badges
    await checkAndAwardBadges(req.user.id);

    // recalc priority to include age/votes (initial votes 0)
    await recalcPriority(report._id);

    res.json(report);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("user_id", "name email level");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("user_id", "name email level points")
      .populate({
        path: "user_id",
        populate: { path: "badges" }
      });

    if (!report) return res.status(404).json({ msg: "Report tidak ditemukan" });

    // Get vote count
    const voteCount = await Vote.countDocuments({ report_id: req.params.id });

    // Get history
    const history = await ReportHistory.find({ report_id: req.params.id })
      .populate("changed_by", "name");

    res.json({
      ...report.toObject(),
      voteCount,
      history
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const voteReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const userId = req.user.id;

    const existing = await Vote.findOne({ report_id: reportId, user_id: userId });
    if (existing) {
      return res.status(400).json({ msg: "You have already voted" });
    }

    await Vote.create({ report_id: reportId, user_id: userId, value: 1 });

    // Award points for voting
    await awardPoints(userId, 2, "vote", reportId);

    const updated = await recalcPriority(reportId);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const reportId = req.params.id;
    const { status, notes } = req.body;

    // check admin
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") return res.status(403).json({ msg: "Forbidden" });

    const report = await Report.findById(reportId);
    if (!report) return res.status(404).json({ msg: "Report not found" });

    const oldStatus = report.status;
    report.status = status;
    await report.save();

    // Create history entry
    await ReportHistory.create({
      report_id: reportId,
      old_status: oldStatus,
      new_status: status,
      changed_by: req.user.id,
      notes: notes || ""
    });

    // Award points if marked done
    if (status === "done" && oldStatus !== "done") {
      const owner = await User.findById(report.user_id);
      if (owner) {
        await awardPoints(owner._id, 15, "report_completed", reportId);

        // Check badges
        await checkAndAwardBadges(owner._id);

        // Send email notification
        try {
          await sendStatusUpdateEmail(
            owner.email,
            owner.name,
            report.title,
            status
          );
        } catch (emailErr) {
          console.error("Error sending email:", emailErr);
        }
      }
    }

    res.json(report);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getReportHistory = async (req, res) => {
  try {
    const reportId = req.params.id;
    const history = await ReportHistory.find({ report_id: reportId })
      .populate("changed_by", "name")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
