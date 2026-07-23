import { getCompletedQuestionIds, getDailyStreak, getPunteggi, getCustomQuestions } from './storage';
import { TUTTE_LE_SFIDE } from './questions';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'streak' | 'mastery' | 'creativity' | 'score';
  unlocked: boolean;
  currentValue: number;
  targetValue: number;
  unlockedAt?: string;
}

const ACHIEVEMENTS_STORAGE_KEY = 'pythinkgame_unlocked_achievements';

interface StoredUnlock {
  id: string;
  unlockedAt: string;
}

function getStoredUnlocks(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: StoredUnlock[] = JSON.parse(raw);
    const map: Record<string, string> = {};
    if (Array.isArray(parsed)) {
      parsed.forEach((u) => {
        map[u.id] = u.unlockedAt;
      });
    }
    return map;
  } catch {
    return {};
  }
}

function saveStoredUnlocks(map: Record<string, string>) {
  if (typeof window === 'undefined') return;
  try {
    const list = Object.entries(map).map(([id, unlockedAt]) => ({ id, unlockedAt }));
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Impossibile salvare gli achievement in localStorage', e);
  }
}

export function evaluateAchievements(): { achievements: Achievement[]; newlyUnlocked: Achievement[] } {
  const completedIds = getCompletedQuestionIds();
  const streak = getDailyStreak();
  const punteggi = getPunteggi();
  const customQuestions = getCustomQuestions();
  const storedUnlocks = getStoredUnlocks();

  // Calculate difficult questions completed
  const allQuestionsMap = new Map();
  [...TUTTE_LE_SFIDE, ...customQuestions].forEach((q) => allQuestionsMap.set(q.id, q));
  
  let hardCount = 0;
  completedIds.forEach((id) => {
    const q = allQuestionsMap.get(id);
    if (q && (q.difficolta === 'difficile' || q.difficulty === 'hard')) {
      hardCount++;
    }
  });

  // Highest score in leaderboard
  const maxScore = punteggi.length > 0 ? Math.max(...punteggi.map((p) => p.score ?? p.punti ?? 0)) : 0;

  const rawAchievements: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
    {
      id: 'first_code',
      title: 'Primo Codice',
      description: 'Completa la tua prima sfida Python con successo.',
      icon: '🐣',
      category: 'progress',
      currentValue: completedIds.length,
      targetValue: 1,
    },
    {
      id: 'three_day_streak',
      title: 'Tris di Fuoco (3 Giorni)',
      description: 'Mantieni una serie di studio di 3 giorni consecutivi.',
      icon: '🔥',
      category: 'streak',
      currentValue: streak.count,
      targetValue: 3,
    },
    {
      id: 'ten_day_streak',
      title: 'Ten-Day Streak (10 Giorni)',
      description: 'Raggiungi una straordinaria streak di 10 giorni consecutivi!',
      icon: '⚡',
      category: 'streak',
      currentValue: streak.count,
      targetValue: 10,
    },
    {
      id: 'logic_master',
      title: 'Maestro della Logica',
      description: 'Completa almeno 10 sfide di programmazione Python.',
      icon: '🧠',
      category: 'mastery',
      currentValue: completedIds.length,
      targetValue: 10,
    },
    {
      id: 'python_guru',
      title: 'Guru di Python',
      description: 'Completa 25 sfide per dominare la guida Think Python.',
      icon: '🎓',
      category: 'mastery',
      currentValue: completedIds.length,
      targetValue: 25,
    },
    {
      id: 'challenge_creator',
      title: 'Architetto di Sfide',
      description: 'Crea ed aggiungi almeno 1 domanda personalizzata al laboratorio.',
      icon: '✍️',
      category: 'creativity',
      currentValue: customQuestions.length,
      targetValue: 1,
    },
    {
      id: 'leaderboard_hero',
      title: 'Eroe della Classifica',
      description: 'Registra un punteggio di almeno 150 punti in classifica.',
      icon: '🏆',
      category: 'score',
      currentValue: maxScore,
      targetValue: 150,
    },
    {
      id: 'advanced_master',
      title: 'Dominatore Avanzato',
      description: 'Rispondi correttamente ad almeno 3 sfide di livello Difficile.',
      icon: '🌶️',
      category: 'mastery',
      currentValue: hardCount,
      targetValue: 3,
    },
  ];

  const newlyUnlocked: Achievement[] = [];
  const updatedUnlocks = { ...storedUnlocks };

  const achievements: Achievement[] = rawAchievements.map((item) => {
    const isRequirementMet = item.currentValue >= item.targetValue;
    const previouslyUnlocked = !!storedUnlocks[item.id];

    let unlockedAt = storedUnlocks[item.id];

    if (isRequirementMet && !previouslyUnlocked) {
      unlockedAt = new Date().toISOString();
      updatedUnlocks[item.id] = unlockedAt;
      newlyUnlocked.push({
        ...item,
        unlocked: true,
        unlockedAt,
      });
    }

    return {
      ...item,
      unlocked: isRequirementMet || previouslyUnlocked,
      unlockedAt: unlockedAt || undefined,
    };
  });

  if (newlyUnlocked.length > 0) {
    saveStoredUnlocks(updatedUnlocks);
  }

  return { achievements, newlyUnlocked };
}
