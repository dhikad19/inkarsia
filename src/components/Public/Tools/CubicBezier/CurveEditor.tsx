"use client";

import { useRef, useState } from "react";

type Props = {
  p1x: number;
  p1y: number;
  p2x: number;
  p2y: number;
  setP1x: (v: number) => void;
  setP1y: (v: number) => void;
  setP2x: (v: number) => void;
  setP2y: (v: number) => void;
};

export default function CurveEditor({
  p1x,
  p1y,
  p2x,
  p2y,
  setP1x,
  setP1y,
  setP2x,
  setP2y,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<null | "p1" | "p2">(null);

  const handleMouseDown = (point: "p1" | "p2") => setDragging(point);

  const handleMouseUp = () => setDragging(null);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height; // invert Y (CSS coords)
    const clamp = (val: number) => Math.min(1, Math.max(0, val));

    if (dragging === "p1") {
      setP1x(clamp(x));
      setP1y(clamp(y));
    } else {
      setP2x(clamp(x));
      setP2y(clamp(y));
    }
  };

  const svgX = (v: number) => v * 200;
  const svgY = (v: number) => (1 - v) * 200;

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Curve Editor</h3>
      <svg
        ref={svgRef}
        width={200}
        height={200}
        className="bg-black/10 border rounded"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* grid */}
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line
            key={i}
            x1={svgX(t)}
            y1={0}
            x2={svgX(t)}
            y2={200}
            stroke="#555"
            strokeDasharray="2,2"
          />
        ))}
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line
            key={i}
            x1={0}
            y1={svgY(t)}
            x2={200}
            y2={svgY(t)}
            stroke="#555"
            strokeDasharray="2,2"
          />
        ))}

        {/* bezier curve */}
        <path
          d={`M0,200 C${svgX(p1x)},${svgY(p1y)} ${svgX(p2x)},${svgY(
            p2y
          )} 200,0`}
          stroke="#0af"
          fill="none"
          strokeWidth={2}
        />

        {/* control lines */}
        <line x1={0} y1={200} x2={svgX(p1x)} y2={svgY(p1y)} stroke="#999" />
        <line x1={200} y1={0} x2={svgX(p2x)} y2={svgY(p2y)} stroke="#999" />

        {/* control points */}
        <circle
          cx={svgX(p1x)}
          cy={svgY(p1y)}
          r={6}
          fill="red"
          onMouseDown={() => handleMouseDown("p1")}
          style={{ cursor: "grab" }}
        />
        <circle
          cx={svgX(p2x)}
          cy={svgY(p2y)}
          r={6}
          fill="lime"
          onMouseDown={() => handleMouseDown("p2")}
          style={{ cursor: "grab" }}
        />
      </svg>
      <p className="mt-2 text-sm text-muted-foreground">
        P1 ({p1x.toFixed(2)}, {p1y.toFixed(2)}) – P2 ({p2x.toFixed(2)},{" "}
        {p2y.toFixed(2)})
      </p>
    </div>
  );
}
