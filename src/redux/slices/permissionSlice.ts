import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApprovalRequest, ApprovalStatus } from '../../types';

interface PermissionState {
  approvalRequests: ApprovalRequest[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PermissionState = {
  approvalRequests: [],
  isLoading: false,
  error: null,
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setApprovalRequests: (state, action: PayloadAction<ApprovalRequest[]>) => {
      state.approvalRequests = action.payload;
      state.isLoading = false;
    },
    addApprovalRequest: (state, action: PayloadAction<ApprovalRequest>) => {
      state.approvalRequests.unshift(action.payload);
      state.isLoading = false;
    },
    updateApprovalRequest: (state, action: PayloadAction<ApprovalRequest>) => {
      const index = state.approvalRequests.findIndex(r => r._id === action.payload._id);
      if (index !== -1) {
        state.approvalRequests[index] = action.payload;
      }
      state.isLoading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setApprovalRequests,
  addApprovalRequest,
  updateApprovalRequest,
} = permissionSlice.actions;

export default permissionSlice.reducer;

// Selectors
export const selectApprovalRequests = (state: { permission: PermissionState }) => state.permission.approvalRequests;
export const selectPermissionLoading = (state: { permission: PermissionState }) => state.permission.isLoading;
