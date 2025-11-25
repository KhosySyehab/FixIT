# ✅ FixIT Testing Checklist

## Pre-Setup Checklist

- [ ] Node.js v18+ installed
- [ ] MongoDB installed atau MongoDB Atlas account
- [ ] Gmail account dengan 2FA enabled
- [ ] Generated App Password dari Gmail
- [ ] Git installed & repository cloned

## Backend Setup Checklist

- [ ] Navigate to `backend` directory
- [ ] Run `npm install` successfully
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in `.env` values:
  - [ ] `MONGO_URI` set correctly
  - [ ] `JWT_SECRET` set to random string
  - [ ] `EMAIL_USER` set to Gmail address
  - [ ] `EMAIL_PASSWORD` set to App Password
- [ ] Test `npm run dev` starts without errors
- [ ] Verify "Server running on port 5000" message

## Frontend Setup Checklist

- [ ] Navigate to `frontend` directory
- [ ] Run `npm install` successfully
- [ ] Verify Tailwind CSS, Leaflet, Axios installed
- [ ] Copy `.env.example` to `.env` (optional)
- [ ] Test `npm run dev` starts without errors
- [ ] Verify "Local: http://localhost:5173" message

## Database Seeding Checklist

- [ ] Navigate to `backend` directory
- [ ] Run `node ../script/seed.js`
- [ ] See "✓ Connected to MongoDB" message
- [ ] See "✓ Created admin user" message
- [ ] See "✓ Created 5 regular users" message
- [ ] See "✓ Created 5 sample reports" message
- [ ] See "✅ Seeding complete!" message
- [ ] Verify credentials shown in output

## Authentication Testing

### User Registration
- [ ] Open http://localhost:5173
- [ ] Go to Register page
- [ ] Fill form dengan valid data
- [ ] Submit & see success message
- [ ] Check database untuk new user created
- [ ] Try login dengan new credentials

### User Login
- [ ] Use credentials: user1@fixit.com / userpass
- [ ] Successfully login & redirect to dashboard
- [ ] Token saved di localStorage
- [ ] Verify JWT token valid (decoded)
- [ ] Try logout & verify token removed

### Admin Login
- [ ] Use credentials: admin@fixit.com / adminpass
- [ ] Successfully login as admin
- [ ] Check role should be "admin"
- [ ] See "Admin Dashboard" option available

## Report Functionality Testing

### Create Report
- [ ] Create report dengan required fields
  - [ ] Title entered
  - [ ] Description entered
  - [ ] Category selected
  - [ ] Severity level set (1-5)
- [ ] Upload photo file
- [ ] Enter location (latitude, longitude)
- [ ] Submit report
- [ ] See success message
- [ ] Verify database record created
- [ ] User should get +10 points

### View Reports
- [ ] Go to reports list
- [ ] See all reports displayed
- [ ] Each report shows: title, category, status, priority
- [ ] Click report untuk lihat detail
- [ ] Report detail menampilkan:
  - [ ] Full description
  - [ ] Photo displayed
  - [ ] Map dengan exact location
  - [ ] User info (pelapor)
  - [ ] Vote count
  - [ ] Status badges
  - [ ] Priority score

### Vote Functionality
- [ ] View report detail
- [ ] Click "Vote Sekarang" button
- [ ] Button changes to "✓ Sudah Vote"
- [ ] Vote count increases by 1
- [ ] User points increase by +2
- [ ] Try vote again - should show error "already voted"
- [ ] Priority score updated di report

### Map Visualization
- [ ] Map loads without errors
- [ ] All reports visible sebagai markers
- [ ] Color coding correct:
  - [ ] 🔴 Red = Pending
  - [ ] 🟠 Orange = In Progress
  - [ ] 🟢 Green = Done
- [ ] Click marker shows popup dengan info
- [ ] Zoom & pan works smoothly
- [ ] No console errors

## Gamification Testing

### Points System
- [ ] Create report → user gets +10 points
- [ ] Vote report → user gets +2 points
- [ ] Each action properly logged
- [ ] Total points displayed di profile
- [ ] Points persist after logout/login

### Level System
- [ ] User starts at Level 1
- [ ] At 50 points → Level 2
- [ ] At 150 points → Level 3
- [ ] At 300 points → Level 4
- [ ] At 500 points → Level 5
- [ ] Level name displays correctly
- [ ] Level visible di leaderboard

### Badge System
- [ ] Create first report → get 🌱 badge
- [ ] Create 10 reports → get 👁️ badge
- [ ] Badges stored di user model
- [ ] Badges displayed di profile
- [ ] Badges displayed di leaderboard
- [ ] Getting badge awards points

### Leaderboard
- [ ] Access leaderboard page
- [ ] See top 10 users listed
- [ ] Sorted by points (highest first)
- [ ] Ranking numbers displayed (1st, 2nd, etc)
- [ ] Each user shows:
  - [ ] Name & email
  - [ ] Points
  - [ ] Level
  - [ ] Badges
  - [ ] Reports created count
- [ ] Medal icons for top 3 (🏆, 🥈, 🥉)
- [ ] Clicking user shows detail (future feature)

### Profile
- [ ] View own profile
- [ ] Shows correct info:
  - [ ] Name, email, level
  - [ ] Total points
  - [ ] Badges earned
  - [ ] Reports created
  - [ ] Reports verified count
- [ ] Profile updates real-time after actions

## Admin Features Testing

### Dashboard Access
- [ ] Login dengan admin account
- [ ] Go to admin dashboard
- [ ] Dashboard loads without errors
- [ ] See all stats properly displayed

### Dashboard Statistics
- [ ] **Total Reports Card**: Shows correct total count
- [ ] **Pending Card**: Shows pending count (🔴)
- [ ] **In Progress Card**: Shows progress count (🟠)
- [ ] **Completed Card**: Shows done count (🟢)
- [ ] **Completion Rate**: Bar shows correct percentage
- [ ] **Category Breakdown**: Shows top categories
- [ ] **Refresh Button**: Updates stats when clicked

### Report Status Update (Admin Only)
- [ ] Open report detail as admin
- [ ] Update status dari pending → progress
- [ ] See "Update Status" button (user tidak punya)
- [ ] Status berubah di database
- [ ] ReportHistory entry created
- [ ] Update progress → done
  - [ ] Pelapor gets +15 points
  - [ ] Email notification sent
  - [ ] Completion rate updated
- [ ] Can add notes untuk setiap status change
- [ ] Status changes logged dengan timestamp

### Users Management
- [ ] View all users list
- [ ] Shows all user details
- [ ] Can filter/search (future)
- [ ] Click user untuk lihat profile
- [ ] Profile shows:
  - [ ] Points & level
  - [ ] Badges
  - [ ] Reports created
  - [ ] Reports verified

### Report Analytics
- [ ] View reports by area
- [ ] Filter by latitude/longitude/radius
- [ ] See heatmap of problem areas (future)
- [ ] Category breakdown shows accurate counts
- [ ] Severity breakdown shows accurate counts

## Email Notification Testing

### Email Configuration
- [ ] Verify EMAIL_USER in .env
- [ ] Verify EMAIL_PASSWORD in .env
- [ ] No error messages pada startup

### Email on Report Completion
- [ ] Admin marks report as "Done"
- [ ] Check Gmail inbox untuk notification email
- [ ] Email subject correct
- [ ] Email body shows:
  - [ ] User name
  - [ ] Report title
  - [ ] New status
  - [ ] Professional formatting
- [ ] Email sent successfully (no errors di console)

### Failed Email Handling
- [ ] If email disabled - app still works
- [ ] If email fails - console shows error but report updates
- [ ] No blocking of report updates

## Report History Testing

### Status Change Logging
- [ ] Update report status sebagai admin
- [ ] History entry created automatically
- [ ] Shows old status → new status
- [ ] Shows who changed it (admin name)
- [ ] Shows when changed (timestamp)
- [ ] Shows notes if provided

### View History
- [ ] Open report detail
- [ ] Scroll to "Riwayat Status" section
- [ ] See all status changes listed
- [ ] Changes in chronological order
- [ ] Each entry shows:
  - [ ] Status change (old → new)
  - [ ] Date & time
  - [ ] Admin name (if shown)
  - [ ] Notes/comments

## Frontend UI/UX Testing

### Navigation
- [ ] Menu items functional
- [ ] Active page highlighted
- [ ] Back buttons work
- [ ] All links functional
- [ ] Mobile responsive (test di mobile view)

### Forms
- [ ] Form validation works
- [ ] Error messages display correctly
- [ ] Success messages display correctly
- [ ] Required fields marked
- [ ] File upload preview shows

### Styling
- [ ] Tailwind CSS applied correctly
- [ ] Colors consistent dengan theme
- [ ] Buttons have hover effects
- [ ] Cards have proper spacing
- [ ] No style conflicts
- [ ] Dark/light mode (if implemented)

### Accessibility
- [ ] Tab navigation works
- [ ] Form labels proper
- [ ] Images have alt text
- [ ] Color contrast sufficient
- [ ] ARIA labels present (future)

## Performance Testing

### Page Load Times
- [ ] Dashboard loads < 2 seconds
- [ ] Report list loads < 1 second
- [ ] Map loads < 2 seconds
- [ ] No console warnings (except vendor)

### API Response Times
- [ ] Create report < 2 seconds
- [ ] Get reports < 1 second
- [ ] Vote < 500ms
- [ ] Update status < 1 second

### Memory Usage
- [ ] App tidak hang saat creating multiple reports
- [ ] Map renders 100+ markers smoothly
- [ ] No memory leaks visible

## Security Testing

### Authentication
- [ ] Cannot access protected routes without token
- [ ] Invalid token rejected
- [ ] Expired token handled properly
- [ ] CORS headers correct

### Authorization
- [ ] User cannot update other user's report
- [ ] User cannot change own role to admin
- [ ] Admin-only endpoints protected
- [ ] Admin-only UI features hidden from users

### Input Validation
- [ ] SQL injection attempts blocked (future)
- [ ] XSS attempts blocked (future)
- [ ] File upload validated
- [ ] Email format validated

## Data Integrity Testing

### Database
- [ ] User points correctly sum
- [ ] Level calculations correct
- [ ] Badges properly assigned
- [ ] Report counts accurate
- [ ] Foreign keys maintained

### Cascading
- [ ] Delete user → reports orphaned correctly
- [ ] Delete report → votes removed
- [ ] Delete report → history preserved

## Browser Compatibility

- [ ] Chrome latest version
- [ ] Firefox latest version
- [ ] Safari latest version
- [ ] Edge latest version
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Device Testing

- [ ] Desktop (1920x1080)
- [ ] Tablet (iPad, Android tablet)
- [ ] Mobile (iPhone, Android phone)
- [ ] Small screens (< 480px)

## Documentation Verification

- [ ] README.md comprehensive & accurate
- [ ] QUICK_REFERENCE.md helpful
- [ ] IMPLEMENTATION_GUIDE.md detailed
- [ ] Code comments present
- [ ] JSDoc comments in components
- [ ] API endpoints documented

## Final Sign-Off

- [ ] All features working as designed
- [ ] No critical bugs
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Documentation complete
- [ ] Ready for beta testing ✅

---

## Bug Report Template

If you find a bug, note:
- [ ] Reproduction steps
- [ ] Expected behavior
- [ ] Actual behavior
- [ ] Browser & OS
- [ ] Console errors
- [ ] Database state
- [ ] User account used

## Feedback Areas

- [ ] UI/UX improvements
- [ ] Performance suggestions
- [ ] Feature requests
- [ ] Documentation clarity
- [ ] Code quality
- [ ] Security concerns

---

**Testing Date**: _______________  
**Tester Name**: _______________  
**Test Result**: ☐ PASS ☐ FAIL  
**Issues Found**: _______________

**Version**: 1.0 Beta | Last Updated: November 26, 2025
