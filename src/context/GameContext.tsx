import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PlayerProgress } from '../types/game';

const defaultProgress: PlayerProgress = {
  stars: 0,
  crystals: { alphabet: false, monster: false, mystery: false },
  completedGames: [],
  soundEnabled: true,
  introSeen: false,
};

const STORAGE_KEY = 'english-galaxy-progress';

type GameContextValue = {
  progress: PlayerProgress;
  setProgress: React.Dispatch<React.SetStateAction<PlayerProgress>>;
  addStars: (amount: number) => void;
  completeGame: (gameId: string) => void;
  unlockCrystal: (key: keyof PlayerProgress['crystals']) => void;
  toggleSound: () => void;
  markIntroSeen: () => void;
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState<PlayerProgress>(() => {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return defaultProgress;
    try {
      return { ...defaultProgress, ...JSON.parse(raw) } as PlayerProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const addStars = (amount: number) => {
    setProgress((prev) => ({ ...prev, stars: prev.stars + amount }));
  };

  const completeGame = (gameId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedGames: prev.completedGames.includes(gameId) ? prev.completedGames : [...prev.completedGames, gameId],
    }));
  };

  const unlockCrystal = (key: keyof PlayerProgress['crystals']) => {
    setProgress((prev) => ({
      ...prev,
      crystals: { ...prev.crystals, [key]: true },
    }));
  };

  const toggleSound = () => {
    setProgress((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const markIntroSeen = () => {
    setProgress((prev) => ({ ...prev, introSeen: true }));
  };

  const value = useMemo(
    () => ({ progress, setProgress, addStars, completeGame, unlockCrystal, toggleSound, markIntroSeen }),
    [progress],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
};
