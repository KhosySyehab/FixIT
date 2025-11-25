import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './page/login';
import Register from './page/register';
import Dashboard from './page/dashboard';
import CreateReport from './page/createreport';
import ReportDetail from './page/reportdetail';
import Leaderboard from './page/leaderboard';
import AdminDashboard from './page/admin/dashboard';
import LandingPage from './page/landing';
import Navbar from './component/navbar';
import ProtectedRoute from './component/protectedroute';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
    setLoading(false);
  }, []);

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading FixIT...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        {isAuthenticated && <Navbar onLogout={handleLogout} userRole={userRole} />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report/create" element={<CreateReport />} />
          <Route path="/report/:id" element={<ReportDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="admin" userRole={userRole} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
