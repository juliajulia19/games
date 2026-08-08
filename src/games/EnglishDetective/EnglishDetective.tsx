import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useSpeech } from '../../hooks/useSpeech';
import { Lumi } from '../../components/Lumi';
import { ProgressBar } from '../../components/ProgressBar';
import { riddles } from './riddlesData';

type EnglishDetectiveProps = {
  onBack: () => void;
  onFinish: () => void;
};

export const EnglishDetective = ({ onBack, onFinish }: EnglishDetectiveProps) => {
  const { addStars, completeGame, unlockCrystal, progress } = useGame();
  const { speak } = useSpeech();
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const questions = useMemo(() => {
    const shuffled = [...riddles].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  }, []);

  const current = questions[step];

  const handleChoice = (option: string) => {
    if (!current) return;
    if (option === current.answer) {
      setFeedback('correct');
      setScore((prev) => prev + 1);
      addStars(1);
      speak(current.question);
      setTimeout(() => {
        if (step === questions.length - 1) {
          completeGame('mystery');
          if (!progress.crystals.mystery) unlockCrystal('mystery');
          onFinish();
        } else {
          setStep((prev) => prev + 1);
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
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-200">English Detective</p>
              <h2 className="text-2xl font-black">Solve the mystery!</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-yellow-300" /> {score}
            </div>
          </div>
          <ProgressBar current={step + 1} total={questions.length} />
          <div className="mt-6 rounded-[32px] bg-slate-950/25 p-6">
            <div className="mb-6 rounded-[28px] border border-white/15 bg-white/10 p-6 text-center text-2xl font-semibold">
              {current.question}
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
              {current.options.map((option) => (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  key={option}
                  onClick={() => handleChoice(option)}
                  className="rounded-[24px] border border-white/15 bg-white/10 px-4 py-5 text-lg font-bold text-white"
                >
                  {option}
                </motion.button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              {feedback === 'correct' ? 'Mystery solved!' : feedback === 'wrong' ? 'Hmm... Look again!' : 'Who am I?'}
            </div>
          </div>
        </motion.section>
        <motion.aside initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-[36px] border border-white/20 bg-white/10 p-5 shadow-soft backdrop-blur">
          <Lumi message={feedback === 'correct' ? 'Great job!' : feedback === 'wrong' ? 'Hmm... Look again!' : 'Detective mode!'} withBubble />
          <div className="mt-6 rounded-[24px] bg-slate-950/25 p-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/20 text-cyan-100">
              <Search className="h-8 w-8" />
            </div>
            <p className="mt-3 text-lg font-semibold">Read the clue and pick the right answer.</p>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};
