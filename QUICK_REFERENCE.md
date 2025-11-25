# 🚀 FixIT Quick Reference

## Installation (5 minutes)

```bash
# 1. Backend
cd backend && npm install
cp .env.example .env
# Edit .env: set MONGO_URI, JWT_SECRET, EMAIL_USER/PASSWORD

# 2. Frontend  
cd ../frontend && npm install

# 3. Seed Database
cd ../backend && node ../script/seed.js

# 4. Start servers
# Terminal 1: npm run dev (backend)
# Terminal 2: npm run dev (frontend)
```

## Test Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@fixit.com | adminpass | Admin |
| user1@fixit.com | userpass | User |
| user2@fixit.com | userpass | User |
| user3@fixit.com | userpass | User |
| user4@fixit.com | userpass | User |
| user5@fixit.com | userpass | User |

## Key URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Admin Dashboard**: /admin/dashboard
- **Leaderboard**: /leaderboard
- **Map**: View on any report page

## Core Endpoints

### Public
- `POST /auth/register` - Daftar akun baru
- `POST /auth/login` - Login
- `GET /admin/leaderboard` - Lihat top users

### User (Protected)
- `GET /report` - Lihat semua laporan
- `GET /report/:id` - Detail laporan
- `POST /report` - Buat laporan baru
- `POST /report/:id/vote` - Vote laporan
- `GET /admin/users/:id` - Lihat profil user

### Admin (Protected)
- `GET /admin/dashboard/stats` - Dashboard stats
- `PUT /report/:id/status` - Update status laporan
- `GET /admin/users-list` - Lihat semua users
- `GET /admin/reports/area` - Reports by location

## Gamification Rules

| Action | Points | Condition |
|--------|--------|-----------|
| Create Report | +10 | After first report |
| Vote | +2 | Per vote (1 vote per user per report) |
| Report Done | +15 | When admin marks report as done |
| Badge Earned | +5-10 | Unlock new badge |

## Levels

| Level | Name | Points |
|-------|------|--------|
| 1 | Pemula | 0+ |
| 2 | Kontributor | 50+ |
| 3 | Aktivis | 150+ |
| 4 | Warga Teladan | 300+ |
| 5 | Guardian | 500+ |

## Badges

- 🌱 Warga Peduli Lingkungan (1 laporan)
- 👁️ Mata Elang (10 laporan)
- 🛡️ Green Guardian (10 verifikasi)
- 🎯 FixIt Ranger (5 laporan selesai)

## Report Status Flow

```
Pending (🔴) → Progress (🟠) → Done (🟢)
```

- Only admin dapat update status
- Saat Done → pelapor dapat +15 points
- Email notification dikirim saat Done
- Status history dicatat otomatis

## Important Files

### Backend
- `src/controller/report.controller.js` - Report logic
- `src/controller/admin.controller.js` - Admin logic
- `src/utils/gamificationUtil.js` - Points & badges
- `src/utils/emailUtil.js` - Email sending
- `.env` - Configuration (create dari .env.example)

### Frontend
- `src/api/api.js` - API client
- `src/component/ReportMap.jsx` - Map component
- `src/page/reportdetail.jsx` - Report detail
- `src/page/admin/dashboard.jsx` - Admin dashboard
- `src/page/leaderboard.jsx` - Leaderboard
- `tailwind.config.js` - Styling config

## Common Errors & Fixes

| Error | Solution |
|-------|----------|
| Can't connect to MongoDB | Check MONGO_URI in .env, ensure MongoDB running |
| Email not sending | Enable Gmail 2FA, use App Password in .env |
| Frontend can't reach API | Ensure backend running on port 5000, check CORS |
| Map not showing | Check internet, ensure Leaflet CDN accessible |
| Seed script times out | Reduce sample data, increase timeout, check connection |

## Email Setup (Gmail)

1. Enable 2-Factor Authentication: https://myaccount.google.com
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=generated_password (16 chars, no spaces)
```

## Development Commands

```bash
# Backend
npm run dev      # Start with nodemon
npm start        # Production start

# Frontend
npm run dev      # Vite dev server
npm run build    # Build for production
npm run lint     # Check code style
npm run preview  # Preview build
```

## Database Models Summary

- **Users**: Email, password, points, level, badges
- **Reports**: Title, description, location, severity, status, priority
- **Votes**: User vote untuk report priority
- **ReportHistory**: Track status changes
- **GamificationLog**: Track point earning

## Next Steps

1. ✅ Backend & Frontend setup
2. ✅ Database seeding
3. ✅ Test login & create report
4. ✅ Vote & see points increase
5. ✅ Mark report as done (admin)
6. ✅ Check leaderboard & badges
7. ✅ View dashboard & statistics

## Useful Resources

- `/IMPLEMENTATION_GUIDE.md` - Full implementation details
- `/IMPLEMENTATION_SUMMARY.md` - What was built
- `/README.md` - Project overview
- Backend code comments - API details
- Frontend component JSDoc - UI documentation

## Tips

💡 Use `node ../script/seed.js` to reset database with fresh data  
💡 Check browser DevTools Network tab untuk debug API calls  
💡 Use admin account to test status updates & badge awarding  
💡 Points automatically calculated - user can see progress in real-time  
💡 All passwords: `adminpass` or `userpass` (except custom ones)

---

**Version**: 1.0 Beta | **Last Updated**: November 26, 2025
