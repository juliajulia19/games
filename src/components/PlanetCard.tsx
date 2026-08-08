import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type PlanetCardProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  onPlay: () => void;
  completed?: boolean;
  crystal?: boolean;
};

export const PlanetCard = ({ title, subtitle, icon: Icon, colorClass, onPlay, completed = false, crystal = false }: PlanetCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: -2 }}
      whileTap={{ scale: 0.97 }}
      className="relative rounded-[36px] border border-white/20 bg-white/10 p-5 shadow-soft backdrop-blur"
    >
      <div className={`relative mx-auto mb-4 flex h-36 w-36 items-center justify-center rounded-full ${colorClass} floating`}>
        <div className="absolute inset-3 rounded-full border border-white/40" />
        <Icon className="h-16 w-16 text-white" />
        {crystal ? <div className="absolute bottom-2 right-2 rounded-full bg-yellow-300 px-2 py-1 text-xs font-black text-slate-800">💎</div> : null}
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
