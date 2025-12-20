import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './en';
import hi from './hi';
import bn from './bn';

// Create i18n instance
const i18n = new I18n({
  en,
  hi,
  bn,
});

// Set the locale based on device settings
const deviceLocale = getLocales()[0]?.languageCode ?? 'en';
i18n.locale = deviceLocale;

// Enable fallback
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export { i18n };
export type TranslationKeys = keyof typeof en;
