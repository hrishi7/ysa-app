import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppNotification } from '../../types';

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  fcmToken: string | null;
  isDrawerOpen: boolean;
  permissionGranted: boolean;
}

const initialState: NotificationState = {
  notifications: [
    {
      _id: '1',
      title: 'Payment Reminder',
      body: 'Your fee payment of ₹5000 is due tomorrow.',
      type: 'payment',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      title: 'Approval Request',
      body: 'New student registration requires approval.',
      type: 'approval',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      _id: '3',
      title: 'System Update',
      body: 'Welcome to the new Your Success Academy app!',
      type: 'reminder',
      read: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: '4',
      title: 'Payment Reminder',
      body: 'Your fee payment of ₹5000 is due tomorrow.',
      type: 'payment',
      read: false,
      createdAt: new Date().toISOString(),
    },
    { 
      _id: '5',
      title: 'Approval Request',
      body: 'New student registration requires approval.',
      type: 'approval',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      _id: '6',
      title: 'Approval Request',
      body: 'New student registration requires approval.',
      type: 'approval',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      _id: '7',
      title: 'System Update',
      body: 'Welcome to the new Your Success Academy app!',
      type: 'reminder',
      read: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: '8',
      title: 'Payment Reminder',
      body: 'Your fee payment of ₹5000 is due tomorrow.',
      type: 'payment',
      read: false,
      createdAt: new Date().toISOString(),
    },
    { 
      _id: '9',
      title: 'Approval Request',
      body: 'New student registration requires approval.',
      type: 'approval',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    }
  ],
  unreadCount: 2,
  fcmToken: null,
  isDrawerOpen: false,
  permissionGranted: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setFCMToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
    },
    setPermissionGranted: (state, action: PayloadAction<boolean>) => {
      state.permissionGranted = action.payload;
    },
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    setNotifications: (state, action: PayloadAction<AppNotification[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.read).length;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload
      );
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
      state.unreadCount = 0;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const {
  setFCMToken,
  setPermissionGranted,
  addNotification,
  setNotifications,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  toggleDrawer,
  setDrawerOpen,
} = notificationSlice.actions;

export default notificationSlice.reducer;

// Selectors
export const selectNotifications = (state: { notification: NotificationState }) =>
  state.notification.notifications;
export const selectUnreadCount = (state: { notification: NotificationState }) =>
  state.notification.unreadCount;
export const selectIsDrawerOpen = (state: { notification: NotificationState }) =>
  state.notification.isDrawerOpen;
export const selectFCMToken = (state: { notification: NotificationState }) =>
  state.notification.fcmToken;
