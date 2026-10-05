"use client";

import CodeBlock from "@/components/Public/Tools/CodeBlock";
import { Aspect } from "./utils";

export default function GeneratedCSS({ aspect }: { aspect: Aspect }) {
  const modern = `.container {\n  aspect-ratio: ${aspect.rw} / ${aspect.rh};\n  width: 100%;\n}`;

  const legacy = `.aspect-box {\n  position: relative;\n  width: 100%;\n  padding-top: ${aspect.percent}%;\n}\n.aspect-box > .content {\n  position: absolute;\n  inset: 0;\n}`;

  return (
    <div className="space-y-5">
      <CodeBlock label="Modern" code={modern} />
      <CodeBlock label="Legacy (padding-top)" code={legacy} />
    </div>
  );
}
