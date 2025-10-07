"use client";

import { Slider } from "@/components/ui/slider";

export default function CornerControls({ radius, onChange }: any) {
  const corners = [
    { label: "Top Left", key: "topLeft" },
    { label: "Top Right", key: "topRight" },
    { label: "Bottom Left", key: "bottomLeft" },
    { label: "Bottom Right", key: "bottomRight" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {corners.map(({ label, key }) => (
        <div key={key} className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">{label}</h3>
          <div className="space-y-2">
            <div>
              <label className="text-sm">
                Horizontal Radius: {radius[key].x}%
              </label>
              <Slider
                value={[radius[key].x]}
                onValueChange={([v]) => onChange(key, "x", v)}
                max={150}
              />
            </div>
            <div>
              <label className="text-sm">
                Vertical Radius: {radius[key].y}%
              </label>
              <Slider
                value={[radius[key].y]}
                onValueChange={([v]) => onChange(key, "y", v)}
                max={150}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
