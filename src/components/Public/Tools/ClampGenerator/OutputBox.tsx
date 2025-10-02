"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function OutputBox({ css }: { css: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card className="p-4 space-y-2">
      <div className="flex gap-2">
        <Button onClick={handleCopy}>{copied ? "Copied!" : "Copy CSS"}</Button>
        <Button variant="outline">Reset</Button>
      </div>
      <pre className="bg-black/30 p-2 rounded text-sm">{css}</pre>
    </Card>
  );
}
