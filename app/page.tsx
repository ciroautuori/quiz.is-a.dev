'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../components/Navbar';
import GameMode from '../components/GameMode';
import LearnMode from '../components/LearnMode';
import LeaderboardView from '../components/LeaderboardView';
import CustomQuestionsView from '../components/CustomQuestionsView';
import AchievementsModal from '../components/AchievementsModal';
import TrackSelector from '../components/TrackSelector';
import AiTutorWidget from '../components/AiTutorWidget';
import MobileBottomNav from '../components/MobileBottomNav';
import PwaInstallPrompt from '../components/PwaInstallPrompt';
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
import { Terminal, Sparkles, X, Minimize2, Maximize2, Zap, Flame, Swords, GitBranch, Brain, Users, BarChart3, GraduationCap } from 'lucide-react';

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
    <footer className="border-t py-6 px-4 mb-16 sm:mb-0 text-center text-xs ctp-card-mantle">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4" style={{ color: 'var(--ctp-mauve)' }} />
          <span className="font-mono font-bold" style={{ color: 'var(--ctp-text)' }}>{t.footerTitle}</span>
        </div>
        <p style={{ color: 'var(--ctp-subtext0)' }}>
          {t.footerSubtitle}
        </p>
      </div>
    </footer>
  );
}
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { testFirestoreConnection } from '../lib/firebase';
import GitHubSyncModal from '../components/GitHubSyncModal';
import CodeSandboxModal from '../components/CodeSandboxModal';
import LeaguesAndStreakModal from '../components/LeaguesAndStreakModal';
import PvPDuelModal from '../components/PvPDuelModal';
import SkillTreeView from '../components/SkillTreeView';
import AiQuestGeneratorModal from '../components/AiQuestGeneratorModal';
import CertificateModal from '../components/CertificateModal';
import CommunityHubView from '../components/CommunityHubView';
import AnalyticsDashboardModal from '../components/AnalyticsDashboardModal';
import CommandPaletteModal, { CommandPaletteAction } from '../components/CommandPaletteModal';
import { soundEngine } from '../lib/soundEngine';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'gioca' | 'impara' | 'classifica' | 'personalizza' | 'skill_tree' | 'community'>('gioca');
  const [activeTrackId, setActiveTrackId] = useState<TrackId>('python');
  const [allQuestions, setAllQuestions] = useState<Sfida[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [streakInfo, setStreakInfo] = useState<StreakInfo>({ count: 0, lastDate: '', completedToday: false });
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isGithubSyncOpen, setIsGithubSyncOpen] = useState(false);
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [latestUnlockedBadge, setLatestUnlockedBadge] = useState<Achievement | null>(null);
  const [isZenMode, setIsZenMode] = useState(false);

  // Modals for SOTA 10 Features
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isLeaguesOpen, setIsLeaguesOpen] = useState(false);
  const [isPvPOpen, setIsPvPOpen] = useState(false);
  const [isQuestGenOpen, setIsQuestGenOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
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

  // Test Firebase connection on initial boot
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Escape key handler to exit Zen Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZenMode) {
        setIsZenMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZenMode]);

  // AI Tutor drawer states
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [tutorQuestionContext, setTutorQuestionContext] = useState<Sfida | null>(null);
  const [tutorConceptContext, setTutorConceptContext] = useState<Concetto | null>(null);

  const openAiTutor = (question?: Sfida | null, concept?: Concetto | null) => {
    setTutorQuestionContext(question || null);
    setTutorConceptContext(concept || null);
    setIsAiTutorOpen(true);
  };

  useEffect(() => {
    setActiveTrackId(getActiveTrack());
  }, []);

  const handleSelectTrack = (trackId: TrackId) => {
    setActiveTrackId(trackId);
    saveActiveTrack(trackId);
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
    checkAchievements();
  }, [reloadQuestions, checkAchievements]);

  const handleQuestionCompleted = (id: string) => {
    const { completedIds: updatedIds, streak: updatedStreak } = markQuestionCompleted(id);
    setCompletedIds(updatedIds);
    setStreakInfo(updatedStreak);
    checkAchievements();
  };

  // Filter questions for the currently selected track
  const currentTrackQuestions = useMemo(() => {
    return allQuestions.filter(q => (q.trackId || 'python') === activeTrackId);
  }, [allQuestions, activeTrackId]);

  // Compute stats per track for TrackSelector
  const trackCounts = useMemo(() => {
    const counts: Record<TrackId, { total: number; completed: number }> = {
      python: { total: 0, completed: 0 },
      typescript: { total: 0, completed: 0 },
      git: { total: 0, completed: 0 }
    };

    allQuestions.forEach((q) => {
      const t = q.trackId || 'python';
      if (counts[t]) {
        counts[t].total += 1;
        if (completedIds.includes(q.id)) {
          counts[t].completed += 1;
        }
      }
    });

    return counts;
  }, [allQuestions, completedIds]);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col justify-between ctp-bg-app">
          <div>
            {!isZenMode && (
              <Navbar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                activeTrackId={activeTrackId}
                onSelectTrack={handleSelectTrack}
                totalQuestionsCount={currentTrackQuestions.length}
                completedQuestionsCount={currentTrackQuestions.filter(q => completedIds.includes(q.id)).length}
                streakInfo={streakInfo}
                unlockedBadgesCount={unlockedCount}
                onOpenAchievements={() => setIsAchievementsOpen(true)}
                onOpenAiTutor={() => openAiTutor()}
                onOpenGithubSync={() => setIsGithubSyncOpen(true)}
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

            {/* Achievement Unlock Toast */}
            <AnimatePresence>
              {latestUnlockedBadge && (
                <motion.div
                  initial={{ opacity: 0, y: -50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="fixed top-20 right-4 z-50 p-0.5 rounded-2xl shadow-2xl max-w-sm"
                  style={{
                    backgroundColor: 'var(--ctp-mauve)'
                  }}
                >
                  <div className="ctp-card-mantle p-4 rounded-[14px] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-1 rounded-xl shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', border: '1px solid var(--ctp-surface1)' }}>
                        {latestUnlockedBadge.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider font-mono" style={{ color: 'var(--ctp-mauve)' }}>
                          <Sparkles className="w-3 h-3" />
                          <span>Nuovo Badge Sbloccato!</span>
                        </div>
                        <h4 className="text-sm font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
                          {latestUnlockedBadge.title}
                        </h4>
                        <p className="text-xs line-clamp-1" style={{ color: 'var(--ctp-subtext0)' }}>
                          {latestUnlockedBadge.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setLatestUnlockedBadge(null)}
                      className="p-1 text-slate-400 hover:opacity-80 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <main className={isZenMode ? "py-6 sm:py-10 max-w-4xl mx-auto px-3 sm:px-6" : "pb-28 sm:pb-12 max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4"}>
              {/* SOTA 2026 Ecosystem Feature Bar */}
              {!isZenMode && (
                <div className="mb-4 p-2 sm:p-2.5 rounded-2xl ctp-card border border-[var(--ctp-surface1)] shadow-md flex items-center justify-between gap-2 overflow-x-auto no-scrollbar font-mono text-xs sm:text-[11px] touch-pan-x">
                  <button
                    onClick={() => setIsSandboxOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 sm:py-1.5 rounded-xl border font-bold active:scale-95 transition-all cursor-pointer shrink-0 min-h-[40px] sm:min-h-0 bg-[var(--ctp-green)]/10 text-[var(--ctp-green)] border-[var(--ctp-green)]/30 hover:bg-[var(--ctp-green)]/20"
                    title="WASM Sandbox"
                    aria-label="WASM Sandbox"
                  >
                    <Zap className="w-4 h-4 text-[var(--ctp-green)] shrink-0" />
                    <span className="whitespace-nowrap">WASM Sandbox</span>
                  </button>

                  <button
                    onClick={() => setIsLeaguesOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 sm:py-1.5 rounded-xl border font-bold active:scale-95 transition-all cursor-pointer shrink-0 min-h-[40px] sm:min-h-0 bg-[var(--ctp-yellow)]/10 text-[var(--ctp-yellow)] border-[var(--ctp-yellow)]/30 hover:bg-[var(--ctp-yellow)]/20"
                    title="Leghe & Streaks"
                    aria-label="Leghe & Streaks"
                  >
                    <Flame className="w-4 h-4 text-[var(--ctp-yellow)] shrink-0" />
                    <span className="whitespace-nowrap">Leghe & Streaks</span>
                  </button>

                  <button
                    onClick={() => setIsPvPOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 sm:py-1.5 rounded-xl border font-bold active:scale-95 transition-all cursor-pointer shrink-0 min-h-[40px] sm:min-h-0 bg-[var(--ctp-red)]/10 text-[var(--ctp-red)] border-[var(--ctp-red)]/30 hover:bg-[var(--ctp-red)]/20"
                    title="PvP Duels"
                    aria-label="PvP Duels"
                  >
                    <Swords className="w-4 h-4 text-[var(--ctp-red)] shrink-0" />
                    <span className="whitespace-nowrap">PvP Duels</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('skill_tree')}
                    className={`flex items-center gap-2 px-3 py-2 sm:py-1.5 rounded-xl border font-bold active:scale-95 transition-all cursor-pointer shrink-0 min-h-[40px] sm:min-h-0 ${
                      activeTab === 'skill_tree' ? 'bg-[var(--ctp-mauve)] text-white border-[var(--ctp-mauve)]' : 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20'
                    }`}
                    title="Skill Tree"
                    aria-label="Skill Tree"
                  >
                    <GitBranch className={`w-4 h-4 shrink-0 ${activeTab === 'skill_tree' ? 'text-white' : 'text-purple-400'}`} />
                    <span className="whitespace-nowrap">Skill Tree</span>
                  </button>

                  <button
                    onClick={() => setIsQuestGenOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 sm:py-1.5 rounded-xl border font-bold active:scale-95 transition-all cursor-pointer shrink-0 min-h-[40px] sm:min-h-0 bg-[var(--ctp-blue)]/10 text-[var(--ctp-blue)] border-[var(--ctp-blue)]/30 hover:bg-[var(--ctp-blue)]/20"
                    title="AI Quest Gen"
                    aria-label="AI Quest Gen"
                  >
                    <Brain className="w-4 h-4 text-[var(--ctp-blue)] shrink-0" />
                    <span className="whitespace-nowrap">AI Quest Gen</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('community')}
                    className={`flex items-center gap-2 px-3 py-2 sm:py-1.5 rounded-xl border font-bold active:scale-95 transition-all cursor-pointer shrink-0 min-h-[40px] sm:min-h-0 ${
                      activeTab === 'community' ? 'bg-[var(--ctp-mauve)] text-white border-[var(--ctp-mauve)]' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20'
                    }`}
                    title="Community Hub"
                    aria-label="Community Hub"
                  >
                    <Users className={`w-4 h-4 shrink-0 ${activeTab === 'community' ? 'text-white' : 'text-cyan-400'}`} />
                    <span className="whitespace-nowrap">Community Hub</span>
                  </button>

                  <button
                    onClick={() => setIsAnalyticsOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 sm:py-1.5 rounded-xl border font-bold active:scale-95 transition-all cursor-pointer shrink-0 min-h-[40px] sm:min-h-0 bg-[var(--ctp-sky)]/10 text-[var(--ctp-sky)] border-[var(--ctp-sky)]/30 hover:bg-[var(--ctp-sky)]/20"
                    title="Analytics Radar"
                    aria-label="Analytics Radar"
                  >
                    <BarChart3 className="w-4 h-4 text-[var(--ctp-sky)] shrink-0" />
                    <span className="whitespace-nowrap">Analytics Radar</span>
                  </button>

                  <button
                    onClick={() => setIsCertOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 sm:py-1.5 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-bold hover:bg-yellow-500/20 active:scale-95 transition-all cursor-pointer shrink-0 min-h-[40px] sm:min-h-0"
                    title="Certificato ID"
                    aria-label="Certificato ID"
                  >
                    <GraduationCap className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span className="whitespace-nowrap">Certificato ID</span>
                  </button>
                </div>
              )}

              {/* Global Multi-Track Selector Banner on main view */}
              {!isZenMode && activeTab === 'gioca' && (
                <TrackSelector 
                  activeTrackId={activeTrackId}
                  onSelectTrack={handleSelectTrack}
                  questionsCounts={trackCounts}
                />
              )}

              {activeTab === 'gioca' && (
                <GameMode 
                  key={activeTrackId}
                  allQuestions={currentTrackQuestions}
                  onGoToLeaderboard={() => setActiveTab('classifica')}
                  onQuestionCompleted={handleQuestionCompleted}
                  onOpenAiTutorWithQuestion={(question) => openAiTutor(question, null)}
                  isZenMode={isZenMode}
                  onToggleZenMode={() => setIsZenMode(!isZenMode)}
                />
              )}

              {activeTab === 'skill_tree' && (
                <SkillTreeView onSelectChapter={(ch) => setActiveTab('gioca')} />
              )}

              {activeTab === 'community' && (
                <CommunityHubView onPlayChallenge={(quest) => {
                  setAllQuestions(prev => [quest, ...prev]);
                  setActiveTab('gioca');
                }} />
              )}

              {activeTab === 'impara' && (
                <LearnMode 
                  activeTrackId={activeTrackId}
                  onOpenAiTutorWithConcept={(concept) => openAiTutor(null, concept)}
                />
              )}

              {activeTab === 'classifica' && (
                <LeaderboardView />
              )}

              {activeTab === 'personalizza' && (
                <CustomQuestionsView onQuestionAdded={reloadQuestions} />
              )}
            </main>
          </div>

          {/* Modal for Badges and Achievements */}
          <AchievementsModal 
            isOpen={isAchievementsOpen} 
            onClose={() => setIsAchievementsOpen(false)} 
          />

          {/* SOTA 10 Feature Modals */}
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
              setActiveTab('gioca');
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

          <CommandPaletteModal
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            actions={[
              {
                id: 'wasm_sandbox',
                title: '⚡ WASM Python Sandbox',
                description: 'Esegui codice Python reale in-browser tramite Pyodide',
                category: 'tools',
                shortcut: 'Cmd+1',
                icon: <Zap className="w-4 h-4" />,
                perform: () => setIsSandboxOpen(true)
              },
              {
                id: 'skill_tree',
                title: '🌳 Skill Tree RPG',
                description: 'Visualizza l\'albero delle competenze e rami di specializzazione',
                category: 'navigation',
                shortcut: 'Cmd+2',
                icon: <GitBranch className="w-4 h-4" />,
                perform: () => setActiveTab('skill_tree')
              },
              {
                id: 'community',
                title: '👥 Community Hub & Forum',
                description: 'Condividi soluzioni, consigli e discuti con altri sviluppatori',
                category: 'navigation',
                shortcut: 'Cmd+3',
                icon: <Users className="w-4 h-4" />,
                perform: () => setActiveTab('community')
              },
              {
                id: 'pvp_duels',
                title: '⚔️ PvP Duels',
                description: 'Sfida altri programmatori in sfide di codice a tempo',
                category: 'tools',
                shortcut: 'Cmd+4',
                icon: <Swords className="w-4 h-4" />,
                perform: () => setIsPvPOpen(true)
              },
              {
                id: 'leagues_streaks',
                title: '🔥 Leghe & Streaks',
                description: 'Controlla la tua posizione in lega e proteggi la streak',
                category: 'tools',
                shortcut: 'Cmd+5',
                icon: <Flame className="w-4 h-4" />,
                perform: () => setIsLeaguesOpen(true)
              },
              {
                id: 'analytics',
                title: '📊 Analytics Radar',
                description: 'Grafico radar delle competenze e statistiche dettagliate',
                category: 'tools',
                shortcut: 'Cmd+6',
                icon: <BarChart3 className="w-4 h-4" />,
                perform: () => setIsAnalyticsOpen(true)
              },
              {
                id: 'certificate',
                title: '🎓 Certificato ID Ufficiale',
                description: 'Genera il tuo certificato di competenza condiviso',
                category: 'tools',
                shortcut: 'Cmd+7',
                icon: <GraduationCap className="w-4 h-4" />,
                perform: () => setIsCertOpen(true)
              },
              {
                id: 'ai_tutor',
                title: '🧠 AI Tutor Socrate',
                description: 'Chiedi spiegazioni o consigli guida all\'assistente AI',
                category: 'tools',
                icon: <Sparkles className="w-4 h-4" />,
                perform: () => openAiTutor()
              },
              {
                id: 'zen_mode',
                title: '🧘 Zen Mode Toggle',
                description: 'Attiva/disattiva l\'interfaccia di concentrazione assoluta',
                category: 'settings',
                icon: <Maximize2 className="w-4 h-4" />,
                perform: () => setIsZenMode((prev) => !prev)
              }
            ]}
          />

          {/* GitHub OAuth & Code Sync Modal */}
          <GitHubSyncModal
            isOpen={isGithubSyncOpen}
            onClose={() => setIsGithubSyncOpen(false)}
          />

          {/* AI Tutor Agent Drawer Widget */}
          <AiTutorWidget 
            isOpen={isAiTutorOpen}
            onClose={() => setIsAiTutorOpen(false)}
            activeQuestion={tutorQuestionContext}
            activeConcept={tutorConceptContext}
          />

          {!isZenMode && (
            <>
              {/* Mobile Bottom Navigation for Touch Screens */}
              <MobileBottomNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpenAiTutor={() => openAiTutor()}
              />

              {/* PWA Install Prompt Banner & Trigger */}
              <PwaInstallPrompt />

              {/* Footer */}
              <AppFooter />
            </>
          )}
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}


