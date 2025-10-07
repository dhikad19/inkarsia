import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function SupportSummary({
  supported,
  notSupported,
}: {
  supported: number;
  notSupported: number;
}) {
  return (
    <Card>
      <CardContent className="grid grid-cols-3 text-center p-4">
        <div>
          <p className="text-2xl font-bold text-green-500">{supported}</p>
          <p className="text-sm">Supported</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-500">{notSupported}</p>
          <p className="text-sm">Not Supported</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-500">{0}</p>
          <p className="text-sm">Partial</p>
        </div>
      </CardContent>
    </Card>
  );
}
