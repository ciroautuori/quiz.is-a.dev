import { LearningTrack, TrackId } from './types';

export const TRACKS: LearningTrack[] = [
  {
    id: 'python',
    name: 'Python',
    title: 'DevQuest • Python',
    subtitle: 'Think Python Lab',
    icon: '🐍',
    badge: 'Python Track',
    color: 'peach',
    codeLang: 'python',
    bookRef: 'Think Python di Allen B. Downey',
    description: 'Impara le basi di Python, tipi di dato, cicli, funzioni, liste, dizionari e POO.',
    title_en: 'DevQuest • Python',
    subtitle_en: 'Think Python Lab',
    description_en: 'Learn Python fundamentals, data types, loops, functions, lists, dictionaries, and OOP.',
    title_es: 'DevQuest • Python',
    subtitle_es: 'Laboratorio Think Python',
    description_es: 'Aprende los fundamentos de Python, tipos de datos, bucles, funciones, listas, diccionarios y POO.'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    title: 'DevQuest • TypeScript',
    subtitle: 'Type System Lab',
    icon: '🟦',
    badge: 'TypeScript Track',
    color: 'blue',
    codeLang: 'typescript',
    bookRef: 'TypeScript Official Handbook & Best Practices',
    description: 'Padroneggia il sistema di tipi di TypeScript, interfacce, generici, union types e utility types.',
    title_en: 'DevQuest • TypeScript',
    subtitle_en: 'Type System Lab',
    description_en: 'Master the TypeScript type system, interfaces, generics, union types, and utility types.',
    title_es: 'DevQuest • TypeScript',
    subtitle_es: 'Laboratorio Sistema de Tipos',
    description_es: 'Domina el sistema de tipos de TypeScript, interfaces, genéricos, union types y utility types.'
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    title: 'DevQuest • Git & GitHub',
    subtitle: 'Version Control Lab',
    icon: '🔀',
    badge: 'Git / GitHub Track',
    color: 'mauve',
    codeLang: 'bash',
    bookRef: 'Pro Git di Scott Chacon & Ben Straub',
    description: 'Impara il controllo versione, staging, commit, branch, merge, rebase, stash e Pull Requests.',
    title_en: 'DevQuest • Git & GitHub',
    subtitle_en: 'Version Control Lab',
    description_en: 'Learn version control, staging, commits, branching, merging, rebasing, stashing, and Pull Requests.',
    title_es: 'DevQuest • Git y GitHub',
    subtitle_es: 'Laboratorio Control de Versiones',
    description_es: 'Aprende control de versiones, staging, commits, ramas, merge, rebase, stash y Pull Requests.'
  }
];

export function getTrackById(id: TrackId): LearningTrack {
  return TRACKS.find((t) => t.id === id) || TRACKS[0];
}

export function getTrackTitle(track: LearningTrack, lang: string = 'it'): string {
  if (lang === 'en' && track.title_en) return track.title_en;
  if (lang === 'es' && track.title_es) return track.title_es;
  return track.title;
}

export function getTrackSubtitle(track: LearningTrack, lang: string = 'it'): string {
  if (lang === 'en' && track.subtitle_en) return track.subtitle_en;
  if (lang === 'es' && track.subtitle_es) return track.subtitle_es;
  return track.subtitle;
}

export function getTrackDescription(track: LearningTrack, lang: string = 'it'): string {
  if (lang === 'en' && track.description_en) return track.description_en;
  if (lang === 'es' && track.description_es) return track.description_es;
  return track.description;
}
