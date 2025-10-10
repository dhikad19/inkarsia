"use client";

export default function SimulatorControls({
  sim,
  setSim,
}: {
  sim: string;
  setSim: (s: any) => void;
}) {
  return (
    <div className="flex gap-2 mt-2">
      <select
        value={sim}
        onChange={(e) => setSim(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="normal">Normal</option>
        <option value="protanopia">Protanopia (red-weak)</option>
        <option value="deuteranopia">Deuteranopia (green-weak)</option>
        <option value="tritanopia">Tritanopia (blue-weak)</option>
      </select>
      <button
        onClick={() => setSim("normal")}
        className="px-3 py-2 border rounded"
      >
        Reset
      </button>
    </div>
  );
}
