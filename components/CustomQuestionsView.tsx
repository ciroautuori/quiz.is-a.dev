'use client';

import React, { useState, useEffect } from 'react';
import { Sfida, TrackId } from '../lib/types';
import { getCustomQuestions, saveCustomQuestion } from '../lib/storage';
import { TRACKS } from '../lib/tracks';
import CodeBlock from './CodeBlock';
import { PlusCircle } from 'lucide-react';

interface CustomQuestionsViewProps {
  onQuestionAdded: () => void;
}

export default function CustomQuestionsView({ onQuestionAdded }: CustomQuestionsViewProps) {
  const [customList, setCustomList] = useState<Sfida[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [trackId, setTrackId] = useState<TrackId>('python');
  const [domanda, setDomanda] = useState('');
  const [codice, setCodice] = useState('');
  const [capitolo, setCapitolo] = useState(1);
  const [argomento, setArgomento] = useState('');
  const [difficolta, setDifficolta] = useState<'facile' | 'media' | 'difficile'>('facile');
  const [opzioni, setOpzioni] = useState<string[]>(['', '', '', '']);
  const [indiceCorretto, setIndiceCorretto] = useState(0);
  const [suggerimento, setSuggerimento] = useState('');
  const [spiegazione, setSpiegazione] = useState('');

  useEffect(() => {
    setCustomList(getCustomQuestions());
  }, []);

  const handleOpzioneChange = (idx: number, val: string) => {
    const next = [...opzioni];
    next[idx] = val;
    setOpzioni(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domanda.trim() || !argomento.trim() || opzioni.some((o) => !o.trim())) {
      alert('Compila tutti i campi obbligatori delle risposte!');
      return;
    }

    const nuovaSfida: Sfida = {
      id: 'custom_' + Date.now(),
      trackId,
      capitolo: Number(capitolo),
      argomento,
      difficolta,
      domanda,
      codice,
      risposte: opzioni,
      indice_corretto: indiceCorretto,
      suggerimento: suggerimento || 'Analizza attentamente il codice o comando.',
      spiegazione: spiegazione || 'Soluzione fornita dall\'autore della domanda.'
    };

    const updated = saveCustomQuestion(nuovaSfida);
    setCustomList(updated);
    setShowForm(false);
    onQuestionAdded();

    // Reset form
    setDomanda('');
    setCodice('');
    setArgomento('');
    setOpzioni(['', '', '', '']);
    setSuggerimento('');
    setSpiegazione('');
  };


  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-peach)', borderColor: 'var(--ctp-surface1)' }}>
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>Laboratorio Domande Personalizzate</h2>
            <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>Crea le tue sfide Python e integrarle subito nel gioco</p>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          style={{ backgroundColor: 'var(--ctp-peach)', color: 'var(--ctp-crust)' }}
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Annulla' : 'Nuova Domanda'}</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="ctp-card border rounded-2xl p-6 shadow-xl mb-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider font-mono" style={{ color: 'var(--ctp-text)' }}>Aggiungi una Sfida</h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs mb-1 font-semibold" style={{ color: 'var(--ctp-subtext0)' }}>Linguaggio / Tracciato</label>
              <select
                value={trackId}
                onChange={(e) => setTrackId(e.target.value as TrackId)}
                className="w-full ctp-input rounded-lg p-2.5 text-xs border focus:outline-none font-bold"
              >
                {TRACKS.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.icon} {t.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--ctp-subtext0)' }}>Capitolo</label>
              <input
                type="number"
                min={1}
                max={20}
                value={capitolo}
                onChange={(e) => setCapitolo(Number(e.target.value))}
                className="w-full ctp-input rounded-lg p-2.5 text-xs border focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--ctp-subtext0)' }}>Argomento</label>
              <input
                type="text"
                placeholder="es. Funzioni, Interface, Commit"
                value={argomento}
                onChange={(e) => setArgomento(e.target.value)}
                className="w-full ctp-input rounded-lg p-2.5 text-xs border focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--ctp-subtext0)' }}>Difficoltà</label>
              <select
                value={difficolta}
                onChange={(e) => setDifficolta(e.target.value as any)}
                className="w-full ctp-input rounded-lg p-2.5 text-xs border focus:outline-none"
              >
                <option value="facile">Facile</option>
                <option value="media">Media</option>
                <option value="difficile">Difficile</option>
              </select>
            </div>
          </div>


          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--ctp-subtext0)' }}>Testo della Domanda</label>
            <input
              type="text"
              placeholder="es. Cosa stampa questo codice Python?"
              value={domanda}
              onChange={(e) => setDomanda(e.target.value)}
              className="w-full ctp-input rounded-lg p-2.5 text-xs border focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--ctp-subtext0)' }}>Codice Python (opzionale)</label>
            <textarea
              rows={3}
              placeholder="def saluta():&#10;    print('Ciao')"
              value={codice}
              onChange={(e) => setCodice(e.target.value)}
              className="w-full ctp-input rounded-lg p-2.5 text-xs font-mono border focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--ctp-subtext0)' }}>Opzioni di Risposta (seleziona quella corretta)</label>
            <div className="space-y-2">
              {opzioni.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="corretta"
                    checked={indiceCorretto === i}
                    onChange={() => setIndiceCorretto(i)}
                    className="cursor-pointer"
                    style={{ accentColor: 'var(--ctp-peach)' }}
                  />
                  <input
                    type="text"
                    placeholder={`Opzione ${String.fromCharCode(65 + i)}`}
                    value={opt}
                    onChange={(e) => handleOpzioneChange(i, e.target.value)}
                    className="flex-1 ctp-input rounded-lg p-2.5 text-xs border focus:outline-none"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--ctp-subtext0)' }}>Suggerimento</label>
              <input
                type="text"
                placeholder="Indizio utile"
                value={suggerimento}
                onChange={(e) => setSuggerimento(e.target.value)}
                className="w-full ctp-input rounded-lg p-2.5 text-xs border focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--ctp-subtext0)' }}>Spiegazione della soluzione</label>
              <input
                type="text"
                placeholder="Spiegazione dettagliata"
                value={spiegazione}
                onChange={(e) => setSpiegazione(e.target.value)}
                className="w-full ctp-input rounded-lg p-2.5 text-xs border focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            style={{ backgroundColor: 'var(--ctp-peach)', color: 'var(--ctp-crust)' }}
          >
            Salva Domanda
          </button>
        </form>
      )}

      {/* List of custom questions */}
      <div className="space-y-4">
        {customList.map((sfida) => (
          <div key={sfida.id} className="ctp-card border rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md border" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-text)', borderColor: 'var(--ctp-surface1)' }}>
                Capitolo {sfida.capitolo} • {sfida.argomento}
              </span>
              <span className="text-[11px] font-semibold uppercase" style={{ color: 'var(--ctp-peach)' }}>Personalizzata</span>
            </div>

            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--ctp-text)' }}>{sfida.domanda}</h4>
            {sfida.codice && <CodeBlock code={sfida.codice} />}
          </div>
        ))}

        {customList.length === 0 && !showForm && (
          <div className="p-8 text-center ctp-card border rounded-2xl text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
            Nessuna domanda personalizzata creata. Clicca &quot;Nuova Domanda&quot; per aggiungere i tuoi quesiti Python!
          </div>
        )}
      </div>
    </div>
  );
}

