import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Feature } from "@/lib/features";

export default function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Card className="border-muted hover:border-primary transition">
      <CardContent className="p-3 flex justify-between items-center">
        <div>
          <h3 className="font-medium">{feature.name}</h3>
          <p className="text-xs text-muted-foreground">{feature.category}</p>
        </div>
        {feature.supported ? (
          <Check className="text-green-500" size={18} />
        ) : (
          <X className="text-red-500" size={18} />
        )}
      </CardContent>
    </Card>
  );
}
