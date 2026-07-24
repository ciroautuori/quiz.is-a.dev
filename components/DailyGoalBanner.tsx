import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Flame, CheckCircle2, Sliders, Zap, X } from 'lucide-react';
import { getDailyGoal, setDailyGoal, getTodayCompletedCount, getDailyStreak } from '../lib/storage';
import { useLanguage } from '../lib/LanguageContext';

interface DailyGoalBannerProps {
  onStartQuickGame: (count: number) => void;
}

export default function DailyGoalBanner({ onStartQuickGame }: DailyGoalBannerProps) {
  const { t } = useLanguage();
  const [goal, setGoal] = useState(3);
  const [todayCount, setTodayCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [showGoalSettings, setShowGoalSettings] = useState(false);

  useEffect(() => {
    setGoal(getDailyGoal());
    setTodayCount(getTodayCompletedCount());
    const streak = getDailyStreak();
    setStreakCount(streak.count);
  }, []);

  const handleGoalChange = (newGoal: number) => {
    setGoal(setDailyGoal(newGoal));
  };

  if (dismissed) return null;

  const remaining = Math.max(0, goal - todayCount);
  const isGoalCompleted = remaining === 0;

  // Progress percentage
  const progressPercent = Math.min(100, Math.round((todayCount / goal) * 100));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-6 overflow-hidden rounded-2xl border ctp-card shadow-lg relative"
        style={{ borderColor: isGoalCompleted ? 'var(--ctp-green)' : 'var(--ctp-peach)' }}
      >
        {/* Top accent glow line */}
        <div 
          className="h-1 w-full" 
          style={{ backgroundColor: isGoalCompleted ? 'var(--ctp-green)' : 'var(--ctp-peach)' }}
        />

        <div className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Left Info Section */}
            <div className="flex items-start gap-3.5 flex-1">
              <div 
                className="w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 shadow-inner mt-0.5"
                style={{ 
                  backgroundColor: 'var(--ctp-surface0)', 
                  color: isGoalCompleted ? 'var(--ctp-green)' : 'var(--ctp-peach)',
                  borderColor: 'var(--ctp-surface1)'
                }}
              >
                {isGoalCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : (
                  <Target className="w-6 h-6 animate-pulse" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span 
                    className="text-xs font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border"
                    style={{ 
                      backgroundColor: 'var(--ctp-surface0)', 
                      color: isGoalCompleted ? 'var(--ctp-green)' : 'var(--ctp-peach)',
                      borderColor: 'var(--ctp-surface1)'
                    }}
                  >
                    {isGoalCompleted ? (t.dailyGoalReached || 'Obiettivo Raggiunto! 🎉') : (t.dailyGoalTitle || 'Obiettivo Giornaliero')}
                  </span>

                  {streakCount > 0 && (
                    <span 
                      className="text-xs font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-md border"
                      style={{ 
                        backgroundColor: 'var(--ctp-surface0)', 
                        color: 'var(--ctp-mauve)',
                        borderColor: 'var(--ctp-surface1)'
                      }}
                    >
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      {streakCount} {t.streakDays || 'giorni streak'}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
                  {isGoalCompleted ? (
                    (t.goalCompletedMsg || 'Complimenti! Hai completato le tue {goal} sfide giornaliere.').replace('{goal}', String(goal))
                  ) : todayCount === 0 ? (
                    (t.goalZeroMsg || 'Non hai ancora completato nessuna sfida oggi!')
                  ) : (
                    (t.goalProgressMsg || 'Hai completato {count} su {goal} sfide oggi!').replace('{count}', String(todayCount)).replace('{goal}', String(goal))
                  )}
                </h3>

                <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
                  {isGoalCompleted ? (
                    `Hai già mantenuto attiva la tua streak. Vuoi continuare a fare pratica?`
                  ) : (
                    (t.goalRemainingMsg || 'Ti mancano ancora {count} domande per completare il tuo obiettivo.').replace('{count}', String(remaining))
                  )}
                </p>

                {/* Progress Bar */}
                <div className="pt-1.5 flex items-center gap-3 max-w-md">
                  <div className="flex-1 rounded-full h-2 overflow-hidden" style={{ backgroundColor: 'var(--ctp-surface0)' }}>
                    <div 
                      className="h-full transition-all duration-500 rounded-full"
                      style={{ 
                        width: `${progressPercent}%`,
                        backgroundColor: isGoalCompleted ? 'var(--ctp-green)' : 'var(--ctp-peach)'
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold shrink-0" style={{ color: 'var(--ctp-subtext0)' }}>
                    {todayCount}/{goal}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Actions Section */}
            <div className="flex items-center gap-2 self-stretch sm:self-center justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/40">
              
              {!isGoalCompleted && (
                <button
                  type="button"
                  onClick={() => onStartQuickGame(remaining)}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                  style={{ backgroundColor: 'var(--ctp-peach)', color: 'var(--ctp-crust)' }}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{(t.quickChallengeBtn || 'Sfida Veloce ({count} domande)').replace('{count}', String(remaining))}</span>
                </button>
              )}

              {/* Goal Settings Toggle */}
              <button
                type="button"
                onClick={() => setShowGoalSettings(!showGoalSettings)}
                className="p-2.5 rounded-xl border text-xs font-mono flex items-center gap-1 hover:opacity-80 transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-text)', borderColor: 'var(--ctp-surface1)' }}
                title="Modifica Obiettivo Giornaliero"
              >
                <Sliders className="w-4 h-4" />
                <span className="hidden sm:inline">Obiettivo: {goal}</span>
              </button>

              {/* Dismiss button */}
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="p-2.5 rounded-xl border text-xs hover:opacity-80 transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-subtext0)', borderColor: 'var(--ctp-surface1)' }}
                title="Nascondi Notifica"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Goal Selector Options */}
          {showGoalSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs"
              style={{ borderColor: 'var(--ctp-border)' }}
            >
              <span className="font-semibold" style={{ color: 'var(--ctp-subtext0)' }}>
                Scegli il tuo obiettivo giornaliero:
              </span>

              <div className="flex items-center gap-1.5 flex-wrap">
                {[1, 3, 5, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleGoalChange(num)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer"
                    style={{
                      backgroundColor: goal === num ? 'var(--ctp-surface1)' : 'var(--ctp-surface0)',
                      borderColor: goal === num ? 'var(--ctp-peach)' : 'var(--ctp-surface1)',
                      color: goal === num ? 'var(--ctp-peach)' : 'var(--ctp-text)'
                    }}
                  >
                    {num} {num === 1 ? 'sfida' : 'sfide'}/giorno
                  </button>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
