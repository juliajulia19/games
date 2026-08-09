import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Search, Sparkles, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useSpeech } from '../../hooks/useSpeech';
import { ProgressBar } from '../../components/ProgressBar';
import { riddles } from './riddlesData';
import detectiveImage from '../../assets/generated/detective.png';
import { VocabularyArt } from '../../components/VocabularyArt';

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
  const [selected, setSelected] = useState<string | null>(null);

  const questions = useMemo(() => {
    const shuffled = [...riddles].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  }, []);

  const current = questions[step];

  const handleChoice = (option: string) => {
    if (!current || selected) return;
    setSelected(option);
    if (option === current.answer) {
      setFeedback('correct');
      setScore((prev) => prev + 1);
      addStars(1);
      speak(option);
      setTimeout(() => {
        if (step === questions.length - 1) {
          completeGame('mystery');
          if (!progress.crystals.mystery) unlockCrystal('mystery');
          onFinish();
        } else {
          setStep((prev) => prev + 1);
          setFeedback(null);
          setSelected(null);
        }
      }, 900);
    } else {
      setFeedback('wrong');
      setTimeout(() => { setFeedback(null); setSelected(null); }, 900);
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
                  animate={selected === option && feedback === 'wrong' ? { x: [0, -10, 10, -7, 7, 0] } : { x: 0 }}
                  key={option}
                  onClick={() => handleChoice(option)}
                  className={`relative rounded-[24px] border px-4 py-5 text-lg font-bold text-white transition ${selected === option && feedback === 'wrong' ? 'border-red-300 bg-red-600/70' : selected === option && feedback === 'correct' ? 'border-emerald-200 bg-emerald-500/70' : 'border-white/15 bg-white/10'}`}
                >
                  <span className="flex flex-col items-center gap-2"><VocabularyArt word={option} className="!h-16 !w-16" />{option}</span>
                  {selected === option && feedback === 'wrong' ? <span className="absolute inset-0 flex items-center justify-center rounded-[24px] bg-red-950/50"><X className="h-16 w-16 text-white" strokeWidth={4} /></span> : null}
                  {selected === option && feedback === 'correct' ? <span className="absolute right-2 top-2 rounded-full bg-emerald-500 p-2"><Check className="h-7 w-7" strokeWidth={4} /></span> : null}
                </motion.button>
              ))}
            </div>
            <div className={`mt-4 flex min-h-14 items-center justify-center gap-3 rounded-2xl border px-5 py-3 text-xl font-black ${feedback === 'wrong' ? 'border-red-300 bg-red-600' : feedback === 'correct' ? 'border-emerald-200 bg-emerald-500' : 'border-white/15 bg-white/15'}`}>
              {feedback === 'wrong' ? <X className="h-7 w-7" strokeWidth={4} /> : feedback === 'correct' ? <Check className="h-7 w-7" strokeWidth={4} /> : <Sparkles className="h-5 w-5" />}
              {feedback === 'correct' ? 'Mystery solved!' : feedback === 'wrong' ? 'Hmm... Look again!' : 'Who am I?'}
            </div>
          </div>
        </motion.section>
        <motion.aside initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-[36px] border border-white/20 bg-white/10 p-5 shadow-soft backdrop-blur">
          <div className="relative mx-auto h-72 w-56"><img src={detectiveImage} alt="Lumi the detective" className="h-full w-full object-contain drop-shadow-[0_18px_20px_rgba(20,4,50,.55)]" /></div>
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
