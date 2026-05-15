import type { Metadata } from "next";
import Link from "next/link";
import {
  WhereToStayArticleAfterComparison,
  WhereToStayArticleBeforeComparison,
} from "@/components/guides/WhereToStayArticle";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title:
    "Where to Stay in Japan (Tokyo, Osaka, Kyoto): First-Time Guide",
  description:
    "Choose where to stay in Japan: Tokyo vs Osaka vs Kyoto, neighborhoods near major stations, airport access, and why location beats hotel stars for tourists.",
};

export default function WhereToStayJapanPage() {
  return (
    <GuideArticleShell
      showHotelConversion={false}
      title={
        <>
          <p className="font-display text-rust text-xl tracking-widest mb-8">
            START HERE ///
          </p>
          <h2
            className="font-display text-dark tracking-wide mb-8"
            style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            {`3. Decide Where You're Staying`}
          </h2>
        </>
      }
      intro={
        <div className="font-serif text-muted text-base leading-relaxed space-y-4 max-w-2xl">
          <p>
            Maps and neighborhood lists make this feel harder than it is. Pick a
            city, then pick an area near a strong station. That decision drives
            almost everything else.
          </p>
          <p>
            Tokyo, Osaka, and Kyoto each trade different strengths. The blocks below
            keep the decision practical, not brochure-driven.
          </p>
        </div>
      }
      beforeComparison={
        <section className="space-y-10 max-w-xl">
          <WhereToStayArticleBeforeComparison />
        </section>
      }
      afterComparison={
        <>
          <section className="space-y-10 max-w-xl">
            <WhereToStayArticleAfterComparison />
          </section>

          <GuideEndCta
            parentHref="/guides/japan-itinerary"
            parentLabel="Japan trip itinerary →"
          />

          <div className="border-t border-tan pt-8 mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              JapanProTips homepage <span className="text-base">‹‹‹</span>
            </Link>
          </div>
        </>
      }
    />
  );
}
