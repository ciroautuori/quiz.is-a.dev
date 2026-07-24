'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Flame, Award, Sparkles, User as UserIcon, LogOut, Settings } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { StreakInfo } from '../lib/storage';
import { TrackId } from '../lib/types';
import { getTrackById } from '../lib/tracks';
import { auth, loginWithGoogle, logoutUser } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface NavbarProps {
  activeView: 'home' | TrackId | 'classifica';
  onSelectView: (view: 'home' | TrackId | 'classifica') => void;
  activeTrackId: TrackId;
  streakInfo: StreakInfo;
  unlockedBadgesCount: number;
  onOpenAchievements: () => void;
  onOpenAiTutor: () => void;
  onOpenSettings: () => void;
}

export default function Navbar({ 
  activeView, 
  onSelectView, 
  activeTrackId,
  streakInfo,
  unlockedBadgesCount,
  onOpenAchievements,
  onOpenAiTutor,
  onOpenSettings
}: NavbarProps) {
  const { language, t } = useLanguage();
  const activeTrack = getTrackById(activeTrackId);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const isTechHub = activeView !== 'home' && activeView !== 'classifica';

  return (
    <header className="sticky top-0 z-40 ctp-card-mantle backdrop-blur-md border-b border-[var(--ctp-surface1)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 font-mono">
        {/* Active View / Track Header Title */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onSelectView('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl p-0.5 shadow-md bg-[var(--ctp-mauve)] flex items-center justify-center text-white font-black text-sm">
              <Terminal className="w-4 h-4 text-[var(--ctp-crust)]" />
            </div>
            <span className="text-base font-black tracking-tight text-[var(--ctp-text)] hidden xs:inline">
              {t.appName || 'DevQuest'}
            </span>
          </div>

          {isTechHub && (
            <div className="flex items-center gap-2 border-l border-[var(--ctp-surface1)] pl-3 text-xs">
              <span className="text-lg">{activeTrack.icon}</span>
              <span className="font-bold text-[var(--ctp-mauve)]">{activeTrack.name} Hub</span>
            </div>
          )}
        </div>

        {/* Header Right Widgets */}
        <div className="flex items-center gap-2 text-xs">
          {/* Daily Streak Widget */}
          <div 
            className="flex items-center gap-1.5 ctp-card-surface px-2.5 py-1.5 rounded-xl border border-[var(--ctp-surface1)] text-xs shrink-0 shadow-sm"
            title={`Serie di giorni consecutivi (${streakInfo?.count || 0})`}
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-bold text-amber-400">
              {streakInfo?.count || 0}
            </span>
          </div>

          {/* Badges Button */}
          <button
            onClick={onOpenAchievements}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all ctp-card-surface border border-[var(--ctp-surface1)] hover:opacity-90 shrink-0 cursor-pointer shadow-sm"
            title="Badge e Traguardi"
          >
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--ctp-surface1)] text-yellow-400">
              {unlockedBadgesCount}
            </span>
          </button>

          {/* AI Tutor Button */}
          <button
            onClick={onOpenAiTutor}
            type="button"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer bg-[var(--ctp-mauve)] text-[var(--ctp-crust)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Tutor</span>
          </button>

          {/* User Auth Chip */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 bg-[var(--ctp-surface0)] pl-1.5 pr-2 py-1.5 rounded-xl border border-[var(--ctp-surface1)] shrink-0">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="User avatar" className="w-5 h-5 rounded-full border border-[var(--ctp-mauve)]" />
              ) : (
                <UserIcon className="w-3.5 h-3.5 text-[var(--ctp-mauve)]" />
              )}
              <span className="hidden md:inline font-bold text-[11px] max-w-[80px] truncate text-[var(--ctp-text)]">
                {currentUser.displayName || t.signedIn}
              </span>
              <button
                onClick={logoutUser}
                title={t.signOut}
                className="p-1 text-[var(--ctp-subtext0)] hover:text-[var(--ctp-red)] cursor-pointer transition-colors"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              type="button"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all border shrink-0 cursor-pointer shadow-sm hover:scale-105 active:scale-95 bg-[var(--ctp-surface0)] text-[var(--ctp-mauve)] border-[var(--ctp-mauve)]"
              title={t.signInWithGoogleHint}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{t.signIn}</span>
            </button>
          )}

          {/* Unified Settings Drawer Trigger Button */}
          <button
            onClick={onOpenSettings}
            type="button"
            className="flex items-center justify-center p-2 rounded-xl text-xs transition-all ctp-card-surface hover:opacity-90 cursor-pointer border border-[var(--ctp-surface1)] shadow-sm text-[var(--ctp-mauve)] bg-[var(--ctp-surface0)]"
            title="Impostazioni"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
