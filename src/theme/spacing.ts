/**
 * Spacing System
 * Consistent spacing scale for margins, paddings, and gaps
 */

// Base spacing unit (4px)
const BASE = 4;

export const spacing = {
  /** 0px */
  none: 0,
  /** 2px */
  xxs: BASE * 0.5,
  /** 4px */
  xs: BASE,
  /** 8px */
  sm: BASE * 2,
  /** 12px */
  md: BASE * 3,
  /** 16px */
  lg: BASE * 4,
  /** 20px */
  xl: BASE * 5,
  /** 24px */
  '2xl': BASE * 6,
  /** 32px */
  '3xl': BASE * 8,
  /** 40px */
  '4xl': BASE * 10,
  /** 48px */
  '5xl': BASE * 12,
  /** 64px */
  '6xl': BASE * 16,
  /** 80px */
  '7xl': BASE * 20,
  /** 96px */
  '8xl': BASE * 24,
};

// Border Radius
export const borderRadius = {
  /** 0px */
  none: 0,
  /** 4px */
  sm: 4,
  /** 8px */
  md: 8,
  /** 12px */
  lg: 12,
  /** 16px */
  xl: 16,
  /** 24px */
  '2xl': 24,
  /** 32px */
  '3xl': 32,
  /** 9999px - Fully rounded */
  full: 9999,
};

// Common layout values
export const layout = {
  /** Screen horizontal padding */
  screenPadding: spacing.lg,
  /** Card padding */
  cardPadding: spacing.lg,
  /** List item padding */
  listItemPadding: spacing.md,
  /** Section gap */
  sectionGap: spacing['2xl'],
  /** Bottom tab bar height */
  bottomTabHeight: 80,
  /** Header height */
  headerHeight: 56,
};

// Shadow presets
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};
