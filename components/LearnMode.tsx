'use client';

import React, { useState, useEffect } from 'react';
import { getLessonsForTrack, Lesson } from '../lib/lessonsData';
import { getTrackById, getTrackTitle } from '../lib/tracks';
import { TrackId } from '../lib/types';
import { useLanguage } from '../lib/LanguageContext';
import CodeBlock from './CodeBlock';
import { runPythonCode } from '../lib/pyodideRunner';
import { 
  BookOpen, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  RotateCcw,
  Zap,
  Terminal,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LearnModeProps {
  trackId?: TrackId;
  activeTrackId?: TrackId;
  onOpenAiTutor?: (initialPrompt?: string) => void;
  onOpenAiTutorWithConcept?: (concept: any) => void;
}

const COMPLETED_LESSONS_KEY = 'devquest_completed_lessons';

function getCompletedLessons(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COMPLETED_LESSONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCompletedLesson(lessonId: string): string[] {
  const current = getCompletedLessons();
  if (!current.includes(lessonId)) {
    const updated = [...current, lessonId];
    try {
      localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Impossibile salvare lezione completata', e);
    }
    return updated;
  }
  return current;
}

export default function LearnMode({ trackId, activeTrackId = 'python', onOpenAiTutor, onOpenAiTutorWithConcept }: LearnModeProps) {
  const { t, language } = useLanguage();
  const targetTrackId = trackId || activeTrackId;
  const track = getTrackById(targetTrackId);
  const lessons = getLessonsForTrack(targetTrackId);

  const [activeLessonId, setActiveLessonId] = useState<string>(lessons[0]?.id || '');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  
  // Interactive Sandbox state
  const [sandboxCode, setSandboxCode] = useState<string>('');
  const [sandboxOutput, setSandboxOutput] = useState<string>('');
  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);

  // Checkpoint Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean>(false);

  useEffect(() => {
    setCompletedLessonIds(getCompletedLessons());
  }, []);

  const currentLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];

  useEffect(() => {
    if (currentLesson) {
      setSandboxCode(currentLesson.sandboxInitialCode);
      setSandboxOutput('');
      setSelectedQuizAnswer(null);
      setQuizSubmitted(false);
      setIsQuizCorrect(false);
    }
  }, [activeLessonId, currentLesson]);

  // Execute Sandbox Code
  const handleRunSandbox = async () => {
    setIsRunningCode(true);
    setSandboxOutput(language === 'en' ? 'Execution in progress...' : language === 'es' ? 'Ejecución en curso...' : 'Esecuzione in corso...');
    try {
      if (track.codeLang === 'python') {
        const res = await runPythonCode(sandboxCode);
        setSandboxOutput(res.error ? `${language === 'en' ? 'Error' : language === 'es' ? 'Error' : 'Errore'}:\n${res.error}` : res.output || (language === 'en' ? '(No output)' : language === 'es' ? '(Sin salida)' : '(Nessun output)'));
      } else {
        // JavaScript/TypeScript/Bash fallback
        setSandboxOutput(`Output:\n> ${sandboxCode}`);
      }
    } catch (err: any) {
      setSandboxOutput(`${language === 'en' ? 'Execution error' : language === 'es' ? 'Error de ejecución' : 'Errore esecuzione'}: ${err.message || String(err)}`);
    } finally {
      setIsRunningCode(false);
    }
  };

  // Submit Checkpoint Quiz
  const handleSubmitQuiz = () => {
    if (selectedQuizAnswer === null || !currentLesson) return;
    const correct = selectedQuizAnswer === currentLesson.checkpointQuiz.correctIndex;
    setQuizSubmitted(true);
    setIsQuizCorrect(correct);

    if (correct) {
      const updated = saveCompletedLesson(currentLesson.id);
      setCompletedLessonIds(updated);
    }
  };

  const completedCount = lessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto py-6 px-3 sm:px-6">
      {/* Track Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl ctp-card border shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', borderColor: 'var(--ctp-surface1)' }}>
            {track.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
                {language === 'en' ? 'Lesson Path' : language === 'es' ? 'Ruta de Lecciones' : 'Percorso Lezioni'} • {getTrackTitle(track, language)}
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-mauve)', borderColor: 'var(--ctp-surface1)' }}>
                {track.badge}
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
              {language === 'en' ? 'Interactive learning module based on' : language === 'es' ? 'Módulo de aprendizaje interactivo basado en' : 'Modulo di apprendimento interattivo basato su'} {track.bookRef}
            </p>
          </div>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-3 bg-[var(--ctp-surface0)] px-4 py-2 rounded-xl border border-[var(--ctp-surface1)] shrink-0 font-mono text-xs">
          <Award className="w-4 h-4 text-[var(--ctp-mauve)]" />
          <div>
            <div className="font-bold text-[var(--ctp-text)]">
              {language === 'en' ? 'Progress' : language === 'es' ? 'Progreso' : 'Progresso'}: {completedCount}/{lessons.length} {language === 'en' ? 'Lessons' : language === 'es' ? 'Lecciones' : 'Lezioni'}
            </div>
            <div className="w-28 h-1.5 rounded-full bg-[var(--ctp-surface1)] overflow-hidden mt-1">
              <div className="h-full bg-[var(--ctp-mauve)] transition-all duration-300" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Lesson Sidebar + Active Lesson Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar: Lessons List */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider px-1 text-[var(--ctp-subtext0)] mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[var(--ctp-mauve)]" />
            <span>{language === 'en' ? 'Lesson Index' : language === 'es' ? 'Índice de Lecciones' : 'Indice delle Lezioni'} ({lessons.length})</span>
          </h3>

          <div className="space-y-2">
            {lessons.map((lesson, idx) => {
              const isActive = lesson.id === activeLessonId;
              const isCompleted = completedLessonIds.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isActive ? 'shadow-lg border-[var(--ctp-mauve)]' : 'hover:border-[var(--ctp-mauve)]/50'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--ctp-surface0)' : 'var(--ctp-mantle)',
                    borderColor: isActive ? 'var(--ctp-mauve)' : 'var(--ctp-border)'
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-6 h-6 rounded-lg text-[11px] font-bold font-mono flex items-center justify-center shrink-0 border ${
                      isCompleted ? 'bg-[var(--ctp-green)]/15 text-[var(--ctp-green)] border-[var(--ctp-green)]' : 'bg-[var(--ctp-surface0)] text-[var(--ctp-subtext0)] border-[var(--ctp-surface1)]'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate" style={{ color: 'var(--ctp-text)' }}>
                        {language === 'en' ? (lesson.title_en || lesson.title) : language === 'es' ? (lesson.title_es || lesson.title) : lesson.title}
                      </div>
                      <div className="text-[10px] truncate" style={{ color: 'var(--ctp-subtext0)' }}>
                        {language === 'en' ? 'Chapter' : language === 'es' ? 'Capítulo' : 'Capitolo'} {lesson.chapter}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'rotate-90 text-[var(--ctp-mauve)]' : 'text-[var(--ctp-overlay0)]'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content: Lesson View */}
        {currentLesson && (
          <div className="lg:col-span-8 space-y-6">
            {/* Lesson Title & Summary Card */}
            <div className="p-6 rounded-2xl ctp-card border shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg border bg-[var(--ctp-surface0)] text-[var(--ctp-mauve)] border-[var(--ctp-surface1)]">
                  {language === 'en' ? 'Chapter' : language === 'es' ? 'Capítulo' : 'Capitolo'} {currentLesson.chapter} • {language === 'en' ? 'Interactive Lesson' : language === 'es' ? 'Lección Interactiva' : 'Lezione Interattiva'}
                </span>
                {completedLessonIds.includes(currentLesson.id) && (
                  <span className="flex items-center gap-1 text-xs font-bold text-[var(--ctp-green)] font-mono">
                    <CheckCircle2 className="w-4 h-4" /> {language === 'en' ? 'Completed' : language === 'es' ? 'Completado' : 'Completata'}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
                {language === 'en' ? (currentLesson.title_en || currentLesson.title) : language === 'es' ? (currentLesson.title_es || currentLesson.title) : currentLesson.title}
              </h2>

              <p className="text-xs leading-relaxed" style={{ color: 'var(--ctp-subtext0)' }}>
                {language === 'en' ? (currentLesson.summary_en || currentLesson.summary) : language === 'es' ? (currentLesson.summary_es || currentLesson.summary) : currentLesson.summary}
              </p>

              {/* Theory Content Box */}
              <div className="p-4 rounded-xl border ctp-card-mantle text-xs leading-relaxed space-y-3" style={{ borderColor: 'var(--ctp-border)', color: 'var(--ctp-text)' }}>
                <div className="font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 text-[var(--ctp-mauve)]">
                  <BookOpen className="w-4 h-4" />
                  <span>{t.theoryExplanation || 'Spiegazione Teorica'}</span>
                </div>
                <div className="whitespace-pre-line font-sans text-xs sm:text-sm">
                  {currentLesson.theory}
                </div>
              </div>

              {/* Code Example */}
              <div>
                <div className="text-xs font-bold font-mono mb-2 text-[var(--ctp-subtext0)]">
                  {language === 'en' ? 'Code Example:' : language === 'es' ? 'Ejemplo de Código:' : 'Esempio di Codice:'}
                </div>
                <CodeBlock 
                  code={currentLesson.codeExample}
                  language={track.codeLang}
                  title={`Code Example (${track.name})`}
                />
              </div>
            </div>

            {/* Live Executable Sandbox */}
            <div className="p-5 rounded-2xl ctp-card border shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-[var(--ctp-mauve)]">
                  <Terminal className="w-4 h-4" />
                  <span>{t.liveSandboxTitle || 'Sandbox di Codice Live'}</span>
                </div>
                <button
                  onClick={handleRunSandbox}
                  disabled={isRunningCode}
                  className="px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow hover:scale-105 active:scale-95 transition-transform"
                  style={{ backgroundColor: 'var(--ctp-mauve)', color: 'var(--ctp-crust)', borderColor: 'var(--ctp-mauve)' }}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunningCode ? (t.executing || 'Esecuzione...') : (t.runCode || 'Esegui Codice')}</span>
                </button>
              </div>

              <textarea
                value={sandboxCode}
                onChange={(e) => setSandboxCode(e.target.value)}
                rows={4}
                className="w-full font-mono text-xs sm:text-sm p-3 rounded-xl border ctp-input focus:outline-none focus:border-[var(--ctp-mauve)] transition-colors"
                placeholder={t.sandboxPlaceholder || 'Scrivi o modifica il codice qui...'}
              />

              {sandboxOutput && (
                <div className="p-3 rounded-xl border bg-[var(--ctp-crust)] font-mono text-xs text-[var(--ctp-text)] border-[var(--ctp-border)] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ctp-subtext0)]">{language === 'en' ? 'Console Output:' : language === 'es' ? 'Salida de Consola:' : 'Output Console:'}</div>
                  <pre className="whitespace-pre-wrap">{sandboxOutput}</pre>
                </div>
              )}
            </div>

            {/* Knowledge Checkpoint Quiz */}
            <div className="p-6 rounded-2xl ctp-card border shadow-md space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-[var(--ctp-peach)]">
                <Sparkles className="w-4 h-4" />
                <span>{language === 'en' ? 'Checkpoint Quiz' : language === 'es' ? 'Cuestionario de Control' : 'Quiz Checkpoint'}</span>
              </div>

              <h3 className="text-sm font-semibold" style={{ color: 'var(--ctp-text)' }}>
                {language === 'en' ? (currentLesson.checkpointQuiz.question_en || currentLesson.checkpointQuiz.question) : currentLesson.checkpointQuiz.question}
              </h3>

              <div className="grid grid-cols-1 gap-2">
                {((language === 'en' && currentLesson.checkpointQuiz.options_en) ? currentLesson.checkpointQuiz.options_en : currentLesson.checkpointQuiz.options).map((opt, i) => {
                  const isSelected = selectedQuizAnswer === i;
                  return (
                    <button
                      key={i}
                      onClick={() => !quizSubmitted && setSelectedQuizAnswer(i)}
                      disabled={quizSubmitted}
                      className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center gap-2.5 cursor-pointer ${
                        isSelected ? 'border-[var(--ctp-mauve)] bg-[var(--ctp-surface0)]' : 'hover:border-[var(--ctp-mauve)]/50'
                      }`}
                      style={{
                        backgroundColor: isSelected ? 'var(--ctp-surface0)' : 'var(--ctp-mantle)',
                        borderColor: isSelected ? 'var(--ctp-mauve)' : 'var(--ctp-border)'
                      }}
                    >
                      <span className="w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-text)', borderColor: 'var(--ctp-surface2)' }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 text-xs">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={selectedQuizAnswer === null}
                  className="w-full py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow hover:scale-[1.01] transition-transform disabled:opacity-50"
                  style={{ backgroundColor: 'var(--ctp-mauve)', color: 'var(--ctp-crust)', borderColor: 'var(--ctp-mauve)' }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.verifyAnswer || 'Verifica Risposta'}</span>
                </button>
              ) : (
                <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                  isQuizCorrect ? 'bg-[var(--ctp-green)]/15 border-[var(--ctp-green)] text-[var(--ctp-green)]' : 'bg-[var(--ctp-red)]/15 border-[var(--ctp-red)] text-[var(--ctp-red)]'
                }`}>
                  <div className="font-bold flex items-center gap-2 text-sm">
                    {isQuizCorrect ? <CheckCircle2 className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
                    <span>{isQuizCorrect ? (t.correctAnswerMsg || 'Risposta Esatta! 🎉') : (t.wrongAnswerMsg || 'Risposta Errata. Riprova!')}</span>
                  </div>
                  <p className="text-xs text-[var(--ctp-text)] leading-relaxed">
                    {currentLesson.checkpointQuiz.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
