'use client';

import React, { useMemo } from 'react';
import { evaluateAchievements } from '../lib/achievements';
import { useLanguage } from '../lib/LanguageContext';
import { Award, X, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const { t, language } = useLanguage();
  const { achievements } = useMemo(() => evaluateAchievements(language), [isOpen, language]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="ctp-card border rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b flex items-center justify-between ctp-card-mantle" style={{ borderColor: 'var(--ctp-border)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-peach)', borderColor: 'var(--ctp-surface1)' }}>
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-mono flex items-center gap-2" style={{ color: 'var(--ctp-text)' }}>
                  Obiettivi & Medaglie
                </h2>
                <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
                  Completa le sfide e mantieni la streak per sbloccare i badge Python
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-text)', borderColor: 'var(--ctp-border)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Overall Progress Banner */}
          <div className="px-6 py-4 ctp-card-mantle border-b flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--ctp-border)' }}>
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 shrink-0" style={{ color: 'var(--ctp-peach)' }} />
              <div className="text-xs font-mono">
                <span className="font-medium" style={{ color: 'var(--ctp-text)' }}>Progresso Totale Medaglie: </span>
                <span className="font-bold" style={{ color: 'var(--ctp-peach)' }}>{unlockedCount} di {totalCount} sbloccati ({percentage}%)</span>
              </div>
            </div>

            <div className="w-full sm:w-48 rounded-full h-2 overflow-hidden" style={{ backgroundColor: 'var(--ctp-surface0)' }}>
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{ width: `${percentage}%`, backgroundColor: 'var(--ctp-peach)' }}
              />
            </div>
          </div>

          {/* Badges Grid */}
          <div className="p-6 overflow-y-auto space-y-3 custom-scrollbar flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {achievements.map((item) => {
                const progressPct = Math.min(
                  100,
                  Math.round((item.currentValue / item.targetValue) * 100)
                );

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border transition-all flex flex-col justify-between relative overflow-hidden ctp-card-mantle"
                    style={{
                      borderColor: item.unlocked ? 'var(--ctp-peach)' : 'var(--ctp-border)',
                      opacity: item.unlocked ? 1 : 0.75
                    }}
                  >
                    <div>
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl p-1.5 rounded-xl border shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', borderColor: 'var(--ctp-surface1)' }}>
                            {item.icon}
                          </span>
                          <div>
                            <h3 className="text-sm font-bold font-mono" style={{ color: item.unlocked ? 'var(--ctp-peach)' : 'var(--ctp-text)' }}>
                              {item.title}
                            </h3>
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-subtext0)', borderColor: 'var(--ctp-border)' }}>
                              {item.category}
                            </span>
                          </div>
                        </div>

                        {item.unlocked ? (
                          <span className="flex items-center gap-1 text-[11px] font-semibold border px-2 py-0.5 rounded-full shrink-0 font-mono" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-green)', borderColor: 'var(--ctp-green)' }}>
                            <CheckCircle2 className="w-3 h-3" /> Sbloccato
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-medium border px-2 py-0.5 rounded-full shrink-0 font-mono" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-subtext0)', borderColor: 'var(--ctp-border)' }}>
                            <Lock className="w-3 h-3" /> Bloccato
                          </span>
                        )}
                      </div>

                      <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--ctp-subtext0)' }}>
                        {item.description}
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="pt-2 border-t" style={{ borderColor: 'var(--ctp-border)' }}>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1" style={{ color: 'var(--ctp-subtext0)' }}>
                        <span>Progresso:</span>
                        <span style={{ color: item.unlocked ? 'var(--ctp-green)' : 'var(--ctp-subtext0)', fontWeight: item.unlocked ? 'bold' : 'normal' }}>
                          {Math.min(item.currentValue, item.targetValue)} / {item.targetValue}
                        </span>
                      </div>
                      <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: 'var(--ctp-surface0)' }}>
                        <div
                          className="h-full transition-all duration-300 rounded-full"
                          style={{
                            width: `${progressPct}%`,
                            backgroundColor: item.unlocked ? 'var(--ctp-green)' : 'var(--ctp-overlay0)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t ctp-card-mantle text-center text-xs flex justify-end" style={{ borderColor: 'var(--ctp-border)' }}>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--ctp-peach)', color: 'var(--ctp-crust)' }}
            >
              Chiudi
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
