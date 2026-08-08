import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Lumi } from '../components/Lumi';

export const Celebration = () => {
  const { progress, setProgress } = useGame();

  const resetProgress = () => {
    const confirmed = window.confirm('Reset your progress?');
    if (!confirmed) return;
    setProgress({
      stars: 0,
      crystals: { alphabet: false, monster: false, mystery: false },
      completedGames: [],
      soundEnabled: true,
      introSeen: true,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_25%),linear-gradient(135deg,_#1f1640_0%,_#4c2ebb_45%,_#112b4f_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, index) => (
          <motion.div
            key={index}
            animate={{ y: [0, -80, 0], x: [0, 24, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 6 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-3 w-3 rounded-full bg-yellow-300/80"
            style={{ left: `${5 + (index % 10) * 9}%`, top: `${6 + (index % 6) * 14}%` }}
          />
        ))}
      </div>
      <motion.main initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative mx-auto flex max-w-5xl flex-col items-center justify-center rounded-[42px] border border-white/20 bg-white/10 px-6 py-10 text-center shadow-soft backdrop-blur lg:px-12">
        <div className="mb-4 rounded-full bg-white/20 p-3"><Sparkles className="h-8 w-8 text-yellow-300" /></div>
        <h1 className="text-4xl font-black sm:text-5xl">You saved the English Galaxy!</h1>
        <p className="mt-3 text-xl text-cyan-100">Amazing job, Space Explorer!</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {Object.entries(progress.crystals).map(([key, value]) => value ? <div key={key} className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-amber-300" /> {key}</div> : null)}
        </div>
        <div className="mt-8 flex items-center gap-3 rounded-full bg-white/15 px-4 py-3 text-lg font-semibold">
          <Sparkles className="h-5 w-5 text-yellow-300" /> Total stars: {progress.stars}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <button onClick={() => window.location.reload()} className="rounded-full bg-white px-6 py-3 font-black text-slate-900">Explore Again</button>
          <button onClick={resetProgress} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold">
            <RotateCcw className="h-4 w-4" /> Reset Progress
          </button>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <Lumi message="You did it!" />
        </div>
      </motion.main>
    </div>
  );
};
