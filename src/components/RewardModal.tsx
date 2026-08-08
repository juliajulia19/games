import { motion } from 'framer-motion';

type RewardModalProps = {
  title: string;
  message: string;
  onClose: () => void;
};

export const RewardModal = ({ title, message, onClose }: RewardModalProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4"
  >
    <motion.div
      initial={{ scale: 0.92, y: 16 }}
      animate={{ scale: 1, y: 0 }}
      className="w-full max-w-md rounded-[32px] border border-white/20 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-500 p-6 text-center text-white shadow-soft"
    >
      <div className="mb-3 text-5xl">✨</div>
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-3 text-sm text-white/90">{message}</p>
      <button onClick={onClose} className="mt-5 rounded-full bg-white px-5 py-3 font-black text-slate-900">
        Continue
      </button>
    </motion.div>
  </motion.div>
);
