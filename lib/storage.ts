import { PunteggioRecord, Sfida, TrackId, normalizeScoreRecord } from './types';
import { calculateSM2, SM2Data } from './spacedRepetition';
import { db, handleFirestoreError, OperationType, auth } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, doc, setDoc, getDoc } from 'firebase/firestore';

const STORAGE_KEY = 'pythinkgame_punteggi';
const CUSTOM_QUESTIONS_KEY = 'pythinkgame_custom_questions';
const COMPLETED_QUESTIONS_KEY = 'pythinkgame_completed_questions';
const ACTIVE_TRACK_KEY = 'pythinkgame_active_track';

export function getActiveTrack(): TrackId {
  if (typeof window === 'undefined') return 'python';
  try {
    const raw = localStorage.getItem(ACTIVE_TRACK_KEY);
    if (raw === 'typescript' || raw === 'git' || raw === 'python') {
      return raw;
    }
    return 'python';
  } catch {
    return 'python';
  }
}

export function setActiveTrack(trackId: TrackId): TrackId {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ACTIVE_TRACK_KEY, trackId);
    } catch (e) {
      console.warn('Impossibile salvare il track attivo', e);
    }
  }
  return trackId;
}


const DEFAULT_PUNTEGGI: PunteggioRecord[] = [
  {
    id: 'p1',
    nome: 'Guido',
    name: 'Guido',
    punti: 180,
    score: 180,
    data: new Date(Date.now() - 86400000 * 2).toISOString(),
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    difficolta: 'miste',
    difficulty: 'mixed',
    domande: 10,
    questionsCount: 10
  },
  {
    id: 'p2',
    nome: 'Ada',
    name: 'Ada',
    punti: 150,
    score: 150,
    data: new Date(Date.now() - 86400000 * 5).toISOString(),
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    difficolta: 'difficile',
    difficulty: 'hard',
    domande: 10,
    questionsCount: 10
  },
  {
    id: 'p3',
    nome: 'Pythonista',
    name: 'Pythonista',
    punti: 120,
    score: 120,
    data: new Date(Date.now() - 86400000 * 1).toISOString(),
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    difficolta: 'media',
    difficulty: 'medium',
    domande: 10,
    questionsCount: 10
  },
  {
    id: 'p4',
    nome: 'Thinker',
    name: 'Thinker',
    punti: 90,
    score: 90,
    data: new Date(Date.now() - 86400000 * 3).toISOString(),
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    difficolta: 'facile',
    difficulty: 'easy',
    domande: 10,
    questionsCount: 10
  }
].map(normalizeScoreRecord);

export function getPunteggi(): PunteggioRecord[] {
  if (typeof window === 'undefined') return DEFAULT_PUNTEGGI;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PUNTEGGI));
      return DEFAULT_PUNTEGGI;
    }
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.map(normalizeScoreRecord) : DEFAULT_PUNTEGGI;
  } catch {
    return DEFAULT_PUNTEGGI;
  }
}

export async function syncPunteggiFromCloud(): Promise<PunteggioRecord[]> {
  try {
    const q = query(collection(db, 'leaderboard'), orderBy('punteggio', 'desc'), limit(20));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const records: PunteggioRecord[] = snapshot.docs.map(docSnap => {
        const d = docSnap.data();
        return normalizeScoreRecord({
          id: docSnap.id,
          nome: d.nomeUtente || 'Anonimo',
          punti: d.punteggio || 0,
          data: d.data || new Date().toISOString(),
          difficolta: d.trackId || 'miste',
          domande: 10
        });
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      }
      return records;
    }
  } catch (error) {
    console.warn('Cloud sync offline or using cached local scores', error);
  }
  return getPunteggi();
}

export function salvaPunteggio(nome: string, punti: number, difficolta: string, domande: number): PunteggioRecord[] {
  if (punti <= 0) return getPunteggi();
  const attuali = getPunteggi();
  const recordId = 'score_' + Date.now();
  const nuovo: PunteggioRecord = normalizeScoreRecord({
    id: recordId,
    nome: nome.trim() || 'Anonimo',
    punti,
    data: new Date().toISOString(),
    difficolta,
    domande
  });

  const aggiornati = [...attuali, nuovo]
    .sort((a, b) => (b.score ?? b.punti ?? 0) - (a.score ?? a.punti ?? 0))
    .slice(0, 20);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(aggiornati));
    } catch (e) {
      console.warn('Impossibile salvare in localStorage', e);
    }
  }

  // Cloud async publish
  (async () => {
    try {
      await setDoc(doc(db, 'leaderboard', recordId), {
        id: recordId,
        nomeUtente: nuovo.nome,
        punteggio: nuovo.punti,
        data: nuovo.data,
        trackId: nuovo.difficolta,
        userId: auth.currentUser?.uid || 'guest'
      });
    } catch (err) {
      console.warn('Failed to save score to Firebase cloud', err);
    }
  })();

  return aggiornati;
}

export function getCustomQuestions(): Sfida[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

export function saveCustomQuestion(sfida: Sfida): Sfida[] {
  const existing = getCustomQuestions();
  const updated = [sfida, ...existing];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Impossibile salvare domanda personalizzata', e);
    }
  }

  // Cloud async publish custom question if user signed in
  (async () => {
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'custom_questions', sfida.id), {
          id: sfida.id,
          categoria: sfida.argomento || 'Generale',
          domanda: sfida.domanda,
          opzioni: sfida.risposte || [],
          rispostaCorretta: sfida.indice_corretto ?? 0,
          spiegazione: sfida.spiegazione || '',
          livello: sfida.difficolta || 'facile',
          trackId: sfida.trackId || 'python',
          authorId: auth.currentUser.uid,
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Failed to publish custom question to Firebase', err);
      }
    }
  })();

  return updated;
}

export function getCompletedQuestionIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COMPLETED_QUESTIONS_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function markQuestionCompleted(id: string): { completedIds: string[]; streak: StreakInfo; todayCount: number } {
  incrementTodayCompletedCount();
  if (!id) {
    return { completedIds: getCompletedQuestionIds(), streak: getDailyStreak(), todayCount: getTodayCompletedCount() };
  }
  const current = getCompletedQuestionIds();
  let updated = current;
  if (!current.includes(id)) {
    updated = [...current, id];
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(COMPLETED_QUESTIONS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Impossibile salvare il progresso', e);
      }
    }
  }
  const updatedStreak = updateDailyStreakOnCompletion();

  // Sync user progress to Cloud Firestore if logged in
  (async () => {
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid, 'progress', 'main'), {
          userId: auth.currentUser.uid,
          completedQuestionIds: updated,
          streakCount: updatedStreak.count,
          lastActiveDate: updatedStreak.lastDate,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn('Failed to sync progress to cloud', err);
      }
    }
  })();

  return { completedIds: updated, streak: updatedStreak, todayCount: getTodayCompletedCount() };
}

export interface StreakInfo {
  count: number;
  lastDate: string;
  completedToday: boolean;
}

function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDailyStreak(): StreakInfo {
  if (typeof window === 'undefined') {
    return { count: 0, lastDate: '', completedToday: false };
  }
  try {
    const raw = localStorage.getItem('pythinkgame_daily_streak');
    if (!raw) return { count: 0, lastDate: '', completedToday: false };
    const parsed = JSON.parse(raw);
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    let count = Number(parsed.count) || 0;
    const lastDate = String(parsed.lastDate || '');

    const completedToday = lastDate === today;

    // Check if streak broke (last date prior to yesterday)
    if (lastDate && lastDate !== today && lastDate !== yesterday) {
      count = 0;
    }

    return {
      count,
      lastDate,
      completedToday
    };
  } catch {
    return { count: 0, lastDate: '', completedToday: false };
  }
}

export function updateDailyStreakOnCompletion(): StreakInfo {
  if (typeof window === 'undefined') {
    return { count: 0, lastDate: '', completedToday: false };
  }

  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();
  const current = getDailyStreak();

  if (current.lastDate === today) {
    return { ...current, completedToday: true };
  }

  let newCount = 1;
  if (current.lastDate === yesterday) {
    newCount = current.count + 1;
  } else {
    newCount = 1;
  }

  const newStreak: StreakInfo = {
    count: newCount,
    lastDate: today,
    completedToday: true
  };

  try {
    localStorage.setItem('pythinkgame_daily_streak', JSON.stringify(newStreak));
  } catch (e) {
    console.warn('Impossibile salvare la streak giornaliera', e);
  }

  return newStreak;
}

const DAILY_GOAL_KEY = 'pythinkgame_daily_goal';
const TODAY_PROGRESS_KEY = 'pythinkgame_today_progress';

export function getDailyGoal(): number {
  if (typeof window === 'undefined') return 3;
  try {
    const raw = localStorage.getItem(DAILY_GOAL_KEY);
    return raw ? Math.max(1, parseInt(raw, 10)) : 3;
  } catch {
    return 3;
  }
}

export function setDailyGoal(goal: number): number {
  const validGoal = Math.max(1, goal);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(DAILY_GOAL_KEY, String(validGoal));
    } catch (e) {
      console.warn('Impossibile salvare l\'obiettivo giornaliero', e);
    }
  }
  return validGoal;
}

export function getTodayCompletedCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const today = getTodayDateString();
    const raw = localStorage.getItem(TODAY_PROGRESS_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.date === today) {
      return Number(parsed.count) || 0;
    }
    return 0;
  } catch {
    return 0;
  }
}

export function incrementTodayCompletedCount(): number {
  if (typeof window === 'undefined') return 0;
  const today = getTodayDateString();
  const currentCount = getTodayCompletedCount();
  const newCount = currentCount + 1;
  try {
    localStorage.setItem(TODAY_PROGRESS_KEY, JSON.stringify({ date: today, count: newCount }));
  } catch (e) {
    console.warn('Impossibile salvare il progresso giornaliero', e);
  }
  return newCount;
}

export function getQuestionBestTimes(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('pythinkgame_question_best_times');
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function saveQuestionBestTime(questionId: string, timeInSeconds: number): { bestTime: number; isNewRecord: boolean } {
  if (!questionId || timeInSeconds <= 0) {
    return { bestTime: 0, isNewRecord: false };
  }
  const currentBestTimes = getQuestionBestTimes();
  const previousBest = currentBestTimes[questionId];

  let isNewRecord = false;
  let bestTime = timeInSeconds;

  if (previousBest === undefined || timeInSeconds < previousBest) {
    isNewRecord = true;
    bestTime = timeInSeconds;
    currentBestTimes[questionId] = timeInSeconds;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('pythinkgame_question_best_times', JSON.stringify(currentBestTimes));
      } catch (e) {
        console.warn('Impossibile salvare il miglior tempo per la domanda', e);
      }
    }
  } else {
    bestTime = previousBest;
  }

  return { bestTime, isNewRecord };
}

export function resetCompletedQuestions(): string[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(COMPLETED_QUESTIONS_KEY);
    } catch (e) {
      console.warn('Impossibile azzerare il progresso', e);
    }
  }
  return [];
}
