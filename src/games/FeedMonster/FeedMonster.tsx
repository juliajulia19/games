import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Orbit, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useSpeech } from '../../hooks/useSpeech';
import { Lumi } from '../../components/Lumi';
import { ProgressBar } from '../../components/ProgressBar';
import { vocabulary } from './vocabularyData';

const roundCount = 10;

type FeedMonsterProps = {
  onBack: () => void;
  onFinish: () => void;
};

export const FeedMonster = ({ onBack, onFinish }: FeedMonsterProps) => {
  const { addStars, completeGame, unlockCrystal, progress } = useGame();
  const { speak } = useSpeech();
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const questions = useMemo(() => {
    const shuffled = [...vocabulary].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, roundCount);
  }, []);

  const current = questions[round];
  const options = useMemo(() => {
    if (!current) return [];
    const pool = vocabulary.filter((item) => item.category === current.category && item.word !== current.word);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
    return [current, ...shuffled].sort(() => Math.random() - 0.5);
  }, [current]);

  const handlePick = (item: { word: string; emoji: string }) => {
    if (!current) return;
    if (item.word === current.word) {
      setFeedback('correct');
      setScore((prev) => prev + 1);
      addStars(1);
      speak(`Yummy! ${current.word}`);
      setTimeout(() => {
        if (round === roundCount - 1) {
          completeGame('monster');
          if (!progress.crystals.monster) unlockCrystal('monster');
          onFinish();
        } else {
          setRound((prev) => prev + 1);
          setFeedback(null);
        }
      }, 900);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  if (!current) return null;

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 text-white md:px-6">
      <button onClick={onBack} className="flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
        <ArrowLeft className="h-4 w-4" /> Back to Galaxy
      </button>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.7fr]">
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[36px] border border-white/20 bg-white/10 p-5 shadow-soft backdrop-blur md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Feed the Monster</p>
              <h2 className="text-2xl font-black">Feed the monster the right food!</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-yellow-300" /> {score}
            </div>
          </div>
          <ProgressBar current={round + 1} total={roundCount} />
          <div className="mt-6 rounded-[32px] bg-slate-950/25 p-6">
            <div className="mb-6 flex items-center justify-center gap-4">
              <motion.div animate={feedback === 'correct' ? { scale: [1, 1.08, 1], y: [0, -8, 0] } : { scale: 1 }} transition={{ duration: 0.6 }} className="relative flex h-40 w-40 items-center justify-center rounded-[40px] bg-gradient-to-br from-emerald-400 to-lime-500">
                <div className="absolute -top-2 right-5 h-8 w-8 rounded-full bg-amber-300" />
                <div className="absolute inset-0 rounded-[40px] border border-white/30" />
                <div className="relative h-20 w-20 rounded-[24px] border border-white/50 bg-slate-950/40 p-3">
                  <div className="absolute left-4 top-4 h-6 w-6 rounded-full border border-cyan-300/60" />
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-fuchsia-400/70 blur-[1px]" />
                  <div className="absolute bottom-3 left-3 h-4 w-8 rounded-full bg-cyan-300/70" />
                  <Orbit className="absolute inset-3 h-14 w-14 text-cyan-100" />
                </div>
              </motion.div>
              <div className="rounded-full bg-white/15 px-3 py-2 text-lg font-semibold">{feedback === 'correct' ? 'Yummy!' : feedback === 'wrong' ? 'Oops! Try another one!' : `I want a ${current.word}!`}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {options.map((item) => (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  key={item.word}
                  onClick={() => handlePick(item)}
                  className="rounded-[24px] border border-white/15 bg-white/10 px-4 py-5 text-center text-lg font-bold text-white"
                >
                  <div className="mb-2 text-4xl">{item.emoji}</div>
                  <div>{item.word}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>
        <motion.aside initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-[36px] border border-white/20 bg-white/10 p-5 shadow-soft backdrop-blur">
          <Lumi message={feedback === 'correct' ? 'Yummy! Banana!' : feedback === 'wrong' ? 'Oops! Try another one!' : 'Feed the monster!'} withBubble />
          <div className="mt-6 rounded-[24px] bg-slate-950/25 p-4 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-yellow-300" />
            <p className="mt-3 text-lg font-semibold">Collect stars and help the monster.</p>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};
