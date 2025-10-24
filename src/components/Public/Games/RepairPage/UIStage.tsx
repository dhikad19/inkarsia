import React from "react";
import { motion } from "framer-motion";

type PlayerInfo = {
  name: string;
  progress: number;
};

type UIStageProps = {
  player: PlayerInfo;
  bots: PlayerInfo[];
  componentsFixed: number;
};

const COMPONENTS = [
  "Header",
  "Sidebar",
  "Card",
  "Button",
  "Modal",
  "Form",
  "Footer",
];

export default function UIStage({
  player,
  bots,
  componentsFixed,
}: UIStageProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4 w-full">
      {[player, ...bots].map((p, idx) => (
        <div
          key={idx}
          className="bg-gray-900 rounded-lg p-4 relative overflow-hidden"
        >
          <div className="text-sm text-gray-400 mb-2">{p.name}</div>
          <div className="h-48 bg-gray-800 rounded-lg relative overflow-hidden p-3 space-y-3">
            {COMPONENTS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{
                  opacity:
                    p.progress >= ((i + 1) / COMPONENTS.length) * 100 ? 1 : 0.1,
                  scale:
                    p.progress >= ((i + 1) / COMPONENTS.length) * 100 ? 1 : 0.9,
                  y: 0,
                }}
                transition={{ delay: i * 0.1 }}
                className="w-full h-6 rounded bg-indigo-500/20 border border-indigo-400/30 text-xs flex items-center justify-center text-indigo-300"
              >
                {c}
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-2 left-2 right-2 h-1 bg-indigo-500/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-400"
              initial={{ width: 0 }}
              animate={{ width: `${p.progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
