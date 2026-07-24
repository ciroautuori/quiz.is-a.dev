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
  },
  {
    id: 'docker',
    name: 'Docker',
    title: 'DevQuest • Docker & Containers',
    subtitle: 'Containerization Lab',
    icon: '🐳',
    badge: 'Docker Track',
    color: 'sky',
    codeLang: 'dockerfile',
    bookRef: 'Docker Deep Dive di Nigel Poulton',
    description: 'Impara la containerizzazione, immagini, Dockerfile, volumi, networking e Docker Compose.',
    title_en: 'DevQuest • Docker & Containers',
    subtitle_en: 'Containerization Lab',
    description_en: 'Learn containerization, images, Dockerfile, volumes, networking, and Docker Compose.',
    title_es: 'DevQuest • Docker y Contenedores',
    subtitle_es: 'Laboratorio de Contenedores',
    description_es: 'Aprende contenedores, imágenes, Dockerfile, volúmenes, redes y Docker Compose.'
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    title: 'DevQuest • PostgreSQL & DB',
    subtitle: 'Relational Database Lab',
    icon: '🐘',
    badge: 'Postgres Track',
    color: 'teal',
    codeLang: 'sql',
    bookRef: 'PostgreSQL: Up and Running di Regina Obe & Leo Hsu',
    description: 'Padroneggia il linguaggio SQL, DDL/DML, JOIN complessi, indici, transazioni e schema design.',
    title_en: 'DevQuest • PostgreSQL & DB',
    subtitle_en: 'Relational Database Lab',
    description_en: 'Master SQL syntax, DDL/DML, complex JOINs, indexing, transactions, and schema design.',
    title_es: 'DevQuest • PostgreSQL y BD',
    subtitle_es: 'Laboratorio Base de Datos Relacional',
    description_es: 'Domina SQL, DDL/DML, JOINs complejos, índices, transacciones y diseño de esquemas.'
  },
  {
    id: 'prompt_engineering',
    name: 'Prompt Eng',
    title: 'DevQuest • Prompt & Context',
    subtitle: 'AI Engineering Lab',
    icon: '🤖',
    badge: 'AI Track',
    color: 'yellow',
    codeLang: 'typescript',
    bookRef: 'Anthropic Prompt Engineering Official Guide',
    description: 'Impara la struttura dei prompt, XML tags, system prompts, chain-of-thought e gestione della context window.',
    title_en: 'DevQuest • Prompt & Context',
    subtitle_en: 'AI Engineering Lab',
    description_en: 'Learn prompt structure, XML tags, system prompts, chain-of-thought, and context window management.',
    title_es: 'DevQuest • Prompt y Contexto',
    subtitle_es: 'Laboratorio de Ingeniería de IA',
    description_es: 'Aprende la estructura de prompts, etiquetas XML, system prompts y gestión de context window.'
  },
  {
    id: 'mcp',
    name: 'MCP Protocol',
    title: 'DevQuest • Model Context Protocol',
    subtitle: 'MCP Protocol Lab',
    icon: '🔌',
    badge: 'MCP Track',
    color: 'lavender',
    codeLang: 'json',
    bookRef: 'Model Context Protocol (MCP) Official Spec',
    description: 'Padroneggia l\'architettura client-server MCP, JSON-RPC 2.0, discovery dei tool e trasporti stdio/HTTP.',
    title_en: 'DevQuest • Model Context Protocol',
    subtitle_en: 'MCP Protocol Lab',
    description_en: 'Master MCP client-server architecture, JSON-RPC 2.0, tool discovery, and stdio/HTTP transports.',
    title_es: 'DevQuest • Protocolo MCP',
    subtitle_es: 'Laboratorio de Protocolo MCP',
    description_es: 'Domina la arquitectura MCP cliente-servidor, JSON-RPC 2.0, descubrimiento de herramientas y transportes.'
  },
  {
    id: 'claude_code',
    name: 'Claude Code',
    title: 'DevQuest • Claude Code & AI Dev',
    subtitle: 'AI-Assisted Coding Lab',
    icon: '🧠',
    badge: 'AI Coding Track',
    color: 'pink',
    codeLang: 'bash',
    bookRef: 'Claude Code Official Documentation',
    description: 'Impara l\'uso del file CLAUDE.md, Skills, Subagenti, Hooks, permessi e workflow di sviluppo assistito.',
    title_en: 'DevQuest • Claude Code & AI Dev',
    subtitle_en: 'AI-Assisted Coding Lab',
    description_en: 'Learn CLAUDE.md guidelines, Skills, Subagents, Hooks, permissions, and AI-assisted workflows.',
    title_es: 'DevQuest • Claude Code y Dev IA',
    subtitle_es: 'Laboratorio de Desarrollo Asistido por IA',
    description_es: 'Aprende CLAUDE.md, Skills, Subagentes, Hooks, permisos y flujos de desarrollo asistido por IA.'
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
