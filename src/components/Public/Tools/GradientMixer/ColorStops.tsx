"use client";
import React from "react";
import { ColorStop, GradientState } from "@/lib/types";
import { uid } from "@/lib/gradient";
import { X } from "lucide-react";

export default function ColorStops({
  state,
  setState,
}: {
  state: GradientState;
  setState: (s: GradientState) => void;
}) {
  const updateStop = (id: string, patch: Partial<ColorStop>) => {
    setState({
      ...state,
      stops: state.stops.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  };

  const addStop = () => {
    // default position average of last two or 50
    const pos =
      state.stops.length >= 2
        ? Math.floor(
            (state.stops[state.stops.length - 1].pos + state.stops[0].pos) / 2
          )
        : 50;
    const stop: ColorStop = { id: uid("s"), color: "#ff7aa2", pos };
    setState({ ...state, stops: [...state.stops, stop] });
  };

  const removeStop = (id: string) => {
    if (state.stops.length <= 2) return; // keep at least 2 stops
    setState({ ...state, stops: state.stops.filter((s) => s.id !== id) });
  };

  const reorder = (index: number, dir: "up" | "down") => {
    const arr = [...state.stops];
    const target = dir === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setState({ ...state, stops: arr });
  };

  return (
    <div className="panel bg-slate-800 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Color Stops</div>
        <button onClick={addStop} className="px-3 py-1 bg-slate-700 rounded">
          Add Stop
        </button>
      </div>

      <div className="space-y-3">
        {state.stops.map((s, idx) => (
          <div
            key={s.id}
            className="grid grid-cols-[auto_1fr_auto] gap-3 items-center p-2 rounded bg-slate-900"
          >
            <input
              type="color"
              value={s.color}
              onChange={(e) => updateStop(s.id, { color: e.target.value })}
              className="w-10 h-8 p-0 rounded"
            />
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                value={s.pos}
                onChange={(e) =>
                  updateStop(s.id, { pos: Number(e.target.value) })
                }
                className="w-full"
              />
              <input
                type="number"
                min={0}
                max={100}
                value={s.pos}
                onChange={(e) =>
                  updateStop(s.id, { pos: Number(e.target.value) })
                }
                className="w-16 px-2 py-1 rounded bg-slate-800"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => reorder(idx, "up")}
                className="px-2 py-1 bg-slate-700 rounded"
              >
                ↑
              </button>
              <button
                onClick={() => reorder(idx, "down")}
                className="px-2 py-1 bg-slate-700 rounded"
              >
                ↓
              </button>
              <button
                onClick={() => removeStop(s.id)}
                disabled={state.stops.length <= 2}
                className="p-1 rounded bg-red-700 disabled:opacity-50"
                title="Remove stop (min 2)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
