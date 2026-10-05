"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Check, Wand2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorPreview from "./ColorPreview";
import {
  CHECKS,
  contrastRatio,
  formatRatio,
  getLevel,
  normalizeHex,
  suggestText,
} from "./utils";

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setDraft(value), [value]);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-w-0 space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        {mounted ? (
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label={`${label} picker`}
            className="h-10 w-11 shrink-0 cursor-pointer rounded-md border bg-transparent p-1"
          />
        ) : (
          <div className="h-10 w-11 shrink-0 rounded-md border" />
        )}
        <Input
          value={draft}
          maxLength={7}
          spellCheck={false}
          className="h-10 min-w-0 font-mono text-sm"
          onChange={(e) => {
            setDraft(e.target.value);
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
      </div>
    </div>
  );
}

export default function ColorContrastChecker() {
  const [textColor, setTextColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#214469");

  const ratio = useMemo(
    () => contrastRatio(textColor, bgColor),
    [textColor, bgColor],
  );
  const passesAA = ratio >= 4.5;
  const suggestion = useMemo(
    () => (passesAA ? null : suggestText(textColor, bgColor)),
    [passesAA, textColor, bgColor],
  );

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
      <div className="min-w-0 space-y-6">
        <Card className="rounded-2xl">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Colors</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5"
              onClick={() => {
                setTextColor(bgColor);
                setBgColor(textColor);
              }}>
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Swap
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <ColorField
                label="Text"
                value={textColor}
                onChange={setTextColor}
              />
              <ColorField
                label="Background"
                value={bgColor}
                onChange={setBgColor}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl border bg-muted/40 p-5 text-center">
              <div className="text-5xl font-bold tabular-nums">
                {formatRatio(ratio)}
                <span className="text-2xl text-muted-foreground"> : 1</span>
              </div>
              <div className="mt-1 text-sm font-medium text-muted-foreground">
                {getLevel(ratio)}
              </div>
            </div>

            <ul className="divide-y rounded-xl border">
              {CHECKS.map((c) => {
                const pass = ratio >= c.min;
                return (
                  <li
                    key={`${c.level}-${c.label}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm">
                    <span className="w-10 shrink-0 text-xs font-semibold text-muted-foreground">
                      {c.level}
                    </span>
                    <span className="flex-1">{c.label}</span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {c.min}:1
                    </span>
                    <span
                      className={
                        pass
                          ? "flex items-center gap-1 text-sm font-medium"
                          : "flex items-center gap-1 text-sm text-muted-foreground"
                      }>
                      {pass ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      {pass ? "Pass" : "Fail"}
                    </span>
                  </li>
                );
              })}
            </ul>

            {!passesAA && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-muted/40 p-3">
                <p className="text-sm text-muted-foreground">
                  {suggestion
                    ? "Text color doesn't pass AA. A close match that does:"
                    : "No text color can pass AA on this background. Change the background."}
                </p>
                {suggestion && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => setTextColor(suggestion)}>
                    <span
                      className="h-4 w-4 rounded border"
                      style={{ background: suggestion }}
                    />
                    <span className="font-mono text-xs">{suggestion}</span>
                    <Wand2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="min-w-0 rounded-2xl lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle className="text-lg">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <ColorPreview textColor={textColor} bgColor={bgColor} />
        </CardContent>
      </Card>
    </div>
  );
}
