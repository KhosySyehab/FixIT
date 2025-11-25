import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { MapPin, AlertCircle, ThumbsUp, Trophy, Zap, Loader } from 'lucide-react';

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Get user name from localStorage
      const name = localStorage.getItem('userName');
      if (name) setUserName(name);

      // Hardcoded test data for now
      const testReports = [
        {
          _id: '1',
          title: 'Jalan Rusak di Jl. Sudirman',
          description: 'Ada lubang besar di persilangan Jl. Sudirman',
          category: 'road',
          status: 'progress',
          severity: 4,
          votes: 15,
          latitude: -6.2,
          longitude: 106.8
        },
        {
          _id: '2',
          title: 'Lampu Jalan Mati',
          description: 'Lampu jalan tidak menyala di area Blok M',
          category: 'street-light',
          status: 'pending',
          severity: 2,
          votes: 8,
          latitude: -6.25,
          longitude: 106.82
        }
      ];

      setReports(testReports);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Greeting */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome back, <span className="text-indigo-600">{userName}</span>! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening in your community</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
            <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Points Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-orange-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm">Total Points</p>
                <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 mt-2">0</p>
              </div>
              <Zap className="text-orange-600 dark:text-orange-400" size={32} />
            </div>
          </div>

          {/* Level Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-purple-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm">Level</p>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mt-2">1</p>
              </div>
              <Trophy className="text-purple-600 dark:text-purple-400" size={32} />
            </div>
          </div>

          {/* Reports Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm">Reports Created</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">{reports.length}</p>
              </div>
              <AlertCircle className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Reports</h2>
            <Link 
              to="/report/create" 
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition"
            >
              + New Report
            </Link>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400 text-lg">No reports yet. Be the first to report an issue!</p>
              <Link 
                to="/report/create"
                className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Create First Report
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Link 
                  key={report._id} 
                  to={`/report/${report._id}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">{report.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{report.description?.substring(0, 100)}...</p>
                      <div className="flex gap-2 mt-3">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                          {report.category}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          report.status === 'done' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                          report.status === 'progress' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                        <ThumbsUp size={16} /> {report.votes || 0}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
