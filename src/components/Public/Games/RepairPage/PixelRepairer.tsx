"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlitchCanvas from "./GlitchCanvas";
import Stats from "./Stats";
import { createBots, simulateBotRepair, Bot } from "@/utils/repair";

const QUOTES = [
  "Whitespace is not empty space; it is breathing room.",
  "Good design is as little design as possible.",
  "Design adds value faster than it adds cost.",
];

export default function PixelRepairerPage() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [bots, setBots] = useState<Bot[]>([]);
  const [startTs, setStartTs] = useState<number | null>(null);
  const [endTs, setEndTs] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setText(q);
    setBots(createBots(q));
  }, []);

  const handleStart = () => {
    if (running) return;
    setStartTs(Date.now());
    setRunning(true);
    simulateBotRepair(bots, text, setBots);
  };

  const handleInput = (val: string) => {
    if (!running) handleStart();

    const mistakes = val
      .split("")
      .reduce((acc, c, i) => acc + (c !== text[i] ? 1 : 0), 0);
    setErrors(mistakes);
    setInput(val);

    if (val === text) {
      setEndTs(Date.now());
      setRunning(false);
    }
  };

  const totalFixed = [...input].filter((c, i) => c === text[i]).length;
  const progress = (totalFixed / text.length) * 100;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center">
          🧩 Pixel Repairer — UI/UX Type Battle
        </h1>

        {/* Game Progress */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{text}</span>
          <span>{Math.round(progress)}%</span>
        </div>

        {/* Glitch canvas (player + bots) */}
        <GlitchCanvas
          players={[
            { name: "You", progress },
            ...bots.map((b) => ({
              name: b.name,
              progress: (b.typed.length / text.length) * 100,
            })),
          ]}
        />

        <input
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          disabled={!!endTs}
          placeholder="Repair pixels here..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none font-mono text-lg tracking-wide"
          spellCheck={false}
          autoFocus
        />

        {endTs && (
          <Stats
            cpm={Math.round(totalFixed / ((endTs - startTs!) / 60000))}
            accuracy={Math.round((totalFixed / input.length) * 100)}
            timeMs={endTs - startTs!}
            totalMistakes={errors}
            totalChars={text.length}
            points={Math.round(progress + (100 - errors))}
          />
        )}
      </div>
    </div>
  );
}
