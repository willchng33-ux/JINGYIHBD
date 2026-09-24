/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { StarryBackground } from './components/StarryBackground';
import { BirthdayCake } from './components/BirthdayCake';
import { WishBalloons } from './components/WishBalloons';
import { MultiDayCompanion } from './components/MultiDayCompanion';
import { SkyLanternRelease } from './components/SkyLanternRelease';
import { ScratchCardWish } from './components/ScratchCardWish';
import { EnvelopeCover } from './components/EnvelopeCover';
import { MusicToggle } from './components/MusicToggle';
import { sound } from './utils/audio';

const RECIPIENT_NAME = 'JING YI';
const BLESSING_MESSAGE = '不好的事就让它过去了，爱你的人都希望你开开心心的。';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);

  // Handle opening the initial envelope
  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    sound.startBgmLoop();
  };

  const triggerFloatingHearts = () => {
    sound.playChime(784, 0.4);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff7675', '#fd79a8', '#ffeaa7', '#ffd700'],
      shapes: ['star'],
    });
  };

  // Click on background star sparks
  const handleGlobalSpark = (e: React.MouseEvent) => {
    // Only if target is background or direct container
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
      return;
    }
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    confetti({
      particleCount: 10,
      spread: 35,
      origin: { x, y },
      colors: ['#ffeaa7', '#fd79a8'],
      scalar: 0.6,
    });
  };

  return (
    <div
      onClick={handleGlobalSpark}
      className="relative min-h-screen w-full flex flex-col items-center justify-between text-white overflow-x-hidden selection:bg-pink-500/30"
    >
      {/* Background Starry Sky and Firefly Canvas */}
      <StarryBackground />

      {/* Initial Envelope Cover (first-time entrance) */}
      {!isEnvelopeOpen && (
        <EnvelopeCover
          recipientName={RECIPIENT_NAME}
          onOpen={handleOpenEnvelope}
        />
      )}

      {/* Top Subtle Music Toggle */}
      <MusicToggle />

      {/* Main Birthday Greeting Content */}
      <main className="relative z-10 w-full max-w-xl px-4 py-10 sm:py-16 flex flex-col items-center">
        {/* Soft Decorative Star Icon */}
        <div className="flex items-center justify-center gap-2 mb-3 opacity-80">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-300" />
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-300" />
        </div>

        {/* Big Calligraphy Title */}
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-calligraphy tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-rose-300 drop-shadow-[0_4px_18px_rgba(255,200,100,0.4)]">
            {RECIPIENT_NAME} 生日快乐
          </h1>
          <p className="text-xs sm:text-sm tracking-[0.25em] text-amber-200/70 font-serif-sc uppercase">
            Happy Birthday
          </p>
        </div>

        {/* Central Heartfelt Quote Card */}
        <div className="relative w-full my-4 p-6 sm:p-8 rounded-3xl glass-panel text-center shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-amber-300/30">
          <p className="text-lg sm:text-xl md:text-2xl font-serif-sc font-medium leading-relaxed text-amber-100 drop-shadow-sm my-1">
            “{BLESSING_MESSAGE}”
          </p>

          <div className="flex items-center justify-center gap-3 mt-5 text-xs text-purple-200/80 font-sans">
            <span>往事清零</span>
            <span className="w-1 h-1 rounded-full bg-amber-300/60" />
            <span className="flex items-center gap-1 text-pink-300">
              <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
              岁岁欢愉
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-300/60" />
            <span>万事胜意</span>
          </div>
        </div>

        {/* 交互 1: 双层生日蛋糕吹蜡烛 */}
        <div className="w-full flex flex-col items-center mt-2">
          <BirthdayCake
            recipientName={RECIPIENT_NAME}
            onBlowCandle={triggerFloatingHearts}
          />
        </div>

        {/* 交互 2: 放飞孔明灯许愿 */}
        <SkyLanternRelease recipientName={RECIPIENT_NAME} />

        {/* 交互 3: 多天陪伴日历小笺 (Day 1 - Day 7 每天拆开一封不同暖心话) */}
        <MultiDayCompanion recipientName={RECIPIENT_NAME} />

        {/* 交互 4: 指尖刮刮乐悄悄话 (解压互动) */}
        <ScratchCardWish recipientName={RECIPIENT_NAME} />

        {/* 交互 5: 飘动的温暖心愿胶囊 */}
        <WishBalloons />
      </main>

      {/* Elegant Footer */}
      <footer className="relative z-10 w-full py-8 text-center text-xs text-amber-200/50">
        <p className="tracking-widest">♥ 愿你新的一岁常开心，万事顺意 ♥</p>
      </footer>
    </div>
  );
}
