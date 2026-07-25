import { promises as fs } from 'fs';
import path from 'path';

export type Language = 'it' | 'en' | 'es';

export interface Translations {
  [key: string]: string;
}

// Caricamento statico per build-time (import assertions)
import it from '../locales/it.json';
import en from '../locales/en.json';
import es from '../locales/es.json';

export const TRANSLATIONS: Record<Language, Translations> = {
  it: it as Translations,
  en: en as Translations,
  es: es as Translations,
};

export const SUPPORTED_LANGUAGES: Language[] = ['it', 'en', 'es'];
