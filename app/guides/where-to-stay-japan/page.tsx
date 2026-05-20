import type { Metadata } from "next";
import Link from "next/link";
import {
  WhereToStayArticleAfterComparison,
  WhereToStayArticleBeforeComparison,
} from "@/components/guides/WhereToStayArticle";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";

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
          <p className="font-display text-rust text-2xl tracking-widest mb-8">
            START HERE ///
          </p>
          <h2
            className="font-display text-dark tracking-wide mb-8"
            style={{ fontSize: "clamp(32px, 4.5vw, 44px)" }}
          >
            {`3. Decide Where You're Staying`}
          </h2>
        </>
      }
      intro={
        <div className="article-body space-y-4 max-w-2xl">
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

          <NextStepGuides guideId="where-to-stay-japan" />

          <GuideEndCta
            parentHref="/guides/japan-itinerary"
            parentLabel="Japan trip itinerary →"
          />

          <div className="border-t border-tan pt-8 mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              JapanProTips homepage <span className="text-lg">‹‹‹</span>
            </Link>
          </div>
        </>
      }
    />
  );
}
