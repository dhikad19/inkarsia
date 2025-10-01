"use client";

import React, { useState, useMemo } from "react";
import GridSettings from "@/components/Public/Tools/GridAreaMapper/GridSettings";
import PresetLayouts from "@/components/Public/Tools/GridAreaMapper/PresetLayouts";
import Designer from "@/components/Public/Tools/GridAreaMapper/Designer";
import GridDisplay from "@/components/Public/Tools/GridAreaMapper/GridDisplay";
import { GeneratedCss } from "@/components/Public/Tools/GridAreaMapper/GenerateCss";
import { makeCells } from "@/utils/makeCells";
import { Cell, Area } from "@/utils/types";

const DEFAULT_COLS = 6;
const DEFAULT_ROWS = 6;

export default function GridAreaMapperPage() {
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cells, setCells] = useState<Cell[]>(() =>
    makeCells(DEFAULT_COLS, DEFAULT_ROWS)
  );
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedCellIds, setSelectedCellIds] = useState<Set<string>>(
    new Set()
  );
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [newAreaName, setNewAreaName] = useState<string>("");

  // ---- fungsi logika (reset, apply preset, add area, dll) tetap di sini ---- //

  const gridTemplateAreas = useMemo(() => {
    if (areas.length === 0) return null;
    const matrix: string[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ".")
    );
    cells.forEach((c) => {
      matrix[c.row - 1][c.col - 1] = c.area ?? ".";
    });
    return matrix.map((row) => '"' + row.join(" ") + '"').join("\n    ");
  }, [areas, cells, cols, rows]);

  const generatedCss = useMemo(() => {
    const colsStr = `repeat(${cols}, 1fr)`;
    const rowsStr = `repeat(${rows}, auto)`;
    const areasStr = gridTemplateAreas
      ? `grid-template-areas:\n    ${gridTemplateAreas};\n`
      : "";
    return `display: grid;\ngrid-template-columns: ${colsStr};\ngrid-template-rows: ${rowsStr};\n${areasStr}`;
  }, [cols, rows, gridTemplateAreas]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">CSS Grid Area Mapper</h1>

      <GridSettings
        cols={cols}
        rows={rows}
        setCols={setCols}
        setRows={setRows}
        resetGrid={() => {
          setCols(DEFAULT_COLS);
          setRows(DEFAULT_ROWS);
          setCells(makeCells(DEFAULT_COLS, DEFAULT_ROWS));
          setAreas([]);
        }}
        resetAreas={() => {
          setCells((prev) => prev.map((c) => ({ ...c, area: null })));
          setAreas([]);
        }}
      />

      <PresetLayouts
        cols={cols}
        rows={rows}
        setCells={setCells}
        setAreas={setAreas}
      />

      <Designer
        newAreaName={newAreaName}
        setNewAreaName={setNewAreaName}
        selectedCellIds={selectedCellIds}
        selectedAreaId={selectedAreaId}
        areas={areas}
        setAreas={setAreas}
        setCells={setCells}
        setSelectedCellIds={setSelectedCellIds}
        setSelectedAreaId={setSelectedAreaId}
      />

      <GridDisplay
        cols={cols}
        rows={rows}
        cells={cells}
        selectedCellIds={selectedCellIds}
        setSelectedCellIds={setSelectedCellIds}
      />

      <GeneratedCss css={generatedCss} areas={areas} />
    </div>
  );
}
