import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function BrowserInfo({
  browser,
}: {
  browser: { name: string; version: string; engine: string; platform: string };
}) {
  return (
    <Card>
      <CardContent className="p-4 grid grid-cols-2 sm:grid-cols-4 text-center gap-2">
        <div>
          <h3 className="font-semibold">Browser</h3>
          <p>{browser.name}</p>
        </div>
        <div>
          <h3 className="font-semibold">Version</h3>
          <p>{browser.version}</p>
        </div>
        <div>
          <h3 className="font-semibold">Engine</h3>
          <p>{browser.engine}</p>
        </div>
        <div>
          <h3 className="font-semibold">Platform</h3>
          <p>{browser.platform}</p>
        </div>
      </CardContent>
    </Card>
  );
}
