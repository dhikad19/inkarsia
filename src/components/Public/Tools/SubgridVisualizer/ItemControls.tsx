"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SelectedItemControls() {
  return (
    <div className="p-4 border rounded-lg space-y-2">
      <h2 className="font-semibold">Selected Item Controls</h2>
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Grid Column Span" />
        <Input placeholder="Grid Row Span" />
      </div>
      <div className="flex gap-2">
        <Button variant="default">Disable Subgrid</Button>
        <Button variant="destructive">Remove Item</Button>
      </div>
    </div>
  );
}
