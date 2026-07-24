'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Download, Share2, X, ShieldCheck, QrCode, Github } from 'lucide-react';
import { soundEngine } from '../lib/soundEngine';
import { useLanguage } from '../lib/LanguageContext';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  trackName?: string;
  completedCount?: number;
  totalCount?: number;
}

export default function CertificateModal({
  isOpen,
  onClose,
  studentName = 'DevQuest Master Student',
  trackName = 'Python Master Developer Track',
  // completedCount and totalCount are optional and kept for interface compliance
}: CertificateModalProps) {
  const { language } = useLanguage();
  const [nameInput, setNameInput] = useState(studentName);
  const [isEditing, setIsEditing] = useState(false);
  const [hash, setHash] = useState('');

  useEffect(() => {
    async function generateHash() {
      const encoder = new TextEncoder();
      const data = encoder.encode(`${nameInput}-${trackName}-${new Date().toISOString()}`);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex.substring(0, 16).toUpperCase());
    }
    generateHash();
  }, [nameInput, trackName]);

  if (!isOpen) return null;

  const issueDate = new Date().toLocaleDateString(language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'it-IT', { year: 'numeric', month: 'long', day: 'numeric' });

  const generateOpenBadgeJSON = async () => {
    const salt = "devquest_salt_2026";
    const encoder = new TextEncoder();
    const recipientData = encoder.encode(`${nameInput.toLowerCase()}$${salt}`);
    const recipientBuffer = await crypto.subtle.digest('SHA-256', recipientData);
    const recipientHex = Array.from(new Uint8Array(recipientBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    const badge = {
      "@context": "https://w3id.org/openbadges/v2",
      "type": "Assertion",
      "id": `urn:uuid:${hash}`,
      "recipient": {
        "type": "email",
        "hashed": true,
        "salt": salt,
        "identity": `sha256$${recipientHex}`
      },
      "issuedOn": new Date().toISOString(),
      "badge": {
        "type": "BadgeClass",
        "id": "https://devquest.app/badges/python-master",
        "name": trackName,
        "description": "Completed 100% of the challenges.",
        "image": "https://devquest.app/badge.png",
        "criteria": {
          "id": "https://devquest.app/tracks/python"
        },
        "issuer": {
          "type": "Profile",
          "id": "https://devquest.app/issuer",
          "name": "DevQuest",
          "url": "https://devquest.app",
          "email": "hello@devquest.app"
        }
      },
      "verification": {
        "type": "HostedBadge"
      }
    };
    const blob = new Blob([JSON.stringify(badge, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `openbadge-${hash}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    soundEngine.playLevelUp();
    window.print();
  };
  
  const handleGithubShare = () => {
    const md = `[![DevQuest Certificate](https://devquest.app/badge.png)](https://devquest.app/verify/${hash})\n\n**${nameInput}** has completed the **${trackName}** on DevQuest!`;
    navigator.clipboard.writeText(md);
    alert(language === 'en' ? 'Markdown copied to clipboard! Paste it into your GitHub README.' : language === 'es' ? '¡Markdown copiado al portapapeles! Pégalo en tu README de GitHub.' : 'Markdown copiata negli appunti! Incollala nel tuo README di GitHub.');
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://devquest.app/verify/${hash}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl ctp-card rounded-2xl shadow-2xl border border-[var(--ctp-surface1)] overflow-hidden flex flex-col font-mono"
        >
          {/* Header */}
          <div className="p-4 px-6 ctp-card-mantle border-b border-[var(--ctp-surface1)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center text-white shadow-lg">
                <Award className="w-6 h-6 fill-amber-200" />
              </div>
              <div>
                <h2 className="font-bold text-base text-[var(--ctp-text)]">
                  Certificato Ufficiale di Maestria
                </h2>
                <p className="text-xs text-[var(--ctp-subtext0)]">
                  Export Digital Badge e Verificabilità QR
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

          {/* Certificate Design Container */}
          <div className="p-6 bg-slate-950 text-slate-100 flex flex-col items-center justify-center border-b border-[var(--ctp-surface1)] relative overflow-hidden space-y-6">
            <div className="w-full border-2 border-amber-500/40 p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 relative space-y-6 text-center shadow-2xl">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>DEVQUEST CERTIFIED ECOSYSTEM</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-slate-400">SHA-256 Verification</span>
                  <span className="text-[10px] text-slate-500 font-mono">{hash || 'GENERATING...'}</span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
                  Si attesta con la presente che
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                    className="bg-slate-800 text-amber-300 font-serif text-2xl font-black px-4 py-1 rounded border border-amber-400/50 text-center"
                  />
                ) : (
                  <h3
                    onClick={() => setIsEditing(true)}
                    className="text-2xl sm:text-3xl font-serif font-black text-amber-300 cursor-pointer hover:underline"
                    title="Clicca per modificare il tuo nome"
                  >
                    {nameInput}
                  </h3>
                )}
              </div>

              <div className="max-w-md mx-auto text-xs leading-relaxed text-slate-300">
                ha superato con successo il 100% delle sfide pratiche e dei test di sintassi nel percorso ufficiale:
                <div className="text-sm font-bold text-amber-400 mt-2">{trackName}</div>
              </div>

              <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-slate-400">
                <div>
                  <span>Data Rilascio: </span>
                  <strong className="text-slate-200">{issueDate}</strong>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrUrl} alt="QR Code Verification" className="w-12 h-12 rounded" />
                    <div className="flex flex-col">
                      <QrCode className="w-4 h-4 text-amber-400 mb-1" />
                      <span className="text-[10px] text-slate-400">Scan to Verify</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Footer */}
          <div className="p-4 px-6 ctp-card-mantle flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[var(--ctp-subtext0)] max-w-[200px]">
              Supporta l'esportazione in PDF, OpenBadge 2.0 e la condivisione social.
            </span>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={generateOpenBadgeJSON}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>OpenBadge</span>
                </button>
                <button
                  onClick={handleGithubShare}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`Ho appena conseguito il Certificato Ufficiale di Maestria Python su DevQuest! Verified ID: ${hash}`);
                    const url = encodeURIComponent('https://devquest.app');
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`, '_blank');
                  }}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg hover:opacity-90 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Stampa</span>
                </button>
              </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
