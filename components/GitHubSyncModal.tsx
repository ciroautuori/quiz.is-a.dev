'use client';

import React, { useState, useEffect } from 'react';
import { X, GitBranch, Github, ExternalLink, CheckCircle2, AlertCircle, RefreshCw, Code, Sparkles, FolderGit2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { getCompletedQuestionIds, getCustomQuestions } from '../lib/storage';
import { getAllQuestions } from '../lib/questions';
import { syncCompletedChallenges } from '../lib/githubSync';

interface GitHubAuthData {
  token: string;
  username: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
}

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GitHubSyncModal({ isOpen, onClose }: GitHubSyncModalProps) {
  const { t } = useLanguage();
  const [authData, setAuthData] = useState<GitHubAuthData | null>(null);
  const [repoName, setRepoName] = useState<string>('python-quest-solutions');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; repoUrl?: string; filesSynced?: number; error?: string } | null>(null);

  // Restore saved GitHub OAuth token from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devquest_github_auth');
      if (saved) {
        try {
          setAuthData(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse saved github auth', e);
        }
      }
    }
  }, []);

  // Listen for OAuth postMessage callback from popup window
  useEffect(() => {
    // Background auto-sync if we have an auth token and challenges
    if (authData?.token && completedChallenges.length > 0) {
      syncCompletedChallenges(completedChallenges, repoName).catch(console.error);
    }
    const handleMessage = (event: MessageEvent) => {
      // Validate origin
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
        return;
      }

      if (event.data?.type === 'GITHUB_AUTH_SUCCESS' && event.data.payload) {
        const payload: GitHubAuthData = event.data.payload;
        setAuthData(payload);
        setIsConnecting(false);
        if (typeof window !== 'undefined') {
          localStorage.setItem('devquest_github_auth', JSON.stringify(payload));
        }
      } else if (event.data?.type === 'GITHUB_AUTH_ERROR') {
        setIsConnecting(false);
        alert(`Errore durante l'autenticazione GitHub: ${event.data.error || 'Fallito'}`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!isOpen) return null;

  // Gather completed challenges to sync
  const completedIds = getCompletedQuestionIds();
  const customQuestions = getCustomQuestions();
  const allAvailableChallenges = [...getAllQuestions(), ...customQuestions];

  const completedChallenges = allAvailableChallenges.filter((ch) => completedIds.includes(ch.id)).map((ch) => ({
    id: ch.id,
    trackId: ch.trackId || 'python',
    titolo: ch.argomento || `Sfida #${ch.id}`,
    difficolta: ch.difficolta || 'facile',
    domanda: ch.domanda,
    codiceIniziale: ch.codice || '',
    soluzioneFormattata: ch.spiegazione,
    spiegazione: ch.spiegazione,
  }));

  const handleConnectGithub = async () => {
    setIsConnecting(true);
    setSyncResult(null);
    try {
      const res = await fetch('/api/auth/github/url');
      const data = await res.json();

      if (!res.ok || !data.url) {
        alert(data.message || 'Configurazione GitHub OAuth mancante sul server. Verifica le variabili d ambiente GITHUB_CLIENT_ID e GITHUB_CLIENT_SECRET.');
        setIsConnecting(false);
        return;
      }

      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        data.url,
        'github_oauth_popup',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
      );

      if (!popup) {
        alert('Abilita i popup per il sito per consentire l autenticazione con GitHub.');
        setIsConnecting(false);
      }
    } catch (err) {
      console.error('Error fetching github url:', err);
      setIsConnecting(false);
      alert('Impossibile contattare il server per l autenticazione GitHub.');
    }
  };

  const handleDisconnect = () => {
    setAuthData(null);
    setSyncResult(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('devquest_github_auth');
    }
  };

  const handlePushToGithub = async () => {
    if (!authData?.token) return;
    setIsSyncing(true);
    setSyncResult(null);

    try {
      const data = await syncCompletedChallenges(completedChallenges, repoName.trim() || 'python-quest-solutions');
      if (data.success) {
        setSyncResult({
          success: true,
          repoUrl: data.repoUrl,
          filesSynced: data.filesSynced,
        });
      } else {
        setSyncResult({
          success: false,
          error: 'Errore imprevisto durante la sincronizzazione.',
        });
      }
    } catch (err: any) {
      setSyncResult({
        success: false,
        error: err.message || 'Connessione al server fallita.',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-2xl border shadow-2xl p-6 ctp-card-mantle overflow-hidden flex flex-col max-h-[90vh]"
        style={{ borderColor: 'var(--ctp-surface2)' }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--ctp-surface1)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
                {t.githubSyncTitle}
              </h2>
              <p className="text-xs font-mono" style={{ color: 'var(--ctp-subtext0)' }}>
                {t.githubSyncSubtitle}
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

        {/* Modal Body */}
        <div className="py-4 space-y-5 overflow-y-auto pr-1">
          {/* GitHub Connection Status Card */}
          {!authData ? (
            <div className="p-5 rounded-2xl border ctp-card-surface text-center space-y-3" style={{ borderColor: 'var(--ctp-surface1)' }}>
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <Github className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-mono max-w-md mx-auto" style={{ color: 'var(--ctp-subtext0)' }}>
                {t.githubOauthHint}
              </p>
              <button
                onClick={handleConnectGithub}
                disabled={isConnecting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-lg hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Connessione in corso...</span>
                  </>
                ) : (
                  <>
                    <Github className="w-4 h-4" />
                    <span>{t.connectGithub}</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl border ctp-card-surface flex items-center justify-between gap-3" style={{ borderColor: 'var(--ctp-surface1)' }}>
              <div className="flex items-center gap-3">
                <img
                  src={authData.avatarUrl}
                  alt={authData.username}
                  className="w-10 h-10 rounded-full border-2 border-[var(--ctp-mauve)] shadow-md"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold font-mono" style={{ color: 'var(--ctp-text)' }}>
                      {authData.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.connectedAs}</span>
                    </span>
                  </div>
                  <a
                    href={authData.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono hover:underline flex items-center gap-1 text-[var(--ctp-mauve)]"
                  >
                    <span>@{authData.username}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <button
                onClick={handleDisconnect}
                className="px-3 py-1.5 rounded-xl border text-xs font-mono hover:bg-red-500/10 hover:text-red-400 border-red-500/20 transition-all cursor-pointer"
                style={{ color: 'var(--ctp-subtext0)' }}
              >
                {t.disconnectGithub}
              </button>
            </div>
          )}

          {/* Sync Configuration section (if connected) */}
          {authData && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold mb-1.5" style={{ color: 'var(--ctp-text)' }}>
                  {t.repoNameLabel}
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <FolderGit2 className="w-4 h-4 absolute left-3 top-2.5 text-[var(--ctp-mauve)]" />
                    <input
                      type="text"
                      value={repoName}
                      onChange={(e) => setRepoName(e.target.value)}
                      placeholder="python-quest-solutions"
                      className="w-full pl-9 pr-3 py-2 rounded-xl text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-[var(--ctp-mauve)] ctp-card-surface"
                      style={{ color: 'var(--ctp-text)', borderColor: 'var(--ctp-surface2)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Completed Challenges Preview list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold" style={{ color: 'var(--ctp-text)' }}>
                    {t.challengesToPush} ({completedChallenges.length})
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--ctp-subtext0)' }}>
                    Python • TypeScript • Git
                  </span>
                </div>

                {completedChallenges.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed text-center text-xs font-mono" style={{ borderColor: 'var(--ctp-surface2)', color: 'var(--ctp-subtext0)' }}>
                    {t.noCompletedChallengesToSync}
                  </div>
                ) : (
                  <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                    {completedChallenges.map((ch) => (
                      <div
                        key={ch.id}
                        className="flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-mono bg-[var(--ctp-surface0)]"
                        style={{ borderColor: 'var(--ctp-surface1)' }}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Code className="w-3.5 h-3.5 text-[var(--ctp-mauve)] shrink-0" />
                          <span className="truncate" style={{ color: 'var(--ctp-text)' }}>
                            {ch.titolo}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[var(--ctp-surface1)] text-[var(--ctp-mauve)] shrink-0 ml-2">
                          {ch.trackId}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Push Action Button */}
              <button
                onClick={handlePushToGithub}
                disabled={isSyncing || completedChallenges.length === 0}
                className="w-full py-3 rounded-xl font-mono text-xs font-bold transition-all bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>{t.syncingWithGithub}</span>
                  </>
                ) : (
                  <>
                    <GitBranch className="w-4 h-4 text-white" />
                    <span>{t.pushToGithub} ({completedChallenges.length})</span>
                  </>
                )}
              </button>

              {/* Sync Result Toast / Notification */}
              {syncResult && (
                <div
                  className={`p-4 rounded-2xl border text-xs font-mono space-y-2 ${
                    syncResult.success
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {syncResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span>
                      {syncResult.success ? t.syncSuccess : 'Errore Sincronizzazione'}
                    </span>
                  </div>

                  <p className="text-[11px] opacity-90">
                    {syncResult.success
                      ? `${t.syncSuccessDesc} (${syncResult.filesSynced} file creati/aggiornati)`
                      : syncResult.error}
                  </p>

                  {syncResult.success && syncResult.repoUrl && (
                    <a
                      href={syncResult.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 hover:bg-emerald-500/30 transition-all text-xs"
                    >
                      <span>{t.openRepository}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
