import type { Metadata } from "next";
import { Suspense } from "react";
import { Barlow, Vollkorn } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { Navbar } from "@/components/Navbar";
import { ScrollDepthTracker } from "@/components/ScrollDepthTracker";
import { SoftExitCta } from "@/components/SoftExitCta";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

/** AoM: UI, nav, labels, buttons */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

/** AoM: article headings, body copy, deck */
const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${vollkorn.variable} antialiased`}
      >
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <ScrollDepthTracker />
        </Suspense>
        <MicrosoftClarity />
        <Navbar />
        {children}
        <SoftExitCta />
      </body>
    </html>
  );
}
