"use client";

import { Button } from "@/components/ui/button";

const presets = {
  Linear: [0, 0, 1, 1],
  Ease: [0.25, 0.1, 0.25, 1],
  "Ease In": [0.42, 0, 1, 1],
  "Ease Out": [0, 0, 0.58, 1],
  "Ease In-Out": [0.42, 0, 0.58, 1],
};

export default function PresetTimingFunctions({
  setP1x,
  setP1y,
  setP2x,
  setP2y,
}: any) {
  return (
    <div className="border p-4 rounded-lg space-x-2">
      {Object.entries(presets).map(([name, vals]) => (
        <Button
          key={name}
          variant="outline"
          onClick={() => {
            setP1x(vals[0]);
            setP1y(vals[1]);
            setP2x(vals[2]);
            setP2y(vals[3]);
          }}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}
