import { Inter } from "next/font/google";
import Providers from "../providers";
import Header from "@/components/Public/Navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <Providers>
          <Header />
          <main className="mx-auto p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
