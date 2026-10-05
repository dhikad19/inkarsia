"use client";

import { cn } from "@/lib/utils";
import { SIMS, Sim } from "./utils";

export default function SimulatorControls({
  sim,
  setSim,
}: {
  sim: Sim;
  setSim: (s: Sim) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {SIMS.map((s) => {
        const isActive = sim === s.value;
        return (
          <button
            key={s.value}
            type="button"
            onClick={() => setSim(s.value)}
            className={cn(
              "flex flex-col items-start rounded-xl border px-3 py-2.5 text-left transition-colors",
              isActive
                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                : "hover:bg-muted",
            )}>
            <span className="text-sm font-medium">{s.label}</span>
            <span
              className={cn(
                "text-xs",
                isActive ? "opacity-70" : "text-muted-foreground",
              )}>
              {s.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
