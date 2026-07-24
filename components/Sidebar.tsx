'use client';

import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { TRACKS } from '../lib/tracks';
import { TrackId } from '../lib/types';
import { 
  Home as HomeIcon, 
  Code2, 
  Trophy, 
  Bot, 
  Settings, 
  Sparkles, 
  Github, 
  ChevronRight,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeView: 'home' | TrackId | 'classifica';
  onSelectView: (view: 'home' | TrackId | 'classifica') => void;
  onOpenAiTutor: () => void;
  onOpenSettings: () => void;
  onOpenGithubSync: () => void;
  streakCount: number;
}

export default function Sidebar({
  activeView,
  onSelectView,
  onOpenAiTutor,
  onOpenSettings,
  onOpenGithubSync,
  streakCount
}: SidebarProps) {
  const { t } = useLanguage();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r ctp-card-mantle border-[var(--ctp-surface1)] min-h-screen p-4 sticky top-0 h-screen overflow-y-auto shrink-0 font-mono text-xs select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-3 mb-4 border-b border-[var(--ctp-surface1)]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 font-black text-lg">
          DQ
        </div>
        <div>
          <h1 className="font-bold text-sm text-[var(--ctp-text)] tracking-wider">DevQuest</h1>
          <p className="text-[10px] text-[var(--ctp-subtext0)] font-sans">Full-Stack Developer Hub</p>
        </div>
      </div>

      {/* Main Navigation Section */}
      <div className="space-y-6 flex-1">
        {/* General Home Link */}
        <div>
          <div className="px-2 mb-2 text-[10px] uppercase font-bold tracking-widest text-[var(--ctp-subtext0)]">
            {t.appName || 'DevQuest Platform'}
          </div>
          <button
            onClick={() => onSelectView('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              activeView === 'home'
                ? 'bg-[var(--ctp-mauve)] text-white border-[var(--ctp-mauve)] shadow-md'
                : 'hover:bg-[var(--ctp-surface0)] text-[var(--ctp-text)] border-transparent'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>Community Home</span>
          </button>
        </div>

        {/* Dedicated Tech Hubs List */}
        <div>
          <div className="px-2 mb-2 text-[10px] uppercase font-bold tracking-widest text-[var(--ctp-subtext0)] flex items-center justify-between">
            <span>Tech Hubs (5)</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-[var(--ctp-mauve)]/20 text-[var(--ctp-mauve)] font-bold">PRO</span>
          </div>
          <div className="space-y-1">
            {TRACKS.map((track) => {
              const isActive = activeView === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => onSelectView(track.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--ctp-surface0)] border-[var(--ctp-mauve)] text-[var(--ctp-mauve)] font-bold shadow'
                      : 'hover:bg-[var(--ctp-surface0)]/50 border-transparent text-[var(--ctp-text)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{track.icon}</span>
                    <span>{track.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools & Leaderboard */}
        <div>
          <div className="px-2 mb-2 text-[10px] uppercase font-bold tracking-widest text-[var(--ctp-subtext0)]">
            Strumenti & Community
          </div>
          <div className="space-y-1">
            <button
              onClick={() => onSelectView('classifica')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer ${
                activeView === 'classifica'
                  ? 'bg-[var(--ctp-surface0)] border-[var(--ctp-mauve)] text-[var(--ctp-mauve)] font-bold'
                  : 'hover:bg-[var(--ctp-surface0)]/50 border-transparent text-[var(--ctp-text)]'
              }`}
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>{t.leaderboardTab || 'Classifica'}</span>
            </button>

            <button
              onClick={onOpenAiTutor}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 font-bold hover:bg-purple-500/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Bot className="w-4 h-4 text-purple-400" />
                <span>AI Tutor Agent</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </button>

            <button
              onClick={onOpenGithubSync}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl border border-transparent hover:bg-[var(--ctp-surface0)]/50 text-[var(--ctp-text)] transition-all cursor-pointer"
            >
              <Github className="w-4 h-4 text-[var(--ctp-mauve)]" />
              <span>GitHub Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Profile & Preferences */}
      <div className="pt-3 border-t border-[var(--ctp-surface1)] space-y-2">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-[var(--ctp-surface1)] bg-[var(--ctp-surface0)]/60 hover:bg-[var(--ctp-surface0)] text-[var(--ctp-text)] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-[var(--ctp-subtext0)]" />
            <span>Impostazioni</span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
            🔥 {streakCount}d
          </span>
        </button>
      </div>
    </aside>
  );
}
