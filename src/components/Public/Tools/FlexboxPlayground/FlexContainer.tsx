"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MAX_ITEMS, MIN_ITEMS, type FlexProperties } from "./utils";

type Props = {
  count: number;
  properties: FlexProperties;
  onAdd: () => void;
  onRemove: () => void;
  onReset: () => void;
};

export default function FlexContainer({
  count,
  properties,
  onAdd,
  onRemove,
  onReset,
}: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <CardTitle>Flex Container</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" onClick={onAdd} disabled={count >= MAX_ITEMS}>
            <Plus />
            Add
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onRemove}
            disabled={count <= MIN_ITEMS}>
            <Minus />
            Remove
          </Button>
          <Button size="sm" variant="ghost" onClick={onReset}>
            <RotateCcw />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="min-h-[240px] rounded-lg border border-dashed bg-muted/30 p-4"
          style={{ display: "flex", ...properties }}>
          {Array.from({ length: count }, (_, i) => (
            <div
              key={i}
              className="flex min-h-16 min-w-16 items-center justify-center rounded-lg bg-primary px-3 py-2 font-semibold text-primary-foreground">
              {i + 1}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
