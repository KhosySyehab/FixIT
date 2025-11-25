import User from "../model/user.js";
import GamificationLog from "../model/gamificationLog.js";

const LEVEL_THRESHOLDS = {
  1: 0,
  2: 50,
  3: 150,
  4: 300,
  5: 500
};

const BADGES = {
  FIRST_REPORT: { name: "Warga Peduli Lingkungan", icon: "🌱", points: 10 },
  TEN_REPORTS: { name: "Mata Elang", icon: "👁️", points: 50 },
  VERIFIED_10: { name: "Green Guardian", icon: "🛡️", points: 100 },
  REPORTS_COMPLETED: { name: "FixIt Ranger", icon: "🎯", points: 200 }
};

export const awardPoints = async (userId, points, action, reportId = null) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User tidak ditemukan");

    user.points = (user.points || 0) + points;

    // Calculate level
    let newLevel = 1;
    for (let level = 5; level >= 1; level--) {
      if (user.points >= LEVEL_THRESHOLDS[level]) {
        newLevel = level;
        break;
      }
    }
    user.level = newLevel;

    await user.save();

    // Log gamification action
    await GamificationLog.create({
      user_id: userId,
      action,
      points_earned: points,
      report_id: reportId
    });

    return user;
  } catch (err) {
    console.error("Error awarding points:", err);
    throw err;
  }
};

export const checkAndAwardBadges = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    const existingBadges = user.badges || [];

    // Check for badge conditions
    if (user.reports_created >= 1 && !existingBadges.includes(BADGES.FIRST_REPORT.name)) {
      user.badges.push(BADGES.FIRST_REPORT.name);
      await awardPoints(userId, 10, "badge_earned", null);
    }

    if (user.reports_created >= 10 && !existingBadges.includes(BADGES.TEN_REPORTS.name)) {
      user.badges.push(BADGES.TEN_REPORTS.name);
      await awardPoints(userId, 40, "badge_earned", null);
    }

    if (user.reports_verified >= 10 && !existingBadges.includes(BADGES.VERIFIED_10.name)) {
      user.badges.push(BADGES.VERIFIED_10.name);
      await awardPoints(userId, 50, "badge_earned", null);
    }

    await user.save();
    return user;
  } catch (err) {
    console.error("Error checking badges:", err);
    throw err;
  }
};

export const getLevelInfo = (points) => {
  for (let level = 5; level >= 1; level--) {
    if (points >= LEVEL_THRESHOLDS[level]) {
      return {
        currentLevel: level,
        currentPoints: points,
        nextLevel: level < 5 ? level + 1 : 5,
        pointsToNextLevel: level < 5 ? LEVEL_THRESHOLDS[level + 1] - points : 0,
        levelNames: ["", "Pemula", "Kontributor", "Aktivis", "Warga Teladan", "Guardian"]
      };
    }
  }
  return { currentLevel: 1, currentPoints: 0, nextLevel: 2, pointsToNextLevel: 50 };
};
