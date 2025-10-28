"use client";

import { useState } from "react";

export default function TypingInput({
  onCommand,
  disabled,
}: {
  onCommand: (cmd: string) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text.trim() && !disabled) {
      onCommand(text.trim());
      setText("");
    }
  };

  return (
    <input
      type="text"
      value={text}
      disabled={disabled}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={
        disabled
          ? "Game Over or Completed"
          : 'Type command (e.g. "align: end", "rotate: 0", "color: blue")'
      }
      className={`border-2 border-gray-500 p-2 rounded w-[400px] mt-8 text-lg text-black ${
        disabled ? "opacity-50" : ""
      }`}
    />
  );
}
