# ⚡ FixIT Setup Checklist (5 Min Setup)

Copy & paste this into your terminal to get FixIT running in 5 minutes!

---

## ✅ Prerequisites Check

- [ ] Node.js v18+ installed
- [ ] MongoDB running or Atlas account
- [ ] Gmail account (optional, for email)

---

## ✅ Setup Steps

### Step 1: Backend Setup (2 min)
```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# EDIT .env with these values:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/fixit
# JWT_SECRET=your_random_secret_key
# EMAIL_USER=your_email@gmail.com (optional)
# EMAIL_PASSWORD=your_app_password (optional)
```

### Step 2: Frontend Setup (1 min)
```powershell
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Frontend is ready to go!
```

### Step 3: Database Seeding (1 min)
```powershell
# Go to backend directory
cd ../backend

# Run seed script
node ../script/seed.js

# You should see:
# ✓ Connected to MongoDB
# ✓ Created admin user
# ✓ Created 5 regular users
# ✓ Created 5 sample reports
# ✅ Seeding complete!
```

### Step 4: Start Servers (1 min)

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
# Should show: Server running on port 5000
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
# Should show: Local: http://localhost:5173
```

---

## ✅ Quick Test

1. Open: http://localhost:5173
2. Login with: **admin@fixit.com** / **adminpass**
3. See dashboard ✅
4. Or use any user account: **user1@fixit.com** / **userpass**

---

## 📝 Minimal Setup (for testing only)

If you just want to test without email:
1. Skip the EMAIL_USER & EMAIL_PASSWORD in .env
2. Everything else works the same
3. Email notifications will be logged to console

---

## ✨ What You Can Do Now

- ✅ Register new accounts
- ✅ Create reports
- ✅ Vote on reports
- ✅ View leaderboard
- ✅ See gamification (points, levels, badges)
- ✅ View maps
- ✅ Admin dashboard (login as admin)
- ✅ Update report status (admin only)

---

## 🆘 If Something Goes Wrong

| Error | Fix |
|-------|-----|
| Can't connect to MongoDB | Check MongoDB is running, verify MONGO_URI |
| Port 5000 in use | Change PORT in .env or kill existing process |
| npm install fails | Delete `node_modules`, try `npm install` again |
| Seed script fails | Check MongoDB connection, reduce data size |
| Frontend won't load | Ensure backend running on 5000, check console |

---

## 📚 Next Steps

1. **Quick Reference**: Read `QUICK_REFERENCE.md`
2. **Full Overview**: Read `README.md`
3. **Test Everything**: Use `TESTING_CHECKLIST.md`
4. **Learn Architecture**: Read `IMPLEMENTATION_GUIDE.md`

---

## 🚀 You're Ready!

If all ✅ are checked, **FixIT is running successfully!**

**Happy testing!** 🎉

---

**Setup Time**: ~5 minutes  
**Dependencies**: Node.js, MongoDB  
**Difficulty**: Easy  
**Status**: Production Ready ✅
