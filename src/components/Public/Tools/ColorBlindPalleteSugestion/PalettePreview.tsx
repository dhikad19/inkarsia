"use client";

import { useMemo } from "react";
import { Check, TriangleAlert } from "lucide-react";
import CodeBlock from "@/components/Public/Tools/CodeBlock";
import {
  SIMS,
  SIMILAR_BELOW,
  Sim,
  findSimilarPairs,
  simulate,
  toCssVars,
} from "./utils";

const BAR_WIDTHS = [92, 78, 66, 54, 44, 34, 26, 18];

function Strip({ title, colors }: { title: string; colors: string[] }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {colors.map((c, i) => (
          <div key={i} className="min-w-0 space-y-1">
            <div className="h-14 rounded-lg border" style={{ background: c }} />
            <div className="truncate text-center font-mono text-[10px] text-muted-foreground">
              {c}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PalettePreview({
  palette,
  name,
  sim,
}: {
  palette: string[];
  name: string;
  sim: Sim;
}) {
  const simulated = useMemo(
    () => palette.map((c) => simulate(c, sim)),
    [palette, sim],
  );
  const pairs = useMemo(() => findSimilarPairs(palette, sim), [palette, sim]);
  const simLabel = SIMS.find((s) => s.value === sim)?.label;

  return (
    <div className="space-y-6">
      <Strip title="Original" colors={palette} />
      {sim !== "normal" && (
        <Strip title={`As seen with ${simLabel}`} colors={simulated} />
      )}

      <div className="space-y-3">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Sample chart
        </div>
        <div className="space-y-2 rounded-xl border bg-muted/40 p-4">
          {simulated.map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-4 text-xs tabular-nums text-muted-foreground">
                {i + 1}
              </span>
              <div
                className="h-5 rounded"
                style={{ width: `${BAR_WIDTHS[i] ?? 20}%`, background: c }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {pairs.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4" />
            All colors are easy to tell apart
            {sim !== "normal" ? " in this simulation" : ""}.
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TriangleAlert className="h-4 w-4" />
              {pairs.length} pair{pairs.length > 1 ? "s" : ""} hard to tell
              apart (ΔE below {SIMILAR_BELOW})
            </div>
            <ul className="space-y-1.5">
              {pairs.map(({ i, j, de }) => (
                <li
                  key={`${i}-${j}`}
                  className="flex items-center gap-3 rounded-lg border bg-muted/40 px-3 py-2 text-sm">
                  <span className="flex -space-x-1">
                    <span
                      className="h-5 w-5 rounded-full border-2 border-background"
                      style={{ background: simulated[i] }}
                    />
                    <span
                      className="h-5 w-5 rounded-full border-2 border-background"
                      style={{ background: simulated[j] }}
                    />
                  </span>
                  <span>
                    Color {i + 1} and {j + 1}
                  </span>
                  <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                    ΔE {de.toFixed(1)}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <CodeBlock label="CSS variables" code={toCssVars(name, palette)} />
    </div>
  );
}
