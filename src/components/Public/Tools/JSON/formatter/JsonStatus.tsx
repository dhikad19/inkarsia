import { Badge } from "@/components/ui/badge";

export function JsonStatus({
  valid,
  chars,
  lines,
  bytes,
}: {
  valid: boolean;
  chars: number;
  lines: number;
  bytes: number;
}) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <Badge variant={valid ? "default" : "destructive"}>
        {valid ? "Valid" : "Invalid"}
      </Badge>
      <span>{chars} chars</span>
      <span>{lines} lines</span>
      <span>{bytes} B</span>
    </div>
  );
}
