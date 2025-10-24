"use client";
import React, { useEffect, useMemo, useState } from "react";
import Stats from "./Stats";
import RaceTrack from "./RaceTrack";
import { createBots, simulateBotTyping, Bot } from "@/utils/bot";

const DESIGN_QUOTES = [
  "Mungkinkah mungkinkah Mungkinkah kau mampir hari ini? Bila tidak, mirip kau jadilah bunga matahari Yang tiba-tiba mekar di taman Meski bicara dengan bahasa tumbuhan Ceritakan padaku bagaimana tempat tinggalmu yang baru Adakah sungai-sungai itu benar-benar dilintasi dengan air susu?",
];

export default function TypingGame() {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState(0);
  const [startTs, setStartTs] = useState<number | null>(null);
  const [endTs, setEndTs] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [bots, setBots] = useState<Bot[]>([]);

  const [input, setInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<string[]>([]); // only correct words
  const words = useMemo(() => text.split(" "), [text]);
  const [activeWordWrong, setActiveWordWrong] = useState(false);

  useEffect(() => {
    const q = DESIGN_QUOTES[Math.floor(Math.random() * DESIGN_QUOTES.length)];
    setText(q);
    const newBots = createBots(q);
    setBots(newBots);
  }, []);

  const handleStart = () => {
    setStartTs(Date.now());
    setRunning(true);
    simulateBotTyping(bots, text, setBots);
  };

  const handleInput = (val: string) => {
    if (!running) handleStart(); // keep existing start flow

    // If user pressed space or Enter (word submit attempt)
    const endsWithSpace = val.endsWith(" ");
    const endsWithEnter = val.endsWith("\n");
    if (endsWithSpace || endsWithEnter) {
      const trimmed = val.trim();
      const expected = words[currentWordIndex] ?? "";

      // If the typed word exactly matches expected (case-sensitive, includes punctuation)
      if (trimmed === expected) {
        // accept word: push to typedWords, advance index, clear input, clear error state
        setTypedWords((prev) => [...prev, trimmed]);
        setCurrentWordIndex((idx) => idx + 1);
        setInput("");
        setActiveWordWrong(false);

        // if finished all words -> stop
        if (currentWordIndex + 1 >= words.length) {
          setEndTs(Date.now());
          setRunning(false);
        }
      } else {
        // wrong word: keep the input so user can fix it; mark active wrong (red)
        setActiveWordWrong(true);
        // increment error counter (optional)
        setErrors((e) => e + 1);
        // keep input as-is (do NOT clear)
        setInput(val);
      }
      return;
    }

    // Normal typing (not submitting yet) -> just update input and reset wrong flag
    setInput(val);
    setActiveWordWrong(false);
  };

  const elapsedMin = useMemo(() => {
    if (!startTs) return 0;
    const end = endTs ?? Date.now();
    return (end - startTs) / 60000;
  }, [startTs, endTs]);

  const correctChars = [...input].filter((c, i) => c === text[i]).length;
  const cpm = elapsedMin > 0 ? correctChars / elapsedMin : 0;
  const accuracy = input.length > 0 ? (correctChars / input.length) * 100 : 100;

  const racers = [
    {
      name: "You",
      font: "Poppins",
      text,
      // hanya kata yang sudah valid
      typed: typedWords.join(" ") + (typedWords.length > 0 ? " " : ""),
      color: "#00FFFF",
    },
    ...bots.map((b) => ({
      name: b.name,
      font: b.font,
      text,
      typed: b.typed,
      color: "#9CA3AF",
    })),
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          🎨 UI/UX Type Race
        </h1>

        <RaceTrack
          racers={[
            {
              name: "You",
              font: "Poppins",
              text,
              validatedText:
                typedWords.join(" ") + (typedWords.length > 0 ? " " : ""),
              activeWord: input,
              color: "#00FFFF",
            },
            ...bots.map((b) => ({
              name: b.name,
              font: b.font,
              text,
              validatedText: b.typed,
              activeWord: "",
              color: "#9CA3AF",
            })),
          ]}
        />

        <div>
          <p className="mt-4 text-lg font-mono tracking-wide break-words">
            <span className="text-green-400">
              {typedWords.length > 0 ? typedWords.join(" ") + " " : ""}
            </span>

            {currentWordIndex < words.length && (
              <span className="inline-block border-b-2 border-dashed border-indigo-400">
                {words[currentWordIndex].split("").map((char, i) => {
                  const typedChar = input[i] ?? "";
                  if (typedChar === "") {
                    return (
                      <span key={i} className="text-gray-500">
                        {char}
                      </span>
                    );
                  }
                  return typedChar === char ? (
                    <span key={i} className="text-green-400">
                      {char}
                    </span>
                  ) : (
                    <span
                      key={i}
                      className="bg-red-600 text-white px-0.5 rounded-sm"
                    >
                      {typedChar}
                    </span>
                  );
                })}
                {input.length > words[currentWordIndex].length &&
                  input
                    .slice(words[currentWordIndex].length)
                    .split("")
                    .map((c, idx) => (
                      <span
                        key={"tail-" + idx}
                        className="bg-red-600 text-white px-0.5 rounded-sm"
                      >
                        {c}
                      </span>
                    ))}
              </span>
            )}

            {/* remaining words (not yet active) */}
            <span className="text-gray-600">
              {currentWordIndex + 1 < words.length
                ? " " + words.slice(currentWordIndex + 1).join(" ")
                : ""}
            </span>
          </p>
        </div>

        <input
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          disabled={!!endTs}
          placeholder="Type here..."
          className={`w-full p-3 rounded-lg outline-none font-mono text-lg tracking-wide ${
            activeWordWrong
              ? "bg-red-700 text-white placeholder-red-200 border border-red-500"
              : "bg-gray-800 text-white"
          }`}
          spellCheck={false}
          autoFocus
        />

        {endTs && (
          <Stats
            chars={text.split("").map((c, i) => ({
              char: c,
              typed: input[i] || "",
              correct: c === input[i],
            }))}
            cpm={Math.round(cpm)}
            accuracy={Math.round(accuracy * 100) / 100}
            timeMs={endTs - (startTs || 0)}
            points={Math.round(cpm + accuracy - errors)}
            totalMistakes={errors}
            totalChars={text.length}
          />
        )}
      </div>
    </div>
  );
}
