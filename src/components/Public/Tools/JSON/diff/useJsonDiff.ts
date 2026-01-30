import { useState } from "react";
import { diffJson, DiffItem } from "@/lib/jsonDiff";

export function useJsonDiff() {
  const [left, setLeft] = useState("{}");
  const [right, setRight] = useState("{}");
  const [diffs, setDiffs] = useState<DiffItem[]>([]);
  const [error, setError] = useState<{
    side: "left" | "right";
    message: string;
  } | null>(null);

  const formatJson = (value: string) => {
    const parsed = JSON.parse(value);
    return JSON.stringify(parsed, null, 2);
  };

  const runDiff = () => {
    try {
      setError(null);

      const formattedLeft = formatJson(left);
      const formattedRight = formatJson(right);

      setLeft(formattedLeft);
      setRight(formattedRight);

      const l = JSON.parse(formattedLeft);
      const r = JSON.parse(formattedRight);

      setDiffs(diffJson(l, r));
    } catch (e: any) {
      setDiffs([]);

      setError({
        side: e?.message?.includes("right") ? "right" : "left",
        message: "Invalid JSON format",
      });
    }
  };

  return {
    left,
    right,
    diffs,
    error,
    setLeft,
    setRight,
    runDiff,
  };
}
