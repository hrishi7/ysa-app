import { Payment, PaymentStatus, PaymentMode, ApiResponse } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Payment Service
 */
export const PaymentService = {
  /**
   * Get payments list
   */
  async getPayments(params?: {
    page?: number;
    limit?: number;
    studentId?: string;
    status?: PaymentStatus;
    startDate?: string;
    endDate?: string;
  }): Promise<{ data: Payment[]; total: number }> {
    await delay(600);
    return {
      data: [],
      total: 0,
    };
  },

  /**
   * Create new payment (staff only)
   */
  async createPayment(data: {
    studentId: string;
    amount: number;
    paymentDate: string;
    paymentMode: PaymentMode;
    notes?: string;
  }): Promise<Payment> {
    await delay(1000);
    return {
      _id: Date.now().toString(),
      studentId: data.studentId,
      amount: data.amount,
      paymentDate: data.paymentDate,
      paymentMode: data.paymentMode,
      receiptNumber: `R-${new Date().getFullYear()}${new Date().getMonth() + 1}-0001`,
      status: PaymentStatus.PENDING_APPROVAL,
      recordedBy: 'current-user',
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Approve/Reject payment (super-admin only)
   */
  async approvePayment(
    id: string,
    approved: boolean,
    rejectionReason?: string
  ): Promise<Payment> {
    await delay(800);
    return {
      _id: id,
      studentId: 'student-1',
      amount: 5000,
      paymentDate: new Date().toISOString(),
      paymentMode: PaymentMode.CASH,
      receiptNumber: 'R-202412-0001',
      status: approved ? PaymentStatus.APPROVED : PaymentStatus.REJECTED,
      recordedBy: 'staff-1',
      approvedBy: 'super-admin',
      approvedAt: new Date().toISOString(),
      rejectionReason: !approved ? rejectionReason : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Download payment receipt (returns URI)
   */
  async downloadReceipt(paymentId: string): Promise<string> {
    await delay(500);
    return `file:///receipt-${paymentId}.pdf`;
  },

  /**
   * Send payment reminders (bulk)
   */
  async sendReminders(paymentIds: string[]): Promise<void> {
    await delay(1000);
    // Send reminders to students
  },
};

export default PaymentService;
