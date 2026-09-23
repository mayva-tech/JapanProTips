import type { Metadata } from "next";
import { KonbiniTrainerClient } from "@/features/japanese-learning/trainers/konbini/KonbiniTrainerClient";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/learn-japanese/konbini";
const CANONICAL = `${siteUrl()}${PATH}`;
const TITLE = "Konbini Japanese Trainer";
const description =
  "Practice practical Japanese used in convenience stores with polite and casual phrases, furigana, listening, and real-life scripts.";

export const metadata: Metadata = {
  title: TITLE,
  description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: TITLE,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description,
  },
};

export default function KonbiniTrainerPage() {
  return (
    <main className="min-h-screen bg-paper px-3 py-6 sm:py-10">
      <KonbiniTrainerClient />
    </main>
  );
}
