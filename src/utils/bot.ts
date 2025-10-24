export type Bot = {
  name: string;
  font: string;
  speed: number; // chars per second
  errorRate: number; // 0-1
  typed: string;
};

export function createBots(text: string): Bot[] {
  return [
    {
      name: "Helvetica",
      font: "Helvetica",
      speed: 8,
      errorRate: 0.02,
      typed: "",
    },
    {
      name: "Comic Sans",
      font: "Comic Sans MS",
      speed: 6,
      errorRate: 0.05,
      typed: "",
    },
  ];
}

export function simulateBotTyping(
  bots: Bot[],
  text: string,
  update: (bots: Bot[]) => void
) {
  const interval = setInterval(() => {
    let finished = true;

    const newBots = bots.map((bot) => {
      if (bot.typed.length >= text.length) return bot;
      finished = false;

      const shouldType = Math.random() < 0.9; // 90% waktu dia ngetik
      let newTyped = bot.typed;

      if (shouldType) {
        const nextChar = text[newTyped.length];
        const makeError = Math.random() < bot.errorRate;

        // jika error, kadang salah huruf
        if (makeError && Math.random() < 0.7) {
          const typo = String.fromCharCode(97 + Math.floor(Math.random() * 26));
          newTyped += typo;
        } else {
          newTyped += nextChar;
        }
      } else if (Math.random() < 0.1 && newTyped.length > 0) {
        // kadang menghapus huruf (seolah memperbaiki)
        newTyped = newTyped.slice(0, -1);
      }

      return { ...bot, typed: newTyped };
    });

    update(newBots);

    if (finished) clearInterval(interval);
  }, 1000 / 10); // update 10x per detik
}
