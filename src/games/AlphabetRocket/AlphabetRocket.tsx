import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Orbit, Sparkles, X } from 'lucide-react';
import { ProgressBar } from '../../components/ProgressBar';
import { Lumi } from '../../components/Lumi';
import { useSpeech } from '../../hooks/useSpeech';
import { useGame } from '../../context/GameContext';
import { alphabetQuestions } from './alphabetData';
import rocketImage from '../../assets/generated/rocket.png';
import { VocabularyArt } from '../../components/VocabularyArt';

type AlphabetRocketProps = {
  onBack: () => void;
  onFinish: () => void;
};

export const AlphabetRocket = ({ onBack, onFinish }: AlphabetRocketProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);
  const { addStars, completeGame, unlockCrystal, progress } = useGame();
  const { speak } = useSpeech();

  const questions = useMemo(() => {
    const pool = alphabetQuestions.slice(0, 10);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, []);

  const current = questions[questionIndex];

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    speak(option);
    if (option === current.answer) {
      setFeedback('correct');
      setScore((prev) => prev + 1);
      addStars(1);
      setTimeout(() => {
        if (questionIndex === questions.length - 1) {
          setFinished(true);
          completeGame('alphabet');
          if (!progress.crystals.alphabet) unlockCrystal('alphabet');
          onFinish();
        } else {
          setQuestionIndex((prev) => prev + 1);
          setSelected(null);
          setFeedback(null);
        }
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setSelected(null);
        setFeedback(null);
      }, 900);
    }
  };

  const launched = finished;
  const rocketProgress = Math.min(5, Math.floor(score / 2) + 1);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 text-white md:px-6">
      <button onClick={onBack} className="flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
        <ArrowLeft className="h-4 w-4" /> Back to Galaxy
      </button>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.7fr]">
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[36px] border border-white/20 bg-white/10 p-5 shadow-soft backdrop-blur md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Alphabet Rocket</p>
              <h2 className="text-2xl font-black">Which picture starts with {current.letter}?</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-yellow-300" /> {score}
            </div>
          </div>
          <ProgressBar current={questionIndex + 1} total={questions.length} />
          <div className="mt-6 flex flex-col items-center rounded-[28px] bg-slate-950/25 p-6">
            <div className="mb-4 text-7xl font-black text-white">{current.letter}</div>
            <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-2">
              {current.options.map((option) => {
                const isSelected = selected === option;
                return (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    animate={selected === option && feedback === 'wrong' ? { x: [0, -10, 10, -7, 7, 0] } : { x: 0 }}
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`rounded-[24px] border px-4 py-4 text-left text-lg font-bold transition ${
                      selected && isSelected && feedback === 'correct'
                        ? 'border-emerald-300 bg-emerald-400/30 text-emerald-100'
                        : selected && isSelected && feedback === 'wrong'
                          ? 'border-amber-300 bg-amber-400/20 text-amber-100'
                          : 'border-white/15 bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span className="relative flex items-center justify-center">
                      <VocabularyArt word={option} className="!h-28 !w-28" />
                      {selected === option && feedback === 'wrong' ? <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-red-950/55"><X className="h-16 w-16 text-red-200" strokeWidth={4} /></span> : null}
                      {selected === option && feedback === 'correct' ? <span className="absolute right-0 top-0 rounded-full bg-emerald-500 p-2"><Check className="h-7 w-7 text-white" strokeWidth={4} /></span> : null}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <div className={`mt-4 flex min-h-14 items-center justify-center gap-3 rounded-2xl border px-5 py-3 text-xl font-black ${feedback === 'wrong' ? 'border-red-300 bg-red-600 text-white' : feedback === 'correct' ? 'border-emerald-200 bg-emerald-500 text-white' : 'border-white/15 bg-white/15 text-white'}`}>
              {feedback === 'wrong' ? <X className="h-7 w-7" strokeWidth={4} /> : feedback === 'correct' ? <Check className="h-7 w-7" strokeWidth={4} /> : <Sparkles className="h-5 w-5" />}
              {feedback === 'correct' ? 'Great!' : feedback === 'wrong' ? 'Almost! Try again!' : 'Choose the right picture!'}
            </div>
          </div>
        </motion.section>
        <motion.aside initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-[36px] border border-white/20 bg-white/10 p-5 shadow-soft backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-white/15 p-2"><Orbit className="h-5 w-5 text-cyan-100" /></div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Rocket progress</p>
              <p className="text-lg font-black">{rocketProgress}/5 ready</p>
            </div>
          </div>
          <div className="relative flex min-h-[320px] items-center justify-center">
            <div className="absolute h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
            <motion.div animate={launched ? { y: -80, x: 40, rotate: 12, scale: 0.95 } : { y: 0 }} transition={{ duration: 0.8 }} className="relative">
              <img src={rocketImage} alt="Alphabet rocket" className="h-72 w-56 object-contain drop-shadow-[0_18px_20px_rgba(0,20,80,.55)]" />
            </motion.div>
          </div>
          <div className="mt-4 rounded-[24px] bg-slate-950/25 p-4">
            <Lumi message={feedback === 'correct' ? 'Great job!' : feedback === 'wrong' ? 'Almost! Try again!' : 'Let\'s explore!'} withBubble />
          </div>
        </motion.aside>
      </div>
    </div>
  );
};
