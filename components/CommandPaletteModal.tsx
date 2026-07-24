'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Zap, GitBranch, Users, Swords, Flame, BarChart3, GraduationCap, Sparkles, Moon, Sun, Volume2, VolumeX, Maximize2, Terminal, Command, X } from 'lucide-react';
import { soundEngine } from '../lib/soundEngine';
import { useLanguage } from '../lib/LanguageContext';

export interface CommandPaletteAction {
  id: string;
  title: string;
  description: string;
  category: 'navigation' | 'tools' | 'settings';
  icon: React.ReactNode;
  shortcut?: string;
  perform: () => void;
}

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  actions: CommandPaletteAction[];
}

export default function CommandPaletteModal({
  isOpen,
  onClose,
  actions
}: CommandPaletteModalProps) {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredActions = actions.filter((action) => {
    const q = query.toLowerCase().trim();
    return (
      action.title.toLowerCase().includes(q) ||
      action.description.toLowerCase().includes(q) ||
      action.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        soundEngine.playTick();
        filteredActions[selectedIndex].perform();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl ctp-card-mantle border border-[var(--ctp-surface2)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header / Input */}
            <div className="p-3.5 border-b border-[var(--ctp-surface1)] flex items-center gap-3 bg-[var(--ctp-surface0)]">
              <Search className="w-5 h-5 text-[var(--ctp-mauve)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  language === 'en'
                    ? 'Search commands or select an action... (e.g. WASM, Skill Tree, Theme)'
                    : language === 'es'
                    ? 'Buscar comandos o seleccionar una acción... (ej. WASM, Skill Tree, Theme)'
                    : "Cerca comandi o seleziona un'azione... (es. WASM, Skill Tree, Theme)"
                }
                className="w-full bg-transparent text-sm font-mono focus:outline-none placeholder:text-[var(--ctp-overlay0)] text-[var(--ctp-text)]"
              />
              <button
                onClick={onClose}
                className="p-1 text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] rounded-lg hover:bg-[var(--ctp-surface1)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="p-2 overflow-y-auto max-h-[380px] divide-y divide-[var(--ctp-surface1)]/30 font-mono">
              {filteredActions.length === 0 ? (
                <div className="p-8 text-center text-xs text-[var(--ctp-subtext0)] font-sans">
                  {language === 'en'
                    ? `No commands found for "${query}"`
                    : language === 'es'
                    ? `No se encontraron comandos para "${query}"`
                    : `Nessun comando trovato per "${query}"`}
                </div>
              ) : (
                filteredActions.map((action, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={action.id}
                      onClick={() => {
                        soundEngine.playTick();
                        action.perform();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[var(--ctp-mauve)]/15 border border-[var(--ctp-mauve)]/40 text-[var(--ctp-text)] shadow-sm'
                          : 'hover:bg-[var(--ctp-surface0)] text-[var(--ctp-subtext0)] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-[var(--ctp-mauve)] text-white' : 'bg-[var(--ctp-surface0)] text-[var(--ctp-mauve)]'}`}>
                          {action.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate text-[var(--ctp-text)]">{action.title}</div>
                          <div className="text-[10px] text-[var(--ctp-subtext0)] truncate">{action.category}</div>
                        </div>
                      </div>

                      {action.shortcut && (
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded bg-[var(--ctp-surface0)] border border-[var(--ctp-surface1)] text-[var(--ctp-subtext0)] shrink-0">
                          {action.shortcut}
                        </kbd>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 border-t border-[var(--ctp-surface1)] bg-[var(--ctp-surface0)] flex items-center justify-between text-[11px] text-[var(--ctp-overlay0)] font-mono">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1 rounded bg-[var(--ctp-surface1)] text-[10px]">↑↓</kbd> {language === 'en' ? 'Navigate' : language === 'es' ? 'Navegar' : 'Naviga'}</span>
                <span><kbd className="px-1 rounded bg-[var(--ctp-surface1)] text-[10px]">↵</kbd> {language === 'en' ? 'Select' : language === 'es' ? 'Seleccionar' : 'Seleziona'}</span>
                <span><kbd className="px-1 rounded bg-[var(--ctp-surface1)] text-[10px]">esc</kbd> {language === 'en' ? 'Close' : language === 'es' ? 'Cerrar' : 'Chiudi'}</span>
              </div>
              <div className="flex items-center gap-1 text-[var(--ctp-mauve)] font-bold">
                <Command className="w-3 h-3" />
                <span>Command Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
