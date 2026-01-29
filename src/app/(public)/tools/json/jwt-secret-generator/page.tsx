import { JwtSecretGenerator } from "@/components/Public/Tools/JSON/jwt/JwtSecretGenerator";

export default function Page() {
  return (
    <main className="container py-10">
      <JwtSecretGenerator />
    </main>
  );
}
