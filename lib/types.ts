export type DifficultyType = 'easy' | 'medium' | 'hard' | 'mixed' | 'facile' | 'media' | 'difficile' | 'miste';
export type DifficoltaType = DifficultyType;
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

export interface Challenge {
  id: string;
  trackId?: TrackId;
  chapter?: number;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'facile' | 'media' | 'difficile';
  question?: string;
  code?: string;
  options?: string[];
  correctIndex?: number;
  hint?: string;
  explanation?: string;
  validCode?: boolean;
  expectedError?: string | null;
  author?: string;
  upvotes?: number;
  isCreator?: boolean;
  
  // Backward compatibility fields for legacy code
  capitolo?: number;
  argomento?: string;
  difficolta?: 'facile' | 'media' | 'difficile' | 'easy' | 'medium' | 'hard';
  domanda?: string;
  codice?: string;
  risposte?: string[];
  indice_corretto?: number;
  suggerimento?: string;
  spiegazione?: string;
}

// Backward compatibility alias for Sfida
export type Sfida = Challenge;

export interface Concept {
  id?: string;
  trackId?: TrackId;
  title?: string;
  chapter?: number;
  text?: string;
  codeSnippet?: string;

  // Backward compatibility fields
  titolo?: string;
  nome?: string;
  capitolo?: number;
  testo?: string;
}

export type Concetto = Concept;

export interface ScoreRecord {
  id: string;
  trackId?: TrackId;
  name?: string;
  score?: number;
  date?: string;
  difficulty?: string;
  questionsCount?: number;

  // Backward compatibility
  nome?: string;
  punti?: number;
  data?: string;
  difficolta?: string;
  domande?: number;
}

export type PunteggioRecord = ScoreRecord;

export interface GameStats {
  score?: number;
  lives?: number;
  questionsAnswered?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  difficulty?: DifficultyType;

  // Backward compatibility
  punti?: number;
  vite?: number;
  domande_fatte?: number;
  risposte_corrette?: number;
  num_domande?: number;
  difficolta?: DifficultyType;
}

export function getChallengeChapter(c: Challenge): number {
  return c.chapter ?? c.capitolo ?? 1;
}

export function getChallengeTopic(c: Challenge): string {
  return c.topic ?? c.argomento ?? 'General';
}

export function getChallengeDifficulty(c: Challenge): 'easy' | 'medium' | 'hard' {
  const d = c.difficulty || c.difficolta;
  if (d === 'facile' || d === 'easy') return 'easy';
  if (d === 'media' || d === 'medium') return 'medium';
  if (d === 'difficile' || d === 'hard') return 'hard';
  return 'easy';
}

export function getChallengeQuestion(c: Challenge): string {
  return c.question ?? c.domanda ?? '';
}

export function getChallengeCode(c: Challenge): string {
  return c.code ?? c.codice ?? '';
}

export function getChallengeOptions(c: Challenge): string[] {
  return c.options ?? c.risposte ?? [];
}

export function getChallengeCorrectIndex(c: Challenge): number {
  return c.correctIndex ?? c.indice_corretto ?? 0;
}

export function getChallengeHint(c: Challenge): string {
  return c.hint ?? c.suggerimento ?? '';
}

export function getChallengeExplanation(c: Challenge): string {
  return c.explanation ?? c.spiegazione ?? '';
}

export function normalizeChallenge(c: any): Challenge {
  const chapter = c.chapter ?? c.capitolo ?? 1;
  const topic = c.topic ?? c.argomento ?? 'General';
  const rawDiff = c.difficulty || c.difficolta;
  const difficulty = (rawDiff === 'facile' ? 'easy' : rawDiff === 'media' ? 'medium' : rawDiff === 'difficile' ? 'hard' : rawDiff || 'easy') as 'easy' | 'medium' | 'hard';
  const question = c.question ?? c.domanda ?? '';
  const code = c.code ?? c.codice ?? '';
  const options = c.options ?? c.risposte ?? [];
  const correctIndex = c.correctIndex ?? c.indice_corretto ?? 0;
  const hint = c.hint ?? c.suggerimento ?? '';
  const explanation = c.explanation ?? c.spiegazione ?? '';

  return {
    ...c,
    id: c.id,
    trackId: c.trackId || 'python',
    chapter,
    topic,
    difficulty,
    question,
    code,
    options,
    correctIndex,
    hint,
    explanation,
    capitolo: chapter,
    argomento: topic,
    difficolta: difficulty === 'easy' ? 'facile' : difficulty === 'medium' ? 'media' : 'difficile',
    domanda: question,
    codice: code,
    risposte: options,
    indice_corretto: correctIndex,
    suggerimento: hint,
    spiegazione: explanation,
  };
}

export function getConceptTitle(c: Concept): string {
  return c.title ?? c.titolo ?? c.nome ?? 'Concept';
}

export function getConceptChapter(c: Concept): number {
  return c.chapter ?? c.capitolo ?? 1;
}

export function getConceptText(c: Concept): string {
  return c.text ?? c.testo ?? '';
}

export function normalizeConcept(c: any): Concept {
  const title = c.title ?? c.titolo ?? c.nome ?? 'Concept';
  const chapter = c.chapter ?? c.capitolo ?? 1;
  const text = c.text ?? c.testo ?? '';
  const id = c.id || c.nome || String(Math.random());

  return {
    ...c,
    id,
    trackId: c.trackId || 'python',
    title,
    chapter,
    text,
    titolo: title,
    nome: title,
    capitolo: chapter,
    testo: text,
  };
}

export function normalizeScoreRecord(r: any): ScoreRecord {
  const name = r.name ?? r.nome ?? 'Developer';
  const score = r.score ?? r.punti ?? 0;
  const date = r.date ?? r.data ?? new Date().toISOString();
  const difficulty = r.difficulty ?? r.difficolta ?? 'mixed';
  const questionsCount = r.questionsCount ?? r.domande ?? 0;

  return {
    ...r,
    id: r.id || String(Math.random()),
    name,
    score,
    date,
    difficulty,
    questionsCount,
    nome: name,
    punti: score,
    data: date,
    difficolta: difficulty,
    domande: questionsCount,
  };
}
