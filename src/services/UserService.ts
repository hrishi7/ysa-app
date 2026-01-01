import { User, UserRole, ApiResponse } from '../types';
import apiClient from './api/client';

/**
 * User Service for profile and user management
 */
export const UserService = {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },

  /**
   * Update current user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>('/users/profile', data);
    return response.data;
  },

  /**
   * Upload avatar
   */
  async uploadAvatar(imageUri: string): Promise<string> {
    // In a real app, you'd use a FormData to upload the file
    // const formData = new FormData();
    // formData.append('avatar', {
    //   uri: imageUri,
    //   type: 'image/jpeg',
    //   name: 'avatar.jpg',
    // } as any);
    // const response = await apiClient.post<{ url: string }>('/users/avatar', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });
    // return response.data.url;
    
    // For now, returning the URI as we might not have the upload endpoint fully defined in postman or it wasn't requested
    return imageUri;
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
    role?: UserRole; // added role support
  }): Promise<{ data: User[]; total: number }> {
     // Defaulting to Student role if not specified, since function is getStudents
    const queryParams = { ...params, role: params?.role || UserRole.STUDENT };
    const response = await apiClient.get<{ results: User[], totalResults: number }>('/users', { params: queryParams });
    return {
      data: response.data.results,
      total: response.data.totalResults,
    };
  },

  /**
   * Get student by ID
   */
  async getStudent(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  /**
   * Create new student (admin+)
   */
  async createStudent(data: Partial<User> & { password: string }): Promise<User> {
    const response = await apiClient.post<User>('/users', { ...data, role: UserRole.STUDENT });
    return response.data;
  },

  /**
   * Update student (admin+)
   */
  async updateStudent(id: string, data: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Delete student (super-admin only)
   */
  async deleteStudent(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },

  /**
   * Get admins/receptionists list (super-admin only)
   */
  async getStaff(): Promise<User[]> {
    const response = await apiClient.get<{ results: User[] }>('/users', { 
        params: { role: [UserRole.ADMIN, UserRole.RECEPTIONIST, UserRole.SUPER_ADMIN].join(','), limit: 100 } 
    });
    return response.data.results;
  },

  /**
   * Assign role to user (super-admin only)
   */
  async assignRole(userId: string, role: UserRole): Promise<User> {
    // Assuming backend supports PATCH for direct property updates if manage-users permission
    const response = await apiClient.patch<User>(`/users/${userId}`, { role });
    return response.data;
  },
};

export default UserService;


