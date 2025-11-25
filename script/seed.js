import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../backend/src/model/user.js";
import Report from "../backend/src/model/report.js";
import Vote from "../backend/src/model/vote.js";

dotenv.config({ path: "./backend/.env" });

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/fixit";

const sampleReports = [
  {
    title: "Jalan berlubang di jalan utama",
    description: "Terdapat lubang besar dekat lampu merah yang membahayakan kendaraan",
    category: "jalan",
    severity: 4,
    latitude: -6.2,
    longitude: 106.8
  },
  {
    title: "Lampu jalan mati di komplek perumahan",
    description: "Lampu jalan sudah mati selama 2 minggu di blok C",
    category: "lampu",
    severity: 3,
    latitude: -6.22,
    longitude: 106.82
  },
  {
    title: "Saluran air tersumbat sampah",
    description: "Saluran air penuh sampah dan air tidak bisa mengalir",
    category: "drainase",
    severity: 5,
    latitude: -6.18,
    longitude: 106.85
  },
  {
    title: "Sampah menumpuk di pinggir jalan",
    description: "Sudah tidak diangkut selama berhari-hari",
    category: "sampah",
    severity: 3,
    latitude: -6.25,
    longitude: 106.80
  },
  {
    title: "Pohon tumbang dekat sekolah",
    description: "Pohon besar tumbang dan menghalangi jalan akses",
    category: "pohon",
    severity: 4,
    latitude: -6.21,
    longitude: 106.83
  }
];

const run = async () => {
  try {
    await mongoose.connect(MONGO, { serverSelectionTimeoutMS: 5000 });
    console.log("✓ Connected to MongoDB for seeding");
  } catch (connErr) {
    console.error("✗ Failed to connect to MongoDB:", connErr.message || connErr);
    process.exit(1);
  }

  try {
    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Report.deleteMany({});
    await Vote.deleteMany({});

    // Create admin user
    const adminHashed = await bcrypt.hash("adminpass", 10);
    const admin = await User.create({
      name: "Admin FixIT",
      email: "admin@fixit.com",
      password: adminHashed,
      role: "admin",
      points: 500,
      level: 5,
      reports_created: 10,
      reports_verified: 20,
      badges: ["Warga Peduli Lingkungan", "Mata Elang", "Green Guardian", "FixIt Ranger"]
    });
    console.log("✓ Created admin user");

    // Create regular users
    const userHashed = await bcrypt.hash("userpass", 10);
    const users = [];

    for (let i = 1; i <= 5; i++) {
      const user = await User.create({
        name: `User ${i}`,
        email: `user${i}@fixit.com`,
        password: userHashed,
        role: "user",
        points: Math.floor(Math.random() * 300),
        level: Math.floor(Math.random() * 4) + 1,
        reports_created: Math.floor(Math.random() * 10),
        reports_verified: Math.floor(Math.random() * 15)
      });
      users.push(user);
    }
    console.log(`✓ Created ${users.length} regular users`);

    // Create sample reports
    const createdReports = [];
    for (let i = 0; i < sampleReports.length; i++) {
      const reportData = sampleReports[i];
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const report = await Report.create({
        user_id: randomUser._id,
        ...reportData,
        status: ["pending", "progress", "done"][Math.floor(Math.random() * 3)],
        priority_score: reportData.severity * 3 + Math.floor(Math.random() * 10)
      });

      // Add random votes
      const voteCount = Math.floor(Math.random() * 5);
      for (let v = 0; v < voteCount; v++) {
        const voter = users[Math.floor(Math.random() * users.length)];
        try {
          await Vote.create({
            report_id: report._id,
            user_id: voter._id,
            value: 1
          });
        } catch (err) {
          // Ignore duplicate votes
        }
      }

      createdReports.push(report);
    }
    console.log(`✓ Created ${createdReports.length} sample reports with votes`);

    console.log("\n✅ Seeding complete!\n");
    console.log("Admin credentials:");
    console.log("  Email: admin@fixit.com");
    console.log("  Password: adminpass\n");
    console.log("User credentials (all have password 'userpass'):");
    console.log("  user1@fixit.com");
    console.log("  user2@fixit.com");
    console.log("  user3@fixit.com");
    console.log("  user4@fixit.com");
    console.log("  user5@fixit.com\n");

    process.exit(0);
  } catch (err) {
    console.error("✗ Seeding error:", err);
    process.exit(1);
  }
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
