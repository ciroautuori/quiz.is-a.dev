'use client';

import React, { useState } from 'react';
import { getConceptsForTrack } from '../lib/concepts';
import { getTrackById, getTrackTitle } from '../lib/tracks';
import { TrackId, Concetto, getConceptTitle, getConceptText } from '../lib/types';
import { useLanguage } from '../lib/LanguageContext';
import { BookOpen, Search, Filter, Lightbulb, ChevronRight, Sparkles } from 'lucide-react';

interface LearnModeProps {
  activeTrackId?: TrackId;
  onOpenAiTutorWithConcept?: (concetto: Concetto) => void;
}

export default function LearnMode({ activeTrackId = 'python', onOpenAiTutorWithConcept }: LearnModeProps) {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [chapterFilter, setChapterFilter] = useState<number | 'tutti'>('tutti');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  const track = getTrackById(activeTrackId);
  const concetti = getConceptsForTrack(activeTrackId);

  const filtered = concetti.filter((c) => {
    const title = getConceptTitle(c, language).toLowerCase();
    const text = getConceptText(c, language).toLowerCase();
    const query = searchTerm.toLowerCase();

    const matchesSearch = title.includes(query) || text.includes(query);
    
    const chapter = c.chapter ?? c.capitolo ?? 1;
    const matchesChapter = chapterFilter === 'tutti' || chapter === chapterFilter;

    return matchesSearch && matchesChapter;
  });

  const availableChapters = Array.from(new Set(concetti.map(c => c.chapter ?? c.capitolo ?? 1)))
    .filter((ch): ch is number => ch !== undefined)
    .sort((a, b) => a - b);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl border flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', borderColor: 'var(--ctp-surface1)' }}>
            {track.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
                {t.learnTab} ({getTrackTitle(track, language)})
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-mauve)', borderColor: 'var(--ctp-surface1)' }}>
                {track.badge}
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
              {track.bookRef}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 pointer-events-none" style={{ color: 'var(--ctp-subtext0)' }} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full ctp-input rounded-xl pl-10 pr-4 py-2.5 text-xs border focus:outline-none transition-colors"
          />
        </div>

        {/* Chapter filter */}
        <div className="relative">
          <Filter className="w-4 h-4 absolute left-3 top-3 pointer-events-none" style={{ color: 'var(--ctp-subtext0)' }} />
          <select
            value={chapterFilter}
            onChange={(e) => setChapterFilter(e.target.value === 'tutti' ? 'tutti' : Number(e.target.value))}
            className="w-full ctp-input rounded-xl pl-9 pr-3 py-2.5 text-xs border focus:outline-none transition-colors appearance-none"
          >
            <option value="tutti">{t.allChapters}</option>
            {availableChapters.map(cap => (
              <option key={cap} value={cap}>{t.chapter} {cap}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Concepts List */}
      <div className="space-y-3">
        {filtered.map((concetto) => {
          const conceptId = concetto.id || concetto.title || concetto.nome || String(Math.random());
          const isOpen = selectedConcept === conceptId;

          return (
            <div
              key={conceptId}
              className="ctp-card border rounded-xl overflow-hidden transition-all"
              style={{
                borderColor: isOpen ? 'var(--ctp-peach)' : 'var(--ctp-border)'
              }}
            >
              <button
                onClick={() => setSelectedConcept(isOpen ? null : conceptId)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0"
                    style={{
                      backgroundColor: isOpen ? 'var(--ctp-peach)' : 'var(--ctp-surface0)',
                      color: isOpen ? 'var(--ctp-crust)' : 'var(--ctp-peach)'
                    }}
                  >
                    C{concetto.chapter ?? concetto.capitolo ?? 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold font-mono" style={{ color: 'var(--ctp-text)' }}>
                      {getConceptTitle(concetto, language)}
                    </h3>
                    <span className="text-[11px]" style={{ color: 'var(--ctp-subtext0)' }}>{t.chapter} {concetto.chapter ?? concetto.capitolo ?? 1} • {track.name}</span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} style={{ color: isOpen ? 'var(--ctp-peach)' : 'var(--ctp-subtext0)' }} />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-2 border-t ctp-card-mantle text-xs leading-relaxed space-y-3" style={{ borderColor: 'var(--ctp-border)', color: 'var(--ctp-text)' }}>
                  <div className="flex items-start gap-2 pt-1">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--ctp-peach)' }} />
                    <p className="flex-1">{getConceptText(concetto, language)}</p>
                  </div>

                  {onOpenAiTutorWithConcept && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => onOpenAiTutorWithConcept(concetto)}
                        className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow hover:scale-105 transition-transform"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                        <span>{t.explainWithAI}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-8 text-center ctp-card rounded-xl border text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
            {t.noConceptsFound}
          </div>
        )}
      </div>
    </div>
  );
}



