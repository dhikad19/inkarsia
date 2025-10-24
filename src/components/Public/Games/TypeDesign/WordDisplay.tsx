// components/WordDisplay.tsx
import React from "react";

export default function WordDisplay({
  text,
  input,
}: {
  text: string;
  input: string;
}) {
  return (
    <div className="p-4 bg-white rounded shadow-sm font-mono text-lg leading-relaxed break-words">
      {text.split("").map((char, i) => {
        const typed = input[i];
        let color = "";
        if (typed == null) color = "text-gray-400";
        else if (typed === char) color = "text-green-600";
        else color = "text-red-600";

        return (
          <span key={i} className={color}>
            {char === " " ? "␣" : char}
          </span>
        );
      })}
    </div>
  );
}
