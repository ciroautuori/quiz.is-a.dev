'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { registerServiceWorker } from '../lib/pwa';
import { Download, Smartphone, X, Check, Share, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PwaInstallPrompt() {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Service Worker registration failed:', err);
      });
    }

    // 2. Check if already installed in standalone mode
    if (typeof window !== 'undefined') {
      const isInStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;

      setIsStandalone(isInStandalone);

      // Detect iOS
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIos(isIosDevice);

      // Check if user previously dismissed banner in localStorage
      const dismissed = localStorage.getItem('devquest_pwa_dismissed');
      if (!isInStandalone && !dismissed) {
        // Show banner after 2 seconds
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    // 3. Capture beforeinstallprompt event for Chromium browsers (Android, Chrome, Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIos) {
        alert(t.pwaIosInstructions);
      }
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error('PWA Installation error:', err);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('devquest_pwa_dismissed', 'true');
  };

  if (isStandalone || !showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-0.5 rounded-2xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, var(--ctp-mauve), var(--ctp-blue))'
        }}
      >
        <div className="ctp-card-mantle p-4 rounded-[14px] flex flex-col gap-3 border border-[var(--ctp-surface1)] relative">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[var(--ctp-surface0)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Smartphone className="w-5 h-5 animate-bounce" />
            </div>
            <div className="pr-6">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider font-mono text-[var(--ctp-mauve)]">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Web App Installabile</span>
              </div>
              <h4 className="text-xs font-bold font-mono mt-0.5" style={{ color: 'var(--ctp-text)' }}>
                {t.pwaBannerTitle}
              </h4>
              <p className="text-[11px] mt-1 leading-snug" style={{ color: 'var(--ctp-subtext0)' }}>
                {t.pwaBannerDesc}
              </p>
            </div>
          </div>

          {isIos && (
            <div className="p-2.5 rounded-xl bg-[var(--ctp-surface0)] border border-[var(--ctp-surface1)] text-[11px] flex items-center gap-2" style={{ color: 'var(--ctp-text)' }}>
              <Share className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{t.pwaIosInstructions}</span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={handleInstallClick}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold bg-[var(--ctp-mauve)] text-white hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              {isInstalled ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{t.installed}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{t.installApp}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDismiss}
              className="py-2.5 px-3 rounded-xl text-xs font-mono font-medium ctp-card-surface border text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] transition-colors cursor-pointer"
            >
              Più tardi
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
