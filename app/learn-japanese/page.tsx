import type { Metadata } from "next";
import Link from "next/link";
import { MagazinePageHeader } from "@/components/editorial/MagazinePageHeader";
import { MagazineShell } from "@/components/editorial/MagazineShell";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/learn-japanese";
const CANONICAL = `${siteUrl()}${PATH}`;
const TITLE = "Learn Japanese for Real Life in Japan";
const description =
  "Practical Japanese for daily life, travel, work, and JLPT study. Short interactive trainers with furigana, audio, and real phrases you will actually hear in Japan.";

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

/** Informational only. These become links as each trainer migrates. */
const COMING_LATER: string[] = [
  "JLPT Vocabulary & Grammar",
  "Pera Pera Quest",
  "Travel Japanese",
  "Phone Japanese",
  "Speech Styles",
];

export default function LearnJapanesePage() {
  return (
    <main className="min-h-screen bg-paper font-sans">
      <MagazinePageHeader
        kicker="Learn Japanese"
        title={TITLE}
        description="This section focuses on practical Japanese: the phrases you need for daily life, travel, and work in Japan, plus study tools for the JLPT. Each trainer uses real situations, furigana, and audio so you can listen and repeat."
      />

      <MagazineShell as="section" className="py-10 sm:py-14">
        <Link
          href="/learn-japanese/konbini"
          className="group editorial-card flex flex-col border border-maroon/30 bg-paper-card p-6 no-underline shadow-editorial ring-1 ring-maroon/15 sm:p-8 lg:max-w-3xl"
        >
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-maroon">
            Live
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold text-dark group-hover:text-maroon sm:text-3xl">
            Konbini Trainer
          </h2>
          <p className="article-body mt-3 text-muted">
            Practice common Japanese used in convenience stores, including
            polite and casual forms, listening, furigana, and real-life
            phrases.
          </p>
          <span className="editorial-chevron-cta mt-5 font-sans text-sm font-bold uppercase tracking-widest text-rust transition-colors group-hover:text-maroon">
            Start Konbini Trainer
          </span>
        </Link>

        <div className="mt-12 lg:max-w-3xl">
          <h2 className="editorial-kicker mb-3">Coming later</h2>
          <ul className="list-none space-y-2 p-0">
            {COMING_LATER.map((name) => (
              <li
                key={name}
                className="border-t border-paper-edge pt-2 font-sans text-base font-semibold text-muted first:border-t-0 first:pt-0"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </MagazineShell>
    </main>
  );
}
