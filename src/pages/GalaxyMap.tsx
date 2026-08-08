import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Eye, Skull, Sparkles } from 'lucide-react';
import { Header } from '../components/Header';
import { Lumi } from '../components/Lumi';
import { PlanetCard } from '../components/PlanetCard';
import { useGame } from '../context/GameContext';
import { AlphabetRocket } from '../games/AlphabetRocket/AlphabetRocket';
import { FeedMonster } from '../games/FeedMonster/FeedMonster';
import { EnglishDetective } from '../games/EnglishDetective/EnglishDetective';
import { Celebration } from './Celebration';

type GalaxyScreen = 'map' | 'alphabet' | 'monster' | 'mystery' | 'celebration';

export const GalaxyMap = () => {
  const { progress, markIntroSeen } = useGame();
  const [screen, setScreen] = useState<GalaxyScreen>('map');
  const [showIntro, setShowIntro] = useState(!progress.introSeen);

  const completedGames = useMemo(() => new Set(progress.completedGames), [progress.completedGames]);

  const openGame = (game: GalaxyScreen) => {
    setScreen(game);
  };

  const handleFinish = () => {
    setScreen('map');
  };

  const startJourney = () => {
    markIntroSeen();
    setShowIntro(false);
  };

  const allCrystals = Object.values(progress.crystals).filter(Boolean).length === 3;

  if (allCrystals) {
    return <Celebration />;
  }

  if (screen === 'alphabet') {
    return <AlphabetRocket onBack={() => setScreen('map')} onFinish={handleFinish} />;
  }
  if (screen === 'monster') {
    return <FeedMonster onBack={() => setScreen('map')} onFinish={handleFinish} />;
  }
  if (screen === 'mystery') {
    return <EnglishDetective onBack={() => setScreen('map')} onFinish={handleFinish} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_25%),linear-gradient(135deg,_#190e42_0%,_#301b81_40%,_#0e2342_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, index) => (
          <motion.div
            key={index}
            animate={{ y: [0, -16, 0], x: [0, 12, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-2 w-2 rounded-full bg-white/80"
            style={{ top: `${8 + (index % 7) * 12}%`, left: `${6 + (index % 5) * 16}%` }}
          />
        ))}
      </div>
      <Header />
      <motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-6 flex max-w-7xl flex-col gap-6">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.7fr]">
          <div className="rounded-[36px] border border-white/20 bg-white/10 p-6 shadow-soft backdrop-blur">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2"><Sparkles className="h-5 w-5 text-yellow-300" /></div>
              <div>
                <h1 className="text-3xl font-black sm:text-4xl">Explore English Galaxy!</h1>
                <p className="text-sm text-fuchsia-100 sm:text-base">Learn English. Play games. Collect stars.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              <div className="rounded-[28px] border border-white/20 bg-slate-950/25 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">Mission</p>
                <p className="mt-2 text-lg font-semibold text-white">Help Lumi bring English words back to the galaxy.</p>
              </div>
              <div className="flex items-center justify-center">
                <Lumi message="Hi! I'm Lumi!" />
              </div>
            </div>
          </div>
          <div className="rounded-[36px] border border-white/20 bg-gradient-to-br from-violet-500/30 to-cyan-500/30 p-6 shadow-soft backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100">Galaxy map</p>
            <p className="mt-3 text-2xl font-black">Three planets. Three mini-games.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {['Alphabet', 'Monster', 'Mystery'].map((item) => (
                <div key={item} className="rounded-full bg-white/20 px-3 py-2 text-sm font-semibold">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <PlanetCard title="Alphabet Planet" subtitle="Learn letters and sounds" icon={BookOpen} colorClass="bg-gradient-to-br from-sky-400 to-violet-600" onPlay={() => openGame('alphabet')} completed={completedGames.has('alphabet')} crystal={progress.crystals.alphabet} />
          <PlanetCard title="Monster Planet" subtitle="Learn new words" icon={Skull} colorClass="bg-gradient-to-br from-emerald-400 to-orange-500" onPlay={() => openGame('monster')} completed={completedGames.has('monster')} crystal={progress.crystals.monster} />
          <PlanetCard title="Mystery Planet" subtitle="Solve English riddles" icon={Eye} colorClass="bg-gradient-to-br from-pink-500 to-sky-600" onPlay={() => openGame('mystery')} completed={completedGames.has('mystery')} crystal={progress.crystals.mystery} />
        </section>
      </motion.main>

      {showIntro ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4">
          <motion.div initial={{ y: 20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} className="w-full max-w-lg rounded-[36px] border border-white/20 bg-gradient-to-br from-violet-600/90 to-cyan-500/90 p-8 text-center text-white shadow-soft">
            <Lumi message="Hi! I'm Lumi!" />
            <h2 className="mt-6 text-3xl font-black">English words are missing from our galaxy!</h2>
            <p className="mt-3 text-lg">Can you help me find them?</p>
            <button onClick={startJourney} className="mt-6 rounded-full bg-white px-6 py-3 font-black text-slate-900">Let&apos;s Go! 🚀</button>
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
};
