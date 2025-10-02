"use client";
import React from "react";
import { GradientState } from "@/lib/types";

export default function GradientControls({
  state,
  setState,
}: {
  state: GradientState;
  setState: (s: GradientState) => void;
}) {
  return (
    <div className="panel bg-slate-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Type</label>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${
              state.type === "linear"
                ? "bg-white text-black"
                : "bg-transparent border"
            }`}
            onClick={() => setState({ ...state, type: "linear" })}
          >
            Linear
          </button>
          <button
            className={`px-3 py-1 rounded ${
              state.type === "radial"
                ? "bg-white text-black"
                : "bg-transparent border"
            }`}
            onClick={() => setState({ ...state, type: "radial" })}
          >
            Radial
          </button>
          <button
            className={`px-3 py-1 rounded ${
              state.type === "color-mix"
                ? "bg-white text-black"
                : "bg-transparent border"
            }`}
            onClick={() => setState({ ...state, type: "color-mix" })}
          >
            Color Mix
          </button>
        </div>
      </div>

      {state.type === "linear" && (
        <div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Angle</div>
            <div className="text-xs text-muted">{state.angle}°</div>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            value={state.angle}
            onChange={(e) =>
              setState({ ...state, angle: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>
      )}

      {state.type === "radial" && (
        <div className="grid grid-cols-2 gap-2">
          <label className="text-sm">
            Shape
            <select
              value={state.radialShape ?? "ellipse"}
              onChange={(e) =>
                setState({ ...state, radialShape: e.target.value as any })
              }
              className="ml-2 px-2 py-1 rounded bg-slate-900"
            >
              <option value="ellipse">Ellipse</option>
              <option value="circle">Circle</option>
            </select>
          </label>

          <label className="text-sm">
            Position
            <select
              value={state.radialPos ?? "center"}
              onChange={(e) =>
                setState({ ...state, radialPos: e.target.value })
              }
              className="ml-2 px-2 py-1 rounded bg-slate-900"
            >
              <option value="center">Center</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}
