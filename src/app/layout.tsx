import Provider from "@/context/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoFusion | Homepage",
  description: "Ecommerce store by Abots",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
