import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, adminAPI, reportAPI } from '../api/api';
import { Trophy, Medal, Award, MapPin, Mail, Clock, Zap, ChevronRight, Heart, Share2, Loader, AlertCircle, Edit2, Camera } from 'lucide-react';

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userReports, setUserReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', bio: '' });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const currentId = localStorage.getItem('userId');
    if (!currentId) {
      setError('User ID tidak ditemukan. Silakan login kembali.');
      setLoading(false);
      return;
    }
    setCurrentUserId(currentId);
    loadUserProfile();
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      const currentId = localStorage.getItem('userId');
      const profileUserId = userId || currentId;
      
      setIsOwnProfile(profileUserId === currentId);

      const response = await adminAPI.getUserProfile(profileUserId);
      setUser(response.data);
      setEditForm({ name: response.data.name, bio: response.data.bio || '' });

      // Fetch user's reports
      try {
        const reportsRes = await api.get('/report');
        const userReports = reportsRes.data.filter(r => r.user_id._id === profileUserId || r.user_id === profileUserId);
        setUserReports(userReports);
      } catch (err) {
        console.warn('Could not fetch reports:', err);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Gagal memuat profil pengguna');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('name', editForm.name);
      formData.append('bio', editForm.bio);
      if (profilePhoto) {
        formData.append('profile_photo', profilePhoto);
      }

      await adminAPI.updateUserProfile(user._id, formData);
      
      // Reload profile
      await loadUserProfile();
      setIsEditing(false);
      setProfilePhoto(null);
      alert('Profil berhasil diperbarui!');
    } catch (err) {
      alert('Gagal memperbarui profil: ' + (err.response?.data?.msg || err.message));
    } finally {
      setUploading(false);
    }
  };



  const getLevelInfo = (level) => {
    const levels = {
      1: { name: 'Pemula', icon: '🌱', color: 'from-gray-400 to-gray-600' },
      2: { name: 'Kontributor', icon: '📚', color: 'from-blue-400 to-blue-600' },
      3: { name: 'Aktivis', icon: '⚡', color: 'from-purple-400 to-purple-600' },
      4: { name: 'Warga Teladan', icon: '🏆', color: 'from-orange-400 to-orange-600' },
      5: { name: 'Guardian', icon: '👑', color: 'from-red-400 to-red-600' }
    };
    return levels[level] || levels[1];
  };

  const getProgressToNextLevel = () => {
    const thresholds = { 1: 50, 2: 150, 3: 300, 4: 500, 5: 500 };
    const currentThreshold = thresholds[user.level - 1] || 0;
    const nextThreshold = thresholds[user.level] || 500;
    const progress = Math.max(0, Math.min(100, ((user.points - currentThreshold) / (nextThreshold - currentThreshold)) * 100));
    return progress;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">Memuat profil...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error || 'Pengguna tidak ditemukan'}</p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  const levelInfo = getLevelInfo(user.level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with Background */}
        <div className="relative mb-8">
          {/* Decorative Background */}
          <div className={`absolute inset-0 bg-gradient-to-r ${levelInfo.color} rounded-3xl opacity-20 blur-2xl -z-10`}></div>
          
          {/* Main Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
            {/* Banner */}
            <div className={`h-32 bg-gradient-to-r ${levelInfo.color}`}></div>

            {/* Profile Content */}
            <div className="px-8 pb-8">
              {/* Profile Header with Avatar */}
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-19 mb-8">
                {/* Avatar with Edit Option */}
                <div className="relative group transform transition-all duration-300 hover:scale-110">
                  <div className="w-40 h-40 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl border-4 border-white dark:border-gray-800 overflow-hidden">
                    {user.profile_photo ? (
                      <img 
                        src={`http://localhost:5000/uploads/${user.profile_photo}`} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = `<span class="text-6xl">${user.name.charAt(0).toUpperCase()}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-6xl">{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  {isOwnProfile && (
                    <label className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:bg-indigo-700 transform hover:scale-110">
                      <Camera size={20} />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setProfilePhoto(e.target.files[0]);
                            setIsEditing(true);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 mt-4 md:mt-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {isEditing && isOwnProfile ? (
                      <div className="flex-1">
                        <input 
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="text-3xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-lg mb-2 w-full"
                        />
                        <textarea 
                          value={editForm.bio}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          className="w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg resize-none"
                          rows="2"
                          placeholder="Tambahkan bio..."
                        />
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                          {user.name}
                        </h1>
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 mb-4">
                          <Mail size={18} />
                          <span className="text-sm md:text-base">{user.email}</span>
                        </div>
                        {user.bio && (
                          <p className="text-gray-700 dark:text-gray-300 italic">{user.bio}</p>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    {isOwnProfile ? (
                      <div className="flex gap-2">
                        {isEditing ? (
                          <>
                            <button 
                              onClick={handleProfileUpdate}
                              disabled={uploading}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                            >
                              {uploading ? <Loader className="animate-spin" size={20} /> : 'Simpan'}
                            </button>
                            <button 
                              onClick={() => {
                                setIsEditing(false);
                                setProfilePhoto(null);
                                setEditForm({ name: user.name, bio: user.bio || '' });
                              }}
                              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-300"
                            >
                              Batal
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2"
                          >
                            <Edit2 size={18} /> Edit Profil
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-300 transform hover:scale-110">
                          <Heart size={20} />
                        </button>
                        <button className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300 transform hover:scale-110">
                          <Share2 size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Level Badge and Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Level */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="text-2xl mb-2"></div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Level</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.level}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{levelInfo.name}</p>
                </div>

                {/* Points */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="text-2xl mb-2"></div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Poin</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.points || 0}</p>
                </div>

                {/* Reports */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="text-2xl mb-2"></div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Laporan</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.reports_created || 0}</p>
                </div>

                {/* Badges */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="text-2xl mb-2"></div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Badge</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.badges?.length || 0}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Progres ke Level {user.level + 1}
                  </p>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {Math.round(getProgressToNextLevel())}%
                  </span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${levelInfo.color} transition-all duration-500 ease-out`}
                    style={{ width: `${getProgressToNextLevel()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {[
                { id: 'overview', label: 'Ikhtisar', icon: '' },
                { id: 'badges', label: 'Badge', icon: '' },
                { id: 'reports', label: 'Laporan', icon: '' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content with Smooth Transitions */}
          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="animate-fadeIn space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stats Grid */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Statistik Aktivitas</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer group">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Laporan Dibuat</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{user.reports_created || 0}</p>
                      </div>
                      <span className="text-3xl group-hover:scale-125 transition-transform duration-300">📝</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer group">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Laporan Terverifikasi</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{user.reports_verified || 0}</p>
                      </div>
                      <span className="text-3xl group-hover:scale-125 transition-transform duration-300">✅</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer group">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Total Poin</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{user.points || 0}</p>
                      </div>
                      <span className="text-3xl group-hover:scale-125 transition-transform duration-300">⭐</span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Informasi Pengguna</h3>
                    
                    <div className="p-4 border-l-4 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-r-lg transform transition-all duration-300 hover:translate-x-2">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Email</p>
                      <p className="text-gray-900 dark:text-white font-semibold break-all">{user.email}</p>
                    </div>

                    <div className="p-4 border-l-4 border-purple-600 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg transform transition-all duration-300 hover:translate-x-2">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Level</p>
                      <p className="text-gray-900 dark:text-white font-semibold">{levelInfo.name} (Level {user.level})</p>
                    </div>

                    <div className="p-4 border-l-4 border-green-600 bg-green-50 dark:bg-green-900/20 rounded-r-lg transform transition-all duration-300 hover:translate-x-2">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Role</p>
                      <p className="text-gray-900 dark:text-white font-semibold capitalize">
                        {user.role === 'admin' ? '👨‍💼 Admin' : '👤 Pengguna Biasa'}
                      </p>
                    </div>

                    <div className="p-4 border-l-4 border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-lg transform transition-all duration-300 hover:translate-x-2">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Bergabung</p>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {new Date(user.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Badges Tab */}
            {activeTab === 'badges' && (
              <div className="animate-fadeIn">
                {user.badges && user.badges.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {user.badges.map((badge, idx) => (
                      <div
                        key={idx}
                        className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 cursor-pointer group"
                      >
                        <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">🏅</div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{badge}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          Badge Pencapaian
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-2xl mb-2">🎯</p>
                    <p className="text-gray-600 dark:text-gray-400">Belum ada badge yang diraih</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      Tingkatkan aktivitas untuk mendapatkan badge!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="animate-fadeIn">
                {userReports && userReports.length > 0 ? (
                  <div className="space-y-3">
                    {userReports.map((report, idx) => (
                      <div
                        key={report._id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 group cursor-pointer"
                        onClick={() => navigate(`/report/${report._id}`)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {report.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {report.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full">
                                {report.category}
                              </span>
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                report.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                                report.status === 'progress' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                                'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              }`}>
                                {report.status}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="text-gray-400 dark:text-gray-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors transform group-hover:translate-x-1 ml-2 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-2xl mb-2">📭</p>
                    <p className="text-gray-600 dark:text-gray-400">Belum ada laporan</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg"
          >
            ← Kembali
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
