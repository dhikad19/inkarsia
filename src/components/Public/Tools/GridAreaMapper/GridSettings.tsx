import React from "react";

interface GridSettingsProps {
  cols: number;
  rows: number;
  setCols: (v: number) => void;
  setRows: (v: number) => void;
  resetGrid: () => void;
  resetAreas: () => void;
}

export default function GridSettings({
  cols,
  rows,
  setCols,
  setRows,
  resetGrid,
  resetAreas,
}: GridSettingsProps) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="font-medium mb-2">Grid Settings</h2>
      <div className="flex gap-3 items-end flex-wrap">
        <label className="flex flex-col">
          Columns
          <input
            type="number"
            min={1}
            max={12}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value) || 1)}
            className="mt-1 p-2 border rounded w-28"
          />
        </label>
        <label className="flex flex-col">
          Rows
          <input
            type="number"
            min={1}
            max={12}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value) || 1)}
            className="mt-1 p-2 border rounded w-28"
          />
        </label>
        <div className="flex gap-2">
          <button
            className="px-3 py-2 bg-gray-100 rounded border"
            onClick={resetGrid}
          >
            Reset Grid
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded border"
            onClick={resetAreas}
          >
            Reset Areas
          </button>
        </div>
      </div>
    </div>
  );
}
