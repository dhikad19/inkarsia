"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BrowserInfo from "@/components/Public/Tools/FeatureDetection/BrowserInfo";
import SupportSummary from "@/components/Public/Tools/FeatureDetection/SupportSummary";
import FeatureSearchFilter from "@/components/Public/Tools/FeatureDetection/FeatureSerchFilter";
import FeatureList from "@/components/Public/Tools/FeatureDetection/FeatureList";
import { detectFeatures, Feature } from "@/lib/features";

export default function Page() {
  const [browser, setBrowser] = useState({
    name: "",
    version: "",
    engine: "",
    platform: "",
  });
  const [features, setFeatures] = useState<Feature[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "css" | "js" | "supported" | "notSupported"
  >("all");

  useEffect(() => {
    // detect browser info
    const ua = navigator.userAgent;
    const browserName = ua.includes("Chrome")
      ? "Chrome"
      : ua.includes("Firefox")
      ? "Firefox"
      : "Other";
    const version = (ua.match(/Chrome\/(\d+)/) || [])[1] || "Unknown";
    const engine = "Blink";
    const platform = navigator.platform;

    setBrowser({ name: browserName, version, engine, platform });
    setFeatures(detectFeatures());
  }, []);

  const supported = features.filter((f) => f.supported).length;
  const notSupported = features.filter((f) => !f.supported).length;

  return (
    <main className="min-h-screen bg-background p-6 flex flex-col gap-6">
      <Card className="max-w-5xl mx-auto">
        <CardContent className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-center">Feature Detection</h1>
          <p className="text-center text-muted-foreground">
            Check your browser's support for modern CSS and JavaScript features
            in real-time.
          </p>

          <BrowserInfo browser={browser} />
          <SupportSummary supported={supported} notSupported={notSupported} />
          <FeatureSearchFilter
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />
          <FeatureList features={features} search={search} filter={filter} />
        </CardContent>
      </Card>
    </main>
  );
}
