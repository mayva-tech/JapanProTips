import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Barlow, Roboto_Slab, Vollkorn } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { NavbarWithSearch } from "@/components/NavbarWithSearch";
import { ScrollDepthTracker } from "@/components/ScrollDepthTracker";
import { SoftExitCta } from "@/components/SoftExitCta";
import { BRAND_LOGO } from "@/lib/brand";
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

/** AoM: primary nav labels (bold caps slab serif) */
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-nav",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

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
  icons: {
    icon: BRAND_LOGO.src,
    apple: BRAND_LOGO.src,
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
        className={`${barlow.variable} ${vollkorn.variable} ${robotoSlab.variable} antialiased`}
      >
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <ScrollDepthTracker />
        </Suspense>
        <MicrosoftClarity />
        <NavbarWithSearch />
        {children}
        <SoftExitCta />
      </body>
    </html>
  );
}
