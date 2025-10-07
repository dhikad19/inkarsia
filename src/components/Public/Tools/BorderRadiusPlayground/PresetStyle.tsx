"use client";

import { Button } from "@/components/ui/button";

const presets = {
  None: { tl: [0, 0], tr: [0, 0], bl: [0, 0], br: [0, 0] },
  Medium: { tl: [16, 16], tr: [16, 16], bl: [16, 16], br: [16, 16] },
  Large: { tl: [32, 32], tr: [32, 32], bl: [32, 32], br: [32, 32] },
  Circle: { tl: [150, 150], tr: [150, 150], bl: [150, 150], br: [150, 150] },
  Organic: { tl: [120, 180], tr: [60, 80], bl: [80, 120], br: [140, 60] },
};

export default function PresetStyles({ setRadius }: any) {
  return (
    <div className="p-4 border rounded-lg space-x-2">
      {Object.keys(presets).map((key) => (
        <Button
          key={key}
          variant="secondary"
          onClick={() =>
            setRadius({
              topLeft: { x: presets[key].tl[0], y: presets[key].tl[1] },
              topRight: { x: presets[key].tr[0], y: presets[key].tr[1] },
              bottomLeft: { x: presets[key].bl[0], y: presets[key].bl[1] },
              bottomRight: { x: presets[key].br[0], y: presets[key].br[1] },
            })
          }
        >
          {key}
        </Button>
      ))}
    </div>
  );
}
