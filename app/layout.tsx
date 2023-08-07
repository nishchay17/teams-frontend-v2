import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teams",
  description: "Teams: Collaborate and build team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
