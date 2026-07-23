'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sfida, DifficoltaType } from '../lib/types';
import { salvaPunteggio, getQuestionBestTimes, saveQuestionBestTime } from '../lib/storage';
import { calculateSM2, SM2Data } from '../lib/spacedRepetition';
import { useLanguage } from '../lib/LanguageContext';
import CodeBlock from './CodeBlock';
import VariableInspector from './VariableInspector';
import ParticleBurst from './ParticleBurst';
import ChallengeFilter from './ChallengeFilter';
import DailyGoalBanner from './DailyGoalBanner';
import confetti from 'canvas-confetti';
import { soundEngine } from '../lib/soundEngine';
import { 
  Heart, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  LogOut, 
  Flame, 
  BarChart2, 
  Zap,
  BookOpen,
  Filter,
  Timer,
  Clock,
  Trophy,
  Bot,
  Maximize2,
  Minimize2,
  Eye,
  Target,
  Shield
} from 'lucide-react';

interface GameModeProps {
  allQuestions: Sfida[];
  onGoToLeaderboard: () => void;
  onQuestionCompleted?: (id: string) => void;
  onOpenAiTutorWithQuestion?: (sfida: Sfida) => void;
  isZenMode?: boolean;
  onToggleZenMode?: () => void;
}

export default function GameMode({ 
  allQuestions, 
  onGoToLeaderboard, 
  onQuestionCompleted, 
  onOpenAiTutorWithQuestion,
  isZenMode,
  onToggleZenMode
}: GameModeProps) {
  const { t, language } = useLanguage();

  // Config state
  const [inGame, setInGame] = useState(false);
  const [numDomande, setNumDomande] = useState<number>(10);
  const [difficolta, setDifficolta] = useState<DifficoltaType>('miste');
  const [capitoloFiltro, setCapitoloFiltro] = useState<number | 'tutti'>('tutti');

  // Timer feature state
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [questionBestTime, setQuestionBestTime] = useState<number | null>(null);
  const [timeResult, setTimeResult] = useState<{ spentSeconds: number; isNewRecord: boolean; bestTime: number } | null>(null);

  // Game execution state
  const [activeQuestions, setActiveQuestions] = useState<Sfida[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [punti, setPunti] = useState(0);
  const [vite, setVite] = useState(3);
  const [risposteCorrette, setRisposteCorrette] = useState(0);

  // Current question state
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [triggerBurst, setTriggerBurst] = useState(false);

  // Game over state
  const [gameOver, setGameOver] = useState(false);
  const [nomeGiocatore, setNomeGiocatore] = useState('');
  const [saved, setSaved] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (inGame && isTimerEnabled && !answered && !gameOver) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inGame, isTimerEnabled, answered, gameOver, currentIndex]);

  // Format time utility
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
    }
    return `${secs}s`;
  };

  // Shuffle answers & select question
  const prepareQuestion = (sfida: Sfida) => {
    const rawOptions = sfida.options || sfida.risposte || [];
    const correctIdx = sfida.correctIndex ?? sfida.indice_corretto ?? 0;
    const indexed = rawOptions.map((r, i) => ({ text: r, originalIndex: i }));
    // Shuffle
    const shuffled = [...indexed].sort(() => Math.random() - 0.5);
    const newOptions = shuffled.map((item) => item.text);
    const newCorrectIdx = shuffled.findIndex((item) => item.originalIndex === correctIdx);

    setShuffledOptions(newOptions);
    setCorrectOptionIndex(newCorrectIdx);
    setSelectedOption(null);
    setHintVisible(false);
    setAnswered(false);

    // Timer reset for question
    setElapsedSeconds(0);
    setTimeResult(null);
    const bestTimesMap = getQuestionBestTimes();
    if (sfida.id && bestTimesMap[sfida.id] !== undefined) {
      setQuestionBestTime(bestTimesMap[sfida.id]);
    } else {
      setQuestionBestTime(null);
    }
  };

  const startGame = (
    customPool?: Sfida[],
    chosenNumDomande?: number,
    chosenDifficolta?: DifficoltaType,
    chosenCapitolo?: number | 'tutti'
  ) => {
    // Filter questions
    let pool = customPool && customPool.length > 0 ? [...customPool] : [...allQuestions];
    
    if (!customPool) {
      if (difficolta !== 'miste') {
        pool = pool.filter((q) => q.difficolta === difficolta);
      }
      if (capitoloFiltro !== 'tutti') {
        pool = pool.filter((q) => q.capitolo === capitoloFiltro);
      }
    }

    if (pool.length === 0) {
      pool = [...allQuestions];
    }

    const countToUse = chosenNumDomande || numDomande;
    if (chosenDifficolta) setDifficolta(chosenDifficolta);
    if (chosenCapitolo !== undefined) setCapitoloFiltro(chosenCapitolo);
    if (chosenNumDomande) setNumDomande(chosenNumDomande);

    // Shuffle pool and select numDomande
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(countToUse, shuffled.length));

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setPunti(0);
    setVite(3);
    setRisposteCorrette(0);
    setGameOver(false);
    setSaved(false);
    setInGame(true);

    if (selected.length > 0) {
      prepareQuestion(selected[0]);
    }
  };

  const currentSfida = activeQuestions[currentIndex];

  const handleSelectAnswer = (index: number) => {
    if (answered || gameOver) return;

    setSelectedOption(index);
    setAnswered(true);

    const isCorrect = index === correctOptionIndex;

    if (isCorrect) {
      soundEngine.playCorrect();
      setTriggerBurst(true);

      // Calculate points
      let basePunti = 10;
      if (currentSfida.difficolta === 'media') basePunti = 15;
      if (currentSfida.difficolta === 'difficile') basePunti = 20;

      if (hintVisible) {
        basePunti = Math.floor(basePunti / 2);
      }

      setPunti((prev) => prev + basePunti);
      setRisposteCorrette((prev) => prev + 1);

      if (isTimerEnabled && currentSfida?.id) {
        const timeSpent = Math.max(1, elapsedSeconds);
        const { bestTime, isNewRecord } = saveQuestionBestTime(currentSfida.id, timeSpent);
        setTimeResult({ spentSeconds: timeSpent, isNewRecord, bestTime });
      }

      if (onQuestionCompleted && currentSfida.id) {
        onQuestionCompleted(currentSfida.id);
      }
    } else {
      soundEngine.playWrong();
      setVite((prev) => {
        const nextVite = prev - 1;
        if (nextVite <= 0) {
          setTimeout(() => {
            soundEngine.playWrong();
            setGameOver(true);
          }, 1200);
        }
        return nextVite;
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length && vite > 0) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      prepareQuestion(activeQuestions[nextIdx]);
    } else {
      setGameOver(true);
      if (punti > 50) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeGiocatore.trim() || saved) return;
    salvaPunteggio(nomeGiocatore, punti, difficolta, activeQuestions.length);
    setSaved(true);
    if (punti > 0) {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    }
  };

  // Setup view
  if (!inGame) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DailyGoalBanner 
            onStartQuickGame={(count) => startGame(undefined, count)}
          />

          <ChallengeFilter 
            allQuestions={allQuestions} 
            onStartGame={startGame} 
          />
        </motion.div>
      </div>
    );
  }

  // Game Over View
  if (gameOver) {
    const percentuale = Math.round((risposteCorrette / (activeQuestions.length || 1)) * 100);

    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="ctp-card rounded-2xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden border"
        >
          <div className="w-16 h-16 rounded-2xl ctp-card-surface border text-amber-500 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" style={{ color: 'var(--ctp-peach)' }} />
          </div>

          <h2 className="text-2xl font-bold font-mono mb-1" style={{ color: 'var(--ctp-text)' }}>
            {t.trackCompletedTitle}
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--ctp-subtext0)' }}>
            {t.trackCompletedDesc}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6 text-left">
            <div className="ctp-card-mantle p-4 rounded-xl border">
              <div className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>{t.score}</div>
              <div className="text-2xl font-extrabold font-mono mt-0.5" style={{ color: 'var(--ctp-peach)' }}>{punti} pt</div>
            </div>
            <div className="ctp-card-mantle p-4 rounded-xl border">
              <div className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>Risposte Esatte</div>
              <div className="text-2xl font-extrabold font-mono mt-0.5 text-[var(--ctp-green)]">{risposteCorrette} / {activeQuestions.length}</div>
            </div>
            <div className="ctp-card-mantle p-4 rounded-xl border">
              <div className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>{t.accuracy}</div>
              <div className="text-2xl font-extrabold font-mono mt-0.5" style={{ color: 'var(--ctp-blue)' }}>{percentuale}%</div>
            </div>
          </div>

          {/* Save score form */}
          {!saved ? (
            <form onSubmit={handleSaveScore} className="ctp-card-mantle p-5 rounded-xl border mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-left mb-2" style={{ color: 'var(--ctp-subtext0)' }}>
                Salva il tuo punteggio in Classifica
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Inserisci il tuo nome (es. Dev)"
                  maxLength={32}
                  value={nomeGiocatore}
                  onChange={(e) => setNomeGiocatore(e.target.value)}
                  className="flex-1 ctp-input rounded-lg px-3.5 py-2 text-sm border focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!nomeGiocatore.trim()}
                  style={{ backgroundColor: 'var(--ctp-mauve)', color: 'var(--ctp-crust)' }}
                 >
                  Salva
                </button>
              </div>
            </form>
          ) : (
            <div className="p-3 border text-[var(--ctp-green)] rounded-xl text-sm font-medium mb-6 flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--ctp-surface0)' }}>
              <CheckCircle2 className="w-4 h-4" />
              Punteggio salvato con successo per &apos;{nomeGiocatore}&apos;!
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => startGame()}
              className="px-6 py-3 rounded-xl ctp-card-surface border text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer hover:opacity-90"
              style={{ color: 'var(--ctp-text)' }}
            >
              <RotateCcw className="w-4 h-4" />
              {t.restartTrack}
            </button>
            <button
              onClick={() => setInGame(false)}
              className="px-6 py-3 rounded-xl ctp-card-surface border text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer hover:opacity-90"
              style={{ color: 'var(--ctp-text)' }}
            >
              <Filter className="w-4 h-4" style={{ color: 'var(--ctp-peach)' }} />
              Cambia Filtri
            </button>
            <button
              onClick={() => {
                setInGame(false);
                onGoToLeaderboard();
              }}
              className="px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              style={{ backgroundColor: 'var(--ctp-mauve)', color: 'var(--ctp-crust)' }}
            >
              <BarChart2 className="w-4 h-4" />
              {t.leaderboardTab}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Active quiz screen
  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* HUD Header */}
      <div className="ctp-card rounded-2xl p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-md border">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Lives */}
          <div className="flex items-center gap-1.5 ctp-card-mantle px-3 py-1.5 rounded-lg border">
            {[1, 2, 3].map((heartNum) => (
              <Heart
                key={heartNum}
                className={`w-4 h-4 transition-colors`}
                style={{
                  color: heartNum <= vite ? 'var(--ctp-red)' : 'var(--ctp-overlay0)',
                  fill: heartNum <= vite ? 'var(--ctp-red)' : 'none',
                  opacity: heartNum <= vite ? 1 : 0.4
                }}
              />
            ))}
          </div>

          {/* Points */}
          <div className="flex items-center gap-2 ctp-card-mantle px-3.5 py-1.5 rounded-lg border">
            <Flame className="w-4 h-4" style={{ color: 'var(--ctp-peach)' }} />
            <span className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>{t.score}:</span>
            <span className="text-sm font-bold font-mono" style={{ color: 'var(--ctp-peach)' }}>{punti}</span>
          </div>

          {/* Timer Widget & Toggle */}
          <div className="flex items-center gap-2 ctp-card-mantle px-3 py-1.5 rounded-lg border font-mono text-xs">
            <button
              onClick={() => setIsTimerEnabled(!isTimerEnabled)}
              title={isTimerEnabled ? 'Timer ON' : 'Timer OFF'}
              className={`p-1 rounded-md transition-colors cursor-pointer border ${
                isTimerEnabled ? 'bg-[var(--ctp-yellow)]/20 text-[var(--ctp-yellow)] border-[var(--ctp-yellow)]/30' : 'bg-[var(--ctp-surface0)]/10 text-[var(--ctp-overlay0)] border-transparent'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
            </button>

            {isTimerEnabled ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold" style={{ color: 'var(--ctp-text)' }}>{formatTime(elapsedSeconds)}</span>
                {questionBestTime !== null && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded border flex items-center gap-1 font-bold" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-peach)', borderColor: 'var(--ctp-surface1)' }}>
                    <Trophy className="w-3 h-3" style={{ color: 'var(--ctp-peach)' }} />
                    Rec: {formatTime(questionBestTime)}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[11px]" style={{ color: 'var(--ctp-overlay0)' }}>Timer OFF</span>
            )}
          </div>
        </div>

        {/* Question Counter */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: 'var(--ctp-subtext0)' }}>
            {t.question} <strong style={{ color: 'var(--ctp-text)' }}>{currentIndex + 1}</strong> {t.of} {activeQuestions.length}
          </span>

          <button
            onClick={() => setInGame(false)}
            className="p-2 text-[var(--ctp-overlay0)] hover:text-[var(--ctp-red)] hover:bg-[var(--ctp-red)]/10 rounded-lg transition-colors cursor-pointer"
            title="Esci"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full rounded-full h-1.5 mb-6 overflow-hidden" style={{ backgroundColor: 'var(--ctp-surface0)' }}>
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${((currentIndex + 1) / activeQuestions.length) * 100}%`,
            background: 'linear-gradient(90deg, var(--ctp-peach), var(--ctp-mauve))'
          }}
        />
      </div>

      {/* Question Card */}
      {currentSfida && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSfida.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="ctp-card rounded-2xl p-4 sm:p-6 shadow-xl border"
          >
            {/* Topic & Badge Header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md border" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-text)', borderColor: 'var(--ctp-surface1)' }}>
                  {t.chapter} {currentSfida.capitolo} • {currentSfida.argomento}
                </span>

                <span 
                  onMouseEnter={() => soundEngine.playBadgeHover()}
                  className={`difficulty-badge ${
                  currentSfida.difficolta === 'facile' 
                    ? 'beginner ctp-badge-beginner' 
                    : currentSfida.difficolta === 'media'
                    ? 'intermediate ctp-badge-intermediate'
                    : 'advanced ctp-badge-advanced'
                } text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer`}
                >
                  {currentSfida.difficolta === 'facile' ? (
                    <>
                      <Target className="w-3.5 h-3.5 text-[var(--ctp-green)] shrink-0" />
                      <span>{t.facile || 'Beginner'}</span>
                    </>
                  ) : currentSfida.difficolta === 'media' ? (
                    <>
                      <Zap className="w-3.5 h-3.5 text-[var(--ctp-peach)] shrink-0" />
                      <span>{t.media || 'Intermediate'}</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-3.5 h-3.5 text-[var(--ctp-red)] shrink-0" />
                      <span>{t.difficile || 'Advanced'}</span>
                    </>
                  )}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Ask AI Button on question */}
                {onOpenAiTutorWithQuestion && (
                  <button
                    onClick={() => onOpenAiTutorWithQuestion(currentSfida)}
                    className="flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg shadow hover:scale-105 transition-transform cursor-pointer"
                    style={{ backgroundColor: 'var(--ctp-mauve)', color: 'var(--ctp-crust)' }}
                    title={t.explainWithAI}
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" style={{ color: 'var(--ctp-yellow)' }} />
                    <span className="hidden xs:inline">AI Tutor</span>
                  </button>
                )}

                {/* Zen Mode Toggle Button */}
                {onToggleZenMode && (
                  <button
                    onClick={onToggleZenMode}
                    title={isZenMode ? t.exitZenMode : 'Enter Zen Mode'}
                    aria-label={isZenMode ? t.exitZenMode : 'Enter Zen Mode'}
                   >
                    {isZenMode ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t.exitZenMode}</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t.zenMode}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Question prompt */}
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--ctp-text)' }}>
              {currentSfida.domanda}
            </h3>

            {/* Code Snippet */}
            {currentSfida.codice && (
              <>
                <CodeBlock 
                  code={currentSfida.codice} 
                  language={currentSfida.trackId === 'typescript' ? 'typescript' : currentSfida.trackId === 'git' ? 'bash' : 'python'}
                  title={`Snippet ${currentSfida.trackId ? currentSfida.trackId.toUpperCase() : 'PYTHON'} (${t.chapter} ${currentSfida.capitolo})`} 
                />
                <VariableInspector
                  code={currentSfida.codice}
                  isOpen={isInspectorOpen}
                  onToggle={() => setIsInspectorOpen((prev) => !prev)}
                />
              </>
            )}

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-2 my-4">
              {shuffledOptions.map((optionText, idx) => {
                let customStyle = {
                  backgroundColor: 'var(--ctp-mantle)',
                  borderColor: 'var(--ctp-border)',
                  color: 'var(--ctp-text)'
                };
                
                if (answered) {
                  if (idx === correctOptionIndex) {
                    customStyle = {
                      backgroundColor: 'rgba(64, 160, 43, 0.15)',
                      borderColor: 'var(--ctp-green)',
                      color: 'var(--ctp-green)'
                    };
                  } else if (idx === selectedOption) {
                    customStyle = {
                      backgroundColor: 'rgba(210, 15, 57, 0.15)',
                      borderColor: 'var(--ctp-red)',
                      color: 'var(--ctp-red)'
                    };
                  } else {
                    customStyle = {
                      backgroundColor: 'var(--ctp-mantle)',
                      borderColor: 'var(--ctp-border)',
                      color: 'var(--ctp-overlay0)'
                    };
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    disabled={answered}
                    style={customStyle}
                    className="w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-sm font-mono transition-all duration-150 flex items-center gap-2.5 cursor-pointer hover:border-[var(--ctp-mauve)] active:scale-[0.985] shadow-sm"
                  >
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 border" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-text)', borderColor: 'var(--ctp-surface1)' }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 text-xs sm:text-sm leading-snug break-words min-w-0 font-sans sm:font-mono">{optionText}</span>
                    {answered && idx === correctOptionIndex && (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--ctp-green)] shrink-0" />
                    )}
                    {answered && idx === selectedOption && idx !== correctOptionIndex && (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--ctp-red)] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint Section */}
            {!answered && (
              <div className="mb-4">
                {!hintVisible ? (
                  <button
                    onClick={() => setHintVisible(true)}
                    className="text-xs flex items-center gap-1.5 hover:underline cursor-pointer"
                    style={{ color: 'var(--ctp-peach)' }}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{t.showHint} (-50% {t.score})</span>
                  </button>
                ) : (
                  <div className="p-3.5 border rounded-xl text-xs flex items-start gap-2.5" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-peach)', borderColor: 'var(--ctp-surface1)' }}>
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--ctp-peach)' }} />
                    <div>
                      <strong>{t.hint}:</strong> {currentSfida.suggerimento}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Explanation box after answer */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl ctp-card-mantle border"
              >
                {/* Timer outcome banner if correct & timer was enabled */}
                {isTimerEnabled && timeResult && (
                  <div className="mb-3 p-3 rounded-xl border flex items-center justify-between text-xs font-mono" style={{ backgroundColor: 'var(--ctp-surface0)', borderColor: 'var(--ctp-surface1)' }}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: 'var(--ctp-peach)' }} />
                      <span style={{ color: 'var(--ctp-subtext0)' }}>Tempo: <strong style={{ color: 'var(--ctp-text)' }}>{formatTime(timeResult.spentSeconds)}</strong></span>
                    </div>

                    {timeResult.isNewRecord ? (
                      <span className="flex items-center gap-1 font-bold px-2 py-0.5 rounded-lg border " style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-peach)', borderColor: 'var(--ctp-surface2)' }}>
                        <Zap className="w-3.5 h-3.5 fill-current" /> Record!
                      </span>
                    ) : (
                      <span className="text-[11px]" style={{ color: 'var(--ctp-subtext0)' }}>
                        Best: {formatTime(timeResult.bestTime)}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--ctp-subtext0)' }}>
                    <BookOpen className="w-4 h-4" style={{ color: 'var(--ctp-mauve)' }} />
                    <span>{t.explanation}</span>
                  </div>

                  {onOpenAiTutorWithQuestion && (
                    <button
                      onClick={() => onOpenAiTutorWithQuestion(currentSfida)}
                      className="text-xs font-mono flex items-center gap-1 text-[var(--ctp-mauve)] hover:underline"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>{t.explainWithAI}</span>
                    </button>
                  )}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--ctp-text)' }}>
                  {currentSfida.spiegazione}
                </p>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    style={{ backgroundColor: 'var(--ctp-mauve)', color: 'var(--ctp-crust)' }}
                   >
                    <span>{currentIndex + 1 < activeQuestions.length ? t.nextQuestion : 'Risultati'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      <ParticleBurst 
        trigger={triggerBurst} 
        type="correct" 
        onComplete={() => setTriggerBurst(false)} 
      />
    </div>
  );
}

