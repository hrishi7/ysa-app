import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payment } from '../../types';

interface PaymentState {
  payments: Payment[];
  currentPayment: Payment | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
}

const initialState: PaymentState = {
  payments: [],
  currentPayment: null,
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
};

const paymentSlice = createSlice({
  name: 'payment',
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
    setPayments: (state, action: PayloadAction<{ data: Payment[]; total: number; page?: number }>) => {
      state.payments = action.payload.data;
      state.total = action.payload.total;
      if (action.payload.page) state.page = action.payload.page;
      state.isLoading = false;
    },
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.payments.unshift(action.payload);
      state.total += 1;
      state.isLoading = false;
    },
    setCurrentPayment: (state, action: PayloadAction<Payment | null>) => {
      state.currentPayment = action.payload;
    },
    updatePayment: (state, action: PayloadAction<Payment>) => {
      const index = state.payments.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.payments[index] = action.payload;
      }
      if (state.currentPayment?._id === action.payload._id) {
        state.currentPayment = action.payload;
      }
      state.isLoading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setPayments,
  addPayment,
  setCurrentPayment,
  updatePayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;

// Selectors
export const selectPayments = (state: { payment: PaymentState }) => state.payment.payments;
export const selectPaymentLoading = (state: { payment: PaymentState }) => state.payment.isLoading;
export const selectPaymentError = (state: { payment: PaymentState }) => state.payment.error;
