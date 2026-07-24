'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, X, CheckCircle2, XCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { Sfida, getChallengeQuestion, getChallengeCode, getChallengeOptions } from '../lib/types';
import { useLanguage } from '../lib/LanguageContext';
import CodeBlock from './CodeBlock';

interface JumpOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackId: string;
  currentQuestion?: Sfida;
  currentIndex: number;
  totalQuestions: number;
  correctAnswers: number;
  isFinished: boolean;
  resultSuccess: boolean;
  promotedLeague: string | null;
  onSelectOption: (index: number) => void;
}

export default function JumpOutModal({
  isOpen,
  onClose,
  trackId,
  currentQuestion,
  currentIndex,
  totalQuestions,
  correctAnswers,
  isFinished,
  resultSuccess,
  promotedLeague,
  onSelectOption
}: JumpOutModalProps) {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-mono select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl ctp-card border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[var(--ctp-surface1)] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Zap className="w-5 h-5 fill-current animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[var(--ctp-text)] flex items-center gap-2">
                  <span>Jump-Out Test (5/5 Challenge)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950">
                    High Stakes
                  </span>
                </h3>
                <p className="text-xs text-[var(--ctp-subtext0)]">
                  {language === 'en' ? 'Get 5/5 correct answers to skip ahead to higher leagues!' : language === 'es' ? '¡Obtén 5/5 respuestas correctas para saltar a ligas superiores!' : 'Ottieni 5/5 risposte esatte per saltare di lega ed ottenere il bonus XP!'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-[var(--ctp-surface0)] text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {!isFinished && currentQuestion ? (
              <div className="space-y-4">
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs text-[var(--ctp-subtext0)]">
                  <span>{language === 'en' ? 'Question' : language === 'es' ? 'Pregunta' : 'Domanda'} {currentIndex + 1} / {totalQuestions}</span>
                  <span className="text-amber-400 font-bold">Score: {correctAnswers}/{currentIndex}</span>
                </div>

                <div className="w-full h-2 rounded-full bg-[var(--ctp-surface0)] overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>

                {/* Question Box */}
                <div className="space-y-3">
                  <div className="text-xs font-bold px-3 py-1 rounded-lg bg-[var(--ctp-surface0)] border border-[var(--ctp-surface1)] inline-block text-[var(--ctp-mauve)]">
                    {currentQuestion.topic || currentQuestion.argomento || 'General'}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[var(--ctp-text)] leading-relaxed">
                    {getChallengeQuestion(currentQuestion, language)}
                  </h4>

                  {(currentQuestion.code || currentQuestion.codice) && (
                    <CodeBlock code={getChallengeCode(currentQuestion)} language={trackId === 'typescript' ? 'typescript' : 'python'} />
                  )}
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {getChallengeOptions(currentQuestion, language).map((opt: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => onSelectOption(idx)}
                      className="p-3.5 rounded-xl border border-[var(--ctp-surface1)] bg-[var(--ctp-mantle)] hover:border-amber-400 hover:bg-amber-400/10 text-left text-xs font-mono text-[var(--ctp-text)] transition-all cursor-pointer shadow-md hover:scale-[1.01]"
                    >
                      <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + idx)})</span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Finish Screen */
              <div className="text-center py-6 space-y-6">
                {resultSuccess ? (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-2xl">
                      <Trophy className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-amber-400">
                      {language === 'en' ? 'JUMP-OUT SUCCESSFUL! 🎉' : language === 'es' ? '¡JUMP-OUT EXITOSO! 🎉' : 'JUMP-OUT RIUSCITO! 🎉'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--ctp-subtext0)] max-w-md mx-auto">
                      {language === 'en' ? 'Perfect 5/5 score! You demonstrated senior competency and unlocked league advancement + 500 Bonus XP.' : language === 'es' ? '¡Puntuación perfecta 5/5! Demostraste competencia senior y desbloqueaste ascenso de liga + 500 XP Bonus.' : 'Punteggio perfetto 5/5! Hai dimostrato competenza avanzata e sbloccato il salto di lega + 500 Bonus XP.'}
                    </p>

                    {promotedLeague && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-400/20 border border-amber-400 text-amber-300 font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Promoted to: {promotedLeague}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
                      <XCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-rose-400">
                      {language === 'en' ? 'Jump-Out Unsuccessful' : language === 'es' ? 'Jump-Out Fallido' : 'Jump-Out Non Superato'}
                    </h3>
                    <p className="text-xs text-[var(--ctp-subtext0)] max-w-md mx-auto">
                      Score: {correctAnswers} / {totalQuestions}. {language === 'en' ? 'You need a perfect 5/5 to jump ahead. Practice chapters and try again!' : language === 'es' ? 'Necesitas un 5/5 perfecto para saltar. ¡Practica y vuelve a intentarlo!' : 'Serve un punteggio di 5/5 per il salto. Ripassa i capitoli e riprova!'}
                    </p>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  {language === 'en' ? 'Close & Return' : language === 'es' ? 'Cerrar y Volver' : 'Chiudi & Ritorna'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
