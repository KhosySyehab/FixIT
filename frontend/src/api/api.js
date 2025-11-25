import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000"
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const reportAPI = {
  getAll: () => api.get("/report"),
  getById: (id) => api.get(`/report/${id}`),
  create: (data) => api.post("/report", data, {
    headers: { "Content-Type": "multipart/form-data" }
  }),
  vote: (id) => api.post(`/report/${id}/vote`),
  updateStatus: (id, data) => api.put(`/report/${id}/status`, data),
  getHistory: (id) => api.get(`/report/${id}/history`),
  getByArea: (lat, lon, radius) => api.get("/admin/reports/area", {
    params: { latitude: lat, longitude: lon, radius }
  })
};

export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (name, email, password) => api.post("/auth/register", { name, email, password })
};

export const adminAPI = {
  getDashboard: () => api.get("/admin/dashboard/stats"),
  getLeaderboard: (limit = 10) => api.get("/admin/leaderboard", {
    params: { limit }
  }),
  getUserProfile: (id) => api.get(`/admin/users/${id}`),
  getAllUsers: () => api.get("/admin/users-list")
};

export const userAPI = {
  getProfile: () => api.get("/admin/users"),
  getMe: () => api.get("/admin/users/")
};
