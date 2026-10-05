"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  X_MAX,
  X_MIN,
  Y_MAX,
  Y_MIN,
  clamp,
  round,
  type BezierPoints,
} from "./utils";

type Props = {
  value: BezierPoints;
  onChange: (points: BezierPoints) => void;
};

// ukuran 1 unit (0..1) dalam koordinat viewBox + padding agar handle tidak terpotong
const S = 160;
const PAD_X = 30;
const PAD_Y = 12;
const W = S + PAD_X * 2;
const H = (Y_MAX - Y_MIN) * S + PAD_Y * 2;

const toSvgX = (v: number) => PAD_X + v * S;
const toSvgY = (v: number) => PAD_Y + (Y_MAX - v) * S;

const GRID = [0.25, 0.5, 0.75];
const STEP = 0.01;

const FIELDS = [
  { label: "x1", min: X_MIN, max: X_MAX },
  { label: "y1", min: Y_MIN, max: Y_MAX },
  { label: "x2", min: X_MIN, max: X_MAX },
  { label: "y2", min: Y_MIN, max: Y_MAX },
] as const;

function NumberField({
  label,
  value,
  min,
  max,
  onCommit,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onCommit: (v: number) => void;
}) {
  // draft menjaga ketikan seperti "0." tidak langsung di-overwrite
  const [draft, setDraft] = useState<string | null>(null);

  return (
    <div className="space-y-1.5">
      <Label htmlFor={`bezier-${label}`} className="text-xs uppercase">
        {label}
      </Label>
      <Input
        id={`bezier-${label}`}
        type="number"
        inputMode="decimal"
        step={STEP}
        min={min}
        max={max}
        value={draft ?? String(value)}
        onChange={(e) => {
          setDraft(e.target.value);
          const n = parseFloat(e.target.value);
          if (!Number.isNaN(n)) onCommit(round(clamp(n, min, max)));
        }}
        onBlur={() => setDraft(null)}
      />
    </div>
  );
}

export default function CurveEditor({ value, onChange }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [x1, y1, x2, y2] = value;

  const move = (index: 0 | 1, x: number, y: number) => {
    const next = [...value] as BezierPoints;
    next[index * 2] = round(clamp(x, X_MIN, X_MAX));
    next[index * 2 + 1] = round(clamp(y, Y_MIN, Y_MAX));
    onChange(next);
  };

  const handlePointerMove = (
    index: 0 | 1,
    e: React.PointerEvent<SVGCircleElement>,
  ) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId) || !svgRef.current)
      return;
    const rect = svgRef.current.getBoundingClientRect();
    const vx = ((e.clientX - rect.left) / rect.width) * W;
    const vy = ((e.clientY - rect.top) / rect.height) * H;
    move(index, (vx - PAD_X) / S, Y_MAX - (vy - PAD_Y) / S);
  };

  const handleKeyDown = (index: 0 | 1, e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.1 : STEP;
    const dx =
      e.key === "ArrowRight" ? step : e.key === "ArrowLeft" ? -step : 0;
    const dy = e.key === "ArrowUp" ? step : e.key === "ArrowDown" ? -step : 0;
    if (!dx && !dy) return;
    e.preventDefault();
    move(index, value[index * 2] + dx, value[index * 2 + 1] + dy);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Curve Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="mx-auto h-auto w-full max-w-[240px] touch-none select-none rounded-lg bg-muted/40">
          {/* area 0..1 */}
          <rect
            x={toSvgX(0)}
            y={toSvgY(1)}
            width={S}
            height={S}
            className="fill-background stroke-border"
          />

          {/* grid */}
          {GRID.map((t) => (
            <g key={t} className="stroke-border" strokeDasharray="2 3">
              <line
                x1={toSvgX(t)}
                y1={toSvgY(1)}
                x2={toSvgX(t)}
                y2={toSvgY(0)}
              />
              <line
                x1={toSvgX(0)}
                y1={toSvgY(t)}
                x2={toSvgX(1)}
                y2={toSvgY(t)}
              />
            </g>
          ))}

          {/* control lines */}
          <line
            x1={toSvgX(0)}
            y1={toSvgY(0)}
            x2={toSvgX(x1)}
            y2={toSvgY(y1)}
            className="stroke-muted-foreground"
          />
          <line
            x1={toSvgX(1)}
            y1={toSvgY(1)}
            x2={toSvgX(x2)}
            y2={toSvgY(y2)}
            className="stroke-muted-foreground"
          />

          {/* kurva */}
          <path
            d={`M${toSvgX(0)},${toSvgY(0)} C${toSvgX(x1)},${toSvgY(y1)} ${toSvgX(x2)},${toSvgY(y2)} ${toSvgX(1)},${toSvgY(1)}`}
            fill="none"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="stroke-primary"
          />

          {/* handle */}
          {([0, 1] as const).map((i) => {
            const cx = toSvgX(value[i * 2]);
            const cy = toSvgY(value[i * 2 + 1]);
            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={7}
                  strokeWidth={2}
                  tabIndex={0}
                  aria-label={`Control point P${i + 1}, gunakan tombol panah untuk menggeser`}
                  className="cursor-grab touch-none fill-primary stroke-background outline-none focus-visible:stroke-foreground active:cursor-grabbing"
                  onPointerDown={(e) =>
                    e.currentTarget.setPointerCapture(e.pointerId)
                  }
                  onPointerMove={(e) => handlePointerMove(i, e)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                />
                <text
                  x={cx}
                  y={cy - 12}
                  textAnchor="middle"
                  className="pointer-events-none select-none fill-muted-foreground text-[10px]">
                  P{i + 1}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="grid grid-cols-4 gap-2">
          {FIELDS.map((f, i) => (
            <NumberField
              key={f.label}
              label={f.label}
              value={value[i]}
              min={f.min}
              max={f.max}
              onCommit={(v) => {
                const next = [...value] as BezierPoints;
                next[i] = v;
                onChange(next);
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
