import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

interface BirthdayCakeProps {
  recipientName: string;
  onBlowCandle?: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  recipientName,
  onBlowCandle,
}) => {
  const [isLit, setIsLit] = useState<boolean>(true);
  const [hasBlown, setHasBlown] = useState<boolean>(false);
  const [isBlowing, setIsBlowing] = useState<boolean>(false);

  const triggerCelebration = () => {
    // Wave 1: Center star burst
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff6b81', '#a29bfe', '#ffeaa7', '#fd79a8'],
      shapes: ['star', 'circle'],
      scalar: 1.2,
    });

    // Wave 2: Left and Right canons
    setTimeout(() => {
      sound.playFireworkPop();
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 65,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 65,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#fd79a8', '#fdcb6e', '#e84393', '#ffeaa7'],
      });
    }, 280);

    // Wave 3: Golden shower
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ffeaa7', '#ffd700', '#ffffff'],
        scalar: 0.9,
      });
    }, 600);
  };

  const handleBlowOut = () => {
    if (!isLit) return;
    setIsBlowing(true);
    sound.playBlowSound();

    setTimeout(() => {
      setIsLit(false);
      setHasBlown(true);
      setIsBlowing(false);
      triggerCelebration();
      if (onBlowCandle) {
        onBlowCandle();
      }
    }, 450);
  };

  const handleRelight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLit(true);
    sound.playChime(659.25, 0.6);
  };

  return (
    <div className="relative flex flex-col items-center select-none my-2">
      {/* Interactive Birthday Cake Container */}
      <div
        onClick={handleBlowOut}
        role="button"
        tabIndex={0}
        aria-label="点击吹灭生日蜡烛"
        className="relative group cursor-pointer p-4 rounded-3xl transition-transform hover:scale-[1.02] active:scale-[0.98] outline-none"
      >
        {/* Ambient Candle Halo Glow */}
        {isLit && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        )}

        {/* SVG Illustration of Deluxe Cake */}
        <div className="relative w-64 h-56 sm:w-72 sm:h-64 flex items-center justify-center">
          <svg
            viewBox="0 0 300 280"
            className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
          >
            {/* Base Plate with Golden Edge */}
            <ellipse cx="150" cy="245" rx="135" ry="22" fill="#2d1b4e" opacity="0.6" />
            <ellipse cx="150" cy="240" rx="130" ry="18" fill="url(#plateGradient)" />
            <ellipse cx="150" cy="238" rx="122" ry="15" fill="#fcf9f2" />

            {/* Cake Bottom Tier */}
            <path
              d="M 45 170 C 45 160 55 155 60 155 L 240 155 C 245 155 255 160 255 170 L 255 220 C 255 235 150 245 45 220 Z"
              fill="url(#cakeBottomGrad)"
            />
            {/* Bottom tier cream border drips */}
            <path
              d="M 45 170 
                 Q 60 185 75 170 
                 Q 90 190 105 170 
                 Q 120 185 135 170 
                 Q 150 192 165 170 
                 Q 180 185 195 170 
                 Q 210 190 225 170 
                 Q 240 185 255 170 
                 L 255 155 L 45 155 Z"
              fill="#fff9f5"
            />

            {/* Bottom Tier Sprinkles & Pearls */}
            <circle cx="75" cy="205" r="3" fill="#ff7675" />
            <circle cx="105" cy="215" r="3.5" fill="#ffeaa7" />
            <circle cx="140" cy="210" r="3" fill="#a29bfe" />
            <circle cx="170" cy="218" r="3" fill="#fd79a8" />
            <circle cx="200" cy="208" r="3.5" fill="#55efc4" />
            <circle cx="225" cy="212" r="3" fill="#ffeaa7" />

            {/* Cake Top Tier */}
            <path
              d="M 75 110 C 75 100 85 95 90 95 L 210 95 C 215 95 225 100 225 110 L 225 155 C 225 168 150 176 75 155 Z"
              fill="url(#cakeTopGrad)"
            />
            {/* Top tier cream drips */}
            <path
              d="M 75 110 
                 Q 90 128 105 110 
                 Q 120 132 135 110 
                 Q 150 126 165 110 
                 Q 180 130 195 110 
                 Q 210 125 225 110 
                 L 225 95 L 75 95 Z"
              fill="#fffdfa"
            />

            {/* Strawberries / Raspberries on cake */}
            <g transform="translate(90, 85)">
              <ellipse cx="6" cy="6" rx="8" ry="10" fill="#e84118" />
              <circle cx="4" cy="4" r="1" fill="#ffeaa7" />
              <path d="M 6 0 L 3 -3 L 9 -3 Z" fill="#44bd32" />
            </g>
            <g transform="translate(195, 85)">
              <ellipse cx="6" cy="6" rx="8" ry="10" fill="#e84118" />
              <circle cx="4" cy="4" r="1" fill="#ffeaa7" />
              <path d="M 6 0 L 3 -3 L 9 -3 Z" fill="#44bd32" />
            </g>

            {/* Name Banner on Cake */}
            <rect
              x="92"
              y="125"
              width="116"
              height="24"
              rx="12"
              fill="rgba(42, 23, 68, 0.75)"
              stroke="#ffd700"
              strokeWidth="1.2"
            />
            <text
              x="150"
              y="141"
              textAnchor="middle"
              fill="#ffeaa7"
              fontSize="12"
              fontWeight="bold"
              letterSpacing="1"
            >
              ♥ {recipientName} ♥
            </text>

            {/* Candle Sticks (Center + Accents) */}
            {/* Center Candle */}
            <rect x="146" y="52" width="8" height="42" rx="3" fill="url(#candleGrad)" />
            <path d="M 146 64 L 154 60" stroke="#ff7675" strokeWidth="2" />
            <path d="M 146 76 L 154 72" stroke="#ff7675" strokeWidth="2" />
            <path d="M 146 88 L 154 84" stroke="#ff7675" strokeWidth="2" />
            {/* Candle Wick */}
            <line x1="150" y1="52" x2="150" y2="44" stroke="#333" strokeWidth="2" strokeLinecap="round" />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="plateGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="50%" stopColor="#fff2a8" />
                <stop offset="100%" stopColor="#c59b27" />
              </linearGradient>

              <linearGradient id="cakeBottomGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8a5c2" />
                <stop offset="60%" stopColor="#e77f9f" />
                <stop offset="100%" stopColor="#c45c7e" />
              </linearGradient>

              <linearGradient id="cakeTopGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f7d794" />
                <stop offset="70%" stopColor="#f5cd79" />
                <stop offset="100%" stopColor="#e5a950" />
              </linearGradient>

              <linearGradient id="candleGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#fff0f5" />
                <stop offset="100%" stopColor="#ffd1dc" />
              </linearGradient>

              <radialGradient id="flameInner" cx="50%" cy="65%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#fff382" />
                <stop offset="75%" stopColor="#ff7b25" />
                <stop offset="100%" stopColor="#e84118" />
              </radialGradient>
            </defs>
          </svg>

          {/* Candle Flame HTML Overlay with rich animation */}
          {isLit && (
            <div
              className={`absolute top-[6px] sm:top-[12px] left-[50%] -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-300 ${
                isBlowing ? 'scale-75 translate-x-2 opacity-50 blur-[1px]' : 'animate-candle-flame'
              }`}
            >
              <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_24px_rgba(255,180,30,0.95)]" />
              <div className="absolute w-2 h-3 bottom-0.5 rounded-full bg-blue-400 opacity-80" />
            </div>
          )}

          {/* Smoke rising when blown out */}
          {!isLit && (
            <div className="absolute top-[20px] left-[50%] -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <div className="w-1.5 h-10 bg-gradient-to-t from-gray-400 to-transparent blur-[1px] animate-fade-out" />
            </div>
          )}
        </div>

        {/* Action Prompt Tag */}
        <div className="mt-1 flex flex-col items-center gap-1.5">
          {isLit ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/25 via-pink-500/25 to-purple-500/25 border border-amber-300/40 text-amber-200 text-xs sm:text-sm font-medium tracking-wide shadow-lg group-hover:border-amber-300/80 transition-all">
              <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>轻触蜡烛许愿 · 吹灭蜡烛</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-emerald-300 text-xs sm:text-sm font-medium bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                ✨ 愿望已送抵星空！愿所求皆如愿
              </span>
              <button
                type="button"
                onClick={handleRelight}
                className="p-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 transition-all hover:rotate-180 duration-500"
                title="重新点亮蜡烛"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
