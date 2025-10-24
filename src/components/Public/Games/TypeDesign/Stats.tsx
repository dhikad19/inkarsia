// components/Stats.tsx
import React from "react";

type CharInfo = {
  char: string;
  typed: string;
  correct: boolean;
};

export default function Stats({
  chars = [],
  cpm,
  accuracy,
  timeMs,
  points,
  totalMistakes,
  totalChars,
}: {
  chars?: CharInfo[];
  cpm: number;
  accuracy: number;
  timeMs: number;
  points: number;
  totalChars: number;
  totalMistakes: number;
}) {
  const seconds = Math.round(timeMs / 1000);
  const wrongChars = chars.filter((c) => c.typed && !c.correct);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* --- Main Result --- */}
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="font-semibold">Results</h3>
        <div className="mt-2 text-sm">
          <div>Time: {seconds}s</div>
          <div>CPM: {cpm}</div>
          <div>Accuracy: {accuracy}%</div>
          <div>Points: {points}</div>
          <div>Mistakes: {totalMistakes}</div>
          <div>Total: {totalChars}</div>
        </div>
      </div>

      {/* --- Wrong Characters --- */}
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="font-semibold">Wrong Characters</h3>
        <div className="mt-2 text-sm break-words">
          {wrongChars.length ? (
            wrongChars.map((c, i) => (
              <span key={i} className="text-destructive mr-1">
                {c.typed || "_"}→{c.char},{" "}
              </span>
            ))
          ) : (
            <div>— No mistakes</div>
          )}
        </div>
      </div>

      {/* --- Character Details --- */}
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="font-semibold">Per-Character Detail</h3>
        <div className="mt-2 text-sm grid grid-cols-6 gap-1">
          {chars.map((c, i) => (
            <div
              key={i}
              className={`text-center rounded ${
                !c.typed
                  ? "bg-gray-100"
                  : c.correct
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {c.char === " " ? "␣" : c.char}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
