import { AudioLines, Sparkles, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export const Header = () => {
  const { progress, toggleSound } = useGame();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/20 bg-white/10 px-4 py-3 shadow-soft backdrop-blur md:px-6"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-white/20 p-2">
          <Sparkles className="h-5 w-5 text-yellow-300" />
        </div>
        <div>
          <p className="text-lg font-black tracking-wide text-white">🚀 English Galaxy</p>
          <p className="text-xs text-fuchsia-100">Learn by playing</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="rounded-full bg-white/15 px-3 py-2 text-sm font-semibold text-white">
          ⭐ {progress.stars}
        </div>
        <div className="rounded-full bg-white/15 px-3 py-2 text-sm font-semibold text-cyan-100">
          💎 {Object.values(progress.crystals).filter(Boolean).length}/3
        </div>
        <button
          aria-label="Toggle sound"
          onClick={toggleSound}
          className="rounded-full bg-white/20 p-3 text-white transition hover:scale-105"
        >
          {progress.soundEnabled ? <AudioLines className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </button>
      </div>
    </motion.header>
  );
};
