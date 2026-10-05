"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CodeBlock from "@/components/Public/Tools/CodeBlock";
import { buildCss, type GlassConfig } from "./utils";

export default function GeneratedCSS({ config }: { config: GlassConfig }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated CSS</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock label="CSS" code={buildCss(config)} />
      </CardContent>
    </Card>
  );
}
