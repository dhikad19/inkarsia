"use client";
import React from "react";
import { GradientState } from "@/lib/types";
import { uid } from "@/lib/gradient";

const presets: { name: string; state: Partial<GradientState> }[] = [
  {
    name: "Purple Dream",
    state: {
      type: "linear",
      angle: 90,
      stops: [
        { id: uid("s"), color: "#667EEA", pos: 0 },
        { id: uid("s"), color: "#764BA2", pos: 100 },
      ],
    },
  },
  {
    name: "Pink Sunset",
    state: {
      type: "linear",
      angle: 120,
      stops: [
        { id: uid("s"), color: "#FFAFBD", pos: 0 },
        { id: uid("s"), color: "#ffc3a0", pos: 100 },
      ],
    },
  },
  {
    name: "Ocean Blue",
    state: {
      type: "linear",
      angle: 90,
      stops: [
        { id: uid("s"), color: "#00c6ff", pos: 0 },
        { id: uid("s"), color: "#0072ff", pos: 100 },
      ],
    },
  },
  {
    name: "Fresh Green",
    state: {
      type: "linear",
      angle: 90,
      stops: [
        { id: uid("s"), color: "#a8ff78", pos: 0 },
        { id: uid("s"), color: "#78ffd6", pos: 100 },
      ],
    },
  },
  {
    name: "Peach Glow",
    state: {
      type: "linear",
      angle: 45,
      stops: [
        { id: uid("s"), color: "#f6d365", pos: 0 },
        { id: uid("s"), color: "#fda085", pos: 100 },
      ],
    },
  },
  {
    name: "Soft Rose",
    state: {
      type: "linear",
      angle: 90,
      stops: [
        { id: uid("s"), color: "#fbc2eb", pos: 0 },
        { id: uid("s"), color: "#a6c1ee", pos: 100 },
      ],
    },
  },
];

export default function PresetGradients({
  apply,
}: {
  apply: (g: Partial<GradientState>) => void;
}) {
  return (
    <div className="panel bg-slate-800 rounded-lg p-4">
      <div className="text-sm font-medium mb-2">Preset Gradients</div>
      <div className="flex gap-2 flex-wrap">
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => apply(p.state)}
            className="min-w-[110px] h-10 rounded-md shadow-inner px-3 py-2 text-xs"
            style={{
              background:
                (p.state.stops &&
                  `linear-gradient(90deg, ${p.state.stops
                    .map((s: any) => `${s.color} ${s.pos}%`)
                    .join(", ")})`) ??
                "#222",
            }}
            title={p.name}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
