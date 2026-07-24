'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Zap } from 'lucide-react';
import { Sfida } from '../lib/types';
import { soundEngine } from '../lib/soundEngine';
import { useLanguage } from '../lib/LanguageContext';

export interface LessonNode {
  id: string;
  chapterNumber: number;
  title: string;
  title_en?: string;
  title_es?: string;
  description: string;
  description_en?: string;
  description_es?: string;
  icon: string;
  requiredXp: number;
  totalChallenges: number;
  completedChallenges: number;
  unlocked: boolean;
  completed: boolean;
}

interface TrackLessonPathProps {
  trackId: string;
  completedIds: string[];
  allQuestions: Sfida[];
  onSelectNode: (chapterNumber: number) => void;
  onOpenJumpOutModal?: () => void;
}

export default function TrackLessonPath({
  trackId,
  completedIds,
  allQuestions,
  onSelectNode,
  onOpenJumpOutModal
}: TrackLessonPathProps) {
  const { language } = useLanguage();

  // Filter questions for current track
  const trackQuestions = allQuestions.filter(q => q.trackId === trackId);

  // Group into chapters (1 to 5)
  const chapters = [1, 2, 3, 4, 5];

  const nodes: LessonNode[] = chapters.map((chNum) => {
    const chQuestions = trackQuestions.filter(q => q.capitolo === chNum);
    const completedCount = chQuestions.filter(q => completedIds.includes(q.id)).length;
    const totalCount = Math.max(1, chQuestions.length);
    const isCompleted = completedCount >= totalCount && totalCount > 0;

    // Previous chapter must be completed or chNum === 1
    const prevChQuestions = trackQuestions.filter(q => q.capitolo === chNum - 1);
    const prevCompletedCount = prevChQuestions.filter(q => completedIds.includes(q.id)).length;
    const isUnlocked = chNum === 1 || (prevCompletedCount > 0);

    const titles: Record<number, { it: string; en: string; es: string }> = {
      1: { it: 'Sintassi & Tipi Primitivi', en: 'Syntax & Primitive Types', es: 'Sintaxis y Tipos Primitivos' },
      2: { it: 'Strutture di Controllo & Cicli', en: 'Control Flow & Loops', es: 'Estructuras de Control y Ciclos' },
      3: { it: 'Funzioni & Scope', en: 'Functions & Scope', es: 'Funciones y Alcance' },
      4: { it: 'Strutture Dati & Collezioni', en: 'Data Structures & Collections', es: 'Estructuras de Datos y Colecciones' },
      5: { it: 'Programmazione a Oggetti & Moduli', en: 'OOP & Modules', es: 'Programación Orientada a Objetos y Módulos' }
    };

    const descs: Record<number, { it: string; en: string; es: string }> = {
      1: { it: 'Padroneggia le basi fondamentali ed i tipi di dati.', en: 'Master fundamentals and core data types.', es: 'Domina los fundamentos y tipos de datos.' },
      2: { it: 'Impara if/else, for e while loop con sfide pratiche.', en: 'Learn if/else, for and while loops with practice.', es: 'Aprende if/else, bucles for y while con práctica.' },
      3: { it: 'Definisci funzioni pure, lambda e parametri.', en: 'Define pure functions, lambdas and arguments.', es: 'Define funciones puras, lambdas y parámetros.' },
      4: { it: 'Gestisci liste, dizionari, insiemi e tuple.', en: 'Manipulate lists, dicts, sets and tuples.', es: 'Maneja listas, diccionarios, conjuntos y tuplas.' },
      5: { it: 'Crea classi, eredarietà e pattern avanzati.', en: 'Create classes, inheritance and advanced patterns.', es: 'Crea clases, herencia y patrones avanzados.' }
    };

    const icons = ['🌱', '⚡', '📦', '🎯', '👑'];

    const tObj = titles[chNum] || { it: `Capitolo ${chNum}`, en: `Chapter ${chNum}`, es: `Capítulo ${chNum}` };
    const dObj = descs[chNum] || { it: 'Modulo di apprendimento didattico.', en: 'Educational learning module.', es: 'Módulo de aprendizaje didáctico.' };

    return {
      id: `node_ch_${chNum}`,
      chapterNumber: chNum,
      title: tObj.it,
      title_en: tObj.en,
      title_es: tObj.es,
      description: dObj.it,
      description_en: dObj.en,
      description_es: dObj.es,
      icon: icons[chNum - 1] || '📘',
      requiredXp: chNum * 50,
      totalChallenges: totalCount,
      completedChallenges: completedCount,
      unlocked: isUnlocked,
      completed: isCompleted
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-mono py-4">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl ctp-card border border-[var(--ctp-surface1)] shadow-xl relative overflow-hidden bg-gradient-to-r from-purple-900/40 via-indigo-900/20 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl text-3xl shrink-0">
            🗺️
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[var(--ctp-text)] flex items-center justify-center sm:justify-start gap-2">
              <span>{language === 'en' ? 'Sequential Learning Path' : language === 'es' ? 'Ruta de Aprendizaje Secuencial' : 'Percorso di Apprendimento Sequenziale'}</span>
            </h2>
            <p className="text-xs text-[var(--ctp-subtext0)] mt-1">
              {language === 'en' ? 'Complete nodes in sequence to unlock chapters or take the Jump-Out Test!' : language === 'es' ? '¡Completa módulos en secuencia o toma la prueba Jump-Out!' : 'Completa i nodi in sequenza per sbloccare i capitoli o tenta il Jump-Out Test!'}
            </p>
          </div>
        </div>

        {onOpenJumpOutModal && (
          <button
            onClick={onOpenJumpOutModal}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{language === 'en' ? 'Jump-Out Test (Skip Ahead)' : language === 'es' ? 'Prueba Jump-Out (Saltar)' : 'Jump-Out Test (Salta Livello)'}</span>
          </button>
        )}
      </div>

      {/* Path Nodes List (Duolingo-style zigzag) */}
      <div className="relative py-4 flex flex-col items-center space-y-10">
        {nodes.map((node, index) => {
          const isOdd = index % 2 !== 0;
          const getNodeTitle = () => language === 'en' ? node.title_en : language === 'es' ? node.title_es : node.title;
          const getNodeDesc = () => language === 'en' ? node.description_en : language === 'es' ? node.description_es : node.description;

          return (
            <div key={node.id} className="relative flex flex-col items-center w-full max-w-md">
              {/* Connector Line to next node */}
              {index < nodes.length - 1 && (
                <div className="absolute top-20 w-1.5 h-14 bg-[var(--ctp-surface1)] rounded-full -z-0">
                  <div 
                    className="w-full bg-[var(--ctp-mauve)] rounded-full transition-all duration-500" 
                    style={{ height: node.completed ? '100%' : '0%' }}
                  />
                </div>
              )}

              {/* Node Card Container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  if (node.unlocked) {
                    soundEngine.playTick();
                    onSelectNode(node.chapterNumber);
                  } else {
                    soundEngine.playWrong();
                  }
                }}
                className={`relative z-10 w-full p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 shadow-xl ${
                  node.completed
                    ? 'bg-[var(--ctp-surface0)]/80 border-[var(--ctp-green)] hover:border-[var(--ctp-green)]'
                    : node.unlocked
                    ? 'ctp-card border-[var(--ctp-mauve)] hover:scale-105'
                    : 'bg-[var(--ctp-mantle)]/60 border-[var(--ctp-surface1)] opacity-60 cursor-not-allowed'
                } ${isOdd ? 'sm:translate-x-6' : 'sm:-translate-x-6'}`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon Circle */}
                  <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 border ${
                    node.completed
                      ? 'bg-[var(--ctp-green)]/15 border-[var(--ctp-green)] text-[var(--ctp-green)]'
                      : node.unlocked
                      ? 'bg-[var(--ctp-mauve)]/15 border-[var(--ctp-mauve)] text-[var(--ctp-mauve)]'
                      : 'bg-[var(--ctp-surface0)] border-[var(--ctp-surface1)] text-slate-500'
                  }`}>
                    <span>{node.icon}</span>
                    {node.completed && (
                      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[var(--ctp-green)] text-slate-950 flex items-center justify-center text-xs shadow-md font-bold">
                        ✓
                      </span>
                    )}
                    {!node.unlocked && (
                      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[var(--ctp-surface1)] text-[var(--ctp-subtext0)] flex items-center justify-center text-xs shadow-md">
                        <Lock className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  {/* Title & Stats */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--ctp-surface1)] text-[var(--ctp-mauve)]">
                        {language === 'en' ? 'Chapter' : language === 'es' ? 'Capítulo' : 'Capitolo'} {node.chapterNumber}
                      </span>
                      {node.completed && (
                        <span className="text-[10px] font-bold text-[var(--ctp-green)]">
                          {language === 'en' ? 'Completed' : language === 'es' ? 'Completado' : 'Completato'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-[var(--ctp-text)]">
                      {getNodeTitle()}
                    </h3>
                    <p className="text-xs text-[var(--ctp-subtext0)] line-clamp-1">
                      {getNodeDesc()}
                    </p>
                  </div>
                </div>

                {/* Arrow / Action indicator */}
                <div className="shrink-0">
                  {node.unlocked ? (
                    <div className="w-9 h-9 rounded-xl bg-[var(--ctp-mauve)]/10 border border-[var(--ctp-mauve)]/30 text-[var(--ctp-mauve)] flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  ) : (
                    <Lock className="w-4 h-4 text-[var(--ctp-overlay0)]" />
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
