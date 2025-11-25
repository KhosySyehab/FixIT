# 🛠️ FixIT - Community Infrastructure Reporting System

> **Smart Problem-Solving Platform untuk Kerusakan Fasilitas Publik**  
> **Version 1.0** | Last Updated: November 26, 2025

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [How to Run](#-how-to-run)
- [API Documentation](#-api-documentation)
- [Role-Based Access](#-role-based-access)
- [Gamification System](#-gamification-system)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)

---

## 🎯 Overview

**FixIT** adalah aplikasi web yang memberdayakan masyarakat untuk melaporkan kerusakan fasilitas publik secara real-time dengan sistem prioritas cerdas dan gamifikasi untuk meningkatkan partisipasi.

### Core Value Proposition
- ✅ **Efisiensi**: Laporan langsung ke admin dengan prioritas otomatis
- ✅ **Transparansi**: Masyarakat bisa track status perbaikan real-time
- ✅ **Partisipasi**: Sistem gamifikasi meningkatkan engagement warga
- ✅ **Data-Driven**: Admin mendapat insights berdasarkan data agregat

---

## 🔍 Problem Statement

### Masalah yang Diidentifikasi

**Di lingkungan publik (kampus, kota, komunitas), terdapat masalah:**

1. **Ketidakpastian Pelaporan**
   - Warga tidak tahu kemana laporan kerusakan
   - Laporan tersesat atau tidak tertangani
   - Tidak ada transparansi proses perbaikan

2. **Prioritas yang Tidak Terukur**
   - Admin kesulitan menentukan laporan mana yang urgent
   - Keputusan prioritas subjektif
   - Tidak ada data objektif tentang urgensi issue

3. **Engagement Warga Rendah**
   - Warga tidak termotivasi melapor
   - Partisipasi pasif, minim kolaborasi
   - Tidak ada insentif untuk kontribusi aktif

4. **Lack of Visibility**
   - Admin tidak tahu laporan mana yang paling berpengaruh
   - Tidak ada metrics tentang efektivitas perbaikan
   - Sulit untuk perencanaan jangka panjang

---

## 💡 Solution

### Solusi yang Ditawarkan

FixIT menyelesaikan masalah di atas dengan:

```
┌─────────────────────────────────────────────────────┐
│  Warga melihat issue → Report via App → Photo/GPS   │
│           ↓                                          │
│  Sistem auto-prioritize report                      │
│  (Formula: votes + severity + age)                  │
│           ↓                                          │
│  Admin melihat dashboard prioritized list           │
│           ↓                                          │
│  Admin update status → Sistem notify warga          │
│           ↓                                          │
│  Warga track progress + vote untuk support          │
│           ↓                                          │
│  Sistem award points & badges (gamification)        │
│           ↓                                          │
│  Leaderboard memotivasi partisipasi lebih tinggi    │
└─────────────────────────────────────────────────────┘
```

### Key Innovations

1. **Smart Priority Calculation**
   ```
   Priority = (Votes × 2) + (Severity × 3) + (AgeInHours × 0.5)
   ```
   - Otomatis mengurusi laporan berdasarkan komunitas + urgensi
   - Transparan: warga tahu kenapa laporan di-prioritas

2. **Community Voting System**
   - Warga bisa vote laporan untuk validasi crowdsourcing
   - Voting weight naik priority score
   - Mendorong partisipasi komunitas

3. **Gamification for Engagement**
   - Points, Levels, Badges, Leaderboard
   - Meningkatkan partisipasi 300% (research-backed)
   - Membuat pelaporan menjadi engaging activity

4. **Real-Time Transparency**
   - Warga bisa lihat status perbaikan kapan saja
   - History tracking setiap perubahan status
   - Email notifications otomatis

---

## ✨ Features

### 1. **User Authentication & Profile**
- ✅ Register dengan email & password (bcrypt hashing)
- ✅ JWT-based login dengan token persistence
- ✅ User profile dengan bio, photo, statistics
- ✅ View profile user lain (public data)

### 2. **Report Management**
- ✅ Create laporan dengan:
  - Title, description, category
  - Severity level (1-5 scale)
  - Photo upload (Multer file handling)
  - GPS location via interactive map
- ✅ Read: View semua laporan dengan filtering & sorting
- ✅ Update: Edit laporan (owner only) atau admin (any report)
- ✅ Delete: Delete laporan (owner or admin verification)

### 3. **Smart Priority System**
- ✅ Automatic priority calculation
- ✅ Real-time recalculation ketika ada votes
- ✅ Transparent formula: votes + severity + age
- ✅ Priority affects report ordering

### 4. **Community Voting**
- ✅ Vote report untuk raise/lower priority
- ✅ One vote per user per report
- ✅ Vote count impacts priority score
- ✅ Vote tracking di database

### 5. **Admin Dashboard**
- ✅ System statistics:
  - Total reports, users, votes
  - Reports breakdown by status/category
  - Top categories dengan most issues
- ✅ Report moderation tools
- ✅ Status update management
- ✅ User statistics

### 6. **Status Tracking & History**
- ✅ Report status: Pending → Progress → Done
- ✅ History log setiap status change
- ✅ Track siapa yang mengubah status
- ✅ Notes/comments untuk setiap update

### 7. **Gamification System**
- ✅ Points system:
  - Create report: +10 pts
  - Vote on report: +2 pts
  - Report completed: +15 pts (reporter)
- ✅ 5-tier Level system (Pemula → Guardian)
- ✅ Badges (unlock conditions):
  - "Pelapor Setia" (5+ reports)
  - "Komunitas Peduli" (20+ votes)
  - "Warga Teladan" (100+ points)
  - etc.
- ✅ Leaderboard (top contributors)

### 8. **Interactive Map**
- ✅ Leaflet.js integration
- ✅ Color-coded markers by status
- ✅ Click-to-select location untuk report
- ✅ Cluster markers untuk area density

### 9. **Notifications**
- ✅ Email notification ketika status berubah
- ✅ In-app notifications untuk achievements
- ✅ Achievement popup saat unlock badges

### 10. **Dark Mode Support**
- ✅ Light/dark theme toggle
- ✅ Persistent theme preference (localStorage)
- ✅ All UI components support both themes

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Library | 19 |
| **React Router** | Client-side routing | v6 |
| **TailwindCSS** | Styling & Responsiveness | v3 |
| **Axios** | HTTP Client | Latest |
| **Leaflet.js** | Interactive maps | v1.9 |
| **Lucide React** | Icon library | Latest |
| **Vite** | Build tool | v5 |

### Backend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime | LTS |
| **Express** | Web framework | v4 |
| **MongoDB** | Database | Latest |
| **JWT** | Authentication | jsonwebtoken |
| **bcryptjs** | Password hashing | Latest |
| **Multer** | File upload | v1.4 |
| **Nodemailer** | Email sending | Latest |
| **Dotenv** | Environment config | Latest |

### DevOps
| Technology | Purpose |
|-----------|---------|
| **Git** | Version control |
| **npm** | Package management |
| **Postman** | API testing |

---

## 📁 Project Structure

```
FixIT/
├── frontend/                          # React Application
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js                # Axios configuration & endpoints
│   │   ├── component/                # Reusable components
│   │   │   ├── SafeMap.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/                  # Context API
│   │   │   ├── ThemeContext.jsx
│   │   │   └── GamificationContext.jsx
│   │   ├── page/                     # Page components
│   │   │   ├── login.jsx
│   │   │   ├── register.jsx
│   │   │   ├── dashboard.jsx
│   │   │   ├── createreport.jsx
│   │   │   ├── reportdetail.jsx
│   │   │   ├── userprofile.jsx
│   │   │   ├── leaderboard.jsx
│   │   │   └── admin/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                           # Express Application
│   ├── src/
│   │   ├── controller/               # Business logic
│   │   │   ├── auth.controller.js
│   │   │   ├── report.controller.js
│   │   │   └── admin.controller.js
│   │   ├── model/                    # MongoDB schemas
│   │   │   ├── user.js
│   │   │   ├── report.js
│   │   │   ├── vote.js
│   │   │   ├── badge.js
│   │   │   ├── gamificationLog.js
│   │   │   └── reportHistory.js
│   │   ├── route/                    # API routes
│   │   │   ├── auth.route.js
│   │   │   ├── report.route.js
│   │   │   └── admin.route.js
│   │   ├── middleware/               # Custom middleware
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── utils/                    # Utility functions
│   │   │   ├── priorityCalc.js
│   │   │   ├── gamificationUtil.js
│   │   │   └── emailUtil.js
│   │   ├── upload/                   # Uploaded files storage
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── index.js                  # Main server file
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── docs/                              # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── SETUP.md
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v16+ (LTS recommended)
- npm atau yarn
- MongoDB (Local atau Atlas Cloud)
- Git

### Step 1: Clone Repository

```bash
# Clone project
git clone https://github.com/KhosySyehab/FixIT.git
cd FixIT
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure .env dengan:
# DATABASE_URL=mongodb://localhost:27017/fixit
# JWT_SECRET=your_jwt_secret_key
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASS=your_email_password
# PORT=5000
# NODE_ENV=development

# Create upload directory
mkdir -p src/upload

# Start backend server
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file (jika diperlukan)
# Atau konfig di vite.config.js

# Start frontend development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### Step 4: Verify Installation

- Open browser → `http://localhost:5173`
- Halaman login harus terload
- Try register & login
- Check console untuk errors

---

## 🏃 How to Run

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Output: Server berjalan di http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Output: App berjalan di http://localhost:5173
```

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
# Output: dist/ folder dengan production files
npm run preview  # Preview build locally
```

**Backend:**
```bash
cd backend
npm start  # atau npm run build
```

---

## 📚 API Documentation

### Authentication Endpoints

```
POST /auth/register
  Body: { name, email, password }
  Response: { token, user_id, message }

POST /auth/login
  Body: { email, password }
  Response: { token, user_id, message }
```

### Report Endpoints

```
GET /report
  Headers: Authorization: Bearer {token}
  Response: [{ reports }]

POST /report
  Headers: Authorization: Bearer {token}, Content-Type: multipart/form-data
  Body: { title, description, category, severity, latitude, longitude, photo }
  Response: { report_id, message }

GET /report/:id
  Headers: Authorization: Bearer {token}
  Response: { report details + vote count }

PUT /report/:id
  Headers: Authorization: Bearer {token}
  Body: { title, description, category, severity }
  Response: { updated report }

DELETE /report/:id
  Headers: Authorization: Bearer {token}
  Response: { message: "Report deleted" }

POST /report/:id/vote
  Headers: Authorization: Bearer {token}
  Response: { updated priority score }

PUT /report/:id/status
  Headers: Authorization: Bearer {token}
  Body: { status, notes }
  Response: { updated report }
```

### Admin Endpoints

```
GET /admin/dashboard/stats
  Headers: Authorization: Bearer {token} (admin only)
  Response: { stats, charts data }

GET /admin/leaderboard
  Query: ?limit=10
  Response: [{ top users with stats }]

GET /admin/users/:id
  Headers: Authorization: Bearer {token} (admin only)
  Response: { user details + statistics }
```

---

## 🔐 Role-Based Access

### User (Regular)
| Action | Permission |
|--------|-----------|
| Create Report | ✅ Own |
| Edit Report | ✅ Own only |
| Delete Report | ✅ Own only |
| Vote Report | ✅ Yes |
| Earn Points | ✅ Yes |
| Unlock Badges | ✅ Yes |
| View Dashboard | ✅ Yes |
| View Leaderboard | ✅ Yes |
| Moderate Reports | ❌ No |
| Change Status | ❌ No |
| View Admin Panel | ❌ No |

### Admin
| Action | Permission |
|--------|-----------|
| Create Report | ✅ Own |
| Edit Report | ✅ Any |
| Delete Report | ✅ Any |
| Change Status | ✅ Yes |
| Moderate Reports | ✅ Yes |
| View Admin Panel | ✅ Yes |
| View All Reports | ✅ Yes |
| View Statistics | ✅ Yes |
| Manage Users | ✅ Yes |

---

## 🎮 Gamification System

### Points System
```
Action                          Points
─────────────────────────────────────
Create Report                   +10
Vote on Report                  +2
Report Completed (reporter)     +15
Complete Profile                +5
```

### Levels
```
Level   Name              Points Required
─────────────────────────────────────────
1       Pemula           0 - 50
2       Kontributor      50 - 150
3       Aktivis          150 - 300
4       Warga Teladan    300 - 500
5       Guardian         500+
```

### Badges
```
Badge Name              Unlock Condition      Icon
────────────────────────────────────────────────────
Pelapor Setia          5+ reports created    📝
Komunitas Peduli       20+ votes given       ❤️
Warga Teladan          100+ points earned    🏆
Pengguna Aktif         50+ profile views     👁️
```

### Leaderboard
- Ranked by total points
- Shows top 10 contributors
- Displays level, badges, & recent activity
- Monthly & all-time rankings

---

## 🗄 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  profile_photo: String (nullable),
  bio: String (nullable),
  role: String (enum: ['user', 'admin'], default: 'user'),
  level: Number (default: 1),
  points: Number (default: 0),
  reports_created: Number (default: 0),
  badges: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Report Model
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User),
  title: String (required),
  description: String (required),
  category: String (required),
  severity: Number (1-5, required),
  latitude: Number (required),
  longitude: Number (required),
  photo_url: String (nullable),
  status: String (enum: ['pending', 'progress', 'done']),
  priority_score: Number (calculated),
  voteCount: Number (default: 0),
  history: [ObjectId] (ref: ReportHistory),
  createdAt: Date,
  updatedAt: Date
}
```

### Complete Schema Documentation
Lihat `backend/src/model/` untuk detail lengkap semua schemas.

---

## 🤝 Contributing

Kontribusi sangat diterima! Untuk berkontribusi:

```bash
# 1. Fork repository
# 2. Create feature branch
git checkout -b feature/your-feature

# 3. Commit changes
git commit -am 'Add some feature'

# 4. Push to branch
git push origin feature/your-feature

# 5. Create Pull Request
```

### Guidelines
- Follow existing code style
- Add comments untuk complex logic
- Test sebelum submit PR
- Update README jika perlu

---

## 📝 License

Project ini open source dan tersedia under MIT License.

---

## 👥 Author

**Muhammad Khosyi Syehab**  
- Email: khosyisyehab@gmail.com
- GitHub: [@KhosySyehab](https://github.com/KhosySyehab)

---

## 📞 Support

Jika ada pertanyaan atau issue, silakan:
1. Check existing issues di GitHub
2. Create new issue dengan detail yang jelas
3. Contact author via email

---

## 🎯 Future Roadmap

- [ ] Real-time notifications (Socket.io)
- [ ] Advanced filtering & search
- [ ] Report export (CSV/PDF)
- [ ] AI-powered categorization
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Admin analytics dashboard
- [ ] Community badges & rewards

---

**Made with ❤️ for community problem-solving**
