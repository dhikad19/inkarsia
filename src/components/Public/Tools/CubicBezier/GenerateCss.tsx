"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GeneratedCSS({ bezier, duration }: any) {
  const css = `
/* CSS Timing Function */
animation-timing-function: ${bezier};
transition-timing-function: ${bezier};

/* Example usage */
.element {
  transition: transform ${duration}s ${bezier};
}

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

.animated {
  animation: slide ${duration}s ${bezier} forwards;
}
`;

  const [copied, setCopied] = useState(false);

  return (
    <Card className="p-4">
      <Button
        onClick={() => {
          navigator.clipboard.writeText(css);
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
      >
        {copied ? "Copied!" : "Copy CSS"}
      </Button>
      <pre className="bg-black/40 text-sm p-3 mt-3 rounded">{css}</pre>
    </Card>
  );
}
