"use client";

import { useEffect } from "react";

export function OneSignalInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.OneSignal = window.OneSignal || [];
      OneSignal.push(function () {
        OneSignal.init({
          appId: "6f2f4f8d-4150-4df9-b621-6d81576fde69",
          autoRegister: false, // jangan auto izin
          notifyButton: {
            enable: false,
          },
          promptOptions: {
            slidedown: {
              enabled: false, // cegah muncul otomatis
            },
          },
        });
      });
    }
  }, []);

  return null;
}
