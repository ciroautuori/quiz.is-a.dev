import React, { useState, useMemo } from 'react';
import { Sfida, DifficoltaType } from '../lib/types';
import { getQuestionBestTimes } from '../lib/storage';
import { useLanguage } from '../lib/LanguageContext';
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
  const { t, language } = useLanguage();
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
    const facile = allQuestions.filter(q => (q.difficulty || q.difficolta) === 'facile' || (q.difficulty || q.difficolta) === 'easy').length;
    const media = allQuestions.filter(q => (q.difficulty || q.difficolta) === 'media' || (q.difficulty || q.difficolta) === 'medium').length;
    const difficile = allQuestions.filter(q => (q.difficulty || q.difficolta) === 'difficile' || (q.difficulty || q.difficolta) === 'hard').length;
    return {
      facile,
      media,
      difficile,
      tutti: allQuestions.length
    };
  }, [allQuestions]);

  // Compute list of unique chapters present in questions
  const availableChapters = useMemo(() => {
    const chapters = Array.from(new Set(allQuestions.map(q => q.chapter ?? q.capitolo ?? 1))).sort((a, b) => a - b);
    return chapters;
  }, [allQuestions]);

  // Filter and sort questions
  const filteredQuestions = useMemo(() => {
    let result = [...allQuestions];

    // Filter by difficulty
    if (selectedDifficulty !== 'miste' && selectedDifficulty !== 'mixed') {
      result = result.filter(q => {
        const d = q.difficulty || q.difficolta;
        return d === selectedDifficulty;
      });
    }

    // Filter by chapter
    if (selectedChapter !== 'tutti') {
      result = result.filter(q => (q.chapter ?? q.capitolo ?? 1) === selectedChapter);
    }

    // Filter by search query (argomento, domanda, codice)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(q => {
        const topic = (q.topic || q.argomento || '').toLowerCase();
        const question = (q.question || q.domanda || '').toLowerCase();
        const code = (q.code || q.codice || '').toLowerCase();
        const chapterStr = `capitolo ${q.chapter ?? q.capitolo ?? 1}`;
        return topic.includes(query) || question.includes(query) || code.includes(query) || chapterStr.includes(query);
      });
    }

    // Sorting logic
    const difficultyWeight: Record<string, number> = { facile: 1, easy: 1, media: 2, medium: 2, difficile: 3, hard: 3 };

    result.sort((a, b) => {
      const aCap = a.chapter ?? a.capitolo ?? 1;
      const bCap = b.chapter ?? b.capitolo ?? 1;
      const aDiff = a.difficulty || a.difficolta || 'easy';
      const bDiff = b.difficulty || b.difficolta || 'easy';
      const aTop = a.topic || a.argomento || '';
      const bTop = b.topic || b.argomento || '';

      if (sortBy === 'capitolo_asc') {
        return aCap - bCap;
      }
      if (sortBy === 'capitolo_desc') {
        return bCap - aCap;
      }
      if (sortBy === 'difficolta_asc') {
        return (difficultyWeight[aDiff] || 1) - (difficultyWeight[bDiff] || 1);
      }
      if (sortBy === 'difficolta_desc') {
        return (difficultyWeight[bDiff] || 1) - (difficultyWeight[aDiff] || 1);
      }
      if (sortBy === 'argomento') {
        return aTop.localeCompare(bTop);
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
              {t.filterSectionTitle || 'Filtra & Configura le Sfide'}
            </h2>
            <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
              {t.filterSubtitle || 'Seleziona la difficoltà, gli argomenti e ordina i quesiti prima di giocare'}
            </p>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto ctp-card-mantle border px-3.5 py-1.5 rounded-xl">
          <Layers className="w-4 h-4" style={{ color: 'var(--ctp-mauve)' }} />
          <div className="text-xs font-mono">
            <span style={{ color: 'var(--ctp-subtext0)' }}>{t.challengesFound || 'Sfide Trovate:'} </span>
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
            <span>{t.difficultyLevel || 'Livello di Difficoltà'}</span>
          </label>
          {(selectedDifficulty !== 'miste' || selectedChapter !== 'tutti' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-[11px] hover:underline font-mono cursor-pointer"
              style={{ color: 'var(--ctp-peach)' }}
            >
              {language === 'en' ? 'Reset Filters' : language === 'es' ? 'Restablecer Filtros' : 'Azzera Filtri'}
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
              <span className="text-xs font-bold font-mono text-emerald-500 uppercase tracking-wider">🌱 {t.beginner || (language === 'en' ? 'Beginner' : language === 'es' ? 'Principiante' : 'Principiante')}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-green)', borderColor: 'var(--ctp-surface2)' }}>
                {counts.facile}
              </span>
            </div>
            <div className="text-sm font-bold">{t.facile || (language === 'en' ? 'Easy' : language === 'es' ? 'Fácil' : 'Facile')}</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--ctp-subtext0)' }}>
              {language === 'en' ? 'Basic syntax, types & print' : language === 'es' ? 'Sintaxis básica, tipos e impresión' : 'Sintassi base, tipi & print'}
            </div>
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
              <span className="text-xs font-bold font-mono text-amber-500 uppercase tracking-wider">⚡ {t.intermediate || (language === 'en' ? 'Intermediate' : language === 'es' ? 'Intermedio' : 'Intermedio')}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-yellow)', borderColor: 'var(--ctp-surface2)' }}>
                {counts.media}
              </span>
            </div>
            <div className="text-sm font-bold">{t.media || (language === 'en' ? 'Medium' : language === 'es' ? 'Media' : 'Media')}</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--ctp-subtext0)' }}>
              {language === 'en' ? 'Lists, loops & functions' : language === 'es' ? 'Listas, bucles y funciones' : 'Liste, cicli & funzioni'}
            </div>
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
              <span className="text-xs font-bold font-mono text-rose-500 uppercase tracking-wider">🔥 {t.advanced || (language === 'en' ? 'Advanced' : language === 'es' ? 'Avanzado' : 'Avanzato')}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-red)', borderColor: 'var(--ctp-surface2)' }}>
                {counts.difficile}
              </span>
            </div>
            <div className="text-sm font-bold">{t.difficile || (language === 'en' ? 'Hard' : language === 'es' ? 'Difícil' : 'Difficile')}</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--ctp-subtext0)' }}>
              {language === 'en' ? 'Dictionaries, classes & errors' : language === 'es' ? 'Diccionarios, clases y errores' : 'Dizionari, classi & errori'}
            </div>
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
              <span className="text-xs font-bold font-mono uppercase tracking-wider" style={{ color: 'var(--ctp-mauve)' }}>🌈 {t.mixed || (language === 'en' ? 'Mixed' : language === 'es' ? 'Mixtas' : 'Miste')}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border" style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-mauve)', borderColor: 'var(--ctp-surface2)' }}>
                {counts.tutti}
              </span>
            </div>
            <div className="text-sm font-bold">{t.allLevels || (language === 'en' ? 'All Levels' : language === 'es' ? 'Todos los Niveles' : 'Tutti i Livelli')}</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--ctp-subtext0)' }}>
              {language === 'en' ? 'Balanced random mix' : language === 'es' ? 'Mezcla aleatoria equilibrada' : 'Mix casuale equilibrato'}
            </div>
          </button>
        </div>
      </div>

      {/* 2. Chapter Filter, Search Bar & Sorting */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Chapter Filter */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--ctp-subtext0)' }}>
            <BookOpen className="w-3.5 h-3.5" style={{ color: 'var(--ctp-mauve)' }} />
            <span>{t.chapterFilterLabel || 'Capitolo'}</span>
          </label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value === 'tutti' ? 'tutti' : Number(e.target.value))}
            className="w-full ctp-input rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none transition-colors"
          >
            <option value="tutti">{t.allChaptersOption || 'Tutti i Capitoli'} ({availableChapters.length} {t.chapter || 'Capitoli'})</option>
            {availableChapters.map((cap) => (
              <option key={cap} value={cap}>
                {t.chapter || 'Capitolo'} {cap}
              </option>
            ))}
          </select>
        </div>

        {/* Search Query Filter */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--ctp-subtext0)' }}>
            <Search className="w-3.5 h-3.5" style={{ color: 'var(--ctp-mauve)' }} />
            <span>{t.searchKeyword || 'Cerca per Parola Chiave'}</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={t.searchPlaceholderFilter || "es. print, list, dict, class..."}
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
            <span>{t.sortChallenges || 'Ordina Sfide'}</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full ctp-input rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none transition-colors"
          >
            <option value="capitolo_asc">{t.sortCapAsc || 'Ordina per Capitolo (Crescente 1 → 15)'}</option>
            <option value="capitolo_desc">{t.sortCapDesc || 'Ordina per Capitolo (Decrescente 15 → 1)'}</option>
            <option value="difficolta_asc">{t.sortDiffAsc || 'Ordina per Difficoltà (Facile → Difficile)'}</option>
            <option value="difficolta_desc">{t.sortDiffDesc || 'Ordina per Difficoltà (Difficile → Facile)'}</option>
          </select>
        </div>
      </div>

      {/* 3. Number of questions for session */}
      <div className="border-t pt-4" style={{ borderColor: 'var(--ctp-border)' }}>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--ctp-subtext0)' }}>
          {t.questionsCountLabel || 'Quante domande vuoi in questa sessione?'}
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
              {n} {language === 'en' ? 'Questions' : language === 'es' ? 'Preguntas' : 'Domande'}
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
            {language === 'en' ? 'All' : language === 'es' ? 'Todas' : 'Tutte'} ({filteredQuestions.length})
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
            <span>{language === 'en' ? 'Filtered challenges preview' : language === 'es' ? 'Vista previa de desafíos filtrados' : 'Anteprima sfide filtrate'} ({filteredQuestions.length})</span>
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
                {language === 'en'
                  ? 'No challenges found with current filters. Try changing options or resetting search.'
                  : language === 'es'
                  ? 'No se encontraron desafíos con los filtros actuales. Intenta modificar las opciones o restablecer la búsqueda.'
                  : 'Nessuna sfida trovata con i filtri attuali. Prova a modificare le opzioni o azzerare la ricerca.'}
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
                            Cap {sfida.chapter ?? sfida.capitolo ?? 1}
                          </span>
                          <span className="text-xs font-medium truncate" style={{ color: 'var(--ctp-text)' }}>
                            {sfida.topic || sfida.argomento} - {sfida.question || sfida.domanda}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {bestTimeSecs !== undefined && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold flex items-center gap-1" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-peach)', borderColor: 'var(--ctp-surface1)' }}>
                              <Timer className="w-3 h-3" />
                              {bestTimeSecs}s
                            </span>
                          )}
                          {getDifficultyBadge((sfida.difficulty || sfida.difficolta || 'easy') as any)}
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
                            💡 {t.hint || (language === 'en' ? 'Hint' : language === 'es' ? 'Sugerencia' : 'Suggerimento')}: {sfida.suggerimento}
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
              ? (language === 'en'
                  ? `Start Game with ${Math.min(numQuestions, filteredQuestions.length)} Selected Challenges`
                  : language === 'es'
                  ? `Iniciar Partida con ${Math.min(numQuestions, filteredQuestions.length)} Desafíos Seleccionados`
                  : `Inizia Partita con ${Math.min(numQuestions, filteredQuestions.length)} Sfide Selezionate`)
              : (language === 'en' ? 'No Challenges Found' : language === 'es' ? 'No se encontraron desafíos' : 'Nessuna Sfida Trovata')}
          </span>
        </button>
      </div>
    </div>
  );
}
