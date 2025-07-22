import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FontLoader from "@/components/FontLoader";
import FontStyles from "@/components/FontStyles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// Metadata export should NOT be in a file with 'use client'
export const metadata: Metadata = {
  title: "Cafe Pass",
  description: "Join our city-wide café passport program",
  icons: {
    icon: "/favicon.svg", // favicon displayed in browsers
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <FontLoader />
        <FontStyles />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}