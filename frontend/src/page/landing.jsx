import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, AlertCircle, Users, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center">
              <MapPin className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-indigo-600">FixIT</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/login" className="px-6 py-2 text-indigo-600 hover:text-indigo-700 font-semibold transition">Login</Link>
            <Link to="/register" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Report Issues,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Make a Difference</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Lacak masalah infrastruktur di komunitas Anda. Dari jalan berlubang hingga penerangan jalan, setiap laporan membantu membuat lingkungan yang lebih baik.
        </p>
        <Link 
          to="/register" 
          className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold text-lg transition shadow-lg hover:shadow-xl"
        >
          Get Started Now
        </Link>
      </div>

      {/* Features */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">Mengapa FixIT?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <AlertCircle className="text-indigo-600 mb-4" size={32} />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Lapor dengan Mudah</h4>
              <p className="text-gray-700">Ambil foto, tentukan lokasi, dan kirim laporan dalam hitungan detik dengan aplikasi mobile-friendly kami.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <MapPin className="text-emerald-600 mb-4" size={32} />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Pantau di Peta</h4>
              <p className="text-gray-700">Lihat semua masalah infrastruktur di area Anda secara real-time dengan visualisasi peta interaktif.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <Users className="text-orange-600 mb-4" size={32} />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Komunitas Terintegrasi</h4>
              <p className="text-gray-700">Bergabunglah dengan warga lain untuk mengidentifikasi dan menyelesaikan masalah bersama-sama.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">1000+</div>
              <p className="text-gray-600">Laporan Terverifikasi</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Warga Aktif</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">80%</div>
              <p className="text-gray-600">Masalah Terselesaikan</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-gray-600">Dukungan Komunitas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gamification Preview */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Zap className="mx-auto mb-4" size={40} />
          <h3 className="text-3xl font-bold mb-4">Dapatkan Poin & Badges</h3>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Raih poin dengan setiap laporan yang dibuat dan terverifikasi. Naik level, buka badges, dan tampilkan di leaderboard komunitas!
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">Siap Membuat Perubahan?</h3>
        <Link 
          to="/register" 
          className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold text-lg transition shadow-lg"
        >
          Daftar Sekarang
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <MapPin className="text-white" size={20} />
              </div>
              <p className="font-semibold">FixIT - Lacak Masalah, Ciptakan Solusi</p>
            </div>
            <p className="text-sm">&copy; 2024 FixIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
