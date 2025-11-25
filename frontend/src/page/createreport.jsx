import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import SafeMap from "../component/SafeMap";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";

export default function CreateReport() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "jalan",
    severity: 3,
    latitude: -6.2,
    longitude: 106.8
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'severity' ? parseInt(value) : value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("severity", formData.severity);
      form.append("latitude", formData.latitude);
      form.append("longitude", formData.longitude);
      if (photo) {
        form.append("photo", photo);
      }

      const res = await api.post("/report", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSuccess("Report created successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Report an Issue</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Help improve your community by reporting infrastructure issues</p>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
              <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex gap-3">
              <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />
              <p className="text-green-700 dark:text-green-400">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Jalan berlubang di Jalan Utama"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/30"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/30"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/30"
              >
                <option value="jalan">Jalan Rusak</option>
                <option value="lampu">Lampu Jalan</option>
                <option value="drainase">Drainase</option>
                <option value="sampah">Sampah</option>
                <option value="pohon">Pohon Tumbang</option>
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Severity Level (1-5) *</label>
              <input
                type="range"
                name="severity"
                min="1"
                max="5"
                value={formData.severity}
                onChange={handleChange}
                className="w-full"
              />
              <div className="text-center mt-2">
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{formData.severity}</span>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Photo</label>
              <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-indigo-600 dark:hover:border-indigo-500 cursor-pointer transition bg-white dark:bg-gray-700">
                <div className="text-center">
                  <Upload className="mx-auto text-gray-400 dark:text-gray-500 mb-2" size={32} />
                  <p className="text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              {preview && (
                <div className="mt-4">
                  <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                </div>
              )}
            </div>

            {/* Location Map */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">📍 Pick Location on Map *</label>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Click on the map to set the report location</p>
              <SafeMap
                center={[formData.latitude, formData.longitude]}
                zoom={13}
                height="h-96"
                onMapClick={(coords) => {
                  setFormData({
                    ...formData,
                    latitude: coords[0],
                    longitude: coords[1]
                  });
                }}
                showClickMarker={true}
              />
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-blue-900 dark:text-blue-300 text-sm">
                  <strong>Current Location:</strong> {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
