'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, X, AlertCircle, Play, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { Sfida } from '../lib/types';
import { soundEngine } from '../lib/soundEngine';

interface AiQuestGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestGenerated: (quest: Sfida) => void;
}

export default function AiQuestGeneratorModal({
  isOpen,
  onClose,
  onQuestGenerated
}: AiQuestGeneratorModalProps) {
  const { language, t } = useLanguage();
  const [topic, setTopic] = useState('Decoratori e Metaprogrammazione');
  const [difficulty, setDifficulty] = useState<'facile' | 'media' | 'difficile'>('media');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/generate-quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          difficulty,
          trackId: 'python',
          language
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Generazione fallita');
      }

      soundEngine.playLevelUp();
      onQuestGenerated(data.quest);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Errore nella generazione della sfida AI');
      soundEngine.playWrong();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg ctp-card rounded-2xl shadow-2xl border border-[var(--ctp-surface1)] overflow-hidden flex flex-col font-mono"
        >
          {/* Header */}
          <div className="p-4 px-6 ctp-card-mantle border-b border-[var(--ctp-surface1)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-600 flex items-center justify-center text-white shadow-lg">
                <Wand2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--ctp-text)' }}>
                  AI Dynamic Quest Generator
                </h2>
                <p className="text-[11px]" style={{ color: 'var(--ctp-subtext0)' }}>
                  Crea sfide e test case infiniti e personalizzati con Gemini AI
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-[var(--ctp-surface0)] transition-colors cursor-pointer"
              style={{ color: 'var(--ctp-subtext0)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-[var(--ctp-subtext0)] mb-1.5 block">
                Argomento Specifico o Punto Debole:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="es. List Comprehension, Asyncio, Decoratori..."
                className="w-full ctp-input text-xs rounded-xl p-3 border focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--ctp-subtext0)] mb-1.5 block">
                Livello di Difficoltà:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['facile', 'media', 'difficile'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer capitalize ${
                      difficulty === lvl
                        ? 'bg-[var(--ctp-mauve)] text-white border-[var(--ctp-mauve)] shadow-md'
                        : 'ctp-card'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 px-6 ctp-card-mantle border-t border-[var(--ctp-surface1)] flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                  <span>{t.aiThinking || 'Generazione in corso...'}</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-amber-300" />
                  <span>{t.generateAiQuestNow || 'Genera Sfida AI ora'}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
