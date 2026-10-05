"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ToolLayout from "@/components/Public/Tools/ToolLayout";
import FontSizeForm from "@/components/Public/Tools/ClampGenerator/FontSizeForm";
import OutputBox from "@/components/Public/Tools/ClampGenerator/OutputBox";
import PreviewText from "@/components/Public/Tools/ClampGenerator/PreviewText";
import {
  DEFAULTS,
  Params,
  generateClamp,
  getError,
} from "@/components/Public/Tools/ClampGenerator/utils";

export default function ClampGeneratorPage() {
  const [params, setParams] = useState<Params>(DEFAULTS);

  const error = useMemo(() => getError(params), [params]);
  const css = useMemo(
    () => (error ? null : generateClamp(params)),
    [params, error],
  );

  return (
    <ToolLayout
      title="Clamp Generator"
      description="Generate fluid font sizes with CSS clamp() that scale smoothly between two viewport widths.">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <Card className="min-w-0 rounded-2xl">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Settings</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5"
              onClick={() => setParams(DEFAULTS)}>
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </CardHeader>
          <CardContent>
            <FontSizeForm params={params} onChange={setParams} error={error} />
          </CardContent>
        </Card>

        <div className="min-w-0 space-y-6 lg:sticky lg:top-24">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Generated CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <OutputBox css={css} />
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <PreviewText params={params} disabled={!!error} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
