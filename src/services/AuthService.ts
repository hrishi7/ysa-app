import { User, ApiResponse, AuthResponse, UserRole } from '../types';

import apiClient from './api/client';

// Removed mock delay and base URL
// const API_BASE_URL = 'http://localhost:3000/v1';
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Authentication Service
 */
export const AuthService = {
  /**
   * Login with email, password
   */
  async login(email: string, password: string, role?: UserRole): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Sign up new user
   */
  async signup(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: UserRole;
  }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  /**
   * Google OAuth authentication
   */
  async googleAuth(idToken: string): Promise<AuthResponse> {
    // Assuming backend has a specific endpoint for Google Auth, often /auth/google
    // or passing idToken to login
    const response = await apiClient.post<AuthResponse>('/auth/google', { idToken });
    return response.data;
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await apiClient.post<{ tokens: { access: { token: string }, refresh: { token: string } } }>('/auth/refresh-tokens', { refreshToken });
    return {
      accessToken: response.data.tokens.access.token,
      refreshToken: response.data.tokens.refresh.token,
    };
  },

  /**
   * Logout
   */
  async logout(refreshToken?: string): Promise<void> {
    await apiClient.post('/auth/logout', { refreshToken });
  },

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post(`/auth/reset-password?token=${token}`, { password: newPassword });
  },
};

export default AuthService;
