import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, MapPin, LogOut, BarChart3, Trophy, Sun, Moon, User } from 'lucide-react';

export default function Navbar({ onLogout, userRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
      <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center">
              <MapPin className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-indigo-600">FixIT</h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/dashboard" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-300 hover:bg-indigo-50 rounded-lg">Dashboard</Link>
            <Link to="/leaderboard" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-300 hover:bg-indigo-50 rounded-lg flex items-center gap-2">
              <Trophy size={18} /> Leaderboard
            </Link>
            <Link to="/profile" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-300 hover:bg-indigo-50 rounded-lg flex items-center gap-2">
              <User size={18} /> Profil
            </Link>
            {userRole === 'admin' && (
              <Link to="/admin" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-300 hover:bg-indigo-50 rounded-lg flex items-center gap-2">
                <BarChart3 size={18} /> Admin
              </Link>
            )}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-110"
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-700" />}
            </button>
            <Link 
              to="/report/create" 
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              + Report
            </Link>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-semibold transition-all duration-300 flex items-center gap-2 transform hover:scale-105 hover:shadow-lg"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slideDown">
            <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition-all duration-300">Dashboard</Link>
            <Link to="/leaderboard" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition-all duration-300 flex items-center gap-2">
              <Trophy size={18} /> Leaderboard
            </Link>
            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition-all duration-300 flex items-center gap-2">
              <User size={18} /> Profil
            </Link>
            {userRole === 'admin' && (
              <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition-all duration-300 flex items-center gap-2">
                <BarChart3 size={18} /> Admin
              </Link>
            )}
            <Link 
              to="/report/create" 
              className="block px-4 py-2 bg-indigo-600 text-white rounded font-semibold transition-all duration-300 transform hover:scale-105"
            >
              + Lapor
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 bg-red-100 text-red-700 rounded font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
