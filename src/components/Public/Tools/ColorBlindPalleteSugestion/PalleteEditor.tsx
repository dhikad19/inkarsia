"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MAX_COLORS, normalizeHex } from "./utils";

function HexInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (hex: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <Input
      value={draft}
      maxLength={7}
      spellCheck={false}
      aria-label="Hex color"
      className="h-10 font-mono text-sm"
      onChange={(e) => {
        setDraft(e.target.value);
        // saat mengetik, hanya terima hex 6 digit yang lengkap
        if (/^#?[0-9a-f]{6}$/i.test(e.target.value)) {
          onChange(normalizeHex(e.target.value)!);
        }
      }}
      onBlur={() => {
        const hex = normalizeHex(draft);
        if (hex) {
          onChange(hex);
          setDraft(hex);
        } else {
          setDraft(value);
        }
      }}
    />
  );
}

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
  const newHex = normalizeHex(input);
  const isFull = palette.length >= MAX_COLORS;

  const add = () => {
    if (!newHex || isFull) return;
    setPalette([...palette, newHex]);
    setInput("");
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="palette-name">Palette name</Label>
        <Input
          id="palette-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>
          Colors ({palette.length}/{MAX_COLORS})
        </Label>
        <div className="space-y-2">
          {palette.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="h-10 w-10 shrink-0 rounded-lg border"
                style={{ background: c }}
              />
              <HexInput
                value={c}
                onChange={(hex) =>
                  setPalette(palette.map((x, idx) => (idx === i ? hex : x)))
                }
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0"
                aria-label={`Remove color ${i + 1}`}
                disabled={palette.length <= 1}
                onClick={() =>
                  setPalette(palette.filter((_, idx) => idx !== i))
                }>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="#RRGGBB"
          value={input}
          spellCheck={false}
          disabled={isFull}
          className="h-10 font-mono text-sm"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <Button
          variant="outline"
          className="h-10 gap-1.5"
          disabled={!newHex || isFull}
          onClick={add}>
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  );
}
