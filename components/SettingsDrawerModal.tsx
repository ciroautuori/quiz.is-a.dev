'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Settings, 
  Globe, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Github, 
  Flame, 
  Award, 
  Sparkles,
  Check
} from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { useLanguage } from '../lib/LanguageContext';
import { Language } from '../lib/i18n';
import { soundEngine } from '../lib/soundEngine';
import { StreakInfo } from '../lib/storage';

interface SettingsDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakInfo: StreakInfo;
  unlockedBadgesCount: number;
  onOpenAchievements: () => void;
  onOpenGithubSync: () => void;
}

export default function SettingsDrawerModal({
  isOpen,
  onClose,
  streakInfo,
  unlockedBadgesCount,
  onOpenAchievements,
  onOpenGithubSync
}: SettingsDrawerModalProps) {
  const { syntaxTheme, toggleSyntaxTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const isMocha = syntaxTheme === 'mocha';

  const [soundMuted, setSoundMuted] = useState<boolean>(() => soundEngine.getMuted());

  const handleToggleSound = () => {
    const isMutedNow = soundEngine.toggleMute();
    setSoundMuted(isMutedNow);
    if (!isMutedNow) {
      soundEngine.playTick();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        {/* Backdrop click to close */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-sm h-full ctp-card border-l flex flex-col shadow-2xl overflow-y-auto"
          style={{ backgroundColor: 'var(--ctp-mantle)', borderColor: 'var(--ctp-border)' }}
        >
          {/* Header */}
          <div className="p-5 border-b flex items-center justify-between ctp-card-surface" style={{ borderColor: 'var(--ctp-border)' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl border flex items-center justify-center" style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-mauve)', borderColor: 'var(--ctp-surface1)' }}>
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
                  Impostazioni & Strumenti
                </h2>
                <p className="text-[11px]" style={{ color: 'var(--ctp-subtext0)' }}>
                  Personalizza la tua esperienza su DevQuest
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border hover:opacity-80 transition-opacity cursor-pointer"
              style={{ backgroundColor: 'var(--ctp-surface0)', color: 'var(--ctp-text)', borderColor: 'var(--ctp-border)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-5 space-y-6 flex-1">
            {/* Language Selector */}
            <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: 'var(--ctp-surface0)', borderColor: 'var(--ctp-surface1)' }}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: 'var(--ctp-mauve)' }}>
                <Globe className="w-4 h-4" />
                <span>Lingua Interfaccia / Language</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: 'it', label: '🇮🇹 Italiano' },
                  { code: 'en', label: '🇬🇧 English' },
                  { code: 'es', label: '🇪🇸 Español' },
                ].map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as Language)}
                      className={`p-2 rounded-lg border text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        isSelected ? 'shadow' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: isSelected ? 'var(--ctp-mauve)' : 'var(--ctp-mantle)',
                        color: isSelected ? 'var(--ctp-crust)' : 'var(--ctp-text)',
                        borderColor: isSelected ? 'var(--ctp-mauve)' : 'var(--ctp-border)'
                      }}
                    >
                      <span>{lang.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Syntax Theme & Sound FX */}
            <div className="p-4 rounded-xl border space-y-4" style={{ backgroundColor: 'var(--ctp-surface0)', borderColor: 'var(--ctp-surface1)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: 'var(--ctp-text)' }}>
                  {isMocha ? <Moon className="w-4 h-4 text-[var(--ctp-mauve)]" /> : <Sun className="w-4 h-4 text-[var(--ctp-peach)]" />}
                  <span>{language === 'en' ? 'Syntax Theme:' : language === 'es' ? 'Tema Sintaxis:' : 'Tema Sintassi:'} <strong>{isMocha ? (language === 'en' ? 'Catppuccin Mocha (Dark)' : language === 'es' ? 'Catppuccin Mocha (Oscuro)' : 'Catppuccin Mocha (Scuro)') : (language === 'en' ? 'Catppuccin Latte (Light)' : language === 'es' ? 'Catppuccin Latte (Claro)' : 'Catppuccin Latte (Chiaro)')}</strong></span>
                </div>
                <button
                  onClick={toggleSyntaxTheme}
                  className="px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer"
                  style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-mauve)', borderColor: 'var(--ctp-surface2)' }}
                >
                  {language === 'en' ? 'Change' : language === 'es' ? 'Cambiar' : 'Cambia'}
                </button>
              </div>

              <div className="border-t pt-3 flex items-center justify-between" style={{ borderColor: 'var(--ctp-surface1)' }}>
                <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: 'var(--ctp-text)' }}>
                  {soundMuted ? <VolumeX className="w-4 h-4 text-[var(--ctp-overlay0)]" /> : <Volume2 className="w-4 h-4 text-[var(--ctp-green)]" />}
                  <span>{language === 'en' ? 'Sound Effects:' : language === 'es' ? 'Efectos de Sonido:' : 'Effetti Sonori:'} <strong>{soundMuted ? (language === 'en' ? 'Muted' : language === 'es' ? 'Desactivados' : 'Disattivati') : (language === 'en' ? 'Active' : language === 'es' ? 'Activos' : 'Attivi')}</strong></span>
                </div>
                <button
                  onClick={handleToggleSound}
                  className="px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer"
                  style={{
                    backgroundColor: soundMuted ? 'var(--ctp-surface1)' : 'rgba(64, 160, 43, 0.15)',
                    color: soundMuted ? 'var(--ctp-subtext0)' : 'var(--ctp-green)',
                    borderColor: soundMuted ? 'var(--ctp-surface2)' : 'var(--ctp-green)'
                  }}
                >
                  {soundMuted ? (language === 'en' ? 'Enable' : language === 'es' ? 'Activar' : 'Attiva') : (language === 'en' ? 'Mute' : language === 'es' ? 'Desactivar' : 'Disattiva')}
                </button>
              </div>
            </div>

            {/* GitHub Sync */}
            <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: 'var(--ctp-surface0)', borderColor: 'var(--ctp-surface1)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: 'var(--ctp-mauve)' }}>
                  <Github className="w-4 h-4" />
                  <span>{language === 'en' ? 'GitHub Sync' : language === 'es' ? 'Sincronización GitHub' : 'Sincronizzazione GitHub'}</span>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--ctp-subtext0)' }}>
                {language === 'en' ? 'Publish completed challenges directly to your GitHub account via official OAuth.' : language === 'es' ? 'Publica desafíos completados directamente en tu cuenta de GitHub mediante OAuth oficial.' : 'Pubblica le sfide completate direttamente sul tuo account GitHub tramite OAuth ufficiale.'}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenGithubSync();
                }}
                className="w-full py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow hover:scale-[1.01] transition-transform"
                style={{ backgroundColor: 'var(--ctp-mauve)', color: 'var(--ctp-crust)', borderColor: 'var(--ctp-mauve)' }}
              >
                <Github className="w-4 h-4" />
                <span>{language === 'en' ? 'Open GitHub Sync' : language === 'es' ? 'Abrir Sincronización GitHub' : 'Apri Sincronizzazione GitHub'}</span>
              </button>
            </div>

            {/* Stats & Badges Quick Overview */}
            <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: 'var(--ctp-surface0)', borderColor: 'var(--ctp-surface1)' }}>
              <div className="flex items-center justify-between text-xs font-mono font-bold" style={{ color: 'var(--ctp-text)' }}>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[var(--ctp-peach)] fill-current" />
                  <span>{language === 'en' ? 'Active Streak:' : language === 'es' ? 'Racha Activa:' : 'Streak Attiva:'} <strong>{streakInfo?.count || 0} {language === 'en' ? 'Days' : language === 'es' ? 'Días' : 'Giorni'}</strong></span>
                </span>
              </div>

              <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: 'var(--ctp-surface1)' }}>
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold" style={{ color: 'var(--ctp-text)' }}>
                  <Award className="w-4 h-4 text-[var(--ctp-yellow)]" />
                  <span>{language === 'en' ? 'Unlocked Badges:' : language === 'es' ? 'Insignias Desbloqueadas:' : 'Badge Sbloccati:'} <strong>{unlockedBadgesCount}</strong></span>
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAchievements();
                  }}
                  className="px-3 py-1.5 rounded-lg border text-xs font-mono font-bold cursor-pointer hover:opacity-90"
                  style={{ backgroundColor: 'var(--ctp-surface1)', color: 'var(--ctp-yellow)', borderColor: 'var(--ctp-surface2)' }}
                >
                  Vedi Badge
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
