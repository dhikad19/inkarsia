export function getBotReply(userInput: string): string {
  const text = userInput.toLowerCase();

  const jokes = [
    "Kenapa komputer suka nyanyi? Karena punya banyak 'bit' 😆",
    "Kenapa programmer jarang mandi? Karena takut ‘bug’ hilang 😂",
    "Kenapa AI suka belajar? Karena takut jadi ‘stupid network’ 🤖",
    "Apa makanan favorit komputer? Microchips 🍟",
  ];

  const random = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  if (text.includes("halo"))
    return random([
      "Halo juga! 👋",
      "Hai! Senang bisa ngobrol 😊",
      "Halo! Ada yang bisa saya bantu hari ini?",
    ]);

  if (text.includes("nama"))
    return random([
      "Panggil saya Karsa 🤖",
      "Saya Karsa, asisten virtual kamu!",
      "Nama saya Karsa, senang bertemu denganmu!",
    ]);

  if (text.includes("lelucon") || text.includes("jokes")) return random(jokes);

  return random([
    "Saya belum mengerti maksudmu 😅",
    "Hmm... bisa diulang lagi?",
    "Maaf, saya belum paham yang kamu maksud 😔",
  ]);
}
