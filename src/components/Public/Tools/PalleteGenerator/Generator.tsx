"use client";

import { useState } from "react";
import PaletteFromImageDialog from "./PhotoUpload";

type Mode = "analogous" | "complementary" | "monochromatic" | "triadic";

export default function PaletteGenerator() {
  const [colors, setColors] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("analogous");
  const [open, setOpen] = useState(true);

  const addColor = (color: string) => {
    setColors((prev) => [...prev, color]);
  };

  // Convert HSL → HEX
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  // Generate palette by mode
  const generatePalette = () => {
    const baseHue = Math.floor(Math.random() * 360);
    let hues: number[] = [];

    switch (mode) {
      case "analogous":
        hues = [baseHue, baseHue + 30, baseHue - 30];
        break;
      case "complementary":
        hues = [baseHue, (baseHue + 180) % 360];
        break;
      case "monochromatic":
        hues = [baseHue, baseHue, baseHue];
        break;
      case "triadic":
        hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
        break;
    }

    const newColors = hues.flatMap((h) => [
      hslToHex((h + 360) % 360, 70, 40),
      hslToHex((h + 360) % 360, 70, 60),
    ]);

    setColors(newColors.slice(0, 5)); // ambil 5 warna
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🎨 Palette Generator
      </h1>

      {/* Mode Selector */}
      <div className="flex gap-2 mb-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="border rounded-lg p-2 w-full"
        >
          <option value="analogous">Analogous</option>
          <option value="complementary">Complementary</option>
          <option value="monochromatic">Monochromatic</option>
          <option value="triadic">Triadic</option>
        </select>
        <button
          onClick={generatePalette}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Generate
        </button>
      </div>

      {/* Hasil Palette */}
      {colors.length > 0 && (
        <div className="mt-6 grid grid-cols-5 gap-2">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className="h-32 rounded-lg flex items-center justify-center text-xs font-mono"
              style={{ backgroundColor: color, color: "#fff" }}
            >
              {color}
            </div>
          ))}
        </div>
      )}

      {/* Dialog Upload Gambar */}
      <PaletteFromImageDialog
        open={open}
        setOpen={setOpen}
        onAddColor={addColor}
      />
    </div>
  );
}
