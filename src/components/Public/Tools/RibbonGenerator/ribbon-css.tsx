"use client";

import { generateRibbonCSS } from "@/lib/ribbon-utils";
import { RibbonConfig } from "./ribbon-types";
import { Button } from "@/components/ui/button";

export default function RibbonCSS({ config }: { config: RibbonConfig }) {
  const css = generateRibbonCSS(config);

  const copy = async () => {
    await navigator.clipboard.writeText(css);
  };

  return (
    <div className="space-y-3">
      <Button onClick={copy}>Copy CSS</Button>

      <pre className="p-4 rounded bg-muted text-sm overflow-auto">{css}</pre>
    </div>
  );
}
