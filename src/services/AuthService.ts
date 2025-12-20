import { User, ApiResponse, AuthResponse, UserRole } from '../types';

const API_BASE_URL = 'http://localhost:3000/v1';

/**
 * Mock delay to simulate network latency
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Authentication Service
 */
export const AuthService = {
  /**
   * Login with email, password, and role
   */
  async login(email: string, password: string, role?: UserRole): Promise<AuthResponse> {
    await delay(1000);
    
    // Mock response - in real app, call API
    // const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    
    return {
      user: {
        _id: '1',
        email,
        name: 'Demo User',
        role: role || UserRole.STUDENT,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
    };
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
    await delay(1500);
    
    return {
      user: {
        _id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: data.role || UserRole.STUDENT,
        phone: data.phone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
    };
  },

  /**
   * Google OAuth authentication
   */
  async googleAuth(idToken: string): Promise<AuthResponse> {
    await delay(1000);
    
    return {
      user: {
        _id: Date.now().toString(),
        email: 'user@gmail.com',
        name: 'Google User',
        role: UserRole.STUDENT,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      accessToken: 'mock_google_access_token',
      refreshToken: 'mock_google_refresh_token',
    };
  },

  /**
   * Refresh access token
   */
  async refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string }> {
    await delay(500);
    
    return {
      accessToken: 'new_mock_access_token',
      refreshToken: 'new_mock_refresh_token',
    };
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await delay(300);
    // Clear tokens, invalidate session on server
  },

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<void> {
    await delay(1000);
    // Send reset email
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await delay(1000);
    // Reset password
  },
};

export default AuthService;
