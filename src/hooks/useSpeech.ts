import { useEffect, useMemo } from 'react';
import { useGame } from '../context/GameContext';

export const useSpeech = () => {
  const { progress } = useGame();

  const speak = (text: string) => {
    if (!progress.soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  return useMemo(() => ({ speak }), [progress.soundEnabled]);
};
