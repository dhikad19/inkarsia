// components/TeamPanel.tsx
import React, { useState } from "react";

type Member = {
  id: string;
  name: string;
  points: number;
  cpm?: number;
  accuracy?: number;
};

export default function TeamPanel({ words }: { words: any[] }) {
  const [members, setMembers] = useState<Member[]>([
    { id: "m1", name: "Alice", points: 0 },
    { id: "m2", name: "Budi", points: 0 },
  ]);
  const [review, setReview] = useState("");

  return (
    <div className="mt-6 p-4 bg-white rounded shadow-sm">
      <h3 className="font-semibold mb-2">Team Mode — Members</h3>

      <div className="flex gap-4">
        <div className="flex-1">
          {members.map((m) => (
            <div key={m.id} className="p-2 border rounded mb-2">
              <div className="flex justify-between">
                <div>{m.name}</div>
                <div className="font-mono">{m.points} pts</div>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                CPM: {m.cpm ?? "—"} • Acc: {m.accuracy ?? "—"}
              </div>
            </div>
          ))}
        </div>

        <div className="w-80">
          <h4 className="font-medium">UX Review (team)</h4>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={6}
            className="w-full p-2 border rounded mt-2"
            placeholder="Quick notes: controls, pace, clarity, highlights..."
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button className="px-3 py-1 rounded bg-indigo-600 text-white">
              Submit review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
