import React from "react";
import { motion } from "framer-motion";

type PlayerProgress = {
  name: string;
  progress: number;
};

const components = [
  "Header",
  "Sidebar",
  "Button",
  "Card",
  "Form",
  "Modal",
  "Footer",
];

export default function GlitchCanvas({
  players,
}: {
  players: PlayerProgress[];
}) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full mt-4">
      {players.map((p, i) => {
        const visibleCount = Math.floor((p.progress / 100) * components.length);

        return (
          <div
            key={i}
            className="bg-gray-900 rounded-lg p-4 text-center relative overflow-hidden border border-indigo-700/30"
          >
            <div className="text-sm text-indigo-300 mb-3 font-mono">
              {p.name}
            </div>
            <div className="relative h-48 bg-gray-800 rounded-lg overflow-hidden flex flex-col items-center justify-center space-y-2">
              {components.slice(0, visibleCount).map((comp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="text-xs text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20"
                >
                  {comp}
                </motion.div>
              ))}
              {visibleCount === 0 && (
                <div className="text-gray-500 text-xs italic">Designing...</div>
              )}
            </div>
            <motion.div className="absolute bottom-2 left-2 right-2 h-1 bg-indigo-500/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-400"
                initial={{ width: 0 }}
                animate={{ width: `${p.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
