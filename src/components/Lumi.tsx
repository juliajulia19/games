import { motion } from 'framer-motion';

type LumiProps = {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  withBubble?: boolean;
  className?: string;
};

export const Lumi = ({ size = 'md', message, withBubble = true, className = '' }: LumiProps) => {
  const sizeMap = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36',
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className={`relative ${sizeMap[size]}`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300 via-violet-500 to-fuchsia-400 shadow-soft" />
        <div className="absolute left-[24%] top-[28%] h-[43%] w-[52%] rounded-full bg-white/90" />
        <div className="absolute left-[32%] top-[38%] h-[22%] w-[18%] rounded-full bg-cyan-600" />
        <div className="absolute left-[52%] top-[38%] h-[22%] w-[18%] rounded-full bg-cyan-600" />
        <div className="absolute left-[40%] top-[49%] h-[8%] w-[20%] rounded-full bg-slate-800" />
        <div className="absolute left-[36%] top-[12%] h-[12%] w-[10%] rounded-full bg-violet-600" />
        <div className="absolute right-[24%] top-[10%] h-[12%] w-[10%] rounded-full bg-violet-600" />
        <div className="absolute left-[38%] top-[62%] h-[18%] w-[24%] rounded-full bg-fuchsia-300" />
        <div className="absolute left-[30%] top-[76%] h-[12%] w-[40%] rounded-full bg-violet-700" />
      </motion.div>
      {withBubble && message ? (
        <div className="absolute -top-4 left-1/2 z-10 w-44 -translate-x-1/2 rounded-full border border-white/30 bg-white/90 px-3 py-2 text-center text-sm font-semibold text-slate-700 shadow-lg">
          {message}
        </div>
      ) : null}
    </div>
  );
};
