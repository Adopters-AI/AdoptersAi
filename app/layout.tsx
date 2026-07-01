import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import adoptersMark from "@/assets/adopters-mark.png";
import { PageTransition } from "@/components/page-transition";
import { LocaleProvider } from "@/components/use-persistent-locale";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins-raw",
  display: "swap"
});

const almaraiOriginal = localFont({
  src: [
    { path: "../assets/fonts/almarai-original/Almarai-Light.ttf", weight: "300", style: "normal" },
    { path: "../assets/fonts/almarai-original/Almarai-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/almarai-original/Almarai-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/fonts/almarai-original/Almarai-ExtraBold.ttf", weight: "800", style: "normal" }
  ],
  variable: "--font-almarai-original",
  display: "swap"
});

const almarai = localFont({
  src: [
    { path: "../assets/fonts/almarai-patched/AlmaraiPatched-Light.ttf", weight: "300", style: "normal" },
    { path: "../assets/fonts/almarai-patched/AlmaraiPatched-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/almarai-patched/AlmaraiPatched-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/fonts/almarai-patched/AlmaraiPatched-ExtraBold.ttf", weight: "800", style: "normal" }
  ],
  variable: "--font-almarai",
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
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${almaraiOriginal.variable} ${almarai.variable}`} suppressHydrationWarning>
      <body>
        <LocaleProvider>
          <PageTransition>{children}</PageTransition>
        </LocaleProvider>
      </body>
    </html>
  );
}
