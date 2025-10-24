// components/Leaderboard.tsx
import React from "react";

export default function Leaderboard() {
  // placeholder, you can connect to server / firestore for real scores
  const sample = [
    { name: "Alice", points: 980 },
    { name: "Budi", points: 840 },
    { name: "Cici", points: 720 },
  ];

  return (
    <div className="mt-6 p-4 bg-white rounded shadow-sm">
      <h3 className="font-semibold">Leaderboard</h3>
      <ol className="mt-2 space-y-1">
        {sample.map((s, i) => (
          <li key={i} className="flex justify-between">
            <div>
              {i + 1}. {s.name}
            </div>
            <div className="font-mono">{s.points} pts</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
