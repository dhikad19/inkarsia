import "./globals.css";
import { Inter } from "next/font/google";
import { OneSignalInit } from "@/components/OneSignalInit"; // Pastikan path-nya sesuai

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async
        ></script>
      </head>
      <body className={inter.className}>
        <OneSignalInit />
        {children}
      </body>
    </html>
  );
}
