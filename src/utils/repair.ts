export type Bot = {
  name: string;
  speed: number; // words per second
  accuracy: number; // 0-1
  wordsFixed: number;
};

export function createBots(text: string): Bot[] {
  return [
    { name: "Helvetica", speed: 1.5, accuracy: 0.98, wordsFixed: 0 },
    { name: "Comic Sans", speed: 1.2, accuracy: 0.9, wordsFixed: 0 },
  ];
}

export function simulateBotRepairWords(
  bots: Bot[],
  words: string[],
  update: (bots: Bot[]) => void
) {
  const interval = setInterval(() => {
    let finished = true;

    const newBots = bots.map((bot) => {
      if (bot.wordsFixed >= words.length) return bot;
      finished = false;

      const advanceChance = Math.random();
      if (advanceChance < bot.accuracy) {
        const inc = Math.random() < bot.speed / 2 ? 1 : 0;
        return { ...bot, wordsFixed: bot.wordsFixed + inc };
      }
      return bot;
    });

    update(newBots);
    if (finished) clearInterval(interval);
  }, 600); // ~0.6s per cycle
}
