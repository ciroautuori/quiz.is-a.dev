'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SyntaxTheme } from './types';

interface ThemeContextType {
  syntaxTheme: SyntaxTheme;
  toggleSyntaxTheme: () => void;
  setSyntaxTheme: (theme: SyntaxTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  syntaxTheme: 'mocha',
  toggleSyntaxTheme: () => {},
  setSyntaxTheme: () => {},
});

const THEME_STORAGE_KEY = 'pythinkgame_code_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [syntaxTheme, setSyntaxThemeState] = useState<SyntaxTheme>('mocha');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as SyntaxTheme;
      if (saved === 'mocha' || saved === 'latte') {
        setSyntaxThemeState(saved);
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        document.documentElement.setAttribute('data-theme', 'mocha');
      }
    } catch (e) {
      console.warn('Failed to load code theme from storage', e);
      document.documentElement.setAttribute('data-theme', 'mocha');
    }
  }, []);

  const setSyntaxTheme = (theme: SyntaxTheme) => {
    setSyntaxThemeState(theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Failed to save code theme to storage', e);
    }
  };

  const toggleSyntaxTheme = () => {
    const nextTheme = syntaxTheme === 'mocha' ? 'latte' : 'mocha';
    setSyntaxTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ syntaxTheme, toggleSyntaxTheme, setSyntaxTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
