import { Inter } from "next/font/google";
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
    <div className={`${inter.className} min-h-screen`}>
      <Header />
      <main className="mx-auto px-4 sm:px-6 lg:px-20">{children}</main>
    </div>
  );
}
