import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

export type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'ru' || saved === 'en') return saved;
    
    // Fallback to browser locale
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ru') || browserLang.startsWith('be') || browserLang.startsWith('uk') || browserLang.startsWith('kk')) {
      return 'ru';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (keyPath: string, variables?: Record<string, string | number>): any => {
    const keys = keyPath.split('.');
    let value: any = translations[language];

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        // Fallback to Russian if key not found in English
        let fallbackValue: any = translations['ru'];
        for (const fKey of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fKey in fallbackValue) {
            fallbackValue = fallbackValue[fKey];
          } else {
            fallbackValue = undefined;
            break;
          }
        }
        if (fallbackValue !== undefined) {
          value = fallbackValue;
          break;
        }
        return keyPath; // return the path as key if not found
      }
    }

    if (typeof value === 'string' && variables) {
      let result = value;
      Object.entries(variables).forEach(([k, v]) => {
        result = result.replace(`{${k}}`, String(v));
      });
      return result;
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
