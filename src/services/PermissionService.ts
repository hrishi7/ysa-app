import { ApprovalRequest, ApprovalStatus, Permission } from '../types';
import apiClient from './api/client';

/**
 * Permission Service
 */
export const PermissionService = {
  /**
   * Get current user's permissions
   */
  async getMyPermissions(): Promise<string[]> {
    // Assuming endpoint exists based on standard patterns, or permissions are part of user profile?
    // If separate service:
    try {
      const response = await apiClient.get<Permission>('/permissions/me');
      return response.data.permissions;
    } catch (error) {
       console.warn('Failed to fetch permissions', error);
       return [];
    }
  },

  /**
   * Get approval requests (super-admin only)
   */
  async getApprovals(params?: {
    page?: number;
    limit?: number;
    status?: ApprovalStatus;
  }): Promise<{ data: ApprovalRequest[]; total: number }> {
     const response = await apiClient.get<{ results: ApprovalRequest[], totalResults: number }>('/permissions/approvals', { params });
    return {
      data: response.data.results,
      total: response.data.totalResults,
    };
  },

  /**
   * Process approval request (super-admin only)
   */
  async processApproval(
    id: string,
    status: ApprovalStatus.APPROVED | ApprovalStatus.REJECTED,
    rejectionReason?: string
  ): Promise<ApprovalRequest> {
    const response = await apiClient.put<ApprovalRequest>(`/permissions/approvals/${id}`, { status, rejectionReason });
    return response.data;
  },

  /**
   * Grant permissions to user (super-admin only)
   */
  async grantPermissions(userId: string, permissions: string[]): Promise<Permission> {
    const response = await apiClient.post<Permission>('/permissions', { userId, permissions });
    return response.data;
  },

  /**
   * Create approval request
   */
  async createApprovalRequest(data: {
    action: string;
    resourceType: string;
    resourceId: string;
    payload: Record<string, unknown>;
  }): Promise<ApprovalRequest> {
    const response = await apiClient.post<ApprovalRequest>('/permissions/request-approval', data);
    return response.data;
  },
};

export default PermissionService;
