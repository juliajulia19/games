import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useSpeech } from '../../hooks/useSpeech';
import { Lumi } from '../../components/Lumi';
import { ProgressBar } from '../../components/ProgressBar';
import { vocabulary } from './vocabularyData';
import monsterImage from '../../assets/generated/monster.png';
import { VocabularyArt } from '../../components/VocabularyArt';

const roundCount = 10;
const pluralWords = new Set(['shoes', 'socks']);

const withArticle = (word: string) => {
  if (pluralWords.has(word.toLowerCase())) return word;
  const article = /^[aeiou]/i.test(word) ? 'an' : 'a';
  return `${article} ${word}`;
};

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
  const [selected, setSelected] = useState<string | null>(null);

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
    if (!current || selected) return;
    setSelected(item.word);
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
              <motion.div animate={feedback === 'correct' ? { scale: [1, 1.08, 1], y: [0, -8, 0] } : { scale: 1 }} transition={{ duration: 0.6 }} className="relative flex h-52 w-52 items-center justify-center">
                <img src={monsterImage} alt="Hungry monster" className="h-full w-full object-contain drop-shadow-[0_18px_18px_rgba(10,50,10,.45)]" />
              </motion.div>
              <div className="rounded-full bg-white/15 px-3 py-2 text-lg font-semibold">{feedback === 'correct' ? 'Yummy!' : feedback === 'wrong' ? 'Oops! Try another one!' : `I want ${withArticle(current.word)}!`}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {options.map((item) => (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  animate={selected === item.word && feedback === 'wrong' ? { x: [0, -10, 10, -7, 7, 0] } : { x: 0 }}
                  key={item.word}
                  aria-label={item.word}
                  onClick={() => handlePick(item)}
                  className={`relative rounded-[24px] border px-4 py-5 text-center text-lg font-bold text-white transition ${selected === item.word && feedback === 'wrong' ? 'border-red-300 bg-red-600/70' : selected === item.word && feedback === 'correct' ? 'border-emerald-200 bg-emerald-500/70' : 'border-white/15 bg-white/10'}`}
                >
                  <VocabularyArt word={item.word} className="!h-24 !w-24" />
                  {selected === item.word && feedback === 'wrong' ? <span className="absolute inset-0 flex items-center justify-center rounded-[24px] bg-red-950/50"><X className="h-16 w-16 text-white" strokeWidth={4} /></span> : null}
                  {selected === item.word && feedback === 'correct' ? <span className="absolute right-2 top-2 rounded-full bg-emerald-500 p-2"><Check className="h-7 w-7" strokeWidth={4} /></span> : null}
                </motion.button>
              ))}
            </div>
            {feedback ? <div className={`mt-5 flex items-center justify-center gap-3 rounded-2xl border px-5 py-3 text-xl font-black ${feedback === 'wrong' ? 'border-red-300 bg-red-600' : 'border-emerald-200 bg-emerald-500'}`}>{feedback === 'wrong' ? <><X className="h-8 w-8" strokeWidth={4} /> Wrong — try again!</> : <><Check className="h-8 w-8" strokeWidth={4} /> Correct!</>}</div> : null}
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
