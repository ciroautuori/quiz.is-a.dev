'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, RefreshCw, AlertCircle, Code, HelpCircle, Lightbulb, Volume2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { Sfida, Concetto } from '../lib/types';

interface AiTutorWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  activeQuestion?: Sfida | null;
  activeConcept?: Concetto | null;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AiTutorWidget({
  isOpen,
  onClose,
  activeQuestion,
  activeConcept,
}: AiTutorWidgetProps) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Welcome message when context changes or widget opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      let welcomeText = '';
      if (activeQuestion) {
        welcomeText = language === 'it'
          ? `Ciao! Sono **DevBot**, il tuo AI Tutor! Sto osservando la sfida di capitolo **${activeQuestion.capitolo}** (*${activeQuestion.argomento}*). Come posso aiutarti?`
          : language === 'es'
          ? `¡Hola! Soy **DevBot**, tu Tutor IA. Veo que estás en el desafío del capítulo **${activeQuestion.capitolo}** (*${activeQuestion.argomento}*). ¿Cómo puedo ayudarte?`
          : `Hi! I'm **DevBot**, your AI Tutor! I see you're working on chapter **${activeQuestion.capitolo}** challenge (*${activeQuestion.argomento}*). How can I assist you?`;
      } else if (activeConcept) {
        welcomeText = language === 'it'
          ? `Ciao! Sono **DevBot**. Vuoi approfondire il concetto **${activeConcept.titolo}**? Chiedimi qualsiasi chiarimento!`
          : language === 'es'
          ? `¡Hola! Soy **DevBot**. ¿Quieres profundizar en el concepto **${activeConcept.titolo}**? ¡Pregúntame lo que necesites!`
          : `Hi! I'm **DevBot**. Want to dive deeper into **${activeConcept.titolo}**? Feel free to ask me anything!`;
      } else {
        welcomeText = language === 'it'
          ? `Ciao! Sono **DevBot**, il tuo AI Coding Mentor. Chiedimi spiegazioni su Python, TypeScript, Git o qualsiasi dubbio di programmazione!`
          : language === 'es'
          ? `¡Hola! Soy **DevBot**, tu mentor de código IA. ¡Pregúntame sobre Python, TypeScript, Git o cualquier duda de programación!`
          : `Hi! I'm **DevBot**, your AI Coding Mentor. Ask me anything about Python, TypeScript, Git, or coding concepts!`;
      }

      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [isOpen, activeQuestion, activeConcept, language]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    setErrorMsg(null);
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          questionContext: activeQuestion
            ? {
                chapter: activeQuestion.capitolo,
                topic: activeQuestion.argomento,
                questionText: activeQuestion.domanda,
                codeSnippet: activeQuestion.codice,
                options: activeQuestion.risposte,
                hint: activeQuestion.suggerimento,
                trackId: activeQuestion.trackId || 'python'
              }
            : activeConcept
            ? {
                title: activeConcept.titolo,
                chapter: activeConcept.capitolo,
                text: activeConcept.testo,
                trackId: activeConcept.trackId || 'python'
              }
            : null,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'NO_API_KEY') {
          setErrorMsg(t.aiErrorNoKey);
        } else {
          setErrorMsg(data.message || t.aiErrorGeneric);
        }
        return;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setErrorMsg(t.aiErrorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (promptType: 'hint' | 'code' | 'concept') => {
    let prompt = '';
    if (promptType === 'hint') {
      prompt = language === 'it'
        ? "Dammi un indizio ragionato per questa sfida senza svelare subito la soluzione finale."
        : language === 'es'
        ? "Dame una pista estructurada para este desafío sin revelar la solución final."
        : "Give me a step-by-step hint for this challenge without revealing the final answer directly.";
    } else if (promptType === 'code') {
      prompt = language === 'it'
        ? "Spiegami il codice di questo esercizio linea per linea evidenziando eventuali trappole o errori."
        : language === 'es'
        ? "Explícame el código de este ejercicio línea por línea destacando posibles trampas o errores."
        : "Explain the code snippet line-by-line pointing out any traps or typical syntax edge-cases.";
    } else {
      prompt = language === 'it'
        ? "Qual è la regola teorica e il concetto fondamentale che devo ricordare qui?"
        : language === 'es'
        ? "¿Cuál es la regla teórica y el concepto clave que debo recordar aquí?"
        : "What is the key theoretical rule and concept I need to remember here?";
    }
    handleSendMessage(prompt);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg h-full ctp-bg-app shadow-2xl flex flex-col border-l border-[var(--ctp-surface1)]"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--ctp-surface1)] ctp-card-mantle flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h2 className="font-mono font-bold text-sm flex items-center gap-1.5" style={{ color: 'var(--ctp-text)' }}>
                    {t.aiTutorTitle}
                  </h2>
                  <p className="text-[11px]" style={{ color: 'var(--ctp-subtext0)' }}>
                    {t.aiTutorSubtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setTtsEnabled(!ttsEnabled)} className={`p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${ttsEnabled ? 'text-indigo-500' : 'text-gray-500'}`} title={language === 'en' ? 'Toggle TTS' : language === 'es' ? 'Alternar TTS' : 'Attiva/Disattiva Lettura Vocale'}><Volume2 className="w-4 h-4" /></button>
                <button
                  onClick={clearChat}
                  title={language === 'en' ? 'Clear chat' : language === 'es' ? 'Limpiar chat' : 'Pulisci chat'}
                  className="p-2 rounded-lg hover:bg-[var(--ctp-surface0)] transition-colors"
                  style={{ color: 'var(--ctp-subtext0)' }}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[var(--ctp-surface0)] transition-colors"
                  style={{ color: 'var(--ctp-subtext0)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Context Badge if active */}
            {(activeQuestion || activeConcept) && (
              <div className="px-4 py-2 bg-[var(--ctp-surface0)] border-b border-[var(--ctp-surface1)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-[var(--ctp-mauve)]/20 text-[var(--ctp-mauve)] text-[10px]">
                    {activeQuestion ? `Ch. ${activeQuestion.capitolo}` : activeConcept ? `Concept` : ''}
                  </span>
                  <span className="truncate font-medium" style={{ color: 'var(--ctp-text)' }}>
                    {activeQuestion ? activeQuestion.argomento : activeConcept?.titolo}
                  </span>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-[var(--ctp-mauve)]/20 border border-[var(--ctp-mauve)]/30 flex items-center justify-center shrink-0 text-[var(--ctp-mauve)]">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-[var(--ctp-mauve)] text-white font-medium rounded-tr-none'
                        : 'ctp-card border rounded-tl-none font-sans'
                    }`}
                    style={msg.role === 'assistant' ? { color: 'var(--ctp-text)' } : {}}
                  >
                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        msg.role === 'user' ? 'text-white/70' : ''
                      }`}
                      style={msg.role === 'assistant' ? { color: 'var(--ctp-subtext0)' } : {}}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-[var(--ctp-surface1)] flex items-center justify-center shrink-0" style={{ color: 'var(--ctp-text)' }}>
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-8 h-8 rounded-lg bg-[var(--ctp-mauve)]/20 flex items-center justify-center shrink-0 text-[var(--ctp-mauve)]">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="ctp-card border rounded-2xl p-3 text-xs italic flex items-center gap-2" style={{ color: 'var(--ctp-subtext0)' }}>
                    <span>{t.aiThinking}</span>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {activeQuestion && (
              <div className="p-3 border-t border-[var(--ctp-surface1)] bg-[var(--ctp-surface0)]/50">
                <p className="text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: 'var(--ctp-subtext0)' }}>
                  {t.aiSuggestedPrompts}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => handleQuickPrompt('hint')}
                    disabled={loading}
                    className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg border ctp-card hover:border-[var(--ctp-mauve)] transition-colors"
                    style={{ color: 'var(--ctp-text)' }}
                  >
                    <Lightbulb className="w-3 h-3 text-amber-400" />
                    <span>{t.aiGiveHint}</span>
                  </button>
                  {activeQuestion.codice && (
                    <button
                      onClick={() => handleQuickPrompt('code')}
                      disabled={loading}
                      className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg border ctp-card hover:border-[var(--ctp-blue)] transition-colors"
                      style={{ color: 'var(--ctp-text)' }}
                    >
                      <Code className="w-3 h-3 text-blue-400" />
                      <span>{t.aiExplainCode}</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleQuickPrompt('concept')}
                    disabled={loading}
                    className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg border ctp-card hover:border-[var(--ctp-green)] transition-colors"
                    style={{ color: 'var(--ctp-text)' }}
                  >
                    <HelpCircle className="w-3 h-3 text-emerald-400" />
                    <span>{t.aiBreakdownConcept}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 pb-6 sm:pb-3 border-t border-[var(--ctp-surface1)] ctp-card-mantle">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.aiTutorPlaceholder}
                  disabled={loading}
                  className="flex-1 ctp-input text-xs rounded-xl px-3.5 py-2.5 border focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2.5 rounded-xl bg-[var(--ctp-mauve)] text-white hover:opacity-90 disabled:opacity-50 transition-all font-bold flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
