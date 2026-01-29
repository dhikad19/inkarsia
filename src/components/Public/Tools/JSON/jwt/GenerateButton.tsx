import { Button } from "@/components/ui/button";

interface Props {
  onGenerate: () => void;
}

export function GenerateButton({ onGenerate }: Props) {
  return (
    <Button className="w-full" onClick={onGenerate}>
      Generate Secure Key
    </Button>
  );
}
