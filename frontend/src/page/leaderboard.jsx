import { useEffect, useState } from 'react';
import { adminAPI } from '../api/api';
import { Trophy, Medal, Award } from 'lucide-react';

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      1: 'gray',
      2: 'blue',
      3: 'purple',
      4: 'orange',
      5: 'red'
    };
    return colors[level] || 'gray';
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

  const getMedalIcon = (rank) => {
    if (rank === 0) return <Trophy className="text-yellow-500" size={24} />;
    if (rank === 1) return <Medal className="text-gray-400" size={24} />;
    if (rank === 2) return <Medal className="text-orange-600" size={24} />;
    return <Award className="text-blue-500" size={24} />;
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="text-yellow-500" size={32} />
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Level</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Poin</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Badge</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Laporan</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.map((user, idx) => (
              <tr key={user._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white hover:bg-gray-100 transition'}>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  <div className="flex items-center gap-2">
                    {getMedalIcon(idx)}
                    <span className="text-lg">{idx + 1}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-${getLevelColor(user.level)}-600`}>
                    {getLevelName(user.level)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-bold text-blue-600 text-lg">
                  {user.points}
                </td>
                <td className="px-6 py-4 text-center">
                  {user.badges && user.badges.length > 0 ? (
                    <div className="flex gap-1 justify-center flex-wrap">
                      {user.badges.map((badge, i) => (
                        <span key={i} title={badge} className="text-xl cursor-help">
                          {badge === 'Warga Peduli Lingkungan' && '🌱'}
                          {badge === 'Mata Elang' && '👁️'}
                          {badge === 'Green Guardian' && '🛡️'}
                          {badge === 'FixIt Ranger' && '🎯'}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center text-gray-900 font-semibold">
                  {user.reports_created}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {topUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Belum ada pengguna dalam leaderboard
        </div>
      )}
    </div>
  );
}
