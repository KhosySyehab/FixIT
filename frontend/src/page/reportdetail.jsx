import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reportAPI } from '../api/api';
import { MapPin, Clock, User, Award, ArrowLeft } from 'lucide-react';

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voted, setVoted] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const { data } = await reportAPI.getById(id);
      setReport(data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (voted) return;
    try {
      setVoteLoading(true);
      await reportAPI.vote(id);
      setVoted(true);
      fetchReport();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error voting');
    } finally {
      setVoteLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <p className="text-gray-700 dark:text-gray-300">Loading...</p>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      </div>
    </div>
  );
  
  if (!report) return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>
        <p className="text-gray-600 dark:text-gray-400">Report not found</p>
      </div>
    </div>
  );

  const getSeverityColor = (severity) => {
    if (severity <= 2) return 'bg-yellow-100 text-yellow-800';
    if (severity <= 3) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusColor = (status) => {
    if (status === 'pending') return 'bg-red-100 text-red-800';
    if (status === 'progress') return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{report.title}</h1>
            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(report.severity)}`}>
                Severity: {report.severity}/5
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status)}`}>
                {report.status.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                Prioritas: {report.priority_score}
              </span>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Description & Info */}
            <div className="md:col-span-2 space-y-4">
              {/* Photo */}
              {report.photo_url && (
                <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={`http://localhost:5000/${report.photo_url}`}
                    alt="Report"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Deskripsi</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">{report.description}</p>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Lokasi</h3>
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="text-red-600 dark:text-red-500 mt-1" size={20} />
                  <div>
                    <p className="font-mono text-gray-700 dark:text-gray-400">
                      {report.latitude.toFixed(6)}, {report.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
                <div className="h-64 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="mx-auto text-gray-400 dark:text-gray-600 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">📍 Map view coming soon</p>
                  </div>
                </div>
              </div>

              {/* History */}
              {report.history && report.history.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Riwayat Status</h3>
                  <div className="space-y-2">
                    {report.history.map((h, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {h.old_status} → {h.new_status}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          <Clock size={14} className="inline mr-1" />
                          {new Date(h.createdAt).toLocaleDateString('id-ID')}
                        </p>
                        {h.notes && <p className="text-gray-700 dark:text-gray-300 mt-1">{h.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - User Info & Actions */}
            <div className="space-y-4">
              {/* User Card */}
              {report.user_id && (
                <div className="bg-gradient-to-br from-blue-50 dark:from-blue-900/30 to-blue-100 dark:to-blue-900/50 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="text-blue-600 dark:text-blue-400" size={24} />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Pelapor</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{report.user_id.name}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">{report.user_id.email}</p>
                    <div className="flex items-center gap-2">
                      <Award className="text-yellow-500" size={18} />
                      <span className="font-semibold text-gray-900 dark:text-white">Level {report.user_id.level}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">⭐ {report.user_id.points} points</p>
                  </div>
                </div>
              )}

              {/* Vote Card */}
              <div className="bg-white dark:bg-gray-700 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Suara Prioritas</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">{report.voteCount || 0}</p>
                <button
                  onClick={handleVote}
                  disabled={voted || voteLoading}
                  className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                    voted
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600'
                  }`}
                >
                  {voted ? '✓ Sudah Vote' : 'Vote Sekarang'}
                </button>
              </div>

              {/* Category & Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Kategori</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">{report.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dibuat</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(report.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
