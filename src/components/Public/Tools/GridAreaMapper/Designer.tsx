import React from "react";
import { Area, Cell } from "@/utils/types";
import { AREA_COLORS } from "@/utils/presets";

interface DesignerProps {
  newAreaName: string;
  setNewAreaName: (v: string) => void;
  selectedCellIds: Set<string>;
  selectedAreaId: string | null;
  areas: Area[];
  setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
  setCells: React.Dispatch<React.SetStateAction<Cell[]>>;
  setSelectedCellIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedAreaId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Designer({
  newAreaName,
  setNewAreaName,
  selectedCellIds,
  selectedAreaId,
  areas,
  setAreas,
  setCells,
  setSelectedCellIds,
  setSelectedAreaId,
}: DesignerProps) {
  function addAreaFromSelection() {
    if (!newAreaName.trim() || selectedCellIds.size === 0) return;
    const id = `${newAreaName}-${Date.now()}`;
    const colorKey = newAreaName.toLowerCase();
    const color = AREA_COLORS[colorKey] || "border-black";
    const cellsArr = Array.from(selectedCellIds);
    const newArea: Area = { id, name: newAreaName, color, cells: cellsArr };
    setAreas((prev) => [...prev, newArea]);
    setCells((prev) =>
      prev.map((c) =>
        selectedCellIds.has(c.id) ? { ...c, area: newAreaName } : c
      )
    );
    setSelectedCellIds(new Set());
    setNewAreaName("");
  }

  function removeSelectedArea() {
    if (!selectedAreaId) return;
    setAreas((prev) => prev.filter((a) => a.id !== selectedAreaId));
    setCells((prev) =>
      prev.map((c) =>
        areas.find((a) => a.id === selectedAreaId && a.name === c.area)
          ? { ...c, area: null }
          : c
      )
    );
    setSelectedAreaId(null);
  }

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="font-medium mb-2">Designer</h2>
      <div className="flex gap-3 flex-wrap">
        <input
          placeholder="Area name (e.g. header, main, sidebar)"
          value={newAreaName}
          onChange={(e) => setNewAreaName(e.target.value)}
          className="p-2 border rounded w-60"
        />
        <button
          onClick={addAreaFromSelection}
          className="px-3 py-2 bg-green-600 text-white rounded"
        >
          Add Area
        </button>
        <button
          onClick={removeSelectedArea}
          className="px-3 py-2 bg-red-600 text-white rounded"
        >
          Remove Selected
        </button>
        <div className="ml-auto text-sm text-gray-600">
          Selected cells: {selectedCellIds.size}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {areas.map((a) => (
          <div
            key={a.id}
            className={`p-2 border ${a.color} rounded flex justify-between items-center`}
          >
            <div>
              <div className="font-medium">{a.name}</div>
              <div className="text-xs text-gray-500">
                {a.cells.length} cells
              </div>
            </div>
            <button
              onClick={() => setSelectedAreaId(a.id)}
              className="text-sm px-2 py-1 border rounded"
            >
              {selectedAreaId === a.id ? "Selected" : "Select"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
