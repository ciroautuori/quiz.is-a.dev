'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, TRANSLATIONS } from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'devquest_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('it');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (saved && (saved === 'it' || saved === 'en' || saved === 'es')) {
        setLanguageState(saved);
      } else {
        // Detect browser language
        const navLang = navigator.language.slice(0, 2);
        if (navLang === 'en') setLanguageState('en');
        else if (navLang === 'es') setLanguageState('es');
        else setLanguageState('it');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  const value = {
    language,
    setLanguage,
    t: TRANSLATIONS[language] || TRANSLATIONS.it,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
