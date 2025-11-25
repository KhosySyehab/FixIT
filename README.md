# FixIT

## FixIT — Web Aplikasi Pelaporan & Tracking Perbaikan Fasilitas Publik

### Deskripsi Singkat
FixIT adalah aplikasi berbasis web yang membantu masyarakat melaporkan kerusakan fasilitas publik (jalan rusak, lampu jalan mati, saluran air tersumbat, sampah menumpuk, dll) disertai foto, lokasi, dan tingkat keparahan.          
Aplikasi ini memprioritaskan laporan secara otomatis, menampilkan peta interaktif, serta memungkinkan pengurus wilayah (RT/RW/kecamatan) memperbarui status laporan.
FixIT juga menggunakan sistem gamifikasi untuk meningkatkan partisipasi warga.

---
### Tujuan Utama
- Mempermudah warga melaporkan masalah lingkungan sekitar   
- Meningkatkan transparansi proses perbaikan    
- Memberikan prioritas otomatis berdasarkan urgensi 
- Mendorong partisipasi aktif dengan gamifikasi 
- Mempercepat koordinasi antara warga dan pengurus wilayah  
---
### User Roles
#### Warga (User)  
- Membuat laporan   
- Mengirim foto + lokasi    
- Melihat status laporan    
- Memberikan vote prioritas 
- Mendapat poin & badge gamifikasi  
#### Admin Wilayah (RT/RW/Lurah)   
- Melihat laporan masuk 
- Mengedit status laporan (Pending → Progress → Selesai)    
- Memvalidasi laporan   
- Melihat peta & dashboard statistik    
#### Super Admin (Opsional)    
- Mengelola wilayah 
- Mengelola admin   
- Melihat analitik global   
---
### Fitur Utama
1. Pelaporan Kerusakan      
Upload foto. Deteksi lokasi (GPS). Deskripsi singkat. Kategori: jalan, drainase, lampu, sampah, dll. Tingkat keparahan.     

2. Prioritas Otomatis       
Contoh formula:
```
prioritas = (vote*2) + (keparahan*3) + usia_laporan(Jam)
```

3. Peta Interaktif (Leaflet / Google Maps)      
Titik laporan dengan warna berdasarkan status. Heatmap masalah.     

4. Dashboard Admin      
Jumlah laporan per kategori. Ranking wilayah paling rawan. Grafik tren mingguan.     
        
5. Status Tracking      
Pending. In Progress. Selesai. Notifikasi otomatis untuk user.       
---
### 🎮 Gamifikasi
#### 🧩 Poin
- Melapor masalah → +10
- Verifikasi laporan orang lain → +5
- Vote prioritas → +2
- Laporan lengkap dengan foto-lokasi → +3 bonus

#### 🏅 Badge
- "Warga Peduli Lingkungan" — 50 poin
- "Mata Elang" — 10 laporan valid
- "Green Guardian" — 20 verifikasi
- "FixIt Ranger" — 5 laporan selesai dari kontribusimu

#### 📈 Level
- Level 1 → Pemula
- Level 2 → Kontributor
- Level 3 → Aktivis
- Level 4 → Warga Teladan
- Level 5 → Guardian

#### 🏆 Leaderboard
- Warga paling aktif
- RT paling bersih (paling sedikit laporan terbuka)
---
### 📊 Data Flow Umum
1. User membuat laporan
2. Sistem menyimpan laporan + lokasi
3. Sistem menghitung prioritas otomatis
4. Admin wilayah menerima laporan
5. Admin update status
6. Sistem kirim notifikasi
7. Dashboard menampilkan statistik realtime
---
### 🧱 Arsitektur Teknis
#### Frontend
- React
- TailwindCSS
- Map API (Leaflet / Google Maps)

#### Backend
- Node.js (Express)
- Auth JWT
- Cron job untuk update otomatis
- Modul gamifikasi (points, badge, leveling)

#### Database
- PostgreSQL / MongoDB
Tabel penting:
- users
- reports
- report_votes
- report_history
- badges
- user_badges
- gamification_log
---
### Contoh Struktur Tabel Laporan
```
report_id (PK)
user_id (FK)
title
description
category
severity
photo_url
latitude
longitude
status (pending/progress/done)
priority_score
created_at
updated_at
```
---
### Fitur Tambahan Opsional
- OTP login (email/WA)
- AI auto-tagging kategori kerusakan
- AI text summarization deskripsi laporan
- Push notification (PWA)
- Sistem QR code untuk cek status perbaikan di lokasi
