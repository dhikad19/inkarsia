"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { label: string; code: string };

export default function CodeBlock({ label, code }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard tidak tersedia */
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copy}
          className="h-7 gap-1.5 px-2 text-xs"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-xl bg-muted p-4 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
