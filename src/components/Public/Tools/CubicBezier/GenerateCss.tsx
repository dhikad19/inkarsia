"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CodeBlock from "@/components/Public/Tools/CodeBlock";
import { buildCss } from "./utils";

type Props = { bezier: string; duration: number };

export default function GeneratedCSS({ bezier, duration }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated CSS</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock label="CSS" code={buildCss(bezier, duration)} />
      </CardContent>
    </Card>
  );
}
