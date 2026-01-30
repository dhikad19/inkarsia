import { JsonDiffContainer } from "@/components/Public/Tools/JSON/diff/JsonDiffContainer";

export default function Page() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4">JSON Diff Viewer</h1>
      <JsonDiffContainer />
    </div>
  );
}
