import axios from 'axios';
// @ts-ignore
import { API_URL } from '@env';
import { store } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';

console.log('API_URL:', API_URL);

const apiClient = axios.create({
  baseURL: API_URL || 'http://localhost:3000/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors (401, etc.)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      // TODO: Implement Token Refresh Logic here if backend supports it
      // For now, logout user
      store.dispatch(logout());
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
