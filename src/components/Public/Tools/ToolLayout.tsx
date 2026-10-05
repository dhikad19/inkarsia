import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function ToolLayout({ title, description, children }: Props) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div className="space-y-3">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All tools
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
