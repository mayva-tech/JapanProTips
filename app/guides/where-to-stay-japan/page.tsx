import type { Metadata } from "next";
import { SiteBrandFooter } from "@/components/brand/SiteBrandFooter";
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
        <h1 className="guide-page-title">
          Where to Stay in Japan (Tokyo, Osaka, Kyoto)
        </h1>
      }
      intro={
        <div className="article-body space-y-4 lg:max-w-2xl">
          <p>
            Maps and neighborhood lists make this feel harder than it is. Pick a
            city, then pick an area near a strong station. That decision drives
            almost everything else.
          </p>
          <p>
            Tokyo, Osaka, and Kyoto each trade different strengths. The blocks
            below keep the decision practical, not brochure-driven.
          </p>
        </div>
      }
      beforeComparison={
        <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
          <WhereToStayArticleBeforeComparison />
        </div>
      }
      afterComparison={
        <>
          <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
            <WhereToStayArticleAfterComparison />
          </div>

          <NextStepGuides guideId="where-to-stay-japan" />

          <GuideEndCta
            parentHref="/guides/japan-itinerary"
            parentLabel="Japan trip itinerary →"
          />
          <SiteBrandFooter />
        </>
      }
    />
  );
}
