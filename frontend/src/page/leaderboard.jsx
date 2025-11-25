import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../api/api';
import { Trophy, Zap, Users, TrendingUp, Target, Crown, Flame, Award } from 'lucide-react';

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [hoveredRank, setHoveredRank] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const { data } = await adminAPI.getLeaderboard(20);
      setTopUsers(data.topUsers);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      1: 'from-slate-400 to-slate-600',
      2: 'from-blue-400 to-blue-600',
      3: 'from-purple-400 to-purple-600',
      4: 'from-amber-400 to-amber-600',
      5: 'from-red-400 to-red-600'
    };
    return colors[level] || 'from-slate-400 to-slate-600';
  };

  const getLevelIcon = (level) => {
    const icons = {
      1: '🌱',
      2: '📚',
      3: '⚡',
      4: '🏆',
      5: '👑'
    };
    return icons[level] || '🌱';
  };

  const getLevelName = (level) => {
    const names = {
      1: 'Pemula',
      2: 'Kontributor',
      3: 'Aktivis',
      4: 'Warga Teladan',
      5: 'Guardian'
    };
    return names[level] || 'Pemula';
  };

  const getRankBadge = (rank) => {
    if (rank === 0) return { icon: '🥇', color: 'from-yellow-400 to-yellow-600', label: 'Juara 1' };
    if (rank === 1) return { icon: '🥈', color: 'from-gray-400 to-gray-600', label: 'Juara 2' };
    if (rank === 2) return { icon: '🥉', color: 'from-orange-400 to-orange-600', label: 'Juara 3' };
    return { icon: rank + 1, color: 'from-indigo-400 to-indigo-600', label: `Rank ${rank + 1}` };
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300 font-semibold">Memuat leaderboard...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
        {error}
      </div>
    </div>
  );

  const badge = getRankBadge(0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30 border border-indigo-500/30 dark:border-indigo-500/40 rounded-full mb-6">
            <Trophy className="text-indigo-600 dark:text-indigo-400" size={24} />
            <span className="text-indigo-700 dark:text-indigo-300 font-semibold">Global Rankings</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">Leaderboard</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Peringkat pengguna berdasarkan poin dan kontribusi</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-900 rounded-2xl p-6 border border-indigo-400/30 dark:border-indigo-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-200 dark:text-indigo-300 text-sm font-medium mb-1">Total Kontributor</p>
                <p className="text-4xl font-bold text-white">{topUsers.length}</p>
              </div>
              <Users className="text-indigo-300 dark:text-indigo-400 opacity-50" size={48} />
            </div>
          </div>

          {/* Top Points */}
          {topUsers.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-600 to-amber-800 dark:from-yellow-500 dark:to-amber-900 rounded-2xl p-6 border border-yellow-400/30 dark:border-yellow-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-200 dark:text-yellow-300 text-sm font-medium mb-1">Poin Tertinggi</p>
                  <p className="text-4xl font-bold text-white">{topUsers[0]?.points || 0}</p>
                </div>
                <Flame className="text-yellow-300 dark:text-yellow-400 opacity-50" size={48} />
              </div>
            </div>
          )}

          {/* Avg Level */}
          {topUsers.length > 0 && (
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-900 rounded-2xl p-6 border border-purple-400/30 dark:border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 dark:text-purple-300 text-sm font-medium mb-1">Rata-rata Level</p>
                  <p className="text-4xl font-bold text-white">
                    {(topUsers.reduce((sum, u) => sum + u.level, 0) / topUsers.length).toFixed(1)}
                  </p>
                </div>
                <TrendingUp className="text-purple-300 dark:text-purple-400 opacity-50" size={48} />
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-800 dark:to-indigo-900 border-b border-indigo-500/30 font-semibold text-white text-sm">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Nama</div>
            <div className="col-span-2 text-center">Level</div>
            <div className="col-span-2 text-center">Poin</div>
            <div className="col-span-2 text-center">Laporan</div>
            <div className="col-span-1"></div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {topUsers.map((user, idx) => {
              const badge = getRankBadge(idx);
              return (
                <div
                  key={user._id}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 transition-all duration-300 cursor-pointer group ${
                    hoveredRank === idx
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'
                  }`}
                  onMouseEnter={() => setHoveredRank(idx)}
                  onMouseLeave={() => setHoveredRank(null)}
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex items-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center text-lg font-bold text-white shadow-lg`}>
                      {badge.icon}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-blue-600 dark:from-indigo-500 dark:to-blue-700 flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{user.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Level */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getLevelColor(user.level)} text-white text-sm font-semibold`}>
                      Lv {user.level}
                    </div>
                  </div>

                  {/* Points */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center gap-1">
                      <Zap className="text-yellow-500 dark:text-yellow-400" size={18} />
                      <span className="text-gray-900 dark:text-white font-bold text-lg">{user.points || 0}</span>
                    </div>
                  </div>

                  {/* Reports */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center gap-1">
                      <Target className="text-blue-600 dark:text-blue-400" size={18} />
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">{user.reports_created || 0}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="col-span-1 flex items-center justify-end">
                    <button className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition group-hover:scale-110">
                      <Award size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {topUsers.length === 0 && (
            <div className="text-center py-16">
              <Trophy className="mx-auto mb-4 text-gray-400 dark:text-gray-600" size={48} />
              <p className="text-gray-600 dark:text-gray-400 font-semibold">Belum ada pengguna dalam leaderboard</p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4 flex items-center gap-2">
              <Flame size={20} className="text-orange-500 dark:text-orange-400" />
              Streak Info
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Tingkatkan streak harian Anda dengan membuat laporan atau voting setiap hari!</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4 flex items-center gap-2">
              <Crown size={20} className="text-purple-600 dark:text-purple-400" />
              Tips Naik Level
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Buat laporan berkualitas, dapatkan verifikasi, dan kumpulkan badge untuk naik level!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
