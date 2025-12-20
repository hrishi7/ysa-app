import { User, UserRole, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000/v1';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * User Service for profile and user management
 */
export const UserService = {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    await delay(500);
    return {
      _id: '1',
      email: 'user@example.com',
      name: 'Demo User',
      role: UserRole.STUDENT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Update current user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    await delay(800);
    return {
      _id: '1',
      email: 'user@example.com',
      name: data.name || 'Demo User',
      role: UserRole.STUDENT,
      phone: data.phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Upload avatar
   */
  async uploadAvatar(imageUri: string): Promise<string> {
    await delay(1500);
    return imageUri; // Return URL of uploaded image
  },

  /**
   * Get students list (admin+)
   */
  async getStudents(params?: {
    page?: number;
    limit?: number;
    search?: string;
    course?: string;
    pendingFees?: boolean;
  }): Promise<{ data: User[]; total: number }> {
    await delay(600);
    return {
      data: [],
      total: 0,
    };
  },

  /**
   * Get student by ID
   */
  async getStudent(id: string): Promise<User> {
    await delay(400);
    return {
      _id: id,
      email: 'student@example.com',
      name: 'Student Name',
      role: UserRole.STUDENT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Create new student (admin+)
   */
  async createStudent(data: Partial<User> & { password: string }): Promise<User> {
    await delay(1000);
    return {
      _id: Date.now().toString(),
      email: data.email || '',
      name: data.name || '',
      role: UserRole.STUDENT,
      phone: data.phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Update student (admin+)
   */
  async updateStudent(id: string, data: Partial<User>): Promise<User> {
    await delay(800);
    return {
      _id: id,
      email: data.email || '',
      name: data.name || '',
      role: UserRole.STUDENT,
      phone: data.phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Delete student (super-admin only)
   */
  async deleteStudent(id: string): Promise<void> {
    await delay(600);
  },

  /**
   * Get admins/receptionists list (super-admin only)
   */
  async getStaff(): Promise<User[]> {
    await delay(500);
    return [];
  },

  /**
   * Assign role to user (super-admin only)
   */
  async assignRole(userId: string, role: UserRole): Promise<User> {
    await delay(800);
    return {
      _id: userId,
      email: 'user@example.com',
      name: 'User',
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
};

export default UserService;
