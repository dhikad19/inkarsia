"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BrokenBox from "@/components/Public/Games/FixingComponent/BrokenBox";

const LEVELS = [
  {
    broken: {
      color: "red",
      rotate: -10,
      align: "flex-start",
      justify: "flex-end",
    },
    target: { color: "blue", rotate: 0, align: "center", justify: "center" },
    commands: ["blue", "rotate 0", "align center", "justify center"],
    time: 20,
  },
  {
    broken: {
      color: "purple",
      rotate: 15,
      align: "flex-end",
      justify: "flex-start",
    },
    target: { color: "green", rotate: 0, align: "center", justify: "center" },
    commands: ["green", "rotate 0", "align center", "justify center"],
    time: 18,
  },
];

export default function FixGame() {
  const [level, setLevel] = useState(0);
  const [uiState, setUiState] = useState(LEVELS[0].broken);
  const [fixedKeys, setFixedKeys] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(LEVELS[0].time);
  const [gameOver, setGameOver] = useState(false);
  const [completed, setCompleted] = useState(false);

  const current = LEVELS[level];

  // countdown
  useEffect(() => {
    if (gameOver || completed) return;
    if (timer <= 0) {
      setGameOver(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, gameOver, completed]);

  // handle perintah player
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");

    if (!current.commands.includes(cmd)) return; // salah

    if (cmd.includes("blue") || cmd.includes("green")) {
      setUiState((prev) => ({ ...prev, color: cmd }));
      setFixedKeys((p) => [...p, "color"]);
    } else if (cmd.includes("rotate")) {
      const val = parseInt(cmd.replace("rotate", "").trim()) || 0;
      setUiState((prev) => ({ ...prev, rotate: val }));
      setFixedKeys((p) => [...p, "rotate"]);
    } else if (cmd.includes("align")) {
      setUiState((prev) => ({ ...prev, align: "center" }));
      setFixedKeys((p) => [...p, "align"]);
    } else if (cmd.includes("justify")) {
      setUiState((prev) => ({ ...prev, justify: "center" }));
      setFixedKeys((p) => [...p, "justify"]);
    }
  };

  // cek apakah semua sudah fix
  useEffect(() => {
    const t = current.target;
    const fixed =
      uiState.color === t.color &&
      uiState.rotate === t.rotate &&
      uiState.align === t.align &&
      uiState.justify === t.justify;

    if (fixed) {
      if (level < LEVELS.length - 1) {
        setTimeout(() => {
          setLevel((l) => l + 1);
          setUiState(LEVELS[level + 1].broken);
          setFixedKeys([]);
          setTimer(LEVELS[level + 1].time);
        }, 800);
      } else {
        setCompleted(true);
      }
    }
  }, [uiState]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-2">🧠 Type Fixer</h1>
      <p className="text-gray-400 mb-4">
        Level {level + 1} | ⏱ {timer}s
      </p>

      <BrokenBox state={uiState} fixedKeys={fixedKeys} />

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={gameOver || completed}
          className="px-4 py-2 rounded-lg text-black text-center font-mono w-60 outline-none"
          placeholder='Type command (e.g. "blue", "rotate 0")'
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600"
        >
          Fix
        </button>
      </form>

      {completed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-6 text-green-400 font-bold text-lg"
        >
          🎉 All Levels Fixed!
        </motion.p>
      )}

      {gameOver && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-red-400 font-bold text-lg"
        >
          💥 Time’s up! UI remains broken.
        </motion.p>
      )}
    </main>
  );
}
