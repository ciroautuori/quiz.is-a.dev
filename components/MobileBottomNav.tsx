'use client';

import React, { useState } from 'react';
import { Home as HomeIcon, Code2, Trophy, Settings, Sparkles, X, ChevronUp } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { TRACKS } from '../lib/tracks';
import { TrackId } from '../lib/types';

interface MobileBottomNavProps {
  activeView: 'home' | TrackId | 'classifica';
  onSelectView: (view: 'home' | TrackId | 'classifica') => void;
  onOpenAiTutor: () => void;
  onOpenSettings: () => void;
}

export default function MobileBottomNav({
  activeView,
  onSelectView,
  onOpenAiTutor,
  onOpenSettings
}: MobileBottomNavProps) {
  const { t, language } = useLanguage();
  const [isTechDrawerOpen, setIsTechDrawerOpen] = useState(false);

  const isTechActive = activeView !== 'home' && activeView !== 'classifica';

  return (
    <>
      {/* Mobile Tech Hub Switcher Drawer */}
      {isTechDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end animate-fade-in">
          <div className="ctp-card rounded-t-3xl p-5 border-t border-[var(--ctp-surface1)] space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--ctp-surface1)] pb-3">
              <h3 className="font-mono font-bold text-sm text-[var(--ctp-text)] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[var(--ctp-mauve)]" />
                <span>{language === 'en' ? 'Select Tech Hub (5)' : language === 'es' ? 'Seleccionar Hub Técnico (5)' : 'Seleziona Tech Hub (5)'}</span>
              </h3>
              <button
                onClick={() => setIsTechDrawerOpen(false)}
                className="p-1 text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 font-mono text-xs">
              {TRACKS.map((track) => {
                const isActive = activeView === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => {
                      onSelectView(track.id);
                      setIsTechDrawerOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[var(--ctp-surface0)] border-[var(--ctp-mauve)] text-[var(--ctp-mauve)] font-bold'
                        : 'ctp-card-mantle border-[var(--ctp-border)] text-[var(--ctp-text)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{track.icon}</span>
                      <div>
                        <div className="font-bold">{track.name}</div>
                        <div className="text-[10px] text-[var(--ctp-subtext0)]">{track.subtitle}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[var(--ctp-surface1)] text-[var(--ctp-subtext0)]">
                      {language === 'en' ? 'Enter →' : language === 'es' ? 'Entrar →' : 'Entra →'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 ctp-card-mantle border-t border-[var(--ctp-surface1)] px-2 py-1.5 flex items-center justify-around shadow-2xl backdrop-blur-md bg-opacity-95 font-mono text-[10px]">
        {/* Home */}
        <button
          onClick={() => onSelectView('home')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[44px] ${
            activeView === 'home' ? 'text-[var(--ctp-mauve)] font-bold' : 'text-[var(--ctp-subtext0)]'
          }`}
          aria-label="Home"
        >
          <HomeIcon className={`w-5 h-5 ${activeView === 'home' ? 'scale-110' : ''}`} />
          <span className="mt-0.5">Home</span>
        </button>

        {/* Tech Hub Switcher Button */}
        <button
          onClick={() => setIsTechDrawerOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[44px] ${
            isTechActive ? 'text-[var(--ctp-mauve)] font-bold' : 'text-[var(--ctp-subtext0)]'
          }`}
          aria-label="Tech Hubs"
        >
          <div className="relative">
            <Code2 className={`w-5 h-5 ${isTechActive ? 'scale-110' : ''}`} />
            <ChevronUp className="w-3 h-3 absolute -top-1 -right-2 text-[var(--ctp-mauve)]" />
          </div>
          <span className="mt-0.5">Hubs (5)</span>
        </button>

        {/* AI Tutor */}
        <button
          onClick={onOpenAiTutor}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 cursor-pointer min-h-[44px] min-w-[44px]"
          aria-label="AI Tutor"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="font-bold text-[9px]">AI Tutor</span>
        </button>

        {/* Leaderboard */}
        <button
          onClick={() => onSelectView('classifica')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[44px] ${
            activeView === 'classifica' ? 'text-[var(--ctp-mauve)] font-bold' : 'text-[var(--ctp-subtext0)]'
          }`}
          aria-label="Leaderboard"
        >
          <Trophy className={`w-5 h-5 ${activeView === 'classifica' ? 'scale-110' : ''}`} />
          <span className="mt-0.5">Leaderboard</span>
        </button>

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] cursor-pointer min-h-[44px] min-w-[44px]"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
          <span className="mt-0.5">Settings</span>
        </button>
      </nav>
    </>
  );
}
