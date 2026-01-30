import * as monaco from "monaco-editor";
import { DiffItem } from "./jsonDiff";

export function highlightDiff(
  editor: monaco.editor.IStandaloneCodeEditor,
  diffs: DiffItem[],
  type: "left" | "right",
) {
  const model = editor.getModel();
  if (!model) return [];

  const text = model.getValue();
  const decorations: monaco.editor.IModelDeltaDecoration[] = [];

  diffs.forEach((d) => {
    const key = d.path.split(".").pop();
    if (!key) return;

    // Skip jika diff hanya ada di sisi lain
    if (type === "left" && d.left === undefined) return;
    if (type === "right" && d.right === undefined) return;

    const idx = text.indexOf(`"${key}"`);
    if (idx === -1) return;

    const pos = model.getPositionAt(idx);

    decorations.push({
      range: new monaco.Range(pos.lineNumber, 1, pos.lineNumber, 1),
      options: {
        isWholeLine: true,
        className:
          d.type === "missing"
            ? "json-missing"
            : d.type === "type"
              ? "json-type"
              : "json-diff",
      },
    });
  });

  return editor.deltaDecorations([], decorations);
}

export function highlightSingleDiffByPath(
  editor: monaco.editor.IStandaloneCodeEditor,
  path: string,
  activeDecorations: React.MutableRefObject<string[]>,
) {
  const model = editor.getModel();
  if (!model) return;

  const key = path.split(".").pop();
  if (!key) return;

  const text = model.getValue();
  const idx = text.indexOf(`"${key}"`);
  if (idx === -1) return;

  const pos = model.getPositionAt(idx);

  activeDecorations.current = editor.deltaDecorations(
    activeDecorations.current,
    [
      {
        range: new monaco.Range(
          pos.lineNumber,
          1,
          pos.lineNumber,
          model.getLineMaxColumn(pos.lineNumber),
        ),
        options: {
          isWholeLine: true,
          className: "json-diff-active",
        },
      },
    ],
  );

  editor.revealLineInCenter(pos.lineNumber);
}
