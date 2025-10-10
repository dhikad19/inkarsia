"use client";

import chroma from "chroma-js";
import { useState } from "react";
import { suggestionsFor } from "@/lib/utils";

export default function PaletteEditor({
  palette,
  setPalette,
  name,
  setName,
}: {
  palette: string[];
  setPalette: (p: string[]) => void;
  name: string;
  setName: (s: string) => void;
}) {
  const [input, setInput] = useState("");

  function addColor(hex: string) {
    if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) return;
    const h = hex.startsWith("#") ? hex : "#" + hex;
    setPalette([...palette, h]);
  }

  function replace(index: number, hex: string) {
    const copy = [...palette];
    copy[index] = hex;
    setPalette(copy);
  }

  function remove(index: number) {
    const copy = palette.filter((_, i) => i !== index);
    setPalette(copy);
  }

  function autoSuggest() {
    const sug = suggestionsFor(palette);
    setPalette(sug);
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <label className="block text-sm font-medium mb-2">Nama palet</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      <label className="block text-sm font-medium mb-2">Warna saat ini</label>
      <div className="space-y-2">
        {palette.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded shadow"
              style={{ background: c }}
            />
            <input
              value={c}
              onChange={(e) => replace(i, e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={() => remove(i)}
              className="px-3 py-1 rounded bg-red-500 text-white"
            >
              hapus
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          placeholder="#RRGGBB"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <button
          onClick={() => {
            addColor(input);
            setInput("");
          }}
          className="px-4 py-2 bg-sky-600 text-white rounded"
        >
          Tambah
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={autoSuggest}
          className="px-3 py-2 bg-emerald-600 text-white rounded"
        >
          Saran palet ramah
        </button>
        <button
          onClick={() => setPalette([])}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
