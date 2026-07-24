'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Bot, User, CheckCircle2, XCircle, Timer, Award, Zap, X, ShieldAlert } from 'lucide-react';
import { soundEngine } from '../lib/soundEngine';
import { recordQuestionAnswer } from '../lib/gamification';
import { duelMatchmaking } from '../lib/firebase';

interface PvPDuelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DUEL_QUESTIONS = [
  {
    id: 'duel_1',
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(len(x))`,
    question: 'Qual è l\'output stampato da questo codice Python?',
    options: ['3', '4', 'Error: AttributeError', 'None'],
    correct: 1,
    explanation: 'In Python, le liste sono oggetti mutabili passati per riferimento. Modificare y modifica anche x!'
  },
  {
    id: 'duel_2',
    code: `def func(a, b=[]):
    b.append(a)
    return b

print(func(1))
print(func(2))`,
    question: 'Qual è l\'output dell\'ultima chiamata print(func(2))?',
    options: ['[2]', '[1, 2]', '[1]', '[[1], [2]]'],
    correct: 1,
    explanation: 'I valori di default per gli argomenti mutabili in Python vengono valutati una sola volta all\'definizione della funzione!'
  }
];

import { useLanguage } from '../lib/LanguageContext';

export default function PvPDuelModal({ isOpen, onClose }: PvPDuelModalProps) {
  const { language } = useLanguage();
  const [stage, setStage] = useState<'lobby' | 'fighting' | 'result'>('lobby');
  const [selectedBotDifficulty, setSelectedBotDifficulty] = useState<'easy' | 'hard'>('easy');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [playerHp, setPlayerHp] = useState(100);
  const [botHp, setBotHp] = useState(100);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [winner, setWinner] = useState<'player' | 'bot' | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [roomCode, setRoomCode] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isPvP, setIsPvP] = useState(false);
  const [isMatchmaking, setIsMatchmaking] = useState(false);

  const currentQ = DUEL_QUESTIONS[currentQIndex];

  useEffect(() => {
    if (stage === 'fighting' && isPvP && roomId) {
      return duelMatchmaking.subscribe(roomId, (data) => {
        if (data) setBotHp(data.p2Hp);
      });
    }
  }, [stage, isPvP, roomId]);

  // Timer tick during fight
  useEffect(() => {
    if (stage !== 'fighting' || answered) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        if (prev <= 5) soundEngine.playTick();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, answered]);

  // Bot simulation
  useEffect(() => {
    if (stage !== 'fighting' || answered || isPvP) return;

    const botDelay = selectedBotDifficulty === 'easy' ? 8000 : 4500;
    const botTimer = setTimeout(() => {
      if (!answered) {
        // Bot attacks
        const botSuccess = Math.random() > (selectedBotDifficulty === 'easy' ? 0.4 : 0.15);
        if (botSuccess) {
          setPlayerHp((prev) => Math.max(0, prev - 45));
          soundEngine.playWrong();
        }
      }
    }, botDelay);

    return () => clearTimeout(botTimer);
  }, [stage, answered, currentQIndex]);

  const startFight = () => {
    setStage('fighting');
    setPlayerHp(100);
    setBotHp(100);
    setCurrentQIndex(0);
    setAnswered(false);
    setSelectedOption(null);
    setTimeLeft(60);
    setWinner(null);
  };

  const handleTimeOut = () => {
    setAnswered(true);
    setPlayerHp((prev) => Math.max(0, prev - 35));
    soundEngine.playWrong();
    checkEndDuel(playerHp - 35, botHp);
  };

  const handleSelectAnswer = (idx: number) => {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);

    const isCorrect = idx === currentQ.correct;
    if (isCorrect) {
      soundEngine.playCorrect();
      setBotHp((prev) => {
        const nextHp = Math.max(0, prev - 60);
        checkEndDuel(playerHp, nextHp);
        if (isPvP) duelMatchmaking.syncHp(roomId, playerHp, nextHp);
        return nextHp;
      });
      recordQuestionAnswer(true, 60 - timeLeft);
    } else {
      soundEngine.playWrong();
      setPlayerHp((prev) => {
        const nextHp = Math.max(0, prev - 40);
        checkEndDuel(nextHp, botHp);
        if (isPvP) duelMatchmaking.syncHp(roomId, nextHp, botHp);
        return nextHp;
      });
      recordQuestionAnswer(false, 60 - timeLeft);
    }
  };

  const checkEndDuel = (pMax: number, bMax: number) => {
    setTimeout(() => {
      if (bMax <= 0) {
        setWinner('player');
        setStage('result');
        soundEngine.playVictory();
      } else if (pMax <= 0) {
        setWinner('bot');
        setStage('result');
        soundEngine.playWrong();
      } else {
        // Next round
        if (currentQIndex + 1 < DUEL_QUESTIONS.length) {
          setCurrentQIndex((prev) => prev + 1);
          setAnswered(false);
          setSelectedOption(null);
          setTimeLeft(60);
        } else {
          setWinner(pMax >= bMax ? 'player' : 'bot');
          setStage('result');
        }
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl ctp-card rounded-2xl shadow-2xl border border-[var(--ctp-surface1)] overflow-hidden flex flex-col min-h-[500px]"
        >
          {/* Header */}
          <div className="p-4 px-6 ctp-card-mantle border-b border-[var(--ctp-surface1)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--ctp-red)] flex items-center justify-center text-[var(--ctp-crust)] shadow-lg">
                <Swords className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-mono font-bold text-base flex items-center gap-2" style={{ color: 'var(--ctp-text)' }}>
                  PvP Code Duels (1v1 Arena)
                </h2>
                <p className="text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
                  Sfida il Cyber-Bot a chi risolve prima il bug di codice!
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

          {/* Lobby Screen */}
          {stage === 'lobby' && (
            <div className="p-8 flex flex-col items-center justify-center text-center space-y-6 flex-1">
              <div className="w-20 h-20 rounded-3xl bg-[var(--ctp-mauve)] p-1 shadow-2xl animate-pulse">
                <div className="w-full h-full bg-[var(--ctp-mantle)] rounded-[22px] flex items-center justify-center">
                  <Swords className="w-10 h-10 text-[var(--ctp-mauve)]" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black font-mono" style={{ color: 'var(--ctp-text)' }}>
                  Arena CyberDuel 1v1
                </h3>
                <p className="text-xs max-w-md mx-auto mt-2" style={{ color: 'var(--ctp-subtext0)' }}>
                  Metti alla prova i tuoi riflessi di debugging. Rispondi più velocemente dell'avversario prima che scada il tempo!
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                <input 
                  type="text" 
                  placeholder={language === 'en' ? 'Room Code (leave empty to create)' : language === 'es' ? 'Código de Sala (vacío para crear)' : 'Codice (vuoto per creare)'}
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="px-4 py-2 rounded-xl border bg-[var(--ctp-crust)] text-center text-sm font-mono focus:outline-none focus:border-[var(--ctp-mauve)] transition-all"
                />
                <button
                  onClick={async () => {
                    setIsMatchmaking(true);
                    const id = roomCode || Math.random().toString(36).substring(2, 6).toUpperCase();
                    setRoomId(id);
                    if (roomCode) {
                      await duelMatchmaking.join(id);
                      setIsPvP(true);
                      startFight();
                      setIsMatchmaking(false);
                    } else {
                      await duelMatchmaking.create(id);
                      setTimeout(() => {
                         setIsPvP(false);
                         startFight();
                         setIsMatchmaking(false);
                      }, 5000);
                    }
                  }}
                  disabled={isMatchmaking}
                  className="px-8 py-3.5 rounded-2xl bg-[var(--ctp-red)] hover:opacity-90 text-[var(--ctp-crust)] font-mono font-black text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isMatchmaking ? 'Ricerca in corso...' : 'Trova Partita PvP ⚔️'}
                </button>
                {isMatchmaking && !roomCode && <p className="text-xs mt-2 text-[var(--ctp-subtext0)]">Codice: {roomId} (Bot tra 5s...)</p>}
              </div>
            </div>
          )}

          {/* Fighting Arena Screen */}
          {stage === 'fighting' && (
            <div className="p-6 flex flex-col flex-1 space-y-5">
              {/* Health Bars */}
              <div className="grid grid-cols-2 gap-4">
                {/* Player Health */}
                <div className="p-3 rounded-xl border bg-[var(--ctp-surface0)]/60 border-[var(--ctp-surface1)] space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="flex items-center gap-1.5 text-[var(--ctp-text)]">
                      <User className="w-4 h-4 text-[var(--ctp-green)]" /> Tu
                    </span>
                    <span className="text-[var(--ctp-green)]">{playerHp} HP</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[var(--ctp-green)] h-full transition-all duration-300" style={{ width: `${playerHp}%` }} />
                  </div>
                </div>

                {/* Bot Health */}
                <div className="p-3 rounded-xl border bg-[var(--ctp-surface0)]/60 border-[var(--ctp-surface1)] space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="flex items-center gap-1.5 text-[var(--ctp-text)]">
                      <Bot className="w-4 h-4 text-[var(--ctp-red)]" /> CyberBot
                    </span>
                    <span className="text-[var(--ctp-red)]">{botHp} HP</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[var(--ctp-red)] h-full transition-all duration-300" style={{ width: `${botHp}%` }} />
                  </div>
                </div>
              </div>

              {/* Timer Bar */}
              <div className="flex items-center justify-between text-xs font-mono font-bold px-2">
                <span className="flex items-center gap-1.5 text-[var(--ctp-subtext0)]">
                  <Timer className="w-4 h-4 text-[var(--ctp-yellow)]" /> Tempo Rimasto:
                </span>
                <span className={`text-base font-black ${timeLeft <= 5 ? 'text-[var(--ctp-red)] animate-pulse' : 'text-[var(--ctp-mauve)]'}`}>
                  {timeLeft}s
                </span>
              </div>

              {/* Question Code Snippet */}
              <div className="bg-[var(--ctp-mantle)] p-4 rounded-xl border border-[var(--ctp-surface1)] space-y-3">
                <p className="text-xs font-mono font-bold text-[var(--ctp-text)]">
                  {currentQ.question}
                </p>
                <pre className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
                  {currentQ.code}
                </pre>
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={answered}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`p-3 rounded-xl border text-left font-mono text-xs transition-all cursor-pointer flex items-center justify-between ${
                      answered && idx === currentQ.correct
                        ? 'bg-[var(--ctp-green)]/20 border-[var(--ctp-green)] text-[var(--ctp-green)] font-bold'
                        : answered && idx === selectedOption && idx !== currentQ.correct
                        ? 'bg-[var(--ctp-red)]/20 border-[var(--ctp-red)] text-[var(--ctp-red)]'
                        : 'ctp-card hover:border-[var(--ctp-mauve)]'
                    }`}
                  >
                    <span>{opt}</span>
                    {answered && idx === currentQ.correct && <CheckCircle2 className="w-4 h-4 text-[var(--ctp-green)]" />}
                    {answered && idx === selectedOption && idx !== currentQ.correct && <XCircle className="w-4 h-4 text-[var(--ctp-red)]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result Screen */}
          {stage === 'result' && (
            <div className="p-8 flex flex-col items-center justify-center text-center space-y-5 flex-1">
              <div className="text-5xl mb-2">
                {winner === 'player' ? '🏆' : '💀'}
              </div>

              <h3 className="text-2xl font-black font-mono" style={{ color: winner === 'player' ? 'var(--ctp-green)' : 'var(--ctp-red)' }}>
                {winner === 'player' ? 'VITTORIA SCHIACCIANTE!' : 'SCONFITTA IN ARENA!'}
              </h3>

              <p className="text-xs max-w-md font-mono" style={{ color: 'var(--ctp-subtext0)' }}>
                {winner === 'player'
                  ? 'Hai sconfitto il CyberBot guadagnando +100 XP e +25 Trofei per la tua Lega!'
                  : 'Il CyberBot ha avuto la meglio in questa tornata. Riprova e perfeziona la tua velocità!'}
              </p>

              <button
                onClick={() => setStage('lobby')}
                className="px-6 py-3 rounded-xl bg-[var(--ctp-mauve)] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 cursor-pointer"
              >
                Torna in Lobby ⚔️
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
