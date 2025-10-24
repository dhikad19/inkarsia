// components/TypingInput.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  onChange: (val: string, keyCount: number, mistakes: number) => void;
  onStart: () => void;
  onFinish: () => void;
};

export default function TypingInput({
  text,
  onChange,
  onStart,
  onFinish,
}: Props) {
  const [value, setValue] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [keyCount, setKeyCount] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setValue(newVal);
    setKeyCount((k) => k + 1);

    let wrongs = 0;
    for (let i = 0; i < newVal.length; i++) {
      if (newVal[i] !== text[i]) wrongs++;
    }

    setMistakes(wrongs);
    onChange(newVal, 1, wrongs);

    if (newVal === text) {
      onFinish();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!value && e.key.length === 1) onStart();
  };

  return (
    <div>
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full p-3 rounded border focus:outline-none focus:ring font-mono"
        placeholder="Start typing..."
      />
      <div className="mt-2 text-sm text-slate-600 flex gap-4">
        <div>Typed: {value.length}</div>
        <div>Mistakes: {mistakes}</div>
      </div>
    </div>
  );
}
