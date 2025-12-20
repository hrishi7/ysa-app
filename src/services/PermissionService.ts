import { ApprovalRequest, ApprovalStatus, Permission } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Permission Service
 */
export const PermissionService = {
  /**
   * Get current user's permissions
   */
  async getMyPermissions(): Promise<string[]> {
    await delay(300);
    return [];
  },

  /**
   * Get approval requests (super-admin only)
   */
  async getApprovals(params?: {
    page?: number;
    limit?: number;
    status?: ApprovalStatus;
  }): Promise<{ data: ApprovalRequest[]; total: number }> {
    await delay(600);
    return {
      data: [],
      total: 0,
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
    await delay(800);
    return {
      _id: id,
      action: 'test-action',
      requestedBy: 'user-1',
      resourceType: 'student',
      resourceId: 'resource-1',
      payload: {},
      status,
      processedBy: 'super-admin',
      processedAt: new Date().toISOString(),
      rejectionReason,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Grant permissions to user (super-admin only)
   */
  async grantPermissions(userId: string, permissions: string[]): Promise<Permission> {
    await delay(800);
    return {
      _id: Date.now().toString(),
      userId,
      permissions,
      grantedBy: 'super-admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
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
    await delay(600);
    return {
      _id: Date.now().toString(),
      action: data.action,
      requestedBy: 'current-user',
      resourceType: data.resourceType,
      resourceId: data.resourceId,
      payload: data.payload,
      status: ApprovalStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
};

export default PermissionService;
