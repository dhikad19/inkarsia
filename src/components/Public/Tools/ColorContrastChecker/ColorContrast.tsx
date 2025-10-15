"use client";

import { useState, useEffect } from "react";
import { contrastRatio, getRatingScore, getTextScore } from "@/utils/contrast";
import { Input } from "@/components/ui/input";
import ColorPreview from "./ColorPreview";

export default function ColorContrastChecker() {
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#214469");
  const [contrast, setContrast] = useState<string | null>(null);

  useEffect(() => {
    // hitung kontras pertama kali dan tiap kali warna berubah
    const ratio = contrastRatio(textColor, bgColor);
    setContrast(ratio);
  }, [textColor, bgColor]);

  // jangan render sebelum contrast terhitung
  if (contrast === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading contrast...</p>
      </div>
    );
  }

  const contrastValue = parseFloat(contrast);
  const score = getRatingScore(contrastValue);
  const smallTextScore = getTextScore(contrastValue, 4.5);
  const largeTextScore = getTextScore(contrastValue, 3.0);

  const level =
    contrastValue >= 7
      ? "Excellent"
      : contrastValue >= 4.5
      ? "Good"
      : contrastValue >= 3
      ? "Fair"
      : "Poor";

  const ratingColor =
    contrastValue >= 7
      ? "bg-green-100 text-green-800"
      : contrastValue >= 4.5
      ? "bg-yellow-100 text-yellow-800"
      : contrastValue >= 3
      ? "bg-orange-100 text-orange-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Left Panel */}
      <div className="p-6 border rounded-2xl bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Pick your colors</h2>

        <div className="flex justify-between items-center mb-6 gap-4">
          <div className="flex flex-col w-1/2">
            <label className="text-sm font-medium mb-1">Text color</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full h-10 rounded-md cursor-pointer border border-gray-300"
            />
            <Input
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="mt-2 text-center"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-sm font-medium mb-1">Background color</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 rounded-md cursor-pointer border border-gray-300"
            />
            <Input
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="mt-2 text-center"
            />
          </div>
        </div>

        <div className={`rounded-xl p-4 text-center ${ratingColor}`}>
          <p className="text-4xl font-bold">{contrast}</p>
          <p className="font-semibold">{level}</p>
          <p className="text-lg mt-1">Score: {score}/100</p>
        </div>

        <div className="grid grid-cols-2 text-center mt-4 border rounded-xl divide-x">
          <div className="p-3">
            <p className="text-sm font-medium mb-1">Small text</p>
            <p className="text-2xl font-semibold text-gray-800">
              {smallTextScore}/5
            </p>
            <p className="text-xs text-gray-500">Threshold 4.5:1</p>
          </div>

          <div className="p-3">
            <p className="text-sm font-medium mb-1">Large text</p>
            <p className="text-2xl font-semibold text-gray-800">
              {largeTextScore}/5
            </p>
            <p className="text-xs text-gray-500">Threshold 3.0:1</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          WCAG 2.1 recommends 4.5+ for small text and 3.0+ for large text.
        </p>
      </div>

      {/* Right Panel */}
      <div className="rounded-2xl overflow-hidden shadow-md min-h-[300px]">
        <ColorPreview textColor={textColor} bgColor={bgColor} />
      </div>
    </div>
  );
}
