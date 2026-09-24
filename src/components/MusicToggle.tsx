import React, { useState, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setIsPlaying(sound.getIsPlayingBgm());
  }, []);

  const handleToggle = () => {
    const newState = sound.toggleBgm();
    setIsPlaying(newState);
  };

  return (
    <div className="fixed top-4 right-4 z-40 select-none">
      <button
        type="button"
        onClick={handleToggle}
        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-lg ${
          isPlaying
            ? 'bg-amber-400/20 border-amber-300/50 text-amber-200 shadow-[0_0_15px_rgba(255,200,80,0.3)]'
            : 'bg-white/10 border-white/20 text-white/50 hover:text-white'
        }`}
        title={isPlaying ? '静音' : '开启音乐'}
        aria-label={isPlaying ? '静音' : '开启音乐'}
      >
        {isPlaying ? (
          <Music className="w-5 h-5 text-amber-300 animate-spin [animation-duration:6s]" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};
