import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

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
  const client = new MongoClient(MONGO);

  try {
    await client.connect();
    console.log("✓ Connected to MongoDB");

    const db = client.db("fixit");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await db.collection("users").deleteMany({});
    await db.collection("reports").deleteMany({});
    await db.collection("votes").deleteMany({});
    console.log("✓ Data cleared");

    // Create admin user
    const adminHashed = await bcrypt.hash("adminpass", 10);
    const adminResult = await db.collection("users").insertOne({
      name: "Admin FixIT",
      email: "admin@fixit.com",
      password: adminHashed,
      role: "admin",
      points: 500,
      level: 5,
      reports_created: 10,
      reports_verified: 20,
      badges: ["Warga Peduli Lingkungan", "Mata Elang", "Green Guardian", "FixIt Ranger"],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log("✓ Created admin user");

    // Create regular users
    const userHashed = await bcrypt.hash("userpass", 10);
    const users = [];

    for (let i = 1; i <= 5; i++) {
      const userResult = await db.collection("users").insertOne({
        name: `User ${i}`,
        email: `user${i}@fixit.com`,
        password: userHashed,
        role: "user",
        points: Math.floor(Math.random() * 300),
        level: Math.floor(Math.random() * 4) + 1,
        reports_created: Math.floor(Math.random() * 10),
        reports_verified: Math.floor(Math.random() * 15),
        badges: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      users.push(userResult.insertedId);
    }
    console.log(`✓ Created 5 regular users`);

    // Create sample reports
    const adminId = adminResult.insertedId;
    for (let i = 0; i < sampleReports.length; i++) {
      const reportData = sampleReports[i];
      const randomUserId = users[Math.floor(Math.random() * users.length)];

      const reportResult = await db.collection("reports").insertOne({
        user_id: randomUserId,
        ...reportData,
        status: ["pending", "progress", "done"][Math.floor(Math.random() * 3)],
        priority_score: reportData.severity * 3 + Math.floor(Math.random() * 10),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Add random votes
      const voteCount = Math.floor(Math.random() * 5);
      for (let v = 0; v < voteCount; v++) {
        const voterUserId = users[Math.floor(Math.random() * users.length)];
        try {
          await db.collection("votes").insertOne({
            report_id: reportResult.insertedId,
            user_id: voterUserId,
            value: 1,
            createdAt: new Date()
          });
        } catch (err) {
          // Ignore duplicate votes
        }
      }
    }
    console.log(`✓ Created 5 sample reports with votes`);

    // Create indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("reports").createIndex({ user_id: 1 });
    console.log("✓ Created indexes");

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
    console.error("✗ Seeding error:", err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
};

run();
