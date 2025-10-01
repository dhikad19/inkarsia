import React from "react";
import { presetLayouts, AREA_COLORS } from "@/utils/presets";
import { Area, Cell } from "@/utils/types";

interface PresetLayoutsProps {
  cols: number;
  rows: number;
  setCells: React.Dispatch<React.SetStateAction<Cell[]>>;
  setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
}

export default function PresetLayouts({
  cols,
  rows,
  setCells,
  setAreas,
}: PresetLayoutsProps) {
  function applyPreset(presetName: string) {
    const preset = (presetLayouts as any)[presetName];
    if (!preset) return;
    const defs = preset(cols, rows);

    const newAreas: Area[] = defs.map((d: any, idx: number) => {
      const id = `${d.name}-${idx}`;
      const color = AREA_COLORS[d.name] || "border-black";
      const assignedCells: string[] = [];
      const c1 = d.c1 ?? 1;
      const c2 = d.c2 ?? cols;
      const r1 = d.r1 ?? 1;
      const r2 = d.r2 ?? rows;
      for (let r = r1; r <= r2; r++) {
        for (let c = c1; c <= c2; c++) {
          assignedCells.push(`r${r}c${c}`);
        }
      }
      return { id, name: d.name, color, cells: assignedCells };
    });

    setCells((prev) =>
      prev.map((cell) => {
        const area = newAreas.find((a) => a.cells.includes(cell.id));
        return { ...cell, area: area ? area.name : null };
      })
    );
    setAreas(newAreas);
  }

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="font-medium mb-2">Preset Layouts</h2>
      <div className="flex gap-2">
        {Object.keys(presetLayouts).map((p) => (
          <button
            key={p}
            onClick={() => applyPreset(p)}
            className="px-3 py-2 border rounded bg-white hover:bg-gray-50"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
