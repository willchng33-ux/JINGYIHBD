/**
 * Web Audio API synthesized sounds for crystal-clear, zero-latency birthday experience.
 * Does not depend on external MP3 files that could fail to load.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingBgm: boolean = false;
  private bgmTimeoutId: number | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a soft chime / chime bell
  public playChime(freq = 880, duration = 1.2) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration * 0.3);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext policy fallback
    }
  }

  // Play candle blow whoosh sound
  public playBlowSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch {
      // ignore
    }
  }

  // Play celebratory spark / firework pop
  public playFireworkPop() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);

      // Add a sparkling shimmer
      setTimeout(() => {
        this.playChime(1046.5, 0.8);
        setTimeout(() => this.playChime(1318.5, 0.9), 100);
      }, 120);
    } catch {
      // ignore
    }
  }

  // Happy Birthday Music Box Melody Notes
  // C4, C4, D4, C4, F4, E4 ...
  private birthdayNotes = [
    { note: 261.63, dur: 0.35, pause: 0.1 }, // 祝
    { note: 261.63, dur: 0.25, pause: 0.1 }, // 你
    { note: 293.66, dur: 0.5, pause: 0.1 },  // 生
    { note: 261.63, dur: 0.5, pause: 0.1 },  // 日
    { note: 349.23, dur: 0.5, pause: 0.1 },  // 快
    { note: 329.63, dur: 0.9, pause: 0.3 },  // 乐
    
    { note: 261.63, dur: 0.35, pause: 0.1 }, // 祝
    { note: 261.63, dur: 0.25, pause: 0.1 }, // 你
    { note: 293.66, dur: 0.5, pause: 0.1 },  // 生
    { note: 261.63, dur: 0.5, pause: 0.1 },  // 日
    { note: 392.00, dur: 0.5, pause: 0.1 },  // 快
    { note: 349.23, dur: 0.9, pause: 0.3 },  // 乐

    { note: 261.63, dur: 0.35, pause: 0.1 }, // 祝
    { note: 261.63, dur: 0.25, pause: 0.1 }, // 你
    { note: 523.25, dur: 0.5, pause: 0.1 },  // 生 (JING YI)
    { note: 440.00, dur: 0.5, pause: 0.1 },  // 日
    { note: 349.23, dur: 0.5, pause: 0.1 },  // 快
    { note: 329.63, dur: 0.5, pause: 0.1 },  // 乐
    { note: 293.66, dur: 0.8, pause: 0.3 },  // 呀

    { note: 466.16, dur: 0.35, pause: 0.1 }, // 祝
    { note: 466.16, dur: 0.25, pause: 0.1 }, // 你
    { note: 440.00, dur: 0.5, pause: 0.1 },  // 生
    { note: 349.23, dur: 0.5, pause: 0.1 },  // 日
    { note: 392.00, dur: 0.5, pause: 0.1 },  // 快
    { note: 349.23, dur: 1.2, pause: 0.8 },  // 乐
  ];

  // Play celestial music box note
  public playMusicBoxNote(freq: number, duration: number) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sine wave with soft harmonic
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Music box bell envelope: fast attack, slow bell decay
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.35);
    } catch {
      // ignore
    }
  }

  // Toggle Background Music
  public startBgmLoop() {
    this.isPlayingBgm = true;
    let noteIndex = 0;

    const playNext = () => {
      if (!this.isPlayingBgm) return;
      const item = this.birthdayNotes[noteIndex];
      this.playMusicBoxNote(item.note, item.dur);

      noteIndex = (noteIndex + 1) % this.birthdayNotes.length;
      const delay = (item.dur + item.pause) * 1000;
      this.bgmTimeoutId = window.setTimeout(playNext, delay);
    };

    playNext();
  }

  public stopBgmLoop() {
    this.isPlayingBgm = false;
    if (this.bgmTimeoutId) {
      clearTimeout(this.bgmTimeoutId);
      this.bgmTimeoutId = null;
    }
  }

  public toggleBgm(): boolean {
    if (this.isPlayingBgm) {
      this.stopBgmLoop();
      return false;
    } else {
      this.startBgmLoop();
      return true;
    }
  }

  public getIsPlayingBgm() {
    return this.isPlayingBgm;
  }
}

export const sound = new SoundSynthesizer();
