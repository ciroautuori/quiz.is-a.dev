'use client';

import React, { useState, useMemo } from 'react';
import { Sfida, DifficoltaType } from '../lib/types';
import { getQuestionBestTimes } from '../lib/storage';
import CodeBlock from './CodeBlock';
import { 
  Filter, 
  Search, 
  ArrowUpDown, 
  Sparkles, 
  BookOpen, 
  Code, 
  CheckCircle2, 
  Flame, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  SlidersHorizontal,
  Layers,
  Timer,
  Target,
  Shield
} from 'lucide-react';

interface ChallengeFilterProps {
  allQuestions: Sfida[];
  onStartGame: (filteredQuestions: Sfida[], numQuestions: number, chosenDifficulty: DifficoltaType, chosenChapter: number | 'tutti') => void;
}

export default function ChallengeFilter({ allQuestions, onStartGame }: ChallengeFilterProps) {
  // Filter states
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficoltaType>('miste');
  const [selectedChapter, setSelectedChapter] = useState<number | 'tutti'>('tutti');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'capitolo_asc' | 'capitolo_desc' | 'difficolta_asc' | 'difficolta_desc' | 'argomento'>('capitolo_asc');
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [showPreviewList, setShowPreviewList] = useState(false);
  const [previewOpenId, setPreviewOpenId] = useState<string | null>(null);

  // Compute total counts per difficulty
  const counts = useMemo(() => {
    const facile = allQuestions.filter(q => q.difficolta === 'facile').length;
    const media = allQuestions.filter(q => q.difficolta === 'media').length;
    const difficile = allQuestions.filter(q => q.difficolta === 'difficile').length;
    return {
      facile,
      media,
      difficile,
      tutti: allQuestions.length
    };
  }, [allQuestions]);

  // Compute list of unique chapters present in questions
  const availableChapters = useMemo(() => {
    const chapters = Array.from(new Set(allQuestions.map(q => q.capitolo))).sort((a, b) => a - b);
    return chapters;
  }, [allQuestions]);

  // Filter and sort questions
  const filteredQuestions = useMemo(() => {
    let result = [...allQuestions];

    // Filter by difficulty
    if (selectedDifficulty !== 'miste') {
      result = result.filter(q => q.difficolta === selectedDifficulty);
    }

    // Filter by chapter
    if (selectedChapter !== 'tutti') {
      result = result.filter(q => q.capitolo === selectedChapter);
    }

    // Filter by search query (argomento, domanda, codice)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(q => 
        q.argomento.toLowerCase().includes(query) ||
        q.domanda.toLowerCase().includes(query) ||
        (q.codice && q.codice.toLowerCase().includes(query)) ||
        `capitolo ${q.capitolo}`.includes(query)
      );
    }

    // Sorting logic
    const difficultyWeight = { facile: 1, media: 2, difficile: 3 };

    result.sort((a, b) => {
      if (sortBy === 'capitolo_asc') {
        return a.capitolo - b.capitolo;
      }
      if (sortBy === 'capitolo_desc') {
        return b.capitolo - a.capitolo;
      }
      if (sortBy === 'difficolta_asc') {
        return difficultyWeight[a.difficolta] - difficultyWeight[b.difficolta];
      }
      if (sortBy === 'difficolta_desc') {
        return difficultyWeight[b.difficolta] - difficultyWeight[a.difficolta];
      }
      if (sortBy === 'argomento') {
        return a.argomento.localeCompare(b.argomento);
      }
      return 0;
    });

    return result;
  }, [allQuestions, selectedDifficulty, selectedChapter, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedDifficulty('miste');
    setSelectedChapter('tutti');
    setSearchQuery('');
    setSortBy('capitolo_asc');
  };

  const getDifficultyBadge = (diff: 'facile' | 'media' | 'difficile') => {
    switch (diff) {
      case 'facile':
        return (
          <span className="difficulty-badge beginner inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
            <Target className="w-3 h-3 text-[var(--ctp-green)] shrink-0" />
            <span>Beginner</span>
          </span>
        );
      case 'media':
        return (
          <span className="difficulty-badge intermediate inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
            <Zap className="w-3 h-3 text-[var(--ctp-peach)] shrink-0" />
            <span>Intermediate</span>
          </span>
        );
      case 'difficile':
        return (
          <span className="difficulty-badge advanced inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
            <Shield className="w-3 h-3 text-[var(--ctp-red)] shrink-0" />
            <span>Advanced</span>
          </span>
        );
    }
  };

  return (
    <div className="ctp-card rounded-2xl p-5 sm:p-7 shadow-xl space-y-6 border">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5" style={{ borderColor: 'var(--ctp-border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border flex items-center justify-center shadow-inner shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-peach)', borderColor: 'var(--ctp-surface1)' }}>
            <Filter className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono flex items-center gap-2" style={{ color: 'var(--ctp-text)' }}>
              Filtra & Configura le Sfide
            </h2>
            <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
              Seleziona la difficoltà, gli argomenti e ordina i quesiti prima di giocare
            </p>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto ctp-card-mantle border px-3.5 py-1.5 rounded-xl">
          <Layers className="w-4 h-4" style={{ color: 'var(--ctp-mauve)' }} />
          <div className="text-xs font-mono">
            <span style={{ color: 'var(--ctp-subtext0)' }}>Sfide Trovate: </span>
            <span className="font-bold" style={{ color: 'var(--ctp-mauve)' }}>{filteredQuestions.length}</span>
            <span style={{ color: 'var(--ctp-overlay0)' }}> / {allQuestions.length}</span>
          </div>
        </div>
      </div>

      {/* 1. Difficulty Selector Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--ctp-subtext0)' }}>
            <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: 'var(--ctp-peach)' }} />
            <span>Livello di Difficoltà</span>
          </label>
          {(selectedDifficulty !== 'miste' || selectedChapter !== 'tutti' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-[11px] hover:underline font-mono cursor-pointer"
              style={{ color: 'var(--ctp-peach)' }}
            >
              Azzera Filtri
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Facile / Beginner */}
          <button
            type="button"
            onClick={() => setSelectedDifficulty('facile')}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
              selectedDifficulty === 'facile'
                ? 'shadow-lg'
                : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: selectedDifficulty === 'facile' ? 'var(--ctp-surface0)' : 'var(--ctp-mantle)',
              borderColor: selectedDifficulty === 'facile' ? 'var(--ctp-green)' : 'var(--ctp-border)',
              color: 'var(--ctp-text)'
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-mono text-emerald-500 uppercase tracking-wider">🌱 Principiante</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-green)', borderColor: 'var(--ctp-surface2)' }}>
                {counts.facile}
              </span>
            </div>
            <div className="text-sm font-bold">Facile</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--ctp-subtext0)' }}>Sintassi base, tipi & print</div>
          </button>

          {/* Media / Intermediate */}
          <button
            type="button"
            onClick={() => setSelectedDifficulty('media')}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
              selectedDifficulty === 'media'
                ? 'shadow-lg'
                : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: selectedDifficulty === 'media' ? 'var(--ctp-surface0)' : 'var(--ctp-mantle)',
              borderColor: selectedDifficulty === 'media' ? 'var(--ctp-yellow)' : 'var(--ctp-border)',
              color: 'var(--ctp-text)'
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-mono text-amber-500 uppercase tracking-wider">⚡ Intermedio</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-yellow)', borderColor: 'var(--ctp-surface2)' }}>
                {counts.media}
              </span>
            </div>
            <div className="text-sm font-bold">Media</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--ctp-subtext0)' }}>Liste, cicli & funzioni</div>
          </button>

          {/* Difficile / Advanced */}
          <button
            type="button"
            onClick={() => setSelectedDifficulty('difficile')}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
              selectedDifficulty === 'difficile'
                ? 'shadow-lg'
                : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: selectedDifficulty === 'difficile' ? 'var(--ctp-surface0)' : 'var(--ctp-mantle)',
              borderColor: selectedDifficulty === 'difficile' ? 'var(--ctp-red)' : 'var(--ctp-border)',
              color: 'var(--ctp-text)'
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-mono text-rose-500 uppercase tracking-wider">🔥 Avanzato</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-red)', borderColor: 'var(--ctp-surface2)' }}>
                {counts.difficile}
              </span>
            </div>
            <div className="text-sm font-bold">Difficile</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--ctp-subtext0)' }}>Dizionari, classi & errori</div>
          </button>

          {/* Miste / All */}
          <button
            type="button"
            onClick={() => setSelectedDifficulty('miste')}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
              selectedDifficulty === 'miste'
                ? 'shadow-lg'
                : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: selectedDifficulty === 'miste' ? 'var(--ctp-surface0)' : 'var(--ctp-mantle)',
              borderColor: selectedDifficulty === 'miste' ? 'var(--ctp-mauve)' : 'var(--ctp-border)',
              color: 'var(--ctp-text)'
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-mono uppercase tracking-wider" style={{ color: 'var(--ctp-mauve)' }}>🌈 Miste</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-mauve)', borderColor: 'var(--ctp-surface2)' }}>
                {counts.tutti}
              </span>
            </div>
            <div className="text-sm font-bold">Tutti i Livelli</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--ctp-subtext0)' }}>Mix casuale equilibrato</div>
          </button>
        </div>
      </div>

      {/* 2. Chapter Filter, Search Bar & Sorting */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Chapter Filter */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--ctp-subtext0)' }}>
            <BookOpen className="w-3.5 h-3.5" style={{ color: 'var(--ctp-mauve)' }} />
            <span>Capitolo Think Python</span>
          </label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value === 'tutti' ? 'tutti' : Number(e.target.value))}
            className="w-full ctp-input rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none transition-colors"
          >
            <option value="tutti">Tutti i Capitoli ({availableChapters.length} Capitoli)</option>
            {availableChapters.map((cap) => (
              <option key={cap} value={cap}>
                Capitolo {cap}
              </option>
            ))}
          </select>
        </div>

        {/* Search Query Filter */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--ctp-subtext0)' }}>
            <Search className="w-3.5 h-3.5" style={{ color: 'var(--ctp-mauve)' }} />
            <span>Cerca per Parola Chiave</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="es. print, list, dict, class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ctp-input rounded-xl pl-3.5 pr-8 py-2.5 text-sm border focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs hover:opacity-80 cursor-pointer"
                style={{ color: 'var(--ctp-subtext0)' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--ctp-subtext0)' }}>
            <ArrowUpDown className="w-3.5 h-3.5" style={{ color: 'var(--ctp-mauve)' }} />
            <span>Ordina Sfide</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full ctp-input rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none transition-colors"
          >
            <option value="capitolo_asc">Ordina per Capitolo (Crescente 1 → 15)</option>
            <option value="capitolo_desc">Ordina per Capitolo (Decrescente 15 → 1)</option>
            <option value="difficolta_asc">Ordina per Difficoltà (Facile → Difficile)</option>
            <option value="difficolta_desc">Ordina per Difficoltà (Difficile → Facile)</option>
            <option value="argomento">Ordina Alfabetico per Argomento (A → Z)</option>
          </select>
        </div>
      </div>

      {/* 3. Number of questions for session */}
      <div className="border-t pt-4" style={{ borderColor: 'var(--ctp-border)' }}>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--ctp-subtext0)' }}>
          Quante domande vuoi in questa sessione?
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {[5, 10, 15, 20].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNumQuestions(n)}
              className="py-2 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer"
              style={{
                backgroundColor: numQuestions === n ? 'var(--ctp-surface0)' : 'var(--ctp-mantle)',
                borderColor: numQuestions === n ? 'var(--ctp-mauve)' : 'var(--ctp-border)',
                color: numQuestions === n ? 'var(--ctp-mauve)' : 'var(--ctp-subtext0)'
              }}
            >
              {n} Domande
            </button>
          ))}
          <button
            type="button"
            onClick={() => setNumQuestions(filteredQuestions.length || 10)}
            className="py-2 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer"
            style={{
              backgroundColor: numQuestions === filteredQuestions.length ? 'var(--ctp-surface0)' : 'var(--ctp-mantle)',
              borderColor: numQuestions === filteredQuestions.length ? 'var(--ctp-mauve)' : 'var(--ctp-border)',
              color: numQuestions === filteredQuestions.length ? 'var(--ctp-mauve)' : 'var(--ctp-subtext0)'
            }}
          >
            Tutte ({filteredQuestions.length})
          </button>
        </div>
      </div>

      {/* 4. Filtered list preview toggle */}
      <div className="border-t pt-4" style={{ borderColor: 'var(--ctp-border)' }}>
        <button
          type="button"
          onClick={() => setShowPreviewList(!showPreviewList)}
          className="flex items-center justify-between w-full text-xs font-mono ctp-card-mantle p-3 rounded-xl border transition-colors cursor-pointer"
          style={{ color: 'var(--ctp-text)' }}
        >
          <span className="flex items-center gap-2">
            <Code className="w-4 h-4" style={{ color: 'var(--ctp-mauve)' }} />
            <span>Anteprima sfide filtrate ({filteredQuestions.length})</span>
          </span>
          {showPreviewList ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showPreviewList && (
          <div className="mt-3 max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredQuestions.length === 0 ? (
              <div className="p-4 text-center text-xs ctp-card-mantle rounded-xl border">
                Nessuna sfida trovata con i filtri attuali. Prova a modificare le opzioni o azzerare la ricerca.
              </div>
            ) : (
              (() => {
                const bestTimesMap = getQuestionBestTimes();
                return filteredQuestions.map((sfida) => {
                  const isOpen = previewOpenId === sfida.id;
                  const bestTimeSecs = sfida.id ? bestTimesMap[sfida.id] : undefined;

                  return (
                    <div 
                      key={sfida.id}
                      className="ctp-card-mantle border rounded-xl p-3 transition-colors"
                    >
                      <div 
                        onClick={() => setPreviewOpenId(isOpen ? null : sfida.id)}
                        className="flex items-center justify-between cursor-pointer gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-text)', borderColor: 'var(--ctp-surface1)' }}>
                            Cap {sfida.capitolo}
                          </span>
                          <span className="text-xs font-medium truncate" style={{ color: 'var(--ctp-text)' }}>
                            {sfida.argomento} - {sfida.domanda}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {bestTimeSecs !== undefined && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold flex items-center gap-1" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-peach)', borderColor: 'var(--ctp-surface1)' }}>
                              <Timer className="w-3 h-3" />
                              {bestTimeSecs}s
                            </span>
                          )}
                          {getDifficultyBadge(sfida.difficolta)}
                          <span className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
                            {isOpen ? '▲' : '▼'}
                          </span>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="mt-3 pt-2 border-t text-xs space-y-2" style={{ borderColor: 'var(--ctp-border)' }}>
                          {sfida.codice && (
                            <CodeBlock code={sfida.codice} title={`Codice ${sfida.id}`} />
                          )}
                          <div className="italic" style={{ color: 'var(--ctp-subtext0)' }}>
                            💡 Suggerimento: {sfida.suggerimento}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                });
              })()
            )}
          </div>
        )}
      </div>

      {/* 5. Main CTA to Start Game with Filtered Questions */}
      <div className="pt-2">
        <button
          type="button"
          disabled={filteredQuestions.length === 0}
          onClick={() => onStartGame(filteredQuestions, numQuestions, selectedDifficulty, selectedChapter)}
          className="w-full py-4 rounded-xl disabled:opacity-50 font-bold text-base shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
          style={{ backgroundColor: 'var(--ctp-mauve)', color: 'var(--ctp-crust)' }}
        >
          <Sparkles className="w-5 h-5" />
          <span>
            {filteredQuestions.length > 0 
              ? `Inizia Partita con ${Math.min(numQuestions, filteredQuestions.length)} Sfide Selezionate`
              : 'Nessuna Sfida Trovata'}
          </span>
        </button>
      </div>
    </div>
  );
}
