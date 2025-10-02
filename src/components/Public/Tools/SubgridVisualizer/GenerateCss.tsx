"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  cols: string;
  rows: string;
  gap: number;
};

export default function GeneratedCSS({ cols, rows, gap }: Props) {
  const cssCode = `/* Parent Grid Container */
.parent {
  display: grid;
  grid-template-columns: ${cols};
  grid-template-rows: ${rows};
  gap: ${gap}px;
}`;

  return (
    <div className="p-4 border rounded-lg space-y-2">
      <h2 className="font-semibold">Generated CSS</h2>
      <Textarea value={cssCode} readOnly rows={10} />
      <div className="flex gap-2">
        <Button onClick={() => navigator.clipboard.writeText(cssCode)}>
          Copy CSS
        </Button>
        <Button variant="outline">Share Layout</Button>
      </div>
    </div>
  );
}
