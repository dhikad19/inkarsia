export type WrongWord = {
  word: string;
  timestamp: number; // ms
  cpm: number;
};

export type GameStats = {
  elapsedTime: number; // ms
  accuracy: number; // %
  cpm: number;
  errors: number;
  points: number;
  wrongWords: WrongWord[];
};
