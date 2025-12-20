/**
 * Typography System
 * Based on Material Design type scale with Inter font family
 */

// Font Families (requires expo-font setup)
export const fontFamily = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  // Fallbacks when custom fonts not loaded
  system: 'System',
};

// Type Scale following Material Design guidelines
export const fontSize = {
  // Display
  displayLarge: 57,
  displayMedium: 45,
  displaySmall: 36,

  // Headline
  headlineLarge: 32,
  headlineMedium: 28,
  headlineSmall: 24,

  // Title
  titleLarge: 22,
  titleMedium: 16,
  titleSmall: 14,

  // Body
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 12,

  // Label
  labelLarge: 14,
  labelMedium: 12,
  labelSmall: 11,
};

// Line Heights
export const lineHeight = {
  displayLarge: 64,
  displayMedium: 52,
  displaySmall: 44,

  headlineLarge: 40,
  headlineMedium: 36,
  headlineSmall: 32,

  titleLarge: 28,
  titleMedium: 24,
  titleSmall: 20,

  bodyLarge: 24,
  bodyMedium: 20,
  bodySmall: 16,

  labelLarge: 20,
  labelMedium: 16,
  labelSmall: 16,
};

// Letter Spacing
export const letterSpacing = {
  displayLarge: -0.25,
  displayMedium: 0,
  displaySmall: 0,

  headlineLarge: 0,
  headlineMedium: 0,
  headlineSmall: 0,

  titleLarge: 0,
  titleMedium: 0.15,
  titleSmall: 0.1,

  bodyLarge: 0.5,
  bodyMedium: 0.25,
  bodySmall: 0.4,

  labelLarge: 0.1,
  labelMedium: 0.5,
  labelSmall: 0.5,
};

// Pre-configured text styles
export const textStyles = {
  displayLarge: {
    fontSize: fontSize.displayLarge,
    lineHeight: lineHeight.displayLarge,
    letterSpacing: letterSpacing.displayLarge,
    fontWeight: '400' as const,
  },
  displayMedium: {
    fontSize: fontSize.displayMedium,
    lineHeight: lineHeight.displayMedium,
    letterSpacing: letterSpacing.displayMedium,
    fontWeight: '400' as const,
  },
  displaySmall: {
    fontSize: fontSize.displaySmall,
    lineHeight: lineHeight.displaySmall,
    letterSpacing: letterSpacing.displaySmall,
    fontWeight: '400' as const,
  },
  headlineLarge: {
    fontSize: fontSize.headlineLarge,
    lineHeight: lineHeight.headlineLarge,
    letterSpacing: letterSpacing.headlineLarge,
    fontWeight: '400' as const,
  },
  headlineMedium: {
    fontSize: fontSize.headlineMedium,
    lineHeight: lineHeight.headlineMedium,
    letterSpacing: letterSpacing.headlineMedium,
    fontWeight: '400' as const,
  },
  headlineSmall: {
    fontSize: fontSize.headlineSmall,
    lineHeight: lineHeight.headlineSmall,
    letterSpacing: letterSpacing.headlineSmall,
    fontWeight: '400' as const,
  },
  titleLarge: {
    fontSize: fontSize.titleLarge,
    lineHeight: lineHeight.titleLarge,
    letterSpacing: letterSpacing.titleLarge,
    fontWeight: '500' as const,
  },
  titleMedium: {
    fontSize: fontSize.titleMedium,
    lineHeight: lineHeight.titleMedium,
    letterSpacing: letterSpacing.titleMedium,
    fontWeight: '500' as const,
  },
  titleSmall: {
    fontSize: fontSize.titleSmall,
    lineHeight: lineHeight.titleSmall,
    letterSpacing: letterSpacing.titleSmall,
    fontWeight: '500' as const,
  },
  bodyLarge: {
    fontSize: fontSize.bodyLarge,
    lineHeight: lineHeight.bodyLarge,
    letterSpacing: letterSpacing.bodyLarge,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: fontSize.bodyMedium,
    lineHeight: lineHeight.bodyMedium,
    letterSpacing: letterSpacing.bodyMedium,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: fontSize.bodySmall,
    lineHeight: lineHeight.bodySmall,
    letterSpacing: letterSpacing.bodySmall,
    fontWeight: '400' as const,
  },
  labelLarge: {
    fontSize: fontSize.labelLarge,
    lineHeight: lineHeight.labelLarge,
    letterSpacing: letterSpacing.labelLarge,
    fontWeight: '500' as const,
  },
  labelMedium: {
    fontSize: fontSize.labelMedium,
    lineHeight: lineHeight.labelMedium,
    letterSpacing: letterSpacing.labelMedium,
    fontWeight: '500' as const,
  },
  labelSmall: {
    fontSize: fontSize.labelSmall,
    lineHeight: lineHeight.labelSmall,
    letterSpacing: letterSpacing.labelSmall,
    fontWeight: '500' as const,
  },
};
