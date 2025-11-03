import React from "react";

type Racer = {
  name: string;
  font: string;
  text: string;
  validatedText: string;
  activeWord?: string;
  color: string;
};

export default function RaceTrack({ racers }: { racers: Racer[] }) {
  return (
    <div className="space-y-6 w-full">
      {racers.map((r, idx) => {
        const progress = Math.min(
          (r.validatedText.length / r.text.length) * 100,
          100
        );

        return (
          <div
            key={idx}
            className="relative bg-gray-900 rounded-xl h-20 overflow-hidden border border-gray-700 shadow-inner"
          >
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${r.color}40, transparent)`,
              }}
            />

            <div className="relative z-10 flex items-center h-full px-5">
              <div
                className="text-sm w-24 font-bold uppercase tracking-wide"
                style={{ color: r.color }}
              >
                {r.name}
              </div>

              <div
                className="flex-1 text-lg overflow-hidden whitespace-nowrap font-mono"
                style={{ fontFamily: r.font }}
              >
                {r.activeWord && (
                  <span className="text-yellow-400 opacity-70">
                    {r.activeWord}
                  </span>
                )}
              </div>
            </div>

            {/* progress indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-300"
              style={{
                left: `calc(${progress}% - 0.5rem)`,
                backgroundColor: r.color,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
