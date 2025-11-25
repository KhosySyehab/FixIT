import Report from "../model/report.js";

export const createReport = async (req, res) => {
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

  res.json(report);
};

export const getReports = async (req, res) => {
  const reports = await Report.find().populate("user_id", "name");
  res.json(reports);
};
