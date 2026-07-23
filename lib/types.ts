export type DifficoltaType = 'facile' | 'media' | 'difficile' | 'miste';
export type SyntaxTheme = 'mocha' | 'latte';
export type TrackId = 'python' | 'typescript' | 'git';

export interface LearningTrack {
  id: TrackId;
  name: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  color: string; // Catppuccin color theme key (e.g. 'peach', 'blue', 'mauve')
  codeLang: 'python' | 'typescript' | 'bash';
  bookRef: string;
  description: string;
}

export interface Sfida {
  id: string;
  trackId?: TrackId;
  capitolo: number;
  argomento: string;
  difficolta: 'facile' | 'media' | 'difficile';
  domanda: string;
  codice: string;
  risposte: string[];
  indice_corretto: number;
  suggerimento: string;
  spiegazione: string;
  codice_valido?: boolean;
  errore_atteso?: string | null;
}

export interface Concetto {
  nome: string;
  trackId?: TrackId;
  titolo: string;
  capitolo: number;
  testo: string;
}

export interface PunteggioRecord {
  id: string;
  trackId?: TrackId;
  nome: string;
  punti: number;
  data: string;
  difficolta: string;
  domande: number;
}

export interface GameStats {
  punti: number;
  vite: number;
  domande_fatte: number;
  risposte_corrette: number;
  num_domande: number;
  difficolta: DifficoltaType;
}

