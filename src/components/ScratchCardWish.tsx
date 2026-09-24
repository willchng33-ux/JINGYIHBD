import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Gift, Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

const SECRET_BLESSINGS = [
  '❤️ 无论发生什么，爱你的人都在这里支持你！',
  '🌟 今天的烦恼到此为止，明天的快乐即刻启程！',
  '🍀 愿所有的温柔与偏爱，都落在 JING YI 身上。',
  '🎈 不用做每个人都喜欢的样子，做自己就闪闪发光！',
  '✨ 祝你岁岁年年，深情不负，所得皆所愿！',
];

export const ScratchCardWish: React.FC<{ recipientName: string }> = ({ recipientName }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [blessingIndex, setBlessingIndex] = useState(0);
  const [scratchedPercent, setScratchedPercent] = useState(0);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Golden scratch coating
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#c59b27');
    grad.addColorStop(0.3, '#f9e79f');
    grad.addColorStop(0.7, '#d4af37');
    grad.addColorStop(1, '#997300');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle scratch pattern / text
    ctx.fillStyle = 'rgba(70, 45, 10, 0.7)';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ 指尖轻刮，揭晓写给你的今日悄悄话 ✨', width / 2, height / 2);

    setIsRevealed(false);
    setScratchedPercent(0);
  };

  useEffect(() => {
    initCanvas();
  }, [blessingIndex]);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    setScratchedPercent((prev) => {
      const next = prev + 3;
      if (next >= 40 && !isRevealed) {
        setIsRevealed(true);
        sound.playChime(1046.5, 0.6);
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#ffd700', '#ff6b81', '#55efc4'],
        });
      }
      return next;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;
    scratch(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    if (touch) {
      scratch(touch.clientX, touch.clientY);
    }
  };

  const handleNextSecret = () => {
    setBlessingIndex((prev) => (prev + 1) % SECRET_BLESSINGS.length);
    sound.playChime(784, 0.3);
  };

  return (
    <div className="w-full my-6 flex flex-col items-center select-none">
      <div className="w-full rounded-3xl glass-panel p-5 sm:p-7 border border-amber-300/30 shadow-[0_15px_45px_rgba(0,0,0,0.6)] flex flex-col items-center">
        {/* Title */}
        <div className="flex items-center gap-2 mb-3">
          <Gift className="w-4 h-4 text-pink-400" />
          <h3 className="text-sm sm:text-base font-bold text-white">
            今日专属刮刮乐 · 悄悄话
          </h3>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <p className="text-xs text-amber-200/70 mb-4 text-center">
          用手指或鼠标轻轻刮开金箔，解锁属于 {recipientName} 的心意
        </p>

        {/* Scratch Card Canvas Container */}
        <div className="relative w-full max-w-sm h-32 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/40 flex items-center justify-center bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-4 text-center">
          {/* Secret Message Underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400/50 mb-1.5 animate-pulse" />
            <p className="text-sm sm:text-base font-serif-sc font-semibold text-amber-100 leading-relaxed">
              {SECRET_BLESSINGS[blessingIndex]}
            </p>
          </div>

          {/* Scratchable Canvas Layer */}
          <canvas
            ref={canvasRef}
            width={360}
            height={130}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-500 ${
              isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
        </div>

        {/* Change / Next secret card */}
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleNextSecret}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 text-xs flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3 h-3 text-amber-300" />
            <span>再换一张悄悄话刮一刮</span>
          </button>
        </div>
      </div>
    </div>
  );
};
