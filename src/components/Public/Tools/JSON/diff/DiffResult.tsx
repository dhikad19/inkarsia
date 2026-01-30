import { useMemo, useRef, useState, useEffect } from "react";

import { DiffItem } from "@/lib/jsonDiff";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Props {
  diffs: DiffItem[];
  onSelectDiff?: (diff: DiffItem, index: number) => void;
}

export function DiffResult({ diffs, onSelectDiff }: Props) {
  const [showMissing, setShowMissing] = useState(true);
  const [showType, setShowType] = useState(true);
  const [showValue, setShowValue] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredDiffs = useMemo(() => {
    return diffs.filter((d) => {
      if (d.type === "missing" && !showMissing) return false;
      if (d.type === "type" && !showType) return false;
      if (d.type === "value" && !showValue) return false;
      return true;
    });
  }, [diffs, showMissing, showType, showValue]);

  const selectDiff = (index: number) => {
    setActiveIndex(index);
    onSelectDiff?.(filteredDiffs[index], index);
  };

  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeIndex]);

  const summary = useMemo(() => {
    return {
      added: diffs.filter((d) => d.type === "missing" && d.left === undefined)
        .length,
      removed: diffs.filter(
        (d) => d.type === "missing" && d.right === undefined,
      ).length,
      modified: diffs.filter((d) => d.type === "value" || d.type === "type")
        .length,
    };
  }, [diffs]);

  return (
    <div className="space-y-3 text-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-3 gap-4 rounded bg-muted p-3 text-center">
          <div>
            <div className="text-green-600 font-semibold">{summary.added}</div>
            <div className="text-xs text-muted-foreground">Added</div>
          </div>
          <div>
            <div className="text-red-600 font-semibold">{summary.removed}</div>
            <div className="text-xs text-muted-foreground">Removed</div>
          </div>
          <div>
            <div className="text-blue-600 font-semibold">
              {summary.modified}
            </div>
            <div className="text-xs text-muted-foreground">Modified</div>
          </div>
        </div>

        <div className="font-semibold">
          Found {filteredDiffs.length} differences
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            disabled={activeIndex <= 0}
            onClick={() => selectDiff(activeIndex - 1)}
          >
            {"<"}
          </Button>
          <span className="text-xs">
            {filteredDiffs.length ? activeIndex + 1 : 0} of{" "}
            {filteredDiffs.length}
          </span>
          <Button
            size="icon"
            variant="outline"
            disabled={activeIndex >= filteredDiffs.length - 1}
            onClick={() => selectDiff(activeIndex + 1)}
          >
            {">"}
          </Button>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1">
          <Checkbox
            checked={showMissing}
            onCheckedChange={(v) => setShowMissing(!!v)}
          />
          missing
        </label>
        <label className="flex items-center gap-1">
          <Checkbox
            checked={showType}
            onCheckedChange={(v) => setShowType(!!v)}
          />
          incorrect types
        </label>
        <label className="flex items-center gap-1">
          <Checkbox
            checked={showValue}
            onCheckedChange={(v) => setShowValue(!!v)}
          />
          unequal values
        </label>
      </div>

      {/* LIST */}
      <div className="space-y-1">
        {filteredDiffs.map((d, i) => (
          <div
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            onClick={() => selectDiff(i)}
            className={`rounded border p-3 transition cursor-pointer ${
              i === activeIndex
                ? "bg-blue-50 border-l-4 border-l-blue-500"
                : "hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  d.type === "missing"
                    ? "destructive"
                    : d.type === "type"
                      ? "secondary"
                      : "default"
                }
              >
                {d.type}
              </Badge>

              <span className="font-mono text-xs text-muted-foreground">
                {d.path}
              </span>
            </div>

            {/* BODY */}
            {d.type !== "missing" && (
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="rounded bg-red-50 p-2">
                  <div className="text-red-600 mb-1">- Old Value</div>
                  {JSON.stringify(d.left, null, 2)}
                </div>

                <div className="rounded bg-green-50 p-2">
                  <div className="text-green-600 mb-1">+ New Value</div>
                  {JSON.stringify(d.right, null, 2)}
                </div>
              </div>
            )}

            {d.type === "missing" && (
              <div className="text-xs text-muted-foreground">
                {d.left === undefined ? "+ Added" : "- Removed"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
