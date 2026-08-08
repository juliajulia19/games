import { Volume2 } from 'lucide-react';

type SpeechButtonProps = {
  text: string;
  onSpeak: (text: string) => void;
};

export const SpeechButton = ({ text, onSpeak }: SpeechButtonProps) => (
  <button
    onClick={() => onSpeak(text)}
    aria-label={`Speak ${text}`}
    className="rounded-full border border-white/20 bg-white/20 p-3 text-white transition hover:scale-105"
  >
    <Volume2 className="h-5 w-5" />
  </button>
);
