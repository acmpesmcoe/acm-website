import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const client = axios.create({ baseURL: API_URL });

// Attach the saved login token to every request automatically
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("acm-admin-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the backend ever says our token is invalid/expired, log out automatically
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("acm-admin-token");
      localStorage.removeItem("acm-admin-info");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default client;
