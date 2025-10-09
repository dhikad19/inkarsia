// components/aspect-ratio/GeneratedCSS.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Aspect = {
  ratio: string;
  decimal: number;
  percent: number;
  w: number;
  h: number;
};

export default function GeneratedCSS({ aspect }: { aspect?: Aspect }) {
  if (!aspect) {
    return (
      <div className="text-sm text-muted-foreground">
        Aspect ratio not available yet.
      </div>
    );
  }

  const cssModern = `.container { aspect-ratio: ${aspect.w} / ${aspect.h}; width: 100%; }`;
  const cssLegacy = `/* Legacy: padding-top trick */\n.aspect-box { position: relative; width: 100%; padding-top: ${aspect.percent}%; }\n.aspect-box > .content { position: absolute; inset: 0; }`;

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("CSS copied to clipboard");
    } catch {
      alert("Unable to copy");
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-xs text-muted-foreground">
        Modern aspect-ratio property
      </div>
      <pre className="bg-muted p-3 rounded text-sm overflow-auto">
        {cssModern}
      </pre>

      <div className="text-xs text-muted-foreground">Legacy compatible CSS</div>
      <pre className="bg-muted p-3 rounded text-sm overflow-auto">
        {cssLegacy}
      </pre>

      <div className="flex gap-2">
        <Button onClick={() => copy(cssModern)}>Copy Modern CSS</Button>
        <Button variant="outline" onClick={() => copy(cssLegacy)}>
          Copy Legacy CSS
        </Button>
      </div>
    </div>
  );
}
