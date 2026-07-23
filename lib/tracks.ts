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
    description: 'Impara le basi di Python, tipi di dato, cicli, funzioni, liste, dizionari e POO.'
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
    description: 'Padroneggia il sistema di tipi di TypeScript, interfacce, generici, union types e utility types.'
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
    description: 'Impara il controllo versione, staging, commit, branch, merge, rebase, stash e Pull Requests.'
  }
];

export function getTrackById(id: TrackId): LearningTrack {
  return TRACKS.find((t) => t.id === id) || TRACKS[0];
}
