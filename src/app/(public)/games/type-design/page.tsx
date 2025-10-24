// app/page.tsx
import TypingGame from "@/components/Public/Games/TypeDesign/TypingGame";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">TypeRace — Demo</h1>
      <TypingGame />
    </div>
  );
}
