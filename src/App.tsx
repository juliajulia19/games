import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from './context/GameContext';
import { GalaxyMap } from './pages/GalaxyMap';

function AppContent() {
  const { progress, markIntroSeen } = useGame();
  const [showIntro, setShowIntro] = useState(!progress.introSeen);
  const introMessage = useMemo(() => ['Hi! I\'m Lumi!', 'English words are missing from our galaxy!', 'Can you help me find them?'], []);

  const startAdventure = () => {
    markIntroSeen();
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {showIntro ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_25%),linear-gradient(135deg,_#190e42_0%,_#2f1a73_50%,_#10253f_100%)] px-4">
          <motion.div initial={{ y: 24, scale: 0.96 }} animate={{ y: 0, scale: 1 }} className="w-full max-w-xl rounded-[40px] border border-white/20 bg-white/10 p-8 text-center text-white shadow-soft backdrop-blur">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-4">
                <span className="text-6xl">🚀</span>
              </div>
            </div>
            <h1 className="text-4xl font-black">English Galaxy</h1>
            <p className="mt-3 text-lg text-cyan-100">A playful adventure for little English explorers.</p>
            <div className="mt-6 space-y-2 text-xl font-semibold">
              {introMessage.map((line) => <div key={line}>{line}</div>)}
            </div>
            <button onClick={startAdventure} className="mt-8 rounded-full bg-white px-6 py-3 font-black text-slate-900">Let&apos;s Go! 🚀</button>
          </motion.div>
        </motion.div>
      ) : (
        <GalaxyMap />
      )}
    </div>
  );
}

const App = () => (
  <GameProvider>
    <AppContent />
  </GameProvider>
);

export default App;
