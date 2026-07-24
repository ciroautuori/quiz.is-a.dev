'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, Shield, Zap, Award, ShoppingBag, X, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { getUserStats, buyStreakFreeze, LEAGUE_CONFIGS, LeagueTier, UserStats } from '../lib/gamification';
import { soundEngine } from '../lib/soundEngine';
import ParticleBurst from './ParticleBurst';

interface LeaguesAndStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_LEAGUE_LEADERBOARD = [
  { rank: 1, name: 'CyberCoder99', weeklyXP: 3420, streak: 18, avatar: '🐉' },
  { rank: 2, name: 'PythonistaPro', weeklyXP: 2890, streak: 12, avatar: '🐍' },
  { rank: 3, name: 'DevMaster_X', weeklyXP: 2450, streak: 9, avatar: '⚡' },
  { rank: 4, name: 'Tu (Player)', weeklyXP: 0, streak: 0, avatar: '👤', isUser: true },
  { rank: 5, name: 'AlgoNinja', weeklyXP: 1200, streak: 5, avatar: '🥷' },
  { rank: 6, name: 'CodeWizard', weeklyXP: 980, streak: 4, avatar: '🧙' },
  { rank: 7, name: 'ByteRider', weeklyXP: 710, streak: 2, avatar: '🏎️' },
];

export default function LeaguesAndStreakModal({ isOpen, onClose }: LeaguesAndStreakModalProps) {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [message, setMessage] = useState<string | null>(null);
  const [triggerBurst, setTriggerBurst] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = Math.max(0, stats.nextReset - Date.now());
      setTimeLeft(`${Math.floor(d/86400000)}d ${Math.floor((d%86400000)/3600000)}h ${Math.floor((d%3600000)/60000)}m`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [stats.nextReset]);

  useEffect(() => {
    if (isOpen) {
      setStats(getUserStats());
    }
  }, [isOpen]);

  const handleBuyFreeze = () => {
    const res = buyStreakFreeze();
    setStats(res.stats);
    setMessage(res.message);
    if (res.success) {
      soundEngine.playLevelUp();
      setTriggerBurst(true);
    } else {
      soundEngine.playWrong();
    }
    setTimeout(() => setMessage(null), 3500);
  };

  if (!isOpen) return null;

  const currentLeagueConfig = LEAGUE_CONFIGS[stats.currentLeague];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl ctp-card rounded-2xl shadow-2xl border border-[var(--ctp-surface1)] overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-4 px-6 ctp-card-mantle border-b border-[var(--ctp-surface1)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
                <Flame className="w-6 h-6 fill-amber-200" />
              </div>
              <div>
                <h2 className="font-mono font-bold text-base flex items-center gap-2" style={{ color: 'var(--ctp-text)' }}>
                  {t.leaguesStreaks || 'Leghe & Serie'}
                </h2>
                <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
                  {t.streakSubtitle || 'Gareggia ogni settimana, mantieni lo Streak e sblocca Freeze!'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-[var(--ctp-surface0)] transition-colors cursor-pointer"
              style={{ color: 'var(--ctp-subtext0)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 overflow-y-auto space-y-6 flex-1">
            {/* Top Cards: Streak & League Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Streak Card */}
              <div className="p-4 rounded-xl border bg-[var(--ctp-surface0)]/60 border-[var(--ctp-surface1)] relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[var(--ctp-subtext0)] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {t.streak || 'Serie Attuale'}
                  </span>
                  <span className="text-2xl font-black font-mono text-[var(--ctp-peach)]">
                    {stats.streakCount} <span className="text-xs font-normal">{t.days || 'giorni'}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--ctp-surface1)] text-xs">
                  <span className="flex items-center gap-1 text-[var(--ctp-text)]">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    Streak Freeze: <strong className="font-mono">{stats.streakFreezeCount}</strong>
                  </span>
                  <button
                    onClick={handleBuyFreeze}
                    className="px-2.5 py-1 rounded-lg bg-[var(--ctp-mauve)]/20 hover:bg-[var(--ctp-mauve)]/30 text-[var(--ctp-mauve)] border border-[var(--ctp-mauve)]/40 font-mono text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    +1 Freeze (200 XP)
                  </button>
                </div>
              </div>

              {/* League Card */}
              <div className="p-4 rounded-xl border bg-[var(--ctp-surface0)]/60 border-[var(--ctp-surface1)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[var(--ctp-subtext0)] flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    {language === 'en' ? 'Current League' : language === 'es' ? 'Liga Actual' : 'Lega Corrente'}
                  </span>
                  <span className="text-sm font-bold font-mono px-2.5 py-0.5 rounded-full border" style={{ color: currentLeagueConfig.color, borderColor: currentLeagueConfig.color + '40', backgroundColor: currentLeagueConfig.color + '15' }}>
                    {currentLeagueConfig.icon} {currentLeagueConfig.name}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--ctp-surface1)] text-xs font-mono">
                  <span style={{ color: 'var(--ctp-subtext0)' }}>Reset: {timeLeft}</span>
                  <span className="font-bold text-[var(--ctp-yellow)]">{stats.weeklyXP} XP</span>
                </div>
              </div>
            </div>

            {message && (
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {/* League Leaderboard Table */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center justify-between" style={{ color: 'var(--ctp-subtext0)' }}>
                <span>{t.weeklyLeaderboard || (language === 'en' ? 'Weekly Leaderboard' : language === 'es' ? 'Clasificación Semanal' : 'Classifica Settimanale')} - {currentLeagueConfig.name}</span>
                <span className="text-[10px] text-emerald-400">
                  {language === 'en' ? 'Promotion: 500 XP | Relegation: < 100 XP' : language === 'es' ? 'Ascenso: 500 XP | Descenso: < 100 XP' : 'Promozione: 500 XP | Retrocessione: < 100 XP'}
                </span>
              </h3>

              <div className="border border-[var(--ctp-surface1)] rounded-xl overflow-hidden divide-y divide-[var(--ctp-surface1)]">
                {MOCK_LEAGUE_LEADERBOARD.map((item) => {
                  const isUser = item.isUser;
                  const itemXP = isUser ? stats.weeklyXP : item.weeklyXP;
                  const itemStreak = isUser ? stats.streakCount : item.streak;
                  const displayName = isUser 
                    ? (language === 'en' ? 'You (Player)' : language === 'es' ? 'Tú (Jugador)' : 'Tu (Player)') 
                    : item.name;

                  return (
                    <div
                      key={item.rank}
                      className={`p-3 px-4 flex items-center justify-between text-xs font-mono transition-colors ${
                        isUser ? 'bg-[var(--ctp-mauve)]/15 border-l-4 border-l-[var(--ctp-mauve)] font-bold' : 'bg-[var(--ctp-mantle)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 text-center font-black ${item.rank <= 3 ? 'text-amber-400 text-sm' : 'text-[var(--ctp-subtext0)]'}`}>
                          #{item.rank}
                        </span>
                        <span className="text-base">{item.avatar}</span>
                        <span style={{ color: 'var(--ctp-text)' }}>
                          {displayName} {isUser && <span className="text-[10px] text-[var(--ctp-mauve)] font-normal">({language === 'en' ? 'You' : language === 'es' ? 'Tú' : 'Tu'})</span>}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-[var(--ctp-peach)]">
                          <Flame className="w-3.5 h-3.5" />
                          {itemStreak}d
                        </span>
                        <span className="font-bold text-[var(--ctp-yellow)] w-16 text-right">
                          {itemXP} XP
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <ParticleBurst 
            trigger={triggerBurst} 
            type="streak" 
            onComplete={() => setTriggerBurst(false)} 
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
