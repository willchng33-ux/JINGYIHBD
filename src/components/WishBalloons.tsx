import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface WishItem {
  id: string;
  text: string;
  color: string;
}

const BLESSING_WISHS: WishItem[] = [
  { id: '1', text: '不好的事就让它过去吧 🍃', color: 'from-pink-500/70 to-rose-400/70' },
  { id: '2', text: '每天都要开开心心的 ☀️', color: 'from-amber-500/70 to-orange-400/70' },
  { id: '3', text: '爱你的人都在身边 💖', color: 'from-purple-500/70 to-indigo-400/70' },
  { id: '4', text: '眼里有光，心向暖阳 ✨', color: 'from-emerald-500/70 to-teal-400/70' },
  { id: '5', text: '岁岁常欢愉，万事皆顺意 🎈', color: 'from-sky-500/70 to-blue-400/70' },
];

export const WishBalloons: React.FC = () => {
  const [wishes] = useState<WishItem[]>(BLESSING_WISHS);

  const handleTouchWish = (wish: WishItem, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChime(880 + Math.random() * 200, 0.5);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { x, y },
      colors: ['#ffeaa7', '#ffd700', '#ff7675'],
      scalar: 0.7,
    });
  };

  return (
    <div className="w-full flex flex-col items-center select-none my-4">
      {/* Floating blessing capsules */}
      <div className="flex flex-wrap gap-2.5 justify-center items-center max-w-lg px-2">
        {wishes.map((w, idx) => (
          <div
            key={w.id}
            onClick={(e) => handleTouchWish(w, e)}
            role="button"
            tabIndex={0}
            className={`group px-3.5 py-1.5 rounded-full bg-gradient-to-r ${w.color} border border-white/20 text-white text-xs sm:text-sm font-medium shadow-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer backdrop-blur-sm`}
            style={{
              animation: `float ${3.8 + (idx % 3) * 0.7}s ease-in-out infinite`,
              animationDelay: `${idx * 0.35}s`,
            }}
          >
            <Sparkles className="w-3 h-3 text-amber-200 group-hover:rotate-45 transition-transform" />
            <span>{w.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
