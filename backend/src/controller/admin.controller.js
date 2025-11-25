import Report from "../model/report.js";
import User from "../model/user.js";
import Vote from "../model/vote.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Check admin
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") return res.status(403).json({ msg: "Forbidden" });

    const totalReports = await Report.countDocuments();
    const pendingReports = await Report.countDocuments({ status: "pending" });
    const inProgressReports = await Report.countDocuments({ status: "progress" });
    const completedReports = await Report.countDocuments({ status: "done" });

    // Reports by category
    const reportsByCategory = await Report.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    // Reports by severity
    const reportsBySeverity = await Report.aggregate([
      { $group: { _id: "$severity", count: { $sum: 1 } } }
    ]);

    // Top areas (most reports)
    const topAreas = await Report.aggregate([
      {
        $group: {
          _id: {
            latitude: { $round: ["$latitude", 2] },
            longitude: { $round: ["$longitude", 2] }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      totalReports,
      statusBreakdown: {
        pending: pendingReports,
        progress: inProgressReports,
        completed: completedReports
      },
      reportsByCategory,
      reportsBySeverity,
      topAreas,
      completionRate: totalReports > 0 ? ((completedReports / totalReports) * 100).toFixed(2) : 0
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const topUsers = await User.find()
      .sort({ points: -1 })
      .limit(limit)
      .select("name email points level badges reports_created");

    const cleanestAreas = await Report.aggregate([
      {
        $group: {
          _id: {
            latitude: { $round: ["$latitude", 2] },
            longitude: { $round: ["$longitude", 2] }
          },
          openReports: {
            $sum: {
              $cond: [{ $in: ["$status", ["pending", "progress"]] }, 1, 0]
            }
          },
          totalReports: { $sum: 1 }
        }
      },
      { $sort: { openReports: 1 } },
      { $limit: 10 }
    ]);

    res.json({
      topUsers,
      cleanestAreas
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    const userReports = await Report.countDocuments({ user_id: userId });
    const userVotes = await Vote.countDocuments({ user_id: userId });

    res.json({
      ...user.toObject(),
      statistics: {
        reportsCreated: user.reports_created || 0,
        reportsVerified: user.reports_verified || 0,
        votesGiven: userVotes
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Check admin
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") return res.status(403).json({ msg: "Forbidden" });

    const users = await User.find().select("-password").sort({ points: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getReportsByArea = async (req, res) => {
  try {
    const { latitude, longitude, radius = 1 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ msg: "Latitude dan longitude diperlukan" });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const radiusValue = parseFloat(radius);

    const reports = await Report.find({
      latitude: { $gte: lat - radiusValue, $lte: lat + radiusValue },
      longitude: { $gte: lon - radiusValue, $lte: lon + radiusValue }
    }).populate("user_id", "name email");

    res.json(reports);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;
    const { name, bio } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;

    // Handle file upload for profile photo
    if (req.file) {
      user.profile_photo = req.file.filename;
    }

    await user.save();

    res.json({
      msg: "Profil berhasil diperbarui",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_photo: user.profile_photo,
        bio: user.bio
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
