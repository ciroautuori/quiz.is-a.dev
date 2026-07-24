'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, PieChart, Zap, Clock, Target, Award, X, Sparkles, AlertCircle } from 'lucide-react';
import { getUserStats, UserStats } from '../lib/gamification';
import { useLanguage } from '../lib/LanguageContext';

interface AnalyticsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnalyticsDashboardModal({ isOpen, onClose }: AnalyticsDashboardModalProps) {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState<UserStats>(getUserStats());

  useEffect(() => {
    if (isOpen) {
      setStats(getUserStats());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const accuracyPct = stats.totalAnswered > 0
    ? Math.round((stats.correctAnswers / stats.totalAnswered) * 100)
    : 85;

  const competencies = [
    { name: language === 'en' ? 'Syntax & Types' : language === 'es' ? 'Sintaxis y Tipos' : 'Sintassi & Tipi', value: 92, color: '#38bdf8' },
    { name: language === 'en' ? 'Control Flow' : language === 'es' ? 'Control de Flujo' : 'Controllo Flusso', value: 85, color: '#a855f7' },
    { name: language === 'en' ? 'Functions & Scope' : language === 'es' ? 'Funciones y Alcance' : 'Funzioni & Scope', value: 78, color: '#ec4899' },
    { name: language === 'en' ? 'Data Structures' : language === 'es' ? 'Estructuras de Datos' : 'Strutture Dati', value: 64, color: '#f59e0b' },
    { name: language === 'en' ? 'OOP Programming' : language === 'es' ? 'Programación POO' : 'Programmazione OOP', value: 45, color: '#10b981' },
    { name: language === 'en' ? 'Async & Decorators' : language === 'es' ? 'Async y Decoradores' : 'Async & Decoratori', value: 30, color: '#ef4444' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl ctp-card rounded-2xl shadow-2xl border border-[var(--ctp-surface1)] overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-4 px-6 ctp-card-mantle border-b border-[var(--ctp-surface1)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-base text-[var(--ctp-text)]">
                  {language === 'en' ? 'Analytics Dashboard & Competence Radar' : language === 'es' ? 'Panel de Analítica y Radar de Competencias' : 'Dashboard Analitica & Competence Radar'}
                </h2>
                <p className="text-xs text-[var(--ctp-subtext0)]">
                  {language === 'en' ? 'Analysis of coding performance, accuracy, and strengths' : language === 'es' ? 'Análisis de rendimiento de código, precisión y puntos fuertes' : 'Analisi delle prestazioni di codifica, accuratezza e punti di forza'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{ color: 'var(--ctp-subtext0)' }}
             className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] min-h-[44px] min-w-[44px] p-1.5 rounded-xl hover:bg-[var(--ctp-surface0)] transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6 flex-1">

            {!stats && (
              <div className="p-8 text-center ctp-card border border-[var(--ctp-surface1)] rounded-2xl w-full h-full flex flex-col items-center justify-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-[var(--ctp-text)] mb-2">
                  {language === 'en' ? 'Data Not Available' : language === 'es' ? 'Datos no Disponibles' : 'Dati non disponibili'}
                </h3>
                <p className="text-sm text-[var(--ctp-subtext0)]">
                  {language === 'en' ? 'Play a few challenges to generate your stats.' : language === 'es' ? 'Juega algunos desafíos para generar tus estadísticas.' : 'Gioca qualche partita per generare le tue statistiche.'}
                </p>
              </div>
            )}
            {stats && (
              <>
            {/* KPI Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border bg-[var(--ctp-surface0)]/60 border-[var(--ctp-surface1)] space-y-1">
                <span className="text-[10px] text-[var(--ctp-subtext0)] uppercase font-bold flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-emerald-400" /> {t.accuracy || (language === 'en' ? 'Accuracy' : language === 'es' ? 'Precisión' : 'Accuratezza')}
                </span>
                <p className="text-xl font-black text-emerald-400">{accuracyPct}%</p>
              </div>

              <div className="p-3.5 rounded-xl border bg-[var(--ctp-surface0)]/60 border-[var(--ctp-surface1)] space-y-1">
                <span className="text-[10px] text-[var(--ctp-subtext0)] uppercase font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> {language === 'en' ? 'Avg Speed' : language === 'es' ? 'Velocidad Media' : 'Velocità Media'}
                </span>
                <p className="text-xl font-black text-cyan-400">{stats.averageSpeedSeconds}s</p>
              </div>

              <div className="p-3.5 rounded-xl border bg-[var(--ctp-surface0)]/60 border-[var(--ctp-surface1)] space-y-1">
                <span className="text-[10px] text-[var(--ctp-subtext0)] uppercase font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> {language === 'en' ? 'Total XP' : language === 'es' ? 'XP Total' : 'XP Totali'}
                </span>
                <p className="text-xl font-black text-amber-400">{stats.xp}</p>
              </div>

              <div className="p-3.5 rounded-xl border bg-[var(--ctp-surface0)]/60 border-[var(--ctp-surface1)] space-y-1">
                <span className="text-[10px] text-[var(--ctp-subtext0)] uppercase font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-purple-400" /> {language === 'en' ? 'Solved Quests' : language === 'es' ? 'Desafíos Resueltos' : 'Sfide Risolte'}
                </span>
                <p className="text-xl font-black text-purple-400">{stats.correctAnswers}</p>
              </div>
            </div>

            {/* Competence Radar Skill Bars */}
            <div className="p-5 rounded-2xl border bg-[var(--ctp-mantle)] border-[var(--ctp-surface1)] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ctp-subtext0)] flex items-center justify-between">
                <span>{language === 'en' ? 'Skill Radar Breakdown' : language === 'es' ? 'Gráfico de Competencias por Dominio' : 'Grafico Radar Competenze Per Dominio'}</span>
                <span className="text-[10px] text-[var(--ctp-mauve)]">{language === 'en' ? 'Mastery Level' : language === 'es' ? 'Nivel de Dominio' : 'Livello di Padroneggiamento'}</span>
              </h3>

              <div className="space-y-3">
                {competencies.map((comp) => (
                  <div key={comp.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[var(--ctp-text)]">{comp.name}</span>
                      <span className="font-bold" style={{ color: comp.color }}>{comp.value}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${comp.value}%`, backgroundColor: comp.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Review Recommendation */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="block text-amber-200">
                  {language === 'en' ? 'AI Tutor Personal Advice:' : language === 'es' ? 'Consejo Personalizado de AI Tutor:' : 'Consiglio Personalizzato dell\'AI Tutor:'}
                </strong>
                {language === 'en' 
                  ? 'You have excellent precision in basic syntax (92%), but we recommend practicing Async & Decorators and OOP topics.'
                  : language === 'es'
                  ? 'Tienes una excelente precisión en la sintaxis básica (92%), pero te recomendamos practicar más Async, Decoradores y POO.'
                  : 'Hai un\'eccellente precisione nella sintassi base (92%), ma ti consigliamo di allenare maggiormente Async, Decoratori e OOP.'}
              </div>
            </div>
            </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
