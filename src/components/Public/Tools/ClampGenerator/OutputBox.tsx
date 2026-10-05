"use client";

import CodeBlock from "@/components/Public/Tools/CodeBlock";

export default function OutputBox({ css }: { css: string | null }) {
  if (!css) {
    return (
      <p className="text-sm text-muted-foreground">
        Fix the settings to generate CSS.
      </p>
    );
  }
  return <CodeBlock label="CSS" code={css} />;
}
