import { Orbit } from 'lucide-react';

export const CrystalCounter = ({ value }: { value: number }) => (
  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-cyan-100">
    <Orbit className="h-4 w-4" /> {value}
  </div>
);
