'use client';

import React, { useState, useEffect } from 'react';
import { getPunteggi, syncPunteggiFromCloud, getCompletedQuestionIds } from '../lib/storage';
import { PunteggioRecord } from '../lib/types';
import { useLanguage } from '../lib/LanguageContext';
import ProficiencyRadarChart from './ProficiencyRadarChart';
import { Trophy, Calendar } from 'lucide-react';

export default function LeaderboardView() {
  const { t } = useLanguage();
  const [scores, setScores] = useState<PunteggioRecord[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    setScores(getPunteggi());
    setCompletedIds(getCompletedQuestionIds());

    // Sync real-time/latest cloud scores from Firebase
    syncPunteggiFromCloud().then((cloudScores) => {
      if (cloudScores && cloudScores.length > 0) {
        setScores(cloudScores);
      }
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {/* Proficiency Radar Chart Mapping Python, TypeScript & Git */}
      <ProficiencyRadarChart completedQuestionIds={completedIds} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-peach)', borderColor: 'var(--ctp-surface1)' }}>
          <Trophy className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>{t.leaderboardTitle}</h2>
          <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>{t.leaderboardSubtitle}</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="ctp-card border rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y" style={{ borderColor: 'var(--ctp-border)' }}>
          {scores.map((record, index) => {
            let rankBadge = (
              <span className="w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center border" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-subtext0)', borderColor: 'var(--ctp-surface1)' }}>
                #{index + 1}
              </span>
            );

            if (index === 0) {
              rankBadge = (
                <span className="w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center border shadow-sm" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-yellow)', borderColor: 'var(--ctp-yellow)' }}>
                  🥇
                </span>
              );
            } else if (index === 1) {
              rankBadge = (
                <span className="w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-subtext1)', borderColor: 'var(--ctp-surface2)' }}>
                  🥈
                </span>
              );
            } else if (index === 2) {
              rankBadge = (
                <span className="w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-peach)', borderColor: 'var(--ctp-surface2)' }}>
                  🥉
                </span>
              );
            }

            return (
              <div
                key={record.id}
                className="p-4 flex items-center justify-between gap-4 transition-colors"
                style={{ borderColor: 'var(--ctp-border)' }}
              >
                <div className="flex items-center gap-3">
                  {rankBadge}
                  <div>
                    <h3 className="text-sm font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>{record.nome}</h3>
                    <div className="flex items-center gap-2 text-[11px] mt-0.5" style={{ color: 'var(--ctp-subtext0)' }}>
                      <span className="capitalize">{record.difficolta}</span>
                      <span>•</span>
                      <span>{record.domande} {t.question}s</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(record.data).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-extrabold font-mono" style={{ color: 'var(--ctp-peach)' }}>{record.punti} pt</div>
                </div>
              </div>
            );
          })}

          {scores.length === 0 && (
            <div className="p-8 text-center text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
              {t.noScoresYet}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


