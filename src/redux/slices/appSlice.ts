import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';
export type Locale = 'en' | 'hi' | 'bn';

interface AppState {
  theme: ThemeMode;
  locale: Locale;
  isFirstLaunch: boolean;
}

const initialState: AppState = {
  theme: 'dark', // Default to dark mode for modern look
  locale: 'en',
  isFirstLaunch: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setLocale, setFirstLaunch } = appSlice.actions;
export default appSlice.reducer;

// Selectors
export const selectTheme = (state: { app: AppState }) => state.app.theme;
export const selectLocale = (state: { app: AppState }) => state.app.locale;
export const selectIsFirstLaunch = (state: { app: AppState }) => state.app.isFirstLaunch;
