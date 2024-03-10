import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CJ's Burrito",
  description: "The best burrito in town",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col items-center p-4 gap-4">
          <Header />
          <Separator className="h-[2px]" />
          {children}
        </main>
      </body>
    </html>
  );
}
