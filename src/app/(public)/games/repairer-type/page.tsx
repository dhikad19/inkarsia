"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UIStage from "@/components/Public/Games/RepairPage/UIStage";
import Stats from "@/components/Public/Games/RepairPage/Stats";
import { createBots, simulateBotRepairWords, Bot } from "@/utils/repair";

const QUOTES = [
  "Whitespace is not empty space it is breathing room",
  "Good design is as little design as possible",
  "Design adds value faster than it adds cost",
];

export default function PixelRepairerPage() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [completedWords, setCompletedWords] = useState<number>(0);
  const [errors, setErrors] = useState(0);
  const [startTs, setStartTs] = useState<number | null>(null);
  const [endTs, setEndTs] = useState<number | null>(null);
  const [bots, setBots] = useState<Bot[]>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setText(q);
    setWords(q.split(" "));
    setBots(createBots(q));
  }, []);

  const handleStart = () => {
    if (running) return;
    setStartTs(Date.now());
    setRunning(true);
    simulateBotRepairWords(bots, words, setBots);
  };

  const handleInput = (val: string) => {
    if (!running) handleStart();
    setInput(val);

    const inputWords = val.trim().split(" ");
    let correctCount = 0;
    let errCount = 0;

    inputWords.forEach((word, i) => {
      if (words[i] !== undefined) {
        if (word === words[i]) correctCount++;
        else errCount++;
      }
    });

    setCompletedWords(correctCount);
    setErrors(errCount);

    if (correctCount === words.length) {
      setEndTs(Date.now());
      setRunning(false);
    }
  };

  const totalWords = words.length;
  const progress = (completedWords / totalWords) * 100;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center">
          🎨 Pixel Repairer — UI/UX Type Battle
        </h1>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{text}</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <UIStage
          player={{ name: "You", progress }}
          bots={bots.map((b) => ({
            name: b.name,
            progress: (b.wordsFixed / totalWords) * 100,
          }))}
          componentsFixed={completedWords}
        />

        <input
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          disabled={!!endTs}
          placeholder="Repair UI here..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none font-mono text-lg tracking-wide"
          spellCheck={false}
          autoFocus
        />

        {endTs && (
          <Stats
            cpm={Math.round(text.length / ((endTs - startTs!) / 60000))}
            accuracy={Math.round((completedWords / totalWords) * 100)}
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
