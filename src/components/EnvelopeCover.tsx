import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface EnvelopeCoverProps {
  recipientName: string;
  onOpen: () => void;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({
  recipientName,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    sound.playChime(659.25, 0.4);
    setTimeout(() => sound.playChime(880, 0.6), 180);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffeaa7', '#ffd700', '#ff7675'],
    });

    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0a17]/90 backdrop-blur-xl">
      {/* Decorative Glow */}
      <div className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute w-72 h-72 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div
        className={`relative flex flex-col items-center transition-all duration-700 ${
          isOpening ? 'scale-110 opacity-0 blur-sm' : 'scale-100 opacity-100'
        }`}
      >
        {/* Envelope Body */}
        <div
          onClick={handleOpenClick}
          role="button"
          tabIndex={0}
          className="relative w-80 sm:w-96 cursor-pointer group select-none transition-transform hover:-translate-y-1 active:translate-y-0"
        >
          {/* Envelope Exterior */}
          <div className="relative bg-gradient-to-br from-[#2a1b40] to-[#181026] rounded-3xl p-6 sm:p-8 border-2 border-amber-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Golden corner ornaments */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg" />

            {/* Glowing Header */}
            <div className="text-center space-y-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-medium border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                特别的日子 · 专属为你
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold font-calligraphy text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
                TO: {recipientName}
              </h2>

              <p className="text-xs sm:text-sm text-purple-200/80 font-serif-sc">
                有一份为你精心封存的生日心愿信笺
              </p>
            </div>

            {/* Wax Seal / Heart Button */}
            <div className="flex flex-col items-center justify-center my-6">
              <div className="relative group-hover:scale-110 transition-transform duration-300">
                {/* Pulsing ring */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-500/30 to-rose-500/30 blur-md animate-pulse" />
                
                {/* Wax seal */}
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#941b2e] via-[#c92a42] to-[#ff4757] border-2 border-amber-300/80 shadow-[0_8px_25px_rgba(201,42,66,0.6)] flex flex-col items-center justify-center text-amber-100">
                  <Heart className="w-8 h-8 fill-amber-200 text-amber-200 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest uppercase mt-0.5 text-amber-200">
                    OPEN
                  </span>
                </div>
              </div>
            </div>

            {/* Hint at bottom */}
            <div className="text-center">
              <span className="text-xs text-amber-300/90 font-medium group-hover:text-amber-200 flex items-center justify-center gap-1">
                点击轻启专属生日惊喜 ✨
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
