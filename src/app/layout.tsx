import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Placeholder faces until Ellie confirms the exact display grotesque + mono.
// Swap these two imports and the site updates everywhere.
const display = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display-src",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono-src",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ellieparsonagedesign.com";
const DESCRIPTION =
  "Ellie Parsonage is a graphic designer working across branding, album artwork and campaigns. Selected work, 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ellie Parsonage, Design Portfolio",
    template: "%s, Ellie Parsonage",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Ellie Parsonage, Design Portfolio",
    description: DESCRIPTION,
    siteName: "Ellie Parsonage",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ellie Parsonage, Design Portfolio",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0000ff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
