// Pure Web Audio API Sound Synthesizer (0 external assets, 0ms load delay)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private suspendTimer: ReturnType<typeof setTimeout> | null = null;
  private subscribers: Set<(muted: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_sound_muted');
      this.muted = saved === 'true';
    }
  }

  public subscribe(callback: (muted: boolean) => void): () => void {
    this.subscribers.add(callback);
    callback(this.muted);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notify(): void {
    this.subscribers.forEach((cb) => cb(this.muted));
  }

  private scheduleSuspend(): void {
    if (typeof window === 'undefined') return;
    if (this.suspendTimer) clearTimeout(this.suspendTimer);
    this.suspendTimer = setTimeout(() => {
      if (this.ctx && this.ctx.state === 'running') {
        this.ctx.suspend().catch((err) => {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('[SoundEngine] Context suspend error:', err);
          }
        });
      }
    }, 3500);
  }

  private getContext(): AudioContext | null {
    if (this.muted) return null;
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[SoundEngine] Context resume error:', err);
        }
      });
    }

    this.scheduleSuspend();
    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_sound_muted', String(this.muted));
    }
    this.notify();
    if (!this.muted) {
      this.playSuccess();
    }
    return this.muted;
  }

  public playClick(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[SoundEngine] playClick error:', err);
      }
    }
  }

  public playHover(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[SoundEngine] playHover error:', err);
      }
    }
  }

  public playTerminalKey(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = 500 + Math.random() * 200;
      osc.type = 'square';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.025);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[SoundEngine] playTerminalKey error:', err);
      }
    }
  }

  public playSuccess(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.03, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.18);
      });
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[SoundEngine] playSuccess error:', err);
      }
    }
  }

  public playTabSwitch(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[SoundEngine] playTabSwitch error:', err);
      }
    }
  }
}

export const sound = new SoundEngine();
