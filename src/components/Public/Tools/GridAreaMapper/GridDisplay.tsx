import React from "react";
import { Cell } from "@/utils/types";
import { AREA_COLORS } from "@/utils/presets";

interface GridDisplayProps {
  cols: number;
  rows: number;
  cells: Cell[];
  selectedCellIds: Set<string>;
  setSelectedCellIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function GridDisplay({
  cols,
  cells,
  selectedCellIds,
  setSelectedCellIds,
}: GridDisplayProps) {
  function toggleCell(cellId: string) {
    setSelectedCellIds((prev) => {
      const next = new Set(prev);
      if (next.has(cellId)) next.delete(cellId);
      else next.add(cellId);
      return next;
    });
  }

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="font-medium mb-2">Design Grid</h2>
      <div className="overflow-auto">
        <div
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(60px, 1fr))` }}
          className="grid gap-1 border p-1 bg-gray-50"
        >
          {cells.map((cell) => {
            const isSelected = selectedCellIds.has(cell.id);
            const borderClass = cell.area
              ? AREA_COLORS[cell.area] || "border-black"
              : "border-gray-200";
            return (
              <div
                key={cell.id}
                onClick={() => toggleCell(cell.id)}
                className={`p-3 text-xs h-20 flex items-start justify-start cursor-pointer bg-white ${borderClass} border-2 ${
                  isSelected ? "ring-2 ring-indigo-300" : ""
                }`}
              >
                <div>
                  <div className="text-[10px] text-gray-500">{cell.id}</div>
                  {cell.area && (
                    <div className="mt-1 text-sm font-semibold">
                      {cell.area}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
