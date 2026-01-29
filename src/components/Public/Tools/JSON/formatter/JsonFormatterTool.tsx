"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJsonFormatter } from "./useJsonFormatter";
import { JsonInputEditor } from "./JsonInputEditor";
import { JsonToolbar } from "./JsonToolbar";
import { JsonOutputViewer } from "./JsonOutputViewer";

export function JsonFormatterTool() {
  const {
    input,
    setInput,
    output,
    setOutput,
    error,
    format,
    minify,
    clear,
    stats,
  } = useJsonFormatter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON Formatter & Validator</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Input JSON</h3>
        </div>

        <JsonInputEditor value={input} onChange={setInput} />

        <JsonToolbar
          onFormat={format}
          onMinify={minify}
          onClear={clear}
          onUpload={setInput}
          value={input}
        />

        {error && <p className="text-sm text-destructive">❌ {error}</p>}

        <JsonOutputViewer
          value={output}
          error={error ? { line: 1, message: error } : undefined}
          stats={stats}
        />
      </CardContent>
    </Card>
  );
}
