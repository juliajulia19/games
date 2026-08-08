import { Sparkles } from 'lucide-react';

export const StarCounter = ({ value }: { value: number }) => (
  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white">
    <Sparkles className="h-4 w-4 text-yellow-300" /> {value}
  </div>
);
