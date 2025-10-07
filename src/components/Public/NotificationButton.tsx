"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function SubscribeButton() {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "OneSignal" in window) {
      const checkSubscription = async () => {
        const isPushSupported = await OneSignal.isPushNotificationsSupported();
        if (!isPushSupported) {
          setIsSubscribed(null);
          return;
        }

        const isEnabled = await OneSignal.isPushNotificationsEnabled();
        setIsSubscribed(isEnabled);
      };

      OneSignal.push(function () {
        checkSubscription();
        OneSignal.on("subscriptionChange", function (isSubscribed) {
          setIsSubscribed(isSubscribed);
        });
      });
    }
  }, []);

  const handleSubscribe = async () => {
    if (typeof window !== "undefined" && "OneSignal" in window) {
      // Tampilkan popup slidedown OneSignal
      await OneSignal.showSlidedownPrompt();
    }
  };

  if (isSubscribed) {
    return null; // Sudah subscribe, sembunyikan tombol
  }

  return (
    <Button onClick={handleSubscribe} className="mt-4">
      Subscribe to Notifications
    </Button>
  );
}
