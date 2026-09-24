import React, { useState } from 'react';
import { Sparkles, Flame, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface SkyLantern {
  id: string;
  x: number;
  wish: string;
}

const LANTERN_WISHES = [
  '愿 JING YI 平安喜乐',
  '所有不顺翻篇，万事顺意',
  '每天都有好心情 ☀️',
  '被爱包围，肆意发光',
  '岁岁常欢愉，年年皆胜意',
  '大吉大利，暴富暴美',
];

export const SkyLanternRelease: React.FC<{ recipientName: string }> = ({ recipientName }) => {
  const [lanterns, setLanterns] = useState<SkyLantern[]>([]);
  const [releasedCount, setReleasedCount] = useState<number>(0);

  const handleReleaseLantern = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playFireworkPop();

    const randomWish = LANTERN_WISHES[releasedCount % LANTERN_WISHES.length];
    const newLantern: SkyLantern = {
      id: Date.now().toString(),
      x: Math.random() * 70 + 15, // between 15% and 85% width
      wish: randomWish,
    };

    setLanterns((prev) => [...prev, newLantern]);
    setReleasedCount((prev) => prev + 1);

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#ffeaa7', '#ffd700'],
      scalar: 0.7,
    });

    // Remove lantern after float animation ends
    setTimeout(() => {
      setLanterns((prev) => prev.filter((l) => l.id !== newLantern.id));
    }, 7000);
  };

  return (
    <div className="w-full flex flex-col items-center select-none my-4">
      {/* Floating lanterns flying into sky */}
      {lanterns.map((l) => (
        <div
          key={l.id}
          className="fixed pointer-events-none z-30 flex flex-col items-center animate-lantern-float"
          style={{
            left: `${l.x}%`,
            bottom: '100px',
          }}
        >
          {/* Lantern Shape */}
          <div className="relative w-16 h-20 rounded-2xl bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_35px_rgba(255,180,50,0.9)] flex flex-col items-center justify-center p-2 text-center border border-yellow-200">
            {/* Lantern Flame Core */}
            <div className="w-3 h-5 rounded-full bg-white shadow-[0_0_12px_#fff] mb-1 animate-pulse" />
            <span className="text-[10px] font-bold text-red-900 leading-tight">
              {recipientName}
            </span>
          </div>
          {/* Hanging Wish Tag */}
          <div className="mt-1 px-2 py-0.5 rounded bg-red-800/80 border border-yellow-300/40 text-[9px] text-amber-200 font-serif-sc whitespace-nowrap shadow-md">
            {l.wish}
          </div>
        </div>
      ))}

      {/* Button to release lantern */}
      <button
        type="button"
        onClick={handleReleaseLantern}
        className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/25 to-pink-500/20 hover:from-amber-500/30 hover:to-pink-500/30 border border-amber-300/40 text-amber-200 text-xs sm:text-sm font-medium shadow-[0_0_20px_rgba(255,190,70,0.15)] hover:border-amber-300/80 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer backdrop-blur-md"
      >
        <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>点亮孔明灯 · 为 {recipientName} 放飞祈愿</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-45 transition-transform" />
      </button>

      {releasedCount > 0 && (
        <span className="text-[11px] text-amber-200/60 mt-1.5 flex items-center gap-1">
          <Heart className="w-3 h-3 text-pink-400 fill-pink-400/50" />
          已为他放飞 {releasedCount} 盏祈愿天灯
        </span>
      )}
    </div>
  );
};
