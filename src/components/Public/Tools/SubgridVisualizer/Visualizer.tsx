"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Props = {
  cols: string;
  rows: string;
  gap: number;
  items: number;
  showLines: boolean;
  setShowLines: (v: boolean) => void;
  showNumbers: boolean;
  setShowNumbers: (v: boolean) => void;
};

export default function InteractiveVisualizer({
  cols,
  rows,
  gap,
  items,
  showLines,
  setShowLines,
  showNumbers,
  setShowNumbers,
}: Props) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-semibold mb-4">Interactive Visualizer</h2>

      <div className="flex gap-6 mb-4">
        <div className="flex items-center gap-2">
          <Switch checked={showLines} onCheckedChange={setShowLines} />
          <Label>Show Grid Lines</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={showNumbers} onCheckedChange={setShowNumbers} />
          <Label>Show Line Numbers</Label>
        </div>
      </div>

      <div
        className="border p-2 relative"
        style={{
          display: "grid",
          gridTemplateColumns: cols,
          gridTemplateRows: rows,
          gap: `${gap}px`,
          backgroundSize: showLines ? "20px 20px" : "none",
          backgroundImage: showLines
            ? "linear-gradient(to right, rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.1) 1px, transparent 1px)"
            : "none",
        }}
      >
        {Array.from({ length: items }).map((_, i) => (
          <div
            key={i}
            className="bg-muted border rounded-md p-2 flex items-center justify-center"
          >
            Item {i + 1}
          </div>
        ))}
        {showNumbers && (
          <div className="absolute top-0 left-0 text-xs text-muted-foreground">
            {/* Bisa generate nomor garis */}
          </div>
        )}
      </div>
    </div>
  );
}
