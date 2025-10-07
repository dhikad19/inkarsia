"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GeneratedCSS({ radius }: any) {
  const css = `
border-radius: ${radius.topLeft.x}% ${radius.topRight.x}% ${radius.bottomRight.x}% ${radius.bottomLeft.x}% /
                ${radius.topLeft.y}% ${radius.topRight.y}% ${radius.bottomRight.y}% ${radius.bottomLeft.y}%;
  `;

  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-3">Generated CSS</h3>
      <div className="flex gap-2 mb-3">
        <Button onClick={copy}>{copied ? "Copied!" : "Copy CSS"}</Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reset
        </Button>
      </div>
      <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
        {css}
      </pre>
    </div>
  );
}
