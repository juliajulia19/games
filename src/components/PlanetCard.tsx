import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import planetsImage from '../assets/generated/planets.png';

type PlanetCardProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  onPlay: () => void;
  completed?: boolean;
  crystal?: boolean;
  planetIndex?: 0 | 1 | 2;
};

export const PlanetCard = ({ title, subtitle, icon: Icon, colorClass, onPlay, completed = false, crystal = false, planetIndex }: PlanetCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: -2 }}
      whileTap={{ scale: 0.97 }}
      className="relative rounded-[36px] border border-white/20 bg-white/10 p-5 shadow-soft backdrop-blur"
    >
      <div className={`relative mx-auto mb-4 flex h-44 w-44 items-center justify-center overflow-hidden rounded-full ${planetIndex === undefined ? colorClass : ''} floating`}>
        {planetIndex !== undefined ? <img src={planetsImage} alt="" className="absolute h-full max-w-none object-cover" style={{ width: '300%', left: `${-planetIndex * 100}%` }} /> : null}
        {planetIndex === undefined ? <>
        <div className="absolute inset-3 rounded-full border border-white/40" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.35),_transparent_62%)]" />
        <Icon className="h-16 w-16 text-white" />
        </> : null}
        {crystal ? (
          <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border border-amber-200/70 bg-amber-300/90 text-slate-800 shadow-lg">
            <Sparkles className="h-4 w-4" />
          </div>
        ) : null}
      </div>
      <div className="text-center">
        <h3 className="text-xl font-black text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-100">{subtitle}</p>
        {completed ? <p className="mt-2 text-sm font-semibold text-cyan-200">Completed!</p> : null}
      </div>
      <button
        onClick={onPlay}
        className="mt-5 w-full rounded-full bg-white/90 px-4 py-3 font-black text-slate-900 transition hover:bg-white"
      >
        PLAY
      </button>
    </motion.div>
  );
};
