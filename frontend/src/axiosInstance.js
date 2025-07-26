import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- INTERCEPT 401 RESPONSES ---
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("token")
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        const res = await axios.post(
          "http://localhost:8000/api/token/refresh/",
          {
            refresh,
          }
        );

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        // Update the Authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, force logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.setItem("sessionExpired", "true");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
