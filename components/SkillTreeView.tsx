'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock, Play, Sparkles, BookOpen, ChevronRight, Award, Zap } from 'lucide-react';
import { Sfida } from '../lib/types';
import { soundEngine } from '../lib/soundEngine';

interface SkillNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredXp: number;
  unlocked: boolean;
  completed: boolean;
  totalChallenges: number;
  completedChallenges: number;
  chapterNumber: number;
}

const SKILL_NODES: SkillNode[] = [
  {
    id: 'variables',
    title: 'Variabili e Tipi Primitivi',
    description: 'Master int, float, string, bool e la memoria in Python',
    icon: '📦',
    requiredXp: 0,
    unlocked: true,
    completed: true,
    totalChallenges: 8,
    completedChallenges: 8,
    chapterNumber: 1
  },
  {
    id: 'control_flow',
    title: 'Controllo di Flusso (If/Else & Loop)',
    description: 'Condizionali, cicli for/while e gestione del flusso',
    icon: '🔀',
    requiredXp: 50,
    unlocked: true,
    completed: true,
    totalChallenges: 10,
    completedChallenges: 8,
    chapterNumber: 2
  },
  {
    id: 'functions',
    title: 'Funzioni e Ambito (Scope)',
    description: 'Parametri, return, scope e funzioni lambda',
    icon: '⚙️',
    requiredXp: 150,
    unlocked: true,
    completed: false,
    totalChallenges: 12,
    completedChallenges: 6,
    chapterNumber: 3
  },
  {
    id: 'data_structures',
    title: 'Strutture Dati Avanzate',
    description: 'Liste, Tuple, Dizionari e Set Comprehensions',
    icon: '🗂️',
    requiredXp: 300,
    unlocked: true,
    completed: false,
    totalChallenges: 15,
    completedChallenges: 4,
    chapterNumber: 4
  },
  {
    id: 'oop',
    title: 'Programmazione a Oggetti (OOP)',
    description: 'Classi, Ereditarietà, Polimorfismo ed Incapsulamento',
    icon: '🏗️',
    requiredXp: 500,
    unlocked: false,
    completed: false,
    totalChallenges: 14,
    completedChallenges: 0,
    chapterNumber: 5
  },
  {
    id: 'advanced_async',
    title: 'Decoratori, Generatori & Asyncio',
    description: 'Metaprogrammazione, generatori lazy ed asincronia',
    icon: '⚡',
    requiredXp: 800,
    unlocked: false,
    completed: false,
    totalChallenges: 16,
    completedChallenges: 0,
    chapterNumber: 6
  }
];

import { useLanguage } from '../lib/LanguageContext';

interface SkillTreeViewProps {
  onSelectChapter?: (chapter: number) => void;
  trackId?: string;
  completedIds?: string[];
}

export default function SkillTreeView({ onSelectChapter, trackId = 'python', completedIds }: SkillTreeViewProps) {
  const { language } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(SKILL_NODES[0]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 p-2 sm:p-4 font-mono">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl ctp-card border border-[var(--ctp-surface1)] shadow-xl relative overflow-hidden bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-xl text-2xl">
            🌳
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[var(--ctp-text)] flex items-center gap-2">
              Skill Tree ad Albero Nodale (Percorso RPG)
            </h2>
            <p className="text-xs text-[var(--ctp-subtext0)]">
              Visualizza i nodi di competenza, sblocca nuovi moduli e padroneggia la sintassi passo dopo passo.
            </p>
          </div>
        </div>
      </div>

      {/* Nodes Map Visualization */}
      <div className="relative py-8 px-4 flex flex-col items-center space-y-12">
        
      {SKILL_NODES.length === 0 && (
        <div className="p-8 text-center ctp-card border border-[var(--ctp-surface1)] rounded-2xl w-full max-w-lg mx-auto">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-bold text-[var(--ctp-text)] mb-2">{language === 'en' ? 'No Modules Available' : language === 'es' ? 'No hay módulos disponibles' : 'Nessun modulo disponibile'}</h3>
          <p className="text-sm text-[var(--ctp-subtext0)]">{language === 'en' ? 'Unable to load skill tree.' : language === 'es' ? 'No se pudo cargar el árbol de competencias.' : "Impossibile caricare l'albero delle competenze."}</p>
        </div>
      )}

        {SKILL_NODES.map((node, idx) => {
          const isSelected = selectedNode?.id === node.id;
          const progressPct = Math.round((node.completedChallenges / node.totalChallenges) * 100);

          return (
            <div key={node.id} className="relative flex flex-col items-center w-full max-w-lg">
              {/* Connector line to next node */}
              {idx < SKILL_NODES.length - 1 && (
                <div className="absolute top-16 w-1 h-12 bg-gradient-to-b from-[var(--ctp-mauve)] to-[var(--ctp-surface1)] z-0 rounded-full" />
              )}

              {/* Node Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSelectedNode(node);
                  soundEngine.playTick();
                }}
                className={`z-10 w-full p-4 rounded-2xl border cursor-pointer transition-all shadow-lg flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-[var(--ctp-surface0)] border-[var(--ctp-mauve)] ring-2 ring-[var(--ctp-mauve)]/40'
                    : node.unlocked
                    ? 'ctp-card border-[var(--ctp-surface1)] hover:border-[var(--ctp-mauve)]'
                    : 'bg-[var(--ctp-mantle)] border-[var(--ctp-surface0)] opacity-60'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border ${
                    node.completed
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : node.unlocked
                      ? 'bg-[var(--ctp-mauve)]/10 border-[var(--ctp-mauve)]/30'
                      : 'bg-slate-800 border-slate-700'
                  }`}>
                    {node.unlocked ? node.icon : <Lock className="w-5 h-5 text-slate-400" />}
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[var(--ctp-text)] flex items-center gap-2">
                      <span>Cap. {node.chapterNumber}: {node.title}</span>
                      {node.completed && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </h3>
                    <p className="text-[11px] text-[var(--ctp-subtext0)] line-clamp-1">
                      {node.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[var(--ctp-mauve)]">
                    {progressPct}%
                  </span>
                  <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                    <div className="bg-[var(--ctp-mauve)] h-full" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Node Detail Sheet */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl ctp-card border border-[var(--ctp-surface1)] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-[var(--ctp-text)] flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-xl">{selectedNode.icon}</span>
              <span>Dettagli Modulo: Capitolo {selectedNode.chapterNumber}</span>
            </h4>
            <p className="text-xs text-[var(--ctp-subtext0)]">
              {selectedNode.description} ({selectedNode.completedChallenges}/{selectedNode.totalChallenges} sfide completate)
            </p>
          </div>

          <button
            onClick={() => onSelectChapter?.(selectedNode.chapterNumber)}
            className="px-6 py-2.5 rounded-xl bg-[var(--ctp-mauve)] hover:opacity-90 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer shrink-0 transition-transform hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Avvia Esercizi Capitolo {selectedNode.chapterNumber}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
