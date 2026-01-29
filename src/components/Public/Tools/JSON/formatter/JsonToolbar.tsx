import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function JsonToolbar({
  onFormat,
  onMinify,
  onClear,
  onUpload,
  value,
}: {
  onFormat: () => void;
  onMinify: () => void;
  onClear: () => void;
  onUpload: (content: string) => void;
  value: string;
}) {
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpload(e.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={onFormat}>Format</Button>

      <Button variant="outline" onClick={onMinify}>
        Minify
      </Button>

      <Button
        variant="outline"
        onClick={() => navigator.clipboard.writeText(value)}
      >
        Copy Input
      </Button>

      <label>
        <input
          type="file"
          accept=".json,application/json"
          hidden
          onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
        />
        <Button variant="outline" asChild>
          <span>
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </span>
        </Button>
      </label>

      <Button variant="destructive" onClick={onClear}>
        Clear
      </Button>
    </div>
  );
}
