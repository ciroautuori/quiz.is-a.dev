'use client';

import React from 'react';
import { TRACKS } from '../lib/tracks';
import { TrackId } from '../lib/types';
import { motion } from 'framer-motion';
import { Check, Sparkles, BookOpen } from 'lucide-react';

interface TrackSelectorProps {
  activeTrackId: TrackId;
  onSelectTrack: (trackId: TrackId) => void;
  questionsCounts?: Record<TrackId, { total: number; completed: number }>;
}

export default function TrackSelector({
  activeTrackId,
  onSelectTrack,
  questionsCounts
}: TrackSelectorProps) {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--ctp-peach)]" />
          <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--ctp-subtext0)]">
            Seleziona Linguaggio / Tecnologia
          </h2>
        </div>
        <span className="text-[11px] font-mono text-[var(--ctp-overlay0)]">
          3 Tracciati Disponibili
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TRACKS.map((track) => {
          const isActive = track.id === activeTrackId;
          const stats = questionsCounts ? questionsCounts[track.id] : undefined;
          const total = stats?.total || 0;
          const completed = stats?.completed || 0;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <motion.button
              key={track.id}
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectTrack(track.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isActive ? 'shadow-xl' : 'opacity-85 hover:opacity-100'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--ctp-surface0)' : 'var(--ctp-mantle)',
                borderColor: isActive ? 'var(--ctp-mauve)' : 'var(--ctp-border)'
              }}
            >
              {/* Active check mark badge */}
              {isActive && (
                <div 
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md font-bold"
                  style={{ backgroundColor: 'var(--ctp-mauve)', color: 'var(--ctp-crust)' }}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-2xl p-2 rounded-xl border shrink-0" style={{ backgroundColor: 'var(--ctp-crust)', borderColor: 'var(--ctp-surface1)' }}>
                    {track.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
                      {track.title}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border" style={{ backgroundColor: 'var(--ctp-crust)', color: 'var(--ctp-mauve)', borderColor: 'var(--ctp-surface1)' }}>
                      {track.subtitle}
                    </span>
                  </div>
                </div>

                <p className="text-xs mb-3 line-clamp-2 leading-relaxed" style={{ color: 'var(--ctp-subtext0)' }}>
                  {track.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--ctp-border)' }}>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1" style={{ color: 'var(--ctp-overlay0)' }}>
                    <BookOpen className="w-3 h-3" />
                    <span className="truncate max-w-[140px]">{track.bookRef}</span>
                  </span>
                  {stats && (
                    <span className="font-bold font-mono text-[var(--ctp-mauve)]">
                      {completed}/{total} ({pct}%)
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                {stats && total > 0 && (
                  <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: 'var(--ctp-surface1)' }}>
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: 'var(--ctp-mauve)' }}
                    />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
