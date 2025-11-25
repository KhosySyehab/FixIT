import Report from "../model/report.js";
import Vote from "../model/vote.js";

export const recalcPriority = async (reportId) => {
  const report = await Report.findById(reportId);
  if (!report) throw new Error("Report not found");

  // count votes (sum of value)
  const votes = await Vote.find({ report_id: reportId });
  const voteSum = votes.reduce((s, v) => s + (v.value || 0), 0);

  const severity = report.severity || 0;

  const ageHours = Math.max(0, (Date.now() - new Date(report.createdAt).getTime()) / (1000 * 60 * 60));

  const priority = Math.round(voteSum * 2 + severity * 3 + ageHours);

  report.priority_score = priority;
  await report.save();

  return report;
};
