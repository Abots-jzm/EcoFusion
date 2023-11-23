import Providers from "@/context/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { cookies } from "next/headers";

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
  const theme = cookies().get("theme")?.value as "dark" | "light" | undefined;

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <body
        className={`${quicksand.className} transition-colors dark:bg-charcoal dark:text-lightGray`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
