'use client';

import React, { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { getTrackById, getTrackTitle, getTrackSubtitle, getTrackDescription } from '../lib/tracks';
import { TrackId, Sfida } from '../lib/types';
import LearnMode from './LearnMode';
import ChallengeFilter from './ChallengeFilter';
import SkillTreeView from './SkillTreeView';
import { 
  BookOpen, 
  Gamepad2, 
  GitBranch, 
  BarChart2, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Terminal,
  Zap
} from 'lucide-react';

interface TechHubViewProps {
  trackId: TrackId;
  allQuestions: Sfida[];
  completedIds: string[];
  onStartMatch: (selectedQuestions: Sfida[]) => void;
  onOpenAiTutor: (initialPrompt?: string) => void;
}

export default function TechHubView({
  trackId,
  allQuestions,
  completedIds,
  onStartMatch,
  onOpenAiTutor
}: TechHubViewProps) {
  const { language, t } = useLanguage();
  const [subTab, setSubTab] = useState<'overview' | 'learn' | 'quests' | 'skill_tree'>('overview');

  const track = getTrackById(trackId);
  const trackQuestions = allQuestions.filter(q => q.trackId === trackId);
  const trackCompletedCount = trackQuestions.filter(q => completedIds.includes(q.id)).length;
  const trackTotalCount = trackQuestions.length;
  const progressPercent = trackTotalCount > 0 ? Math.round((trackCompletedCount / trackTotalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Tech Hub Header Banner */}
      <div className="ctp-card rounded-2xl p-5 sm:p-7 border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden" style={{ borderColor: 'var(--ctp-border)' }}>
        <div className="flex items-start sm:items-center gap-4 z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border flex items-center justify-center text-3xl sm:text-4xl shadow-inner shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', borderColor: 'var(--ctp-surface1)' }}>
            {track.icon}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border" style={{ backgroundColor: 'var(--ctp-mauve)' + '20', color: 'var(--ctp-mauve)', borderColor: 'var(--ctp-mauve)' + '40' }}>
                {track.badge}
              </span>
              <span className="text-xs font-mono text-[var(--ctp-subtext0)] font-semibold">
                {progressPercent}% {t.completed || 'Completato'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight" style={{ color: 'var(--ctp-text)' }}>
              {getTrackTitle(track, language)}
            </h1>
            <p className="text-xs sm:text-sm max-w-xl line-clamp-2" style={{ color: 'var(--ctp-subtext0)' }}>
              {getTrackDescription(track, language)}
            </p>
          </div>
        </div>

        {/* Quick Launch Action Card */}
        <div className="z-10 flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <button
            onClick={() => onStartMatch(trackQuestions.slice(0, 5))}
            className="px-5 py-3 rounded-xl bg-[var(--ctp-mauve)] text-[var(--ctp-crust)] font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Sfida Rapida {track.name} (5 Qs)</span>
          </button>
          <button
            onClick={() => onOpenAiTutor(`Spiegami i concetti fondamentali di ${track.name} e le sue best practice.`)}
            className="px-5 py-2.5 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 font-mono font-bold text-xs flex items-center justify-center gap-2 hover:bg-purple-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'en' ? 'Ask AI DevBot' : language === 'es' ? 'Preguntar a DevBot IA' : 'Chiedi a DevBot IA'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[var(--ctp-surface1)] pb-2 overflow-x-auto no-scrollbar font-mono text-xs">
        <button
          onClick={() => setSubTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
            subTab === 'overview'
              ? 'bg-[var(--ctp-surface0)] text-[var(--ctp-mauve)] border border-[var(--ctp-mauve)]/40 shadow-sm'
              : 'text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] hover:bg-[var(--ctp-surface0)]/50'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>{language === 'en' ? 'Overview' : language === 'es' ? 'Resumen' : 'Panoramica'}</span>
        </button>

        <button
          onClick={() => setSubTab('learn')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
            subTab === 'learn'
              ? 'bg-[var(--ctp-surface0)] text-[var(--ctp-mauve)] border border-[var(--ctp-mauve)]/40 shadow-sm'
              : 'text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] hover:bg-[var(--ctp-surface0)]/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.learnTab || (language === 'en' ? 'Learn Mode' : language === 'es' ? 'Modo Aprender' : 'Modalità Impara')}</span>
        </button>

        <button
          onClick={() => setSubTab('quests')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
            subTab === 'quests'
              ? 'bg-[var(--ctp-surface0)] text-[var(--ctp-mauve)] border border-[var(--ctp-mauve)]/40 shadow-sm'
              : 'text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] hover:bg-[var(--ctp-surface0)]/50'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>{language === 'en' ? 'Play & Challenge' : language === 'es' ? 'Jugar y Desafiar' : 'Gioca & Sfida'}</span>
        </button>

        <button
          onClick={() => setSubTab('skill_tree')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
            subTab === 'skill_tree'
              ? 'bg-[var(--ctp-surface0)] text-[var(--ctp-mauve)] border border-[var(--ctp-mauve)]/40 shadow-sm'
              : 'text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] hover:bg-[var(--ctp-surface0)]/50'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>{t.skillTreeMap || 'Skill Tree'}</span>
        </button>
      </div>

      {/* Sub-Tab Content Rendering */}
      {subTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Track Progress Card */}
            <div className="p-6 rounded-2xl ctp-card border space-y-4" style={{ borderColor: 'var(--ctp-border)' }}>
              <h3 className="font-mono font-bold text-sm text-[var(--ctp-text)] flex items-center justify-between">
                <span>{language === 'en' ? 'Progress Status' : language === 'es' ? 'Estado de Progreso' : 'Stato di Avanzamento'} {track.name}</span>
                <span className="text-xs text-[var(--ctp-mauve)]">{trackCompletedCount} / {trackTotalCount} {language === 'en' ? 'Challenges' : language === 'es' ? 'Desafíos' : 'Sfide'}</span>
              </h3>
              <div className="w-full h-3 rounded-full bg-[var(--ctp-surface0)] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-[var(--ctp-subtext0)] leading-relaxed">
                {track.bookRef ? `${language === 'en' ? 'Main educational reference:' : language === 'es' ? 'Referencia didáctica principal:' : 'Riferimento didattico principale:'} ${track.bookRef}. ` : ''}
                {language === 'en' ? 'Complete theory lessons in the Learn tab and run checkpoint quizzes to level up.' : language === 'es' ? 'Completa lecciones teóricas en la pestaña Aprender y ejecuta cuestionarios para subir de nivel.' : 'Completa lezioni teoriche nella scheda Impara ed esegui checkpoint quiz per avanzare di livello.'}
              </p>
            </div>

            {/* Sub-tab shortcuts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setSubTab('learn')}
                className="p-5 rounded-2xl border ctp-card-mantle hover:border-[var(--ctp-mauve)] transition-all text-left space-y-2 cursor-pointer group"
                style={{ borderColor: 'var(--ctp-border)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-mono font-bold text-sm text-[var(--ctp-text)]">{language === 'en' ? 'Lessons & Code Sandbox' : language === 'es' ? 'Lecciones y Code Sandbox' : 'Lezioni & Code Sandbox'}</h4>
                <p className="text-xs text-[var(--ctp-subtext0)]">{language === 'en' ? 'Explore theory step-by-step and run real code in-browser.' : language === 'es' ? 'Explora la teoría paso a paso y ejecuta código real en el navegador.' : 'Esplora la teoria passo-passo ed esegui codice reale in-browser.'}</p>
              </button>

              <button
                onClick={() => setSubTab('quests')}
                className="p-5 rounded-2xl border ctp-card-mantle hover:border-[var(--ctp-mauve)] transition-all text-left space-y-2 cursor-pointer group"
                style={{ borderColor: 'var(--ctp-border)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold">
                  <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-mono font-bold text-sm text-[var(--ctp-text)]">{language === 'en' ? 'Filterable Quiz Challenges' : language === 'es' ? 'Desafíos de Cuestionarios Filtrables' : 'Sfide Quiz Filtrabili'}</h4>
                <p className="text-xs text-[var(--ctp-subtext0)]">{language === 'en' ? 'Configure quiz sessions by topic and difficulty to earn XP.' : language === 'es' ? 'Configura sesiones de prueba por tema y dificultad para ganar XP.' : 'Configura sessioni di test per argomento e difficoltà per guadagnare XP.'}</p>
              </button>
            </div>
          </div>

          {/* Sidebar Stats & Info */}
          <div className="space-y-6">
            <div className="p-5 rounded-2xl ctp-card border space-y-3 font-mono text-xs" style={{ borderColor: 'var(--ctp-border)' }}>
              <div className="font-bold text-xs uppercase text-[var(--ctp-subtext0)]">{language === 'en' ? 'Track Info' : language === 'es' ? 'Información del Trac' : 'Info Tracciato'}</div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--ctp-surface1)]">
                <span className="text-[var(--ctp-subtext0)]">{language === 'en' ? 'Technology:' : language === 'es' ? 'Tecnología:' : 'Tecnologia:'}</span>
                <span className="font-bold text-[var(--ctp-text)]">{track.name}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--ctp-surface1)]">
                <span className="text-[var(--ctp-subtext0)]">{language === 'en' ? 'Sandbox Language:' : language === 'es' ? 'Lenguaje Sandbox:' : 'Linguaggio Sandbox:'}</span>
                <span className="font-bold text-[var(--ctp-mauve)]">{track.codeLang}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[var(--ctp-subtext0)]">{language === 'en' ? 'Total Questions:' : language === 'es' ? 'Total de Preguntas:' : 'Totale Domande:'}</span>
                <span className="font-bold text-[var(--ctp-text)]">{trackTotalCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'learn' && (
        <LearnMode 
          trackId={trackId}
          onOpenAiTutor={onOpenAiTutor}
        />
      )}

      {subTab === 'quests' && (
        <ChallengeFilter 
          allQuestions={trackQuestions}
          onStartGame={(filtered) => onStartMatch(filtered)}
        />
      )}

      {subTab === 'skill_tree' && (
        <SkillTreeView 
          trackId={trackId}
          completedIds={completedIds}
        />
      )}
    </div>
  );
}
