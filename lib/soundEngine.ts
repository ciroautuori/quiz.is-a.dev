// Web Audio API Sound Engine for DevQuest
// Sintetizza FX chiptune con zero dipendenze esterne

type OscType = OscillatorType;

interface ToneOpts {
  type: OscType;
  freq: number;
  freqEnd?: number;
  duration: number;
  gain: number;
  startOffset?: number;
  freqRamp?: 'exp' | 'linear';
}

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private isMuted = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('devquest_sound_muted');
      if (stored !== null) this.isMuted = stored === 'true';
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx) this.audioCtx = new Ctx();
    }
    if (this.audioCtx?.state === 'suspended') this.audioCtx.resume().catch(() => {});
    return this.audioCtx;
  }

  // Helper centrale: crea un oscillatore con gain envelope e lo connette
  private playTone(ctx: AudioContext, opts: ToneOpts) {
    const now = ctx.currentTime + (opts.startOffset ?? 0);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = opts.type;
    osc.frequency.setValueAtTime(opts.freq, now);
    if (opts.freqEnd !== undefined) {
      if (opts.freqRamp === 'linear') osc.frequency.linearRampToValueAtTime(opts.freqEnd, now + opts.duration);
      else osc.frequency.exponentialRampToValueAtTime(opts.freqEnd, now + opts.duration);
    }

    gain.gain.setValueAtTime(opts.gain, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + opts.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + opts.duration);
  }

  // Sequenza di note con lo stesso tipo e gain
  private playSequence(ctx: AudioContext, type: OscType, notes: { f: number; t: number }[], gain: number, dur: number) {
    notes.forEach((n) => this.playTone(ctx, { type, freq: n.f, duration: dur, gain, startOffset: n.t }));
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') localStorage.setItem('devquest_sound_muted', String(this.isMuted));
    return this.isMuted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  playCorrect() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Arpeggio C5-E5-G5-C6 su triangle + sine sub
    const arp = [523.25, 659.25, 783.99, 1046.50];
    arp.forEach((f, i) => this.playTone(ctx, { type: 'triangle', freq: f, duration: 0.08, gain: 0.15, startOffset: i * 0.08 }));
    this.playTone(ctx, { type: 'sine', freq: 261.63, freqEnd: 523.25, freqRamp: 'linear', duration: 0.45, gain: 0.1 });
  }

  playWrong() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(ctx, { type: 'sawtooth', freq: 220, freqEnd: 110, duration: 0.3, gain: 0.2 });
  }

  playCombo(comboCount: number) {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const base = 440 + Math.min(comboCount * 40, 400);
    this.playTone(ctx, { type: 'square', freq: base, freqEnd: base * 1.5, freqRamp: 'linear', duration: 0.35, gain: 0.12 });
  }

  playLevelUp() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
    notes.forEach((f, i) => this.playTone(ctx, { type: 'triangle', freq: f, duration: 0.3, gain: 0.15, startOffset: i * 0.07 }));
  }

  playTick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(ctx, { type: 'sine', freq: 800, duration: 0.04, gain: 0.05 });
  }

  playKeystroke() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(ctx, { type: 'sine', freq: 1200 + Math.random() * 200, duration: 0.02, gain: 0.015 });
  }

  playRunCode() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(ctx, { type: 'triangle', freq: 300, freqEnd: 900, duration: 0.15, gain: 0.08 });
  }

  playShopPurchase() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(ctx, { type: 'sine', freq: 987.77, freqEnd: 1318.51, freqRamp: 'linear', duration: 0.3, gain: 0.12 });
    this.playTone(ctx, { type: 'triangle', freq: 493.88, freqEnd: 659.25, freqRamp: 'linear', duration: 0.3, gain: 0.08 });
  }

  playBadgeHover() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(ctx, { type: 'sine', freq: 600, freqEnd: 800, duration: 0.06, gain: 0.02 });
  }

  playVictory() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playSequence(ctx, 'square', [
      { f: 523.25, t: 0 },
      { f: 659.25, t: 0.12 },
      { f: 783.99, t: 0.24 },
      { f: 1046.50, t: 0.36 },
      { f: 880.00, t: 0.52 },
      { f: 1046.50, t: 0.68 },
    ], 0.12, 0.25);
  }
}

export const soundEngine = new SoundEngine();
