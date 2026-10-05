"use client";

import { useState } from "react";
import { Check, TriangleAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/Public/Tools/CodeBlock";
import { RadiusInputs, MAX_RADIUS } from "./RadiusInput";
import { RadiusPreview } from "./RadiusPreview";

export function BorderRadiusCalculator() {
  const [parentRadius, setParentRadius] = useState(24);
  const [padding, setPadding] = useState(12);
  const [childRadius, setChildRadius] = useState(12);

  // Rumus: radius dalam = radius luar - jarak (padding) antar kedua sisi
  const suggestedChild = Math.max(0, parentRadius - padding);
  const suggestedParent = Math.min(MAX_RADIUS, childRadius + padding);

  const isHarmonious = childRadius === suggestedChild;

  const css = `.parent {\n  padding: ${padding}px;\n  border-radius: ${parentRadius}px;\n}\n\n.child {\n  border-radius: ${childRadius}px;\n}`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <RadiusInputs
              id="parentRadius"
              label="Parent radius (px)"
              value={parentRadius}
              onChange={setParentRadius}
            />
            <RadiusInputs
              id="padding"
              label="Inner padding (px)"
              value={padding}
              onChange={setPadding}
            />
            <RadiusInputs
              id="childRadius"
              label="Child radius (px)"
              value={childRadius}
              onChange={setChildRadius}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Suggested values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border bg-muted/40 p-3">
                <div className="text-xs text-muted-foreground">Child</div>
                <div className="text-lg font-medium">{suggestedChild} px</div>
              </div>
              <div className="rounded-xl border bg-muted/40 p-3">
                <div className="text-xs text-muted-foreground">Parent</div>
                <div className="text-lg font-medium">{suggestedParent} px</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                disabled={isHarmonious}
                onClick={() => setChildRadius(suggestedChild)}
              >
                Adjust child
              </Button>
              <Button
                variant="outline"
                onClick={() => setParentRadius(suggestedParent)}
              >
                Adjust parent
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadiusPreview
              parentRadius={parentRadius}
              padding={padding}
              childRadius={childRadius}
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isHarmonious ? (
                <>
                  <Check className="h-4 w-4" />
                  Curves are harmonious.
                </>
              ) : (
                <>
                  <TriangleAlert className="h-4 w-4" />
                  Child radius should be {suggestedChild}px to match the parent.
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Generated CSS</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock label="CSS" code={css} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
