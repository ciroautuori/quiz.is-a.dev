'use client';

import React from 'react';
import { Gamepad2, BookOpen, Trophy, PlusCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface MobileBottomNavProps {
  activeTab: 'gioca' | 'impara' | 'classifica' | 'personalizza' | 'skill_tree' | 'community';
  setActiveTab: (tab: 'gioca' | 'impara' | 'classifica' | 'personalizza' | 'skill_tree' | 'community') => void;
  onOpenAiTutor: () => void;
}

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  onOpenAiTutor,
}: MobileBottomNavProps) {
  const { t } = useLanguage();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 ctp-card-mantle border-t border-[var(--ctp-surface1)] px-2 py-1.5 flex items-center justify-around shadow-2xl backdrop-blur-md bg-opacity-95">
      <button
        onClick={() => setActiveTab('gioca')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] ${
          activeTab === 'gioca' ? 'text-[var(--ctp-mauve)] font-bold' : 'text-[var(--ctp-subtext0)]'
        }`}
        aria-label={t.playTab}
      >
        <Gamepad2 className={`w-5 h-5 ${activeTab === 'gioca' ? 'scale-110' : ''}`} />
        <span className="text-[10px] mt-0.5 tracking-tight">{t.playTab.split(' ')[0]}</span>
      </button>

      <button
        onClick={() => setActiveTab('impara')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] ${
          activeTab === 'impara' ? 'text-[var(--ctp-mauve)] font-bold' : 'text-[var(--ctp-subtext0)]'
        }`}
        aria-label={t.learnTab}
      >
        <BookOpen className={`w-5 h-5 ${activeTab === 'impara' ? 'scale-110' : ''}`} />
        <span className="text-[10px] mt-0.5 tracking-tight">{t.learnTab.split(' ')[0]}</span>
      </button>

      {/* Center AI Tutor Button */}
      <button
        onClick={onOpenAiTutor}
        aria-label="AI Tutor"
      >
        <Sparkles className="w-5 h-5 text-[var(--ctp-yellow)]" />
        <span className="text-[9px] font-bold tracking-tight">AI Tutor</span>
      </button>

      <button
        onClick={() => setActiveTab('classifica')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] ${
          activeTab === 'classifica' ? 'text-[var(--ctp-mauve)] font-bold' : 'text-[var(--ctp-subtext0)]'
        }`}
        aria-label={t.leaderboardTab}
      >
        <Trophy className={`w-5 h-5 ${activeTab === 'classifica' ? 'scale-110' : ''}`} />
        <span className="text-[10px] mt-0.5 tracking-tight">{t.leaderboardTab}</span>
      </button>

      <button
        onClick={() => setActiveTab('personalizza')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] ${
          activeTab === 'personalizza' ? 'text-[var(--ctp-mauve)] font-bold' : 'text-[var(--ctp-subtext0)]'
        }`}
        aria-label={t.customQuestionsTab}
      >
        <PlusCircle className={`w-5 h-5 ${activeTab === 'personalizza' ? 'scale-110' : ''}`} />
        <span className="text-[10px] mt-0.5 tracking-tight">{t.customQuestionsTab.split(' ')[0]}</span>
      </button>
    </nav>
  );
}
