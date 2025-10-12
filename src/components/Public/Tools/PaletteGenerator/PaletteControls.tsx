// /components/PaletteControls.tsx
"use client";
import React from "react";

type Props = {
  onGenerate: () => void;
  onRandomizeNames: () => void;
  onLockAll: () => void;
  onUnlockAll: () => void;
  onExportJSON: () => void;
  onExportPNG: () => void;
  onAddColor: () => void;
};

export default function PaletteControls({
  onGenerate,
  onRandomizeNames,
  onLockAll,
  onUnlockAll,
  onExportJSON,
  onExportPNG,
  onAddColor,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button
        onClick={onGenerate}
        className="px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-sky-500 to-indigo-600 text-white">
        Regenerate
      </button>
      <button
        onClick={onRandomizeNames}
        className="px-3 py-2 rounded-lg border bg-white/90">
        Randomize Names
      </button>
      <button onClick={onLockAll} className="px-3 py-2 rounded-lg border">
        Lock All
      </button>
      <button onClick={onUnlockAll} className="px-3 py-2 rounded-lg border">
        Unlock All
      </button>
      <button
        onClick={onAddColor}
        className="px-3 py-2 rounded-lg border bg-white/90">
        + Add
      </button>
      <button
        onClick={onExportJSON}
        className="px-3 py-2 rounded-lg border bg-white/90">
        Export JSON
      </button>
      <button
        onClick={onExportPNG}
        className="px-3 py-2 rounded-lg border bg-white/90">
        Export PNG
      </button>
    </div>
  );
}
