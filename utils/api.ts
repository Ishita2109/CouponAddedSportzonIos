import axios from "axios";
import SessionManager from "./sessionManager";

// Create axios instance with default config
const api = axios.create({
  baseURL: "https://sportzon.in/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  }
});

// Add request interceptor to handle session headers
api.interceptors.request.use(
  async (config) => {
    try {
      // Get session data
      const sessionData = await SessionManager.getSessionData();
      
      if (sessionData) {
        // Add session headers
        config.headers['Authorization'] = `Bearer ${sessionData.timestamp}`;
        config.headers['X-Session-Expiry'] = sessionData.expiryDate;
        config.headers['X-Last-Activity'] = sessionData.lastActivity;
      }

      // Log request for debugging
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data
      });

      return config;
    } catch (error) {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle responses and errors
api.interceptors.response.use(
  (response) => {
    // Log response for debugging
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error) => {
    // Log error for debugging
    console.error('API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Handle session expiry
    if (error.response?.status === 401) {
      await SessionManager.clearSession();
    }

    return Promise.reject(error);
  }
);

export default api;
