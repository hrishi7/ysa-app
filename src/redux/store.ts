import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import notificationReducer from './slices/notificationSlice';
import paymentReducer from './slices/paymentSlice';
import userReducer from './slices/userSlice';
import permissionReducer from './slices/permissionSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  notification: notificationReducer,
  payment: paymentReducer,
  user: userReducer,
  permission: permissionReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'app'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
