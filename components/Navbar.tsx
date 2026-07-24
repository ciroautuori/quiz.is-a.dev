import React, { useState, useEffect } from 'react';
import { Gamepad2, BookOpen, Trophy, PlusCircle, Terminal, Flame, Award, Sparkles, User as UserIcon, LogOut, Settings, GitBranch } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { StreakInfo } from '../lib/storage';
import { TrackId } from '../lib/types';
import { getTrackById } from '../lib/tracks';
import { auth, loginWithGoogle, logoutUser } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface NavbarProps {
  activeTab: 'gioca' | 'impara' | 'classifica' | 'personalizza' | 'skill_tree' | 'community';
  setActiveTab: (tab: 'gioca' | 'impara' | 'classifica' | 'personalizza' | 'skill_tree' | 'community') => void;
  activeTrackId: TrackId;
  onSelectTrack: (trackId: TrackId) => void;
  totalQuestionsCount: number;
  completedQuestionsCount: number;
  streakInfo: StreakInfo;
  unlockedBadgesCount: number;
  onOpenAchievements: () => void;
  onOpenAiTutor: () => void;
  onOpenGithubSync: () => void;
  onOpenSettings: () => void;
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  activeTrackId,
  onSelectTrack,
  totalQuestionsCount,
  completedQuestionsCount,
  streakInfo,
  unlockedBadgesCount,
  onOpenAchievements,
  onOpenAiTutor,
  onOpenGithubSync,
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

  return (
    <header className="sticky top-0 z-50 ctp-card-mantle backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div 
            onClick={() => setActiveTab('gioca')} role="button" tabIndex={0} aria-label="Home" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { (e.target as HTMLElement).click(); } }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl p-0.5 shadow-md group-hover:scale-105 transition-transform" style={{ backgroundColor: 'var(--ctp-mauve)' }}>
              <div className="w-full h-full ctp-card-mantle rounded-[10px] flex items-center justify-center text-lg sm:text-xl shadow-inner">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-6 transition-transform text-[var(--ctp-mauve)]" />
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-black tracking-tight font-mono" style={{ color: 'var(--ctp-mauve)' }}>
                {t.appName}
              </h1>
            </div>
          </div>
        </div>

        {/* Header Right Widgets */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Daily Streak Widget */}
          <div 
            className="flex items-center gap-1.5 ctp-card-surface px-2.5 py-1 rounded-xl border text-xs font-mono shrink-0 shadow-sm"
            title={`Serie di giorni consecutivi (${streakInfo?.count || 0})`}
          >
            <Flame className="w-4 h-4" style={{ color: streakInfo?.count > 0 ? 'var(--ctp-peach)' : 'var(--ctp-overlay0)', fill: streakInfo?.count > 0 ? 'var(--ctp-peach)' : 'none' }} />
            <span className="font-bold text-xs" style={{ color: streakInfo?.count > 0 ? 'var(--ctp-peach)' : 'var(--ctp-overlay0)' }}>
              {streakInfo?.count || 0}
            </span>
          </div>

          {/* Badges Button */}
          <button
            onClick={onOpenAchievements}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono transition-all ctp-card-surface border hover:opacity-90 shrink-0 cursor-pointer shadow-sm"
            title="Badge e Traguardi"
          >
            <Award className="w-4 h-4 shrink-0" style={{ color: 'var(--ctp-yellow)' }} />
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-yellow)', borderColor: 'var(--ctp-surface2)' }}>
              {unlockedBadgesCount}
            </span>
          </button>

          {/* AI Tutor Button */}
          <button
            onClick={onOpenAiTutor}
            type="button"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            style={{ backgroundColor: 'var(--ctp-mauve)', color: 'var(--ctp-crust)' }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--ctp-yellow)' }} />
            <span>AI Tutor</span>
          </button>

          {/* Firebase Auth Button / User Chip */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 bg-[var(--ctp-surface0)] pl-1.5 pr-2 py-1 rounded-xl border border-[var(--ctp-surface1)] text-xs font-mono shrink-0">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="User avatar" className="w-5 h-5 rounded-full border border-[var(--ctp-mauve)]" />
              ) : (
                <UserIcon className="w-3.5 h-3.5 text-[var(--ctp-mauve)]" />
              )}
              <span className="hidden md:inline font-bold text-[11px] max-w-[80px] truncate" style={{ color: 'var(--ctp-text)' }}>
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
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold transition-all border shrink-0 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              style={{
                backgroundColor: 'var(--ctp-surface0)',
                color: 'var(--ctp-mauve)',
                borderColor: 'var(--ctp-mauve)'
              }}
              title={t.signInWithGoogleHint}
            >
              <UserIcon className="w-3.5 h-3.5 text-[var(--ctp-mauve)]" />
              <span className="hidden xs:inline">{t.signIn}</span>
            </button>
          )}

          {/* Unified Settings Drawer Trigger Button */}
          <button
            onClick={onOpenSettings}
            type="button"
            className="flex items-center justify-center p-2 rounded-xl text-xs transition-all ctp-card-surface hover:opacity-90 cursor-pointer border shadow-sm shrink-0"
            title="Impostazioni & Strumenti"
            style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-mauve)', borderColor: 'var(--ctp-surface1)' }}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Desktop Nav Tabs ONLY (Hidden on Mobile) */}
          <nav className="hidden sm:flex items-center gap-1 ctp-card-surface p-1 rounded-xl border shrink-0 ml-1">
            <button
              onClick={() => setActiveTab('gioca')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'gioca' ? 'font-semibold shadow-md' : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: activeTab === 'gioca' ? 'var(--ctp-mauve)' : 'transparent',
                color: activeTab === 'gioca' ? 'var(--ctp-crust)' : 'var(--ctp-subtext0)'
              }}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>{t.playTab}</span>
            </button>

            <button
              onClick={() => setActiveTab('impara')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'impara' ? 'font-semibold shadow-md' : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: activeTab === 'impara' ? 'var(--ctp-mauve)' : 'transparent',
                color: activeTab === 'impara' ? 'var(--ctp-crust)' : 'var(--ctp-subtext0)'
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.learnTab}</span>
            </button>

            <button
              onClick={() => setActiveTab('skill_tree')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'skill_tree' ? 'font-semibold shadow-md' : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: activeTab === 'skill_tree' ? 'var(--ctp-mauve)' : 'transparent',
                color: activeTab === 'skill_tree' ? 'var(--ctp-crust)' : 'var(--ctp-subtext0)'
              }}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Competenze</span>
            </button>

            <button
              onClick={() => setActiveTab('classifica')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'classifica' ? 'font-semibold shadow-md' : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: activeTab === 'classifica' ? 'var(--ctp-mauve)' : 'transparent',
                color: activeTab === 'classifica' ? 'var(--ctp-crust)' : 'var(--ctp-subtext0)'
              }}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{t.leaderboardTab}</span>
            </button>

            <button
              onClick={() => setActiveTab('personalizza')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'personalizza' ? 'font-semibold shadow-md' : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: activeTab === 'personalizza' ? 'var(--ctp-mauve)' : 'transparent',
                color: activeTab === 'personalizza' ? 'var(--ctp-crust)' : 'var(--ctp-subtext0)'
              }}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.customQuestionsTab}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

