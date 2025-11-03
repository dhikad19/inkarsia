"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  state: {
    color: string;
    rotate: number;
    align: string;
    justify: string;
  };
  fixedKeys: string[];
}

export default function BrokenBox({ state, fixedKeys }: Props) {
  const LABELS = [
    {
      key: "color",
      text: state.color,
      pos: "top-[-32px] left-1/2 -translate-x-1/2",
    },
    {
      key: "rotate",
      text: `${state.rotate}°`,
      pos: "bottom-[-32px] left-1/2 -translate-x-1/2",
    },
    {
      key: "align",
      text: state.align,
      pos: "top-1/2 left-[-70px] -translate-y-1/2",
    },
    {
      key: "justify",
      text: state.justify,
      pos: "top-1/2 right-[-70px] -translate-y-1/2",
    },
  ];

  return (
    <div className="relative h-[260px] w-[420px] flex items-center justify-center">
      <motion.div
        animate={{
          backgroundColor: state.color,
          rotate: state.rotate,
          alignItems: state.align,
          justifyContent: state.justify,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex h-[240px] w-[400px] rounded-2xl border-4 border-white shadow-lg relative"
      >
        <motion.div
          animate={{
            scale: fixedKeys.length === 4 ? [1.1, 1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.6 }}
          className="font-bold text-xl text-white"
        >
          {fixedKeys.length === 4 ? "✅ Fixed!" : "💥 Broken UI"}
        </motion.div>
      </motion.div>

      {/* label error muncul di sekitar box */}
      <AnimatePresence>
        {LABELS.map(({ key, text, pos }) =>
          !fixedKeys.includes(key) ? (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className={`absolute ${pos} bg-red-600/90 text-white px-2 py-1 rounded-md text-xs font-mono shadow-md pointer-events-none`}
              style={{ transform: "translateZ(0)" }} // biar gak ikut rotasi
            >
              ⚠ {key}: {text}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
