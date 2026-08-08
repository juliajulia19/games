import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ProgressBar } from '../../components/ProgressBar';
import { Lumi } from '../../components/Lumi';
import { useSpeech } from '../../hooks/useSpeech';
import { useGame } from '../../context/GameContext';
import { alphabetQuestions } from './alphabetData';

const rocketStages = ['body', 'window', 'wings', 'engine', 'flame'];

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

  useEffect(() => {
    if (current) {
      speak(current.word);
    }
  }, [current, speak]);

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === current.answer) {
      setFeedback('correct');
      setScore((prev) => prev + 1);
      addStars(1);
      speak(`Great! ${current.letter} is for ${current.word}`);
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
              <h2 className="text-2xl font-black">Find a word that starts with {current.letter}!</h2>
            </div>
            <div className="rounded-full bg-white/15 px-3 py-2 text-sm font-semibold">⭐ {score}</div>
          </div>
          <ProgressBar current={questionIndex + 1} total={questions.length} />
          <div className="mt-6 flex flex-col items-center rounded-[28px] bg-slate-950/25 p-6">
            <div className="mb-4 text-7xl font-black text-white">{current.letter}</div>
            <div className="mb-6 text-3xl font-semibold">{current.word}</div>
            <div className="mb-6 text-4xl">{current.image}</div>
            <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-2">
              {current.options.map((option) => {
                const isCorrect = option === current.answer;
                const isSelected = selected === option;
                return (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
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
                    {option}
                  </motion.button>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              {feedback === 'correct' ? 'Great! B is for Ball!' : feedback === 'wrong' ? 'Almost! Try again!' : 'Choose the right word!'}
            </div>
          </div>
        </motion.section>
        <motion.aside initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-[36px] border border-white/20 bg-white/10 p-5 shadow-soft backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-white/15 p-2">🚀</div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Rocket progress</p>
              <p className="text-lg font-black">{rocketProgress}/5 ready</p>
            </div>
          </div>
          <div className="relative flex min-h-[320px] items-center justify-center">
            <div className="absolute h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
            <motion.div animate={launched ? { y: -80, x: 40, rotate: 12, scale: 0.95 } : { y: 0 }} transition={{ duration: 0.8 }} className="relative">
              <div className="h-20 w-24 rounded-[24px] bg-gradient-to-r from-cyan-400 to-violet-500" />
              {rocketProgress >= 2 ? <div className="absolute left-6 top-4 h-8 w-12 rounded-full bg-white/70" /> : null}
              {rocketProgress >= 3 ? <div className="absolute -left-5 top-6 h-10 w-6 rounded-full bg-fuchsia-400" /> : null}
              {rocketProgress >= 4 ? <div className="absolute right-[-18px] top-8 h-6 w-6 rounded-full bg-cyan-300" /> : null}
              {rocketProgress >= 5 ? <div className="absolute left-9 top-20 h-8 w-6 rounded-full bg-yellow-300" /> : null}
              <div className="absolute left-10 top-20 h-6 w-6 rounded-full bg-orange-400" />
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
