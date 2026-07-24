'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import GeneralHomeView from '../components/GeneralHomeView';
import TechHubView from '../components/TechHubView';
import GameMode from '../components/GameMode';
import LeaderboardView from '../components/LeaderboardView';
import CustomQuestionsView from '../components/CustomQuestionsView';
import AchievementsModal from '../components/AchievementsModal';
import AiTutorWidget from '../components/AiTutorWidget';
import MobileBottomNav from '../components/MobileBottomNav';
import PwaInstallPrompt from '../components/PwaInstallPrompt';
import GitHubSyncModal from '../components/GitHubSyncModal';
import CodeSandboxModal from '../components/CodeSandboxModal';
import LeaguesAndStreakModal from '../components/LeaguesAndStreakModal';
import PvPDuelModal from '../components/PvPDuelModal';
import AiQuestGeneratorModal from '../components/AiQuestGeneratorModal';
import CertificateModal from '../components/CertificateModal';
import AnalyticsDashboardModal from '../components/AnalyticsDashboardModal';
import CommandPaletteModal, { CommandPaletteAction } from '../components/CommandPaletteModal';
import SettingsDrawerModal from '../components/SettingsDrawerModal';

import { getAllQuestions } from '../lib/questions';
import { 
  getCustomQuestions, 
  getCompletedQuestionIds, 
  markQuestionCompleted, 
  getDailyStreak, 
  getActiveTrack,
  setActiveTrack as saveActiveTrack,
  StreakInfo 
} from '../lib/storage';
import { evaluateAchievements, Achievement } from '../lib/achievements';
import { Sfida, Concetto, TrackId } from '../lib/types';
import { ThemeProvider } from '../lib/ThemeContext';
import { LanguageProvider, useLanguage } from '../lib/LanguageContext';
import { Terminal, Sparkles, X, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { testFirestoreConnection } from '../lib/firebase';

function ZenExitButton({ onExit }: { onExit: () => void }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onExit}
      className="px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md cursor-pointer transition-transform hover:scale-105"
      style={{
        backgroundColor: 'var(--ctp-surface0)',
        color: 'var(--ctp-text)',
        borderColor: 'var(--ctp-mauve)'
      }}
    >
      <Minimize2 className="w-4 h-4 text-[var(--ctp-mauve)]" />
      <span>{t.exitZenModeKey}</span>
    </button>
  );
}

function AppFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t py-6 px-4 mb-16 md:mb-0 text-center text-xs ctp-card-mantle border-[var(--ctp-surface1)]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--ctp-mauve)]" />
          <span className="font-bold text-[var(--ctp-text)]">{t.footerTitle}</span>
        </div>
        <p className="text-[var(--ctp-subtext0)]">
          {t.footerSubtitle}
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<'home' | TrackId | 'classifica'>('home');
  const [activeTrackId, setActiveTrackId] = useState<TrackId>('python');
  const [allQuestions, setAllQuestions] = useState<Sfida[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [streakInfo, setStreakInfo] = useState<StreakInfo>({ count: 0, lastDate: '', completedToday: false });
  
  // Active match session
  const [activeMatchQuestions, setActiveMatchQuestions] = useState<Sfida[] | null>(null);

  // Modals state
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isGithubSyncOpen, setIsGithubSyncOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isLeaguesOpen, setIsLeaguesOpen] = useState(false);
  const [isPvPOpen, setIsPvPOpen] = useState(false);
  const [isQuestGenOpen, setIsQuestGenOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const [unlockedCount, setUnlockedCount] = useState(0);
  const [latestUnlockedBadge, setLatestUnlockedBadge] = useState<Achievement | null>(null);
  const [isZenMode, setIsZenMode] = useState(false);

  // AI Tutor drawer states
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [tutorQuestionContext, setTutorQuestionContext] = useState<Sfida | null>(null);
  const [tutorConceptContext, setTutorConceptContext] = useState<Concetto | null>(null);

  const openAiTutor = (question?: Sfida | null, concept?: Concetto | null) => {
    setTutorQuestionContext(question || null);
    setTutorConceptContext(concept || null);
    setIsAiTutorOpen(true);
  };

  // Cmd+K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Firebase test
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  const handleSelectView = (view: 'home' | TrackId | 'classifica') => {
    setActiveView(view);
    setActiveMatchQuestions(null);
    if (view !== 'home' && view !== 'classifica') {
      setActiveTrackId(view);
      saveActiveTrack(view);
    }
  };

  const checkAchievements = useCallback(() => {
    const { achievements, newlyUnlocked } = evaluateAchievements();
    const count = achievements.filter((a) => a.unlocked).length;
    setUnlockedCount(count);

    if (newlyUnlocked.length > 0) {
      setLatestUnlockedBadge(newlyUnlocked[0]);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, []);

  const reloadQuestions = useCallback(() => {
    const base = getAllQuestions();
    const custom = getCustomQuestions();
    setAllQuestions([...base, ...custom]);
    checkAchievements();
  }, [checkAchievements]);

  useEffect(() => {
    reloadQuestions();
    setCompletedIds(getCompletedQuestionIds());
    setStreakInfo(getDailyStreak());
    setActiveTrackId(getActiveTrack());
  }, [reloadQuestions]);

  const handleQuestionCompleted = (id: string) => {
    const { completedIds: updatedIds, streak: updatedStreak } = markQuestionCompleted(id);
    setCompletedIds(updatedIds);
    setStreakInfo(updatedStreak);
    checkAchievements();
  };

  const handleStartMatch = (selectedQuestions: Sfida[]) => {
    setActiveMatchQuestions(selectedQuestions);
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen flex ctp-bg-app">
          {/* Desktop Navigation Sidebar */}
          {!isZenMode && (
            <Sidebar
              activeView={activeView}
              onSelectView={handleSelectView}
              onOpenAiTutor={() => openAiTutor()}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenGithubSync={() => setIsGithubSyncOpen(true)}
              streakCount={streakInfo.count}
            />
          )}

          {/* Main App Container */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              {/* Top Header Navbar */}
              {!isZenMode && (
                <Navbar
                  activeView={activeView}
                  onSelectView={handleSelectView}
                  activeTrackId={activeTrackId}
                  streakInfo={streakInfo}
                  unlockedBadgesCount={unlockedCount}
                  onOpenAchievements={() => setIsAchievementsOpen(true)}
                  onOpenAiTutor={() => openAiTutor()}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                />
              )}

              {/* Floating Exit Button in Zen Mode */}
              <AnimatePresence>
                {isZenMode && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-4 right-4 z-50 flex items-center gap-2"
                  >
                    <ZenExitButton onExit={() => setIsZenMode(false)} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Content Area */}
              <main className={isZenMode ? "py-6 max-w-4xl mx-auto px-3 sm:px-6" : "pb-24 md:pb-12 max-w-7xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6"}>
                {/* Active Match Game Session View */}
                {activeMatchQuestions ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setActiveMatchQuestions(null)}
                      className="px-3 py-1.5 rounded-xl border text-xs font-mono font-bold text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] cursor-pointer"
                      style={{ borderColor: 'var(--ctp-surface1)' }}
                    >
                      ← Torna all'Hub {activeTrackId.toUpperCase()}
                    </button>
                    <GameMode
                      key={activeTrackId}
                      allQuestions={activeMatchQuestions}
                      onGoToLeaderboard={() => handleSelectView('classifica')}
                      onQuestionCompleted={handleQuestionCompleted}
                      onOpenAiTutorWithQuestion={(question) => openAiTutor(question, null)}
                      isZenMode={isZenMode}
                      onToggleZenMode={() => setIsZenMode(!isZenMode)}
                    />
                  </div>
                ) : (
                  <>
                    {/* View Routing */}
                    {activeView === 'home' && (
                      <GeneralHomeView
                        allQuestions={allQuestions}
                        completedIds={completedIds}
                        streakInfo={streakInfo}
                        onSelectTrack={(trackId) => handleSelectView(trackId)}
                        onGoToLeaderboard={() => handleSelectView('classifica')}
                        onOpenAiTutor={() => openAiTutor()}
                      />
                    )}

                    {activeView !== 'home' && activeView !== 'classifica' && (
                      <TechHubView
                        trackId={activeView as TrackId}
                        allQuestions={allQuestions}
                        completedIds={completedIds}
                        onStartMatch={handleStartMatch}
                        onOpenAiTutor={() => openAiTutor()}
                      />
                    )}

                    {activeView === 'classifica' && (
                      <LeaderboardView />
                    )}
                  </>
                )}
              </main>
            </div>

            <AppFooter />
          </div>

          {/* Mobile Bottom Navigation Bar */}
          {!isZenMode && (
            <MobileBottomNav
              activeView={activeView}
              onSelectView={handleSelectView}
              onOpenAiTutor={() => openAiTutor()}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}

          {/* Modals & Drawers */}
          <AchievementsModal 
            isOpen={isAchievementsOpen} 
            onClose={() => setIsAchievementsOpen(false)} 
          />

          <CodeSandboxModal
            isOpen={isSandboxOpen}
            onClose={() => setIsSandboxOpen(false)}
          />

          <LeaguesAndStreakModal
            isOpen={isLeaguesOpen}
            onClose={() => setIsLeaguesOpen(false)}
          />

          <PvPDuelModal
            isOpen={isPvPOpen}
            onClose={() => setIsPvPOpen(false)}
          />

          <AiQuestGeneratorModal
            isOpen={isQuestGenOpen}
            onClose={() => setIsQuestGenOpen(false)}
            onQuestGenerated={(newQuest) => {
              setAllQuestions(prev => [newQuest, ...prev]);
              if (newQuest.trackId) handleSelectView(newQuest.trackId);
            }}
          />

          <CertificateModal
            isOpen={isCertOpen}
            onClose={() => setIsCertOpen(false)}
          />

          <AnalyticsDashboardModal
            isOpen={isAnalyticsOpen}
            onClose={() => setIsAnalyticsOpen(false)}
          />

          <GitHubSyncModal
            isOpen={isGithubSyncOpen}
            onClose={() => setIsGithubSyncOpen(false)}
          />

          <SettingsDrawerModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            streakInfo={streakInfo}
            unlockedBadgesCount={unlockedCount}
            onOpenAchievements={() => {
              setIsSettingsOpen(false);
              setIsAchievementsOpen(true);
            }}
            onOpenGithubSync={() => {
              setIsSettingsOpen(false);
              setIsGithubSyncOpen(true);
            }}
          />

          <AiTutorWidget
            isOpen={isAiTutorOpen}
            onClose={() => setIsAiTutorOpen(false)}
            activeQuestion={tutorQuestionContext}
            activeConcept={tutorConceptContext}
          />

          <CommandPaletteModal
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            actions={[
              {
                id: 'track-python',
                title: 'Python Hub',
                description: 'Vai all\'Hub Python',
                category: 'navigation',
                icon: <Terminal className="w-4 h-4 text-purple-400" />,
                perform: () => handleSelectView('python')
              },
              {
                id: 'track-typescript',
                title: 'TypeScript Hub',
                description: 'Vai all\'Hub TypeScript',
                category: 'navigation',
                icon: <Terminal className="w-4 h-4 text-blue-400" />,
                perform: () => handleSelectView('typescript')
              },
              {
                id: 'track-git',
                title: 'Git & GitHub Hub',
                description: 'Vai all\'Hub Git',
                category: 'navigation',
                icon: <Terminal className="w-4 h-4 text-orange-400" />,
                perform: () => handleSelectView('git')
              },
              {
                id: 'track-docker',
                title: 'Docker Hub',
                description: 'Vai all\'Hub Docker',
                category: 'navigation',
                icon: <Terminal className="w-4 h-4 text-sky-400" />,
                perform: () => handleSelectView('docker')
              },
              {
                id: 'track-postgres',
                title: 'PostgreSQL Hub',
                description: 'Vai all\'Hub PostgreSQL',
                category: 'navigation',
                icon: <Terminal className="w-4 h-4 text-teal-400" />,
                perform: () => handleSelectView('postgres')
              },
              {
                id: 'action-ai-tutor',
                title: 'AI Tutor',
                description: 'Apri l\'Assistente IA',
                category: 'tools',
                icon: <Sparkles className="w-4 h-4 text-amber-300" />,
                perform: () => openAiTutor()
              }
            ]}
          />

          <PwaInstallPrompt />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}
