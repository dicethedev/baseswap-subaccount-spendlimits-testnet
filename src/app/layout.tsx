import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookieToInitialState } from "wagmi";
import { Providers } from "./providers";
import getConfig from "next/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BaseSwap - Seamless Token Transfers & Swaps",
  description:
    "BaseSwap - Seamless token transfers and swaps without approval popups, powered by Base Smart Wallet Sub Accounts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const initialState = cookieToInitialState(
    getConfig(),
    headersList.get("cookie")
  );
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
