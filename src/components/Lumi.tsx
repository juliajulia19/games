import { motion } from 'framer-motion';
import lumiImage from '../assets/generated/lumi.png';

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
        <img src={lumiImage} alt="Lumi" className="h-full w-full object-contain drop-shadow-[0_14px_18px_rgba(16,10,60,0.5)]" />
      </motion.div>
      {withBubble && message ? (
        <div className="absolute -top-4 left-1/2 z-10 w-44 -translate-x-1/2 rounded-full border border-white/30 bg-white/90 px-3 py-2 text-center text-sm font-semibold text-slate-700 shadow-lg">
          {message}
        </div>
      ) : null}
    </div>
  );
};
