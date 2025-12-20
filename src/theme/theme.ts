import { light as lightTheme, dark as darkTheme } from '@eva-design/eva';

/**
 * Your Success Academy Brand Colors
 * Primary: Orange (#FF6D00) - Energy, enthusiasm, success
 * Secondary: Deep Blue (#1A237E) - Trust, wisdom, academia
 */

// Brand Color Palette
const BRAND_ORANGE = {
  50: '#FFF3E0',
  100: '#FFE0B2',
  200: '#FFCC80',
  300: '#FFB74D',
  400: '#FFA726',
  500: '#FF6D00', // Primary
  600: '#FB8C00',
  700: '#F57C00',
  800: '#EF6C00',
  900: '#E65100',
};

const BRAND_BLUE = {
  50: '#E8EAF6',
  100: '#C5CAE9',
  200: '#9FA8DA',
  300: '#7986CB',
  400: '#5C6BC0',
  500: '#3F51B5',
  600: '#3949AB',
  700: '#303F9F',
  800: '#283593',
  900: '#1A237E', // Secondary
};

// Dark Mode Colors
const DARK_BG_PRIMARY = '#0D1B2A';   // Deep navy
const DARK_BG_SECONDARY = '#1B2838'; // Slightly lighter navy
const DARK_SURFACE = '#243447';      // Card/surface color

// Light Mode base theme
export const customLightTheme = {
  ...lightTheme,

  // Primary (Orange)
  'color-primary-100': BRAND_ORANGE[50],
  'color-primary-200': BRAND_ORANGE[100],
  'color-primary-300': BRAND_ORANGE[200],
  'color-primary-400': BRAND_ORANGE[300],
  'color-primary-500': BRAND_ORANGE[500],
  'color-primary-600': BRAND_ORANGE[600],
  'color-primary-700': BRAND_ORANGE[700],
  'color-primary-800': BRAND_ORANGE[800],
  'color-primary-900': BRAND_ORANGE[900],

  // Secondary (Blue) - Using "info" semantics
  'color-info-100': BRAND_BLUE[50],
  'color-info-200': BRAND_BLUE[100],
  'color-info-300': BRAND_BLUE[200],
  'color-info-400': BRAND_BLUE[300],
  'color-info-500': BRAND_BLUE[500],
  'color-info-600': BRAND_BLUE[600],
  'color-info-700': BRAND_BLUE[700],
  'color-info-800': BRAND_BLUE[800],
  'color-info-900': BRAND_BLUE[900],

  // Success (Green)
  'color-success-500': '#4CAF50',
  'color-success-600': '#43A047',

  // Warning (Amber)
  'color-warning-500': '#FFC107',
  'color-warning-600': '#FFB300',

  // Danger (Red)
  'color-danger-500': '#F44336',
  'color-danger-600': '#E53935',

  // Text colors
  'text-basic-color': '#1A1A1A',
  'text-hint-color': '#6B7280',
  'text-disabled-color': '#9CA3AF',

  // Background colors
  'background-basic-color-1': '#FFFFFF',
  'background-basic-color-2': '#F8FAFC',
  'background-basic-color-3': '#F1F5F9',
  'background-basic-color-4': '#E2E8F0',

  // Border colors
  'border-basic-color-1': '#E2E8F0',
  'border-basic-color-2': '#CBD5E1',
  'border-basic-color-3': '#94A3B8',
};

// Dark Mode theme
export const customDarkTheme = {
  ...darkTheme,

  // Primary (Orange) - Same across themes for brand consistency
  'color-primary-100': BRAND_ORANGE[900],
  'color-primary-200': BRAND_ORANGE[800],
  'color-primary-300': BRAND_ORANGE[700],
  'color-primary-400': BRAND_ORANGE[600],
  'color-primary-500': BRAND_ORANGE[500],
  'color-primary-600': BRAND_ORANGE[400],
  'color-primary-700': BRAND_ORANGE[300],
  'color-primary-800': BRAND_ORANGE[200],
  'color-primary-900': BRAND_ORANGE[100],

  // Secondary (Blue)
  'color-info-100': BRAND_BLUE[900],
  'color-info-200': BRAND_BLUE[800],
  'color-info-300': BRAND_BLUE[700],
  'color-info-400': BRAND_BLUE[600],
  'color-info-500': BRAND_BLUE[400],
  'color-info-600': BRAND_BLUE[300],
  'color-info-700': BRAND_BLUE[200],
  'color-info-800': BRAND_BLUE[100],
  'color-info-900': BRAND_BLUE[50],

  // Success
  'color-success-500': '#66BB6A',
  'color-success-600': '#81C784',

  // Warning
  'color-warning-500': '#FFCA28',
  'color-warning-600': '#FFD54F',

  // Danger
  'color-danger-500': '#EF5350',
  'color-danger-600': '#E57373',

  // Text colors
  'text-basic-color': '#F8FAFC',
  'text-hint-color': '#94A3B8',
  'text-disabled-color': '#64748B',

  // Background colors - Deep navy tones
  'background-basic-color-1': DARK_BG_PRIMARY,
  'background-basic-color-2': DARK_BG_SECONDARY,
  'background-basic-color-3': DARK_SURFACE,
  'background-basic-color-4': '#2D4052',

  // Border colors
  'border-basic-color-1': '#1E3A5F',
  'border-basic-color-2': '#2D4A6F',
  'border-basic-color-3': '#3D5A7F',
};

// Export brand colors for direct usage in components
export const brandColors = {
  orange: BRAND_ORANGE,
  blue: BRAND_BLUE,
  darkBg: {
    primary: DARK_BG_PRIMARY,
    secondary: DARK_BG_SECONDARY,
    surface: DARK_SURFACE,
  },
};

// Legacy exports for backward compatibility
export const defaultTheme = customLightTheme;
