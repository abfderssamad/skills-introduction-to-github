import React, { createContext, useContext, useMemo, useState } from 'react';
import en from './strings/en.json';
import fr from './strings/fr.json';
import ar from './strings/ar.json';

export type Locale = 'en' | 'fr' | 'ar';

type Strings = typeof en;

interface I18nContextValue {
  locale: Locale;
  t: Strings;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');
  const t = useMemo(() => {
    switch (locale) {
      case 'fr':
        return fr;
      case 'ar':
        return ar;
      default:
        return en;
    }
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

