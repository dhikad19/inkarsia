"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateJwtSecret } from "@/lib/jwtSecret";

import { SecretStrengthSelector } from "./SecretStrengthSelector";
import { GenerateButton } from "./GenerateButton";
import { SecretOutput } from "./SecretOutput";
import { SecretPreset } from "./types";

const PRESETS: SecretPreset[] = [
  { label: "128-bit", bytes: 16 },
  { label: "256-bit", bytes: 32 },
  { label: "384-bit", bytes: 48 },
  { label: "512-bit", bytes: 64 },
];

export function JwtSecretGenerator() {
  const [bytes, setBytes] = useState(32);
  const [secret, setSecret] = useState("");
  const [reveal, setReveal] = useState(false);

  const generate = () => {
    setSecret(generateJwtSecret(bytes));
    setReveal(false);
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          JWT Secret Generator
          <Badge variant="secondary">Frontend-safe</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <SecretStrengthSelector
          presets={PRESETS}
          value={bytes}
          onChange={setBytes}
        />

        <GenerateButton onGenerate={generate} />

        {secret && (
          <SecretOutput
            secret={secret}
            reveal={reveal}
            onToggleReveal={() => setReveal((v) => !v)}
          />
        )}
      </CardContent>
    </Card>
  );
}
