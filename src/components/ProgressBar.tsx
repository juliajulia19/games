type ProgressBarProps = {
  current: number;
  total: number;
};

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-100">
        <span>Question {current} / {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-3 rounded-full bg-white/20">
        <div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};
