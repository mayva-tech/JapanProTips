import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedServicesBox } from "@/components/RecommendedServicesBox";
import { OperationalWarning, WhatPeopleMiss } from "@/components/editorial/field-notes";

export const metadata: Metadata = {
  title:
    "Money, Cards & Cash in Japan for First-Time Visitors",
  description:
    "Paying in Japan: how much cash to carry, credit cards, Suica and IC payments, 7-Eleven ATMs, and common tourist mistakes with yen and tap-to-pay.",
};

export default function MoneyPaymentsJapanPage() {
  return (
    <GuideArticleShell
      title={
        <h1 className="guide-page-title">
          Money, Cards, and Cash in Japan
        </h1>
      }
      intro={
        <div className="article-body space-y-4 lg:max-w-2xl">
          <p>
            Cash vs card in Japan confuses most first-time visitors. You do
            not need a complicated system. Once you know how locals and
            travelers actually pay, this is easy.
          </p>
        </div>
      }
      beforeComparison={
        <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
          <h2>Japan Is Not Fully Cashless</h2>
          <p className="article-body mb-3">
            Many places accept cards, but not all places do. Smaller
            restaurants, local shops, and some temples can still be cash-only.
          </p>
          <WhatPeopleMiss noteId="money-payments-cashless-myth">
            <p>
              &quot;Japan is cashless&quot; is only true in slices of city life.
              The gap shows up at small dinner spots, lockers, and rural transit
              machines, usually when you are already hungry or late.
            </p>
          </WhatPeopleMiss>

          <h2>What You Should Actually Bring</h2>
          <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
            <li>Credit/debit card (Visa/Mastercard preferred)</li>
            <li>Cash (yen)</li>
            <li>IC card (Suica / PASMO)</li>
          </ul>
          <p className="article-body mb-3">
            <strong className="font-sans font-bold text-dark">Card</strong>{" "}
            pays for hotels and big stores.
          </p>
          <p className="article-body mb-3">
            <strong className="font-sans font-bold text-dark">Cash</strong>{" "}
            covers small places, food spots, and tickets.
          </p>
          <p className="article-body mb-3 last:mb-0">
            <strong className="font-sans font-bold text-dark">IC card</strong>{" "}
            handles transport and small purchases quickly.
          </p>

          <RecommendedServicesBox serviceId="money-payments-japan" />

          <h2>How Much Cash You Need</h2>
          <p className="article-body mb-3 last:mb-0">
            Keep about ¥10,000-¥30,000 on hand for normal situations. That is
            enough for most days. You can withdraw more anytime.
          </p>

          <h2>Where to Withdraw Cash</h2>
          <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
            <li>7-Eleven ATMs are usually the most reliable.</li>
            <li>Japan Post ATMs are another strong option.</li>
            <li>Both usually accept foreign cards and provide English menus.</li>
          </ul>
          <OperationalWarning noteId="money-payments-atm-hours">
            <p>
              Post office ATMs can close with the branch. Test your card at a
              7-Eleven ATM on day one, not after dinner when the only open option
              is a machine that does not like your PIN format.
            </p>
          </OperationalWarning>
        </div>
      }
      afterComparison={
        <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
          <h2>Using Cards in Japan</h2>
          <p className="article-body mb-3">
            Cards usually work in hotels, department stores, and chain
            restaurants.
          </p>
          <p className="article-body mb-3">
            Cards can fail in small local shops and older establishments.
          </p>
          <p className="article-body mb-3 last:mb-0">
            Always carry backup cash.
          </p>

          <h2>IC Cards (Very Useful)</h2>
          <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
            <li>Trains</li>
            <li>Buses</li>
            <li>Convenience stores</li>
            <li>Vending machines</li>
          </ul>
          <p className="article-body mb-3">
            It is the fastest way to pay for small amounts.
          </p>
          <p className="article-body mb-3 last:mb-0">
            It is not a replacement for cash or card.
          </p>

          <h2>Common Mistakes</h2>
          <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
            <li>Bringing too little cash</li>
            <li>Assuming everywhere accepts cards</li>
            <li>Not using an IC card</li>
            <li>Exchanging too much money at the airport</li>
          </ul>

          <h2>Reality Check</h2>
          <p className="article-body mb-3">
            Japan payment setup is easy once you use all three: card, cash,
            and IC card.
          </p>
          <p className="article-body mb-3 last:mb-0">
            You do not need to optimize beyond that.
          </p>

          <h2>Bottom Line</h2>
          <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
            <li>Bring card and cash.</li>
            <li>Use an IC card daily.</li>
            <li>Withdraw when needed.</li>
          </ul>

          <NextStepGuides guideId="money-payments-japan" />

          <GuideEndCta
            parentHref="/guides/japan-itinerary"
            parentLabel="Japan trip itinerary →"
          />
        </div>
      }
    />
  );
}
