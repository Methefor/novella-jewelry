'use client';

import { useParams } from 'next/navigation';
import { defaultLocale, type Locale, locales, t } from './i18n';

// useLocale hook'u - GUVENLI VERSIYON
export function useLocale(): Locale {
  try {
    const params = useParams();

    if (!params || typeof params !== 'object') {
      return defaultLocale;
    }

    const locale = params.locale;

    // locale undefined veya string degilse
    if (!locale || typeof locale !== 'string') {
      return defaultLocale;
    }

    // Gecerli bir locale mi?
    if (locales.includes(locale as Locale)) {
      return locale as Locale;
    }

    return defaultLocale;
  } catch (error) {
    console.error('useLocale error:', error);
    return defaultLocale;
  }
}

// useTranslations hook'u - BASIT VE CALISAN VERSIYON
export function useTranslations(namespace: string) {
  const locale = useLocale();

  return (key: string): string => {
    const fullKey = `${namespace}.${key}`;
    return t(locale, fullKey); // DOGRU: (locale, key)
  };
}
