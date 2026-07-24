'use client';

import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { TRACKS } from '../lib/tracks';
import { TrackId, Sfida } from '../lib/types';
import { StreakInfo } from '../lib/storage';
import DailyGoalBanner from './DailyGoalBanner';
import ProficiencyRadarChart from './ProficiencyRadarChart';
import CommunityHubView from './CommunityHubView';
import { 
  Terminal, 
  Flame, 
  Trophy, 
  Sparkles, 
  ChevronRight, 
  Users, 
  BarChart3, 
  Play, 
  Code2, 
  Zap 
} from 'lucide-react';

interface GeneralHomeViewProps {
  allQuestions: Sfida[];
  completedIds: string[];
  streakInfo: StreakInfo;
  onSelectTrack: (trackId: TrackId) => void;
  onGoToLeaderboard: () => void;
  onOpenAiTutor: () => void;
}

export default function GeneralHomeView({
  allQuestions,
  completedIds,
  streakInfo,
  onSelectTrack,
  onGoToLeaderboard,
  onOpenAiTutor
}: GeneralHomeViewProps) {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="ctp-card rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderColor: 'var(--ctp-border)' }}>
        <div className="space-y-3 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-[var(--ctp-mauve)] border border-[var(--ctp-mauve)]/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>DevQuest Full-Stack Hub 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[var(--ctp-text)]">
            {t.appName || 'DevQuest'} • Developer Platform
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ctp-subtext0)] max-w-2xl leading-relaxed font-sans">
            Padroneggia il Full-Stack moderno: Python, TypeScript, Git/GitHub, Docker e PostgreSQL. 
            Impara con lezioni interattive, sandbox in-browser e sfide competitive!
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <button
            onClick={() => onSelectTrack('python')}
            className="px-6 py-3.5 rounded-2xl bg-[var(--ctp-mauve)] text-[var(--ctp-crust)] font-mono font-bold text-xs flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Inizia Sfida Rapida</span>
          </button>
        </div>
      </div>

      {/* Daily Goal & Streak Banner */}
      <DailyGoalBanner
        onStartQuickGame={(count) => onSelectTrack('python')}
      />

      {/* 5 Technology Track Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono">
          <h2 className="text-lg font-bold text-[var(--ctp-text)] flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[var(--ctp-mauve)]" />
            <span>Tracciati Tecnici Disponibili (5)</span>
          </h2>
          <span className="text-xs text-[var(--ctp-subtext0)]">Seleziona una tecnologia per entrare nell'Hub dedicato</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRACKS.map((track) => {
            const trackQuestions = allQuestions.filter(q => q.trackId === track.id);
            const trackCompleted = trackQuestions.filter(q => completedIds.includes(q.id)).length;
            const trackPercent = trackQuestions.length > 0 ? Math.round((trackCompleted / trackQuestions.length) * 100) : 0;

            return (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track.id)}
                className="ctp-card rounded-2xl p-5 border shadow-lg hover:border-[var(--ctp-mauve)] transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                style={{ borderColor: 'var(--ctp-border)' }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-2 rounded-xl bg-[var(--ctp-surface0)] border border-[var(--ctp-surface1)] shadow-inner">
                      {track.icon}
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--ctp-mauve)] px-2.5 py-1 rounded-full bg-[var(--ctp-mauve)]/10 border border-[var(--ctp-mauve)]/20">
                      {trackPercent}%
                    </span>
                  </div>

                  <div>
                    <h3 className="font-mono font-bold text-base text-[var(--ctp-text)] group-hover:text-[var(--ctp-mauve)] transition-colors">
                      {track.name}
                    </h3>
                    <p className="text-xs text-[var(--ctp-subtext0)] line-clamp-2 mt-1">
                      {track.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--ctp-surface1)] flex items-center justify-between font-mono text-xs text-[var(--ctp-subtext0)]">
                  <span>{trackCompleted} / {trackQuestions.length} Sfide</span>
                  <span className="flex items-center gap-1 font-bold text-[var(--ctp-mauve)] group-hover:translate-x-1 transition-transform">
                    <span>Entra Hub</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Full-Stack Proficiency Radar Chart & Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl ctp-card border shadow-xl space-y-4" style={{ borderColor: 'var(--ctp-border)' }}>
          <div className="flex items-center justify-between font-mono">
            <h3 className="font-bold text-sm text-[var(--ctp-text)] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[var(--ctp-sky)]" />
              <span>Full-Stack Competency Radar</span>
            </h3>
            <span className="text-xs text-[var(--ctp-subtext0)]">Python • TS • Git</span>
          </div>

          <ProficiencyRadarChart 
            completedQuestionIds={completedIds}
          />
        </div>

        {/* Community Hub Feed Overview */}
        <div className="p-6 rounded-2xl ctp-card border shadow-xl space-y-4" style={{ borderColor: 'var(--ctp-border)' }}>
          <div className="flex items-center justify-between font-mono">
            <h3 className="font-bold text-sm text-[var(--ctp-text)] flex items-center gap-2">
              <Users className="w-4 h-4 text-[var(--ctp-mauve)]" />
              <span>Community Feed & Discussioni</span>
            </h3>
            <button 
              onClick={onGoToLeaderboard}
              className="text-xs text-[var(--ctp-mauve)] font-bold hover:underline"
            >
              Classifica Globale →
            </button>
          </div>

          <CommunityHubView onPlayChallenge={(sfida) => onSelectTrack(sfida.trackId || 'python')} />
        </div>
      </div>
    </div>
  );
}
