import { cn } from "@/lib/utils";

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: Props<T>) {
  return (
    <div
      className={cn("inline-flex rounded-xl border bg-muted p-1", className)}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex-1 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
            value === opt.value
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
