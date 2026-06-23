import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import adoptersMark from "@/assets/adopters-mark.png";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Adopters AI",
  description: "Enterprise AI systems, platforms, and operations.",
  icons: {
    icon: adoptersMark.src,
    shortcut: adoptersMark.src,
    apple: adoptersMark.src,
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
