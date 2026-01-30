"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "./JsonEditor";
import { DiffResult } from "./DiffResult";
import { useJsonDiff } from "./useJsonDiff";
import {
  highlightDiff,
  highlightSingleDiffByPath,
} from "@/lib/monacoHighlight";

import * as monaco from "monaco-editor";

export function JsonDiffContainer() {
  const { left, right, diffs, error, setLeft, setRight, runDiff } =
    useJsonDiff();

  const leftEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null,
  );
  const rightEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null,
  );
  // const leftDecorations = useRef<string[]>([]);
  // const rightDecorations = useRef<string[]>([]);
  const leftBaseDecorations = useRef<string[]>([]);
  const rightBaseDecorations = useRef<string[]>([]);
  const leftActiveDecorations = useRef<string[]>([]);
  const rightActiveDecorations = useRef<string[]>([]);

  // 🔴 ERROR HIGHLIGHT
  useEffect(() => {
    if (!error) return;

    const editor =
      error.side === "left" ? leftEditorRef.current : rightEditorRef.current;
    if (!editor) return;

    const model = editor.getModel();
    if (!model) return;

    editor.deltaDecorations(
      [],
      [
        {
          range: model.getFullModelRange(),
          options: {
            isWholeLine: true,
            className: "json-error-line",
          },
        },
      ],
    );
  }, [error]);

  // 🟡 DIFF HIGHLIGHT
  useEffect(() => {
    if (!diffs.length || error) return;

    if (leftEditorRef.current) {
      leftBaseDecorations.current = highlightDiff(
        leftEditorRef.current,
        diffs,
        "left",
      );
    }

    if (rightEditorRef.current) {
      rightBaseDecorations.current = highlightDiff(
        rightEditorRef.current,
        diffs,
        "right",
      );
    }
  }, [diffs, error]);

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-3 gap-4">
        <JsonEditor
          value={left}
          onChange={setLeft}
          onMount={(editor) => (leftEditorRef.current = editor)}
        />

        <JsonEditor
          value={right}
          onChange={setRight}
          onMount={(editor) => (rightEditorRef.current = editor)}
        />

        <DiffResult
          diffs={diffs}
          onSelectDiff={(diff) => {
            if (leftEditorRef.current) {
              highlightSingleDiffByPath(
                leftEditorRef.current,
                diff.path,
                leftActiveDecorations,
              );
            }

            if (rightEditorRef.current) {
              highlightSingleDiffByPath(
                rightEditorRef.current,
                diff.path,
                rightActiveDecorations,
              );
            }
          }}
        />
      </div>
      <Button onClick={runDiff}>Perform diff</Button>
    </div>
  );
}
