import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  display: "swap",
});

// Explicit override wins; otherwise Vercel tells us the production domain at
// build time, so canonical/OG URLs are right without hardcoding a guess.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = `${profile.name} | Senior Data Scientist — Telemetry & Security`;
const description =
  "Senior Data Scientist building real-time anomaly detection and agentic AI over petabyte-scale telemetry across 100K+ distributed network elements. 8+ years across telecom, banking, and retail.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: profile.name, url: siteUrl }],
  keywords: [
    "Principal Data Scientist",
    "Senior Data Scientist",
    "anomaly detection",
    "telemetry",
    "cybersecurity",
    "machine learning",
    "agentic AI",
    "network intrusion detection",
    profile.name,
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${mono.variable} antialiased`}>
        {/* Scroll reveals are JS-driven; without JS everything stays visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}