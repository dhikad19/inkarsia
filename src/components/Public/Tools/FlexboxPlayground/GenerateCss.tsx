"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CodeBlock from "@/components/Public/Tools/CodeBlock";
import { buildCss, type FlexProperties } from "./utils";

export default function GeneratedCSS({
  properties,
}: {
  properties: FlexProperties;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated CSS</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock label="CSS" code={buildCss(properties)} />
      </CardContent>
    </Card>
  );
}
