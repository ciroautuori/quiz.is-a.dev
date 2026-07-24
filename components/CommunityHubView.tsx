'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ThumbsUp, Plus, Code, Play, CheckCircle2, Search, Sparkles, Send } from 'lucide-react';
import { Sfida, normalizeChallenge, getChallengeQuestion, getChallengeTopic, getChallengeCode, getChallengeOptions, getChallengeExplanation } from '../lib/types';
import { soundEngine } from '../lib/soundEngine';
import { useLanguage } from '../lib/LanguageContext';

import { saveCustomQuestion } from '../lib/storage';

interface CommunityChallenge extends Sfida {
  author: string;
  upvotes: number;
  hasUpvoted?: boolean;
  isCreator?: boolean;
}

const INITIAL_COMMUNITY_CHALLENGES: CommunityChallenge[] = [
  normalizeChallenge({
    id: 'ugc_1',
    capitolo: 99,
    argomento: 'Trappola delle Liste Mutabili',
    topic_en: 'Mutable List Trap',
    topic_es: 'Trampa de Listas Mutables',
    domanda: 'Cosa stampa il seguente codice quando usiamo una lista come valore predefinito di un parametro?',
    question_en: 'What does the following code print when using a list as a default parameter value?',
    question_es: '¿Qué imprime el siguiente código cuando usamos una lista como valor predeterminado?',
    codice: `def add_item(val, target=[]):
    target.append(val)
    return target

print(add_item(1))
print(add_item(2))`,
    risposte: ['[1] poi [2]', '[1] poi [1, 2]', 'Error: SyntaxError', '[[1], [2]]'],
    options_en: ['[1] then [2]', '[1] then [1, 2]', 'Error: SyntaxError', '[[1], [2]]'],
    options_es: ['[1] luego [2]', '[1] luego [1, 2]', 'Error: SyntaxError', '[[1], [2]]'],
    indice_corretto: 1,
    spiegazione: 'I valori predefiniti delle funzioni in Python sono valutati una sola volta al momento della definizione!',
    explanation_en: 'Default argument values in Python are evaluated once at function definition time!',
    explanation_es: '¡Los valores predeterminados de funciones en Python se evalúan una sola vez al definir la función!',
    suggerimento: 'Ricorda che gli oggetti mutabili mantengono il riferimento tra una chiamata e l\'altra.',
    difficolta: 'media',
    trackId: 'python',
    author: 'DevPython_99',
    upvotes: 42,
    isCreator: true
  }) as CommunityChallenge,
  normalizeChallenge({
    id: 'ugc_2',
    capitolo: 99,
    argomento: 'Inversione di una Stringa con Slicing',
    topic_en: 'String Reversal via Slicing',
    topic_es: 'Inversión de Cadena con Slicing',
    domanda: 'Qual è il modo idiomatico per invertire una stringa s in Python?',
    question_en: 'What is the idiomatic way to reverse a string s in Python?',
    question_es: '¿Cuál es la forma idiomática de invertir una cadena s en Python?',
    codice: `s = "DevQuest"
# Come si inverte la stringa s?`,
    risposte: ['s.reverse()', 's[::-1]', 'reverse(s)', 's.invert()'],
    indice_corretto: 1,
    spiegazione: 'Lo slicing con passo negativo [::-1] crea una copia invertita della stringa.',
    explanation_en: 'Negative step slicing [::-1] creates a reversed copy of the string.',
    explanation_es: 'El troceado con paso negativo [::-1] crea una copia invertida de la cadena.',
    suggerimento: 'Lo slice prende [start:stop:step].',
    difficolta: 'facile',
    trackId: 'python',
    author: 'CodeGirl_IT',
    upvotes: 68
  }) as CommunityChallenge
];

interface CommunityHubViewProps {
  onPlayChallenge?: (sfida: Sfida) => void;
}

export default function CommunityHubView({ onPlayChallenge }: CommunityHubViewProps) {
  const { language, t } = useLanguage();
  const [challenges, setChallenges] = useState<CommunityChallenge[]>(INITIAL_COMMUNITY_CHALLENGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New challenge form state
  const [newTopic, setNewTopic] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newAns0, setNewAns0] = useState('');
  const [newAns1, setNewAns1] = useState('');
  const [newAns2, setNewAns2] = useState('');
  const [newAns3, setNewAns3] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);

  const handleUpvote = (id: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id) {
        const nextUpvoted = !c.hasUpvoted;
        return {
          ...c,
          hasUpvoted: nextUpvoted,
          upvotes: nextUpvoted ? c.upvotes + 1 : c.upvotes - 1
        };
      }
      return c;
    }));
    soundEngine.playTick();
  };

  const handleClone = (id: string) => {
    const toClone = challenges.find(c => c.id === id);
    if (!toClone) return;
    const cloned = { ...toClone, id: `ugc_clone_${Date.now()}`, author: 'Tu (Clonato)', upvotes: 0, hasUpvoted: false, isCreator: false };
    setChallenges([cloned, ...challenges]);
    soundEngine.playLevelUp();
  };

  const handleCreateChallenge = () => {
    if (!newQuestion || !newAns0 || !newAns1) return;
    const newSfida: CommunityChallenge = normalizeChallenge({
      id: `ugc_custom_${Date.now()}`,
      capitolo: 99,
      argomento: newTopic || 'Community Challenge',
      domanda: newQuestion,
      codice: newCode,
      risposte: [newAns0, newAns1, newAns2 || 'N/A', newAns3 || 'N/A'],
      indice_corretto: correctIdx,
      spiegazione: 'Sfida pubblicata dalla community DevQuest.',
      suggerimento: 'Analizza attentamente la sintassi.',
      difficolta: 'media',
      trackId: 'python',
      author: 'Tu (Community)',
      upvotes: 1
    }) as CommunityChallenge;

    saveCustomQuestion(newSfida);
    setChallenges([newSfida, ...challenges]);
    setShowCreateModal(false);
    soundEngine.playLevelUp();

    // Reset form
    setNewTopic('');
    setNewQuestion('');
    setNewCode('');
    setNewAns0('');
    setNewAns1('');
    setNewAns2('');
    setNewAns3('');
  };

  const filtered = challenges.filter(c => {
    const topic = (c.topic || c.argomento || '').toLowerCase();
    const question = (c.question || c.domanda || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return topic.includes(query) || question.includes(query);
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 p-2 sm:p-4 font-mono">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl ctp-card border border-[var(--ctp-surface1)] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xl text-2xl">
            👥
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[var(--ctp-text)]">
              {t.communityTitle}
            </h2>
            <p className="text-xs text-[var(--ctp-subtext0)]">
              {t.communitySubtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[var(--ctp-mauve)] text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:opacity-90 cursor-pointer transition-transform hover:scale-105 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t.createChallenge}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[var(--ctp-subtext0)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchCommunity}
          className="w-full ctp-input pl-10 pr-4 py-3 rounded-xl text-xs border focus:outline-none"
        />
      </div>

      {/* Challenge Cards Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl ctp-card border border-[var(--ctp-surface1)] shadow-md flex flex-col justify-between space-y-4 hover:border-[var(--ctp-mauve)] transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--ctp-mauve)]/10 text-[var(--ctp-mauve)] border border-[var(--ctp-mauve)]/20">
                  {getChallengeTopic(item)}
                </span>
                <span className="text-xs text-[var(--ctp-subtext0)] flex items-center gap-1">
                  {t.author} <strong className="text-[var(--ctp-text)]">{item.author}</strong>
                  {item.isCreator && <span className="bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded text-[10px] ml-1" title={t.creatorBadge}>🏆</span>}
                </span>
              </div>

              <h3 className="text-xs font-bold text-[var(--ctp-text)] leading-relaxed">
                {getChallengeQuestion(item, language)}
              </h3>

              {getChallengeCode(item) && (
                <pre className="p-2.5 rounded-lg bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto border border-slate-800">
                  {getChallengeCode(item)}
                </pre>
              )}
            </div>

            <div className="pt-3 border-t border-[var(--ctp-surface1)] flex items-center justify-between">
              <button
                onClick={() => handleUpvote(item.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  item.hasUpvoted
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                    : 'bg-[var(--ctp-surface0)] text-[var(--ctp-subtext0)] border-[var(--ctp-surface1)] hover:text-white'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{item.upvotes}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleClone(item.id)}
                  className="px-3 py-1.5 rounded-xl border border-[var(--ctp-surface1)] text-[var(--ctp-subtext0)] text-xs font-bold hover:text-white transition-colors cursor-pointer"
                >
                  {t.clone}
                </button>
                <button
                  onClick={() => onPlayChallenge && onPlayChallenge(item)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-emerald-300" />
                  <span>{t.playNow}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center ctp-card border border-[var(--ctp-surface1)] rounded-2xl">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-lg font-bold text-[var(--ctp-text)] mb-2">{t.noChallengesFound}</h3>
          <p className="text-sm text-[var(--ctp-subtext0)]">{t.noChallengesCriteria}</p>
        </div>
      )}

      {/* Modal: Create Challenge */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg ctp-card rounded-2xl shadow-2xl border border-[var(--ctp-surface1)] p-6 space-y-4 font-mono max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-sm font-bold text-[var(--ctp-text)] flex items-center justify-between">
                <span>{t.publishNewChallenge}</span>
                <button onClick={() => setShowCreateModal(false)}>✕</button>
              </h3>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t.topicPlaceholder}
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full ctp-input text-xs rounded-xl p-3 border focus:outline-none"
                />

                <textarea
                  placeholder={t.questionPlaceholder}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full ctp-input text-xs rounded-xl p-3 border focus:outline-none h-20"
                />

                <textarea
                  placeholder={t.codeOptional}
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full ctp-input font-mono text-xs rounded-xl p-3 border focus:outline-none h-20 bg-slate-950 text-emerald-300"
                />

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[var(--ctp-subtext0)]">{t.answerOptions}</span>
                  {[newAns0, newAns1, newAns2, newAns3].map((ans, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctIdx"
                        checked={correctIdx === i}
                        onChange={() => setCorrectIdx(i)}
                      />
                      <input
                        type="text"
                        placeholder={`${t.optionN} ${i + 1}`}
                        value={[newAns0, newAns1, newAns2, newAns3][i]}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (i === 0) setNewAns0(val);
                          if (i === 1) setNewAns1(val);
                          if (i === 2) setNewAns2(val);
                          if (i === 3) setNewAns3(val);
                        }}
                        className="flex-1 ctp-input text-xs rounded-xl p-2.5 border focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleCreateChallenge}
                  className="w-full py-3 rounded-xl bg-[var(--ctp-mauve)] text-white font-bold text-xs shadow-lg hover:opacity-90 cursor-pointer transition-transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
                >
                  {t.publishBtn}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
