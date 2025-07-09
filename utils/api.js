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
      // First check if session is valid
      const isSessionValid = await SessionManager.checkSession();
      if (!isSessionValid) {
        console.log('Session invalid in request interceptor, attempting refresh...');
        const refreshed = await SessionManager.refreshSession();
        if (!refreshed) {
          throw new Error('Session invalid and refresh failed');
        }
      }

      // Get session data
      const sessionData = await SessionManager.getSessionData();
      
      if (sessionData) {
        // Check if session needs refresh
        const currentTime = new Date().getTime();
        if (currentTime > (sessionData.expiryDate - (5 * 24 * 60 * 60 * 1000))) {
          console.log('Session close to expiry in request, refreshing...');
          await SessionManager.refreshSession();
          // Get updated session data
          const updatedSession = await SessionManager.getSessionData();
          if (updatedSession) {
            sessionData.timestamp = updatedSession.timestamp;
            sessionData.expiryDate = updatedSession.expiryDate;
            sessionData.lastActivity = updatedSession.lastActivity;
          }
        }

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

// Add response interceptor to handle errors and retries
api.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error) => {
    // Log error response
    console.error('API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Handle session expiry
    if (error.response?.status === 401) {
      try {
        console.log('401 error received, attempting session refresh...');
        // Try to refresh session
        const refreshed = await SessionManager.refreshSession();
        if (refreshed) {
          console.log('Session refreshed, retrying request...');
          // Retry the original request
          const sessionData = await SessionManager.getSessionData();
          if (sessionData) {
            error.config.headers['Authorization'] = `Bearer ${sessionData.timestamp}`;
            error.config.headers['X-Session-Expiry'] = sessionData.expiryDate;
            error.config.headers['X-Last-Activity'] = sessionData.lastActivity;
            return api(error.config);
          }
        }
      } catch (refreshError) {
        console.error('Session refresh failed:', refreshError);
      }
      // If refresh failed, clear session
      console.log('Session refresh failed, clearing session...');
      await SessionManager.clearSession();
    }

    return Promise.reject(error);
  }
);

export default api; 