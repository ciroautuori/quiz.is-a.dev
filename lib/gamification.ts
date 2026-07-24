// Gamification Engine for DevQuest: Leagues, Streaks, Streak Freezes, XP Multipliers

export type LeagueTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'pymaster' | 'core_dev';
export const LEAGUE_ORDER: LeagueTier[] = ['bronze', 'silver', 'gold', 'platinum', 'pymaster', 'core_dev'];

export interface UserStats {
  xp: number;
  weeklyXP: number;
  nextReset: number;
  trophies: number;
  streakCount: number;
  lastActiveDate: string; // YYYY-MM-DD
  streakFreezeCount: number;
  currentLeague: LeagueTier;
  leagueRank: number;
  comboCount: number;
  totalAnswered: number;
  correctAnswers: number;
  averageSpeedSeconds: number;
  unlockedBadges: string[];
  elo?: number;
}

export const LEAGUE_CONFIGS: Record<LeagueTier, { name: string; minTrophies: number; color: string; icon: string }> = {
  bronze: { name: 'Bronze', minTrophies: 0, color: '#cd7f32', icon: '🥉' },
  silver: { name: 'Silver', minTrophies: 150, color: '#c0c0c0', icon: '🥈' },
  gold: { name: 'Gold', minTrophies: 400, color: '#ffd700', icon: '🥇' },
  platinum: { name: 'Platinum', minTrophies: 800, color: '#e5e4e2', icon: '💎' },
  pymaster: { name: 'PyMaster', minTrophies: 1500, color: '#b9f2ff', icon: '🐍' },
  core_dev: { name: 'Core-Dev', minTrophies: 3000, color: '#ff007f', icon: '💻' },
};

function getNextSunday() {
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
  d.setHours(0,0,0,0);
  return d.getTime();
}

const STORAGE_KEY = 'devquest_user_stats_v2';

export function getUserStats(): UserStats {
  if (typeof window === 'undefined') return getDefaultStats();
  let s = getDefaultStats();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) s = { ...s, ...JSON.parse(raw) };
  } catch {}
  
  if (!s.elo) s.elo = 1200;

  if (Date.now() > s.nextReset) {
    const i = LEAGUE_ORDER.indexOf(s.currentLeague);
    if (s.weeklyXP >= 500 && i < 5) s.currentLeague = LEAGUE_ORDER[i+1];
    else if (s.weeklyXP < 100 && i > 0) s.currentLeague = LEAGUE_ORDER[i-1];
    s.weeklyXP = 0;
    s.nextReset = getNextSunday();
    saveUserStats(s);
  }
  return s;
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Error saving user stats:', e);
  }
}

function getDefaultStats(): UserStats {
  return {
    xp: 250,
    weeklyXP: 0,
    nextReset: getNextSunday(),
    trophies: 120,
    streakCount: 3,
    lastActiveDate: new Date().toISOString().split('T')[0],
    streakFreezeCount: 1,
    currentLeague: 'bronze',
    leagueRank: 12,
    comboCount: 0,
    totalAnswered: 15,
    correctAnswers: 12,
    averageSpeedSeconds: 8.5,
    unlockedBadges: ['first_step', 'streak_3'],
    elo: 1200,
  };
}

export function calculateMultiplier(comboCount: number): number {
  if (comboCount >= 10) return 3.0;
  if (comboCount >= 5) return 2.0;
  if (comboCount >= 3) return 1.5;
  return 1.0;
}

// ELO rating calculation (inspired by Clash-of-Code reference pattern)
export function calculateEloChange(playerElo: number = 1200, opponentElo: number = 1200, won: boolean, kFactor: number = 32): { newElo: number; delta: number } {
  const expected = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
  const actual = won ? 1 : 0;
  const delta = Math.round(kFactor * (actual - expected));
  const newElo = Math.max(800, playerElo + delta);
  return { newElo, delta };
}

// Jump Out / Skill Level Skip (inspired by Quizzical & Duolingo jump-out pattern)
export function attemptLeagueJumpOut(targetLeague: LeagueTier, passCount: number, totalQuestions: number): { success: boolean; stats: UserStats; message: string } {
  const stats = getUserStats();
  if (passCount >= totalQuestions && totalQuestions >= 3) {
    stats.currentLeague = targetLeague;
    stats.trophies += LEAGUE_CONFIGS[targetLeague].minTrophies;
    stats.xp += 300;
    saveUserStats(stats);
    return {
      success: true,
      stats,
      message: `Congratulazioni! Hai superato la prova speciale e sei saltato alla lega ${LEAGUE_CONFIGS[targetLeague].name}!`
    };
  }
  return {
    success: false,
    stats,
    message: `Prova non superata. Servono ${totalQuestions}/${totalQuestions} risposte corrette.`
  };
}

export function recordQuestionAnswer(isCorrect: boolean, timeTakenSeconds: number) {
  const stats = getUserStats();
  stats.totalAnswered += 1;

  if (isCorrect) {
    stats.correctAnswers += 1;
    stats.comboCount += 1;
    const mult = calculateMultiplier(stats.comboCount);
    const baseXP = 50;
    const gainedXP = Math.round(baseXP * mult);
    stats.xp += gainedXP;
    stats.weeklyXP += gainedXP;
    stats.trophies += Math.round(15 * mult);
  } else {
    stats.comboCount = 0;
  }

  // Rolling speed average
  stats.averageSpeedSeconds = Number(((stats.averageSpeedSeconds * (stats.totalAnswered - 1) + timeTakenSeconds) / stats.totalAnswered).toFixed(1));

  saveUserStats(stats);
  return stats;
}

export function buyStreakFreeze(): { success: boolean; stats: UserStats; message: string } {
  const stats = getUserStats();
  const COST = 200; // 200 XP
  if (stats.xp < COST) {
    return { success: false, stats, message: 'XP insufficienti! Servono 200 XP per acquistare un Freeze.' };
  }
  stats.xp -= COST;
  stats.streakFreezeCount += 1;
  saveUserStats(stats);
  return { success: true, stats, message: 'Streak Freeze acquistato con successo!' };
}
