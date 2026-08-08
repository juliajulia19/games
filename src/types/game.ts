export type PlayerProgress = {
  stars: number;
  crystals: {
    alphabet: boolean;
    monster: boolean;
    mystery: boolean;
  };
  completedGames: string[];
  soundEnabled: boolean;
  introSeen: boolean;
};

export type GameScreen = 'home' | 'game' | 'celebration';
