const fs = require('fs');
let code = fs.readFileSync('lib/gamification.ts', 'utf-8');

code = code.replace(
  `export type LeagueTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master';`,
  `export type LeagueTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'pymaster' | 'core_dev';
export const LEAGUE_ORDER: LeagueTier[] = ['bronze', 'silver', 'gold', 'platinum', 'pymaster', 'core_dev'];`
);

code = code.replace(
  `export interface UserStats {
  xp: number;
  trophies: number;`,
  `export interface UserStats {
  xp: number;
  weeklyXP: number;
  nextReset: number;
  trophies: number;`
);

code = code.replace(
  `export const LEAGUE_CONFIGS: Record<LeagueTier, { name: string; minTrophies: number; color: string; icon: string }> = {
  bronze: { name: 'Lega Bronzo', minTrophies: 0, color: '#cd7f32', icon: '🥉' },
  silver: { name: 'Lega Argento', minTrophies: 150, color: '#c0c0c0', icon: '🥈' },
  gold: { name: 'Lega Oro', minTrophies: 400, color: '#ffd700', icon: '🥇' },
  platinum: { name: 'Lega Platino', minTrophies: 800, color: '#e5e4e2', icon: '💎' },
  diamond: { name: 'Lega Diamante', minTrophies: 1500, color: '#b9f2ff', icon: '🔮' },
  master: { name: 'Lega Master Cyber', minTrophies: 3000, color: '#ff007f', icon: '👑' },
};`,
  `export const LEAGUE_CONFIGS: Record<LeagueTier, { name: string; minTrophies: number; color: string; icon: string }> = {
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
`
);

code = code.replace(
  `export function getUserStats(): UserStats {
  if (typeof window === 'undefined') {
    return getDefaultStats();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultStats();
    const parsed = JSON.parse(raw);
    return { ...getDefaultStats(), ...parsed };
  } catch {
    return getDefaultStats();
  }
}`,
  `export function getUserStats(): UserStats {
  if (typeof window === 'undefined') return getDefaultStats();
  let s = getDefaultStats();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) s = { ...s, ...JSON.parse(raw) };
  } catch {}
  
  if (Date.now() > s.nextReset) {
    const i = LEAGUE_ORDER.indexOf(s.currentLeague);
    if (s.weeklyXP >= 500 && i < 5) s.currentLeague = LEAGUE_ORDER[i+1];
    else if (s.weeklyXP < 100 && i > 0) s.currentLeague = LEAGUE_ORDER[i-1];
    s.weeklyXP = 0;
    s.nextReset = getNextSunday();
    saveUserStats(s);
  }
  return s;
}`
);

code = code.replace(
  `function getDefaultStats(): UserStats {
  return {
    xp: 250,
    trophies: 120,`,
  `function getDefaultStats(): UserStats {
  return {
    xp: 250,
    weeklyXP: 0,
    nextReset: getNextSunday(),
    trophies: 120,`
);

code = code.replace(
  `    const gainedXP = Math.round(baseXP * mult);
    stats.xp += gainedXP;
    stats.trophies += Math.round(15 * mult);

    // Update League
    if (stats.trophies >= 3000) stats.currentLeague = 'master';
    else if (stats.trophies >= 1500) stats.currentLeague = 'diamond';
    else if (stats.trophies >= 800) stats.currentLeague = 'platinum';
    else if (stats.trophies >= 400) stats.currentLeague = 'gold';
    else if (stats.trophies >= 150) stats.currentLeague = 'silver';`,
  `    const gainedXP = Math.round(baseXP * mult);
    stats.xp += gainedXP;
    stats.weeklyXP += gainedXP;
    stats.trophies += Math.round(15 * mult);`
);

fs.writeFileSync('lib/gamification.ts', code);
