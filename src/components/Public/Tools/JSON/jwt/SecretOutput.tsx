import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Copy, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  secret: string;
  reveal: boolean;
  onToggleReveal: () => void;
}

export function SecretOutput({ secret, reveal, onToggleReveal }: Props) {
  const masked = secret.slice(0, 6) + "••••••••••••••" + secret.slice(-4);

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {(secret.length / 2) * 8} bits • {secret.length} chars
        </p>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigator.clipboard.writeText(secret)}
          >
            <Copy className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={onToggleReveal}>
            {reveal ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <pre
        className={cn(
          "text-sm break-all rounded bg-muted p-3",
          !reveal && "select-none",
        )}
      >
        {reveal ? secret : masked}
      </pre>

      <div className="flex items-center gap-2 text-xs">
        <Switch checked={reveal} onCheckedChange={onToggleReveal} />
        <span>Reveal full secret (use cautiously)</span>
      </div>
    </div>
  );
}
