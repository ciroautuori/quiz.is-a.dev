'use client';

import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const META_DESC: Record<string, string> = {
  it: "La piattaforma interattiva per padroneggiare Python, TypeScript e Git & GitHub con sfide pratiche e AI Tutor.",
  en: "The interactive platform to master Python, TypeScript, and Git & GitHub with hands-on challenges and AI Tutor.",
  es: "La plataforma interactiva para dominar Python, TypeScript y Git & GitHub con desafíos prácticos y Tutor IA.",
};

export default function LangSync() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', META_DESC[language] || META_DESC.it);
  }, [language]);

  return null;
}
