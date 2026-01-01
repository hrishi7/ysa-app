import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole } from '../../types';

interface UserState {
  users: User[]; // Can be students or staff depending on context
  currentUserProfile: User | null; // Detailed view of a selected user (e.g. admin viewing student)
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
}

const initialState: UserState = {
  users: [],
  currentUserProfile: null,
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
};

const userSlice = createSlice({
  name: 'user',
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
    setUsers: (state, action: PayloadAction<{ data: User[]; total: number; page?: number }>) => {
      state.users = action.payload.data;
      state.total = action.payload.total;
      if (action.payload.page) state.page = action.payload.page;
      state.isLoading = false;
    },
    updateUserInList: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload);
      state.total += 1;
      state.isLoading = false;
    },
    setCurrentUserProfile: (state, action: PayloadAction<User | null>) => {
      state.currentUserProfile = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setUsers,
  updateUserInList,
  addUser,
  setCurrentUserProfile,
} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUsers = (state: { user: UserState }) => state.user.users;
export const selectUserLoading = (state: { user: UserState }) => state.user.isLoading;
