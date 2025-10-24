// utils/calc.ts
export function calcCPM(correctChars: number, elapsedMin: number) {
  if (elapsedMin <= 0) return 0;
  return Math.round(correctChars / elapsedMin);
}

export function calcAccuracy(correctChars: number, totalCharsTyped: number) {
  if (totalCharsTyped <= 0) return 1;
  return correctChars / totalCharsTyped;
}

/**
 * Simple point formula:
 * base = cpm, bonus for accuracy, penalty per mistake, scaled by length
 */
export function calcPoints(
  cpm: number,
  accuracy: number,
  wordsCount: number,
  mistakes: number
) {
  const base = cpm;
  const accBonus = accuracy; // between 0..1
  const lengthFactor = Math.sqrt(wordsCount);
  const penalty = mistakes * 2;
  return Math.max(
    0,
    Math.round(base * (0.6 + accBonus * 0.4) * lengthFactor - penalty)
  );
}
