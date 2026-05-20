import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedServicesBox } from "@/components/RecommendedServicesBox";

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
        <>
          <p className="font-display text-rust text-2xl tracking-widest mb-2">
            START HERE ///
          </p>
          <h1
            className="font-display text-dark tracking-wide leading-tight mb-8"
            style={{ fontSize: "clamp(32px, 4.5vw, 48px)" }}
          >
            4. Money, Cards, and Cash in Japan
          </h1>
        </>
      }
      intro={
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Cash vs card in Japan confuses most first-time visitors. You do
            not need a complicated system. Once you know how locals and
            travelers actually pay, this is easy.
          </p>
        </div>
      }
      beforeComparison={
        <div className="space-y-10 max-w-xl">
          <div>
            <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
              Japan Is Not Fully Cashless
            </h3>
            <p className="article-body">
              Many places accept cards, but not all places do. Smaller
              restaurants, local shops, and some temples can still be cash-only.
            </p>
          </div>

          <div>
            <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
              What You Should Actually Bring
            </h3>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-6">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Credit/debit card (Visa/Mastercard preferred)
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Cash (yen)
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                IC card (Suica / PASMO)
              </li>
            </ul>
            <p className="article-body mb-3">
              <strong className="font-sans font-bold text-dark">Card</strong>{" "}
              pays for hotels and big stores.
            </p>
            <p className="article-body mb-3">
              <strong className="font-sans font-bold text-dark">Cash</strong>{" "}
              covers small places, food spots, and tickets.
            </p>
            <p className="article-body">
              <strong className="font-sans font-bold text-dark">IC card</strong>{" "}
              handles transport and small purchases quickly.
            </p>
          </div>

          <RecommendedServicesBox serviceId="money-payments-japan" />

          <div>
            <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
              How Much Cash You Need
            </h3>
            <p className="article-body">
              Keep about ¥10,000-¥30,000 on hand for normal situations. That is
              enough for most days. You can withdraw more anytime.
            </p>
          </div>

          <div>
            <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
              Where to Withdraw Cash
            </h3>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                7-Eleven ATMs are usually the most reliable.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Japan Post ATMs are another strong option.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Both usually accept foreign cards and provide English menus.
              </li>
            </ul>
          </div>
        </div>
      }
      afterComparison={
        <div className="space-y-10 max-w-xl">
          <div>
            <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
              Using Cards in Japan
            </h3>
            <p className="article-body mb-3">
              Cards usually work in hotels, department stores, and chain
              restaurants.
            </p>
            <p className="article-body mb-3">
              Cards can fail in small local shops and older establishments.
            </p>
            <p className="article-body">
              Always carry backup cash.
            </p>
          </div>

          <div>
            <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
              IC Cards (Very Useful)
            </h3>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-4">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Trains
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Buses
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Convenience stores
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Vending machines
              </li>
            </ul>
            <p className="article-body mb-3">
              It is the fastest way to pay for small amounts.
            </p>
            <p className="article-body">
              It is not a replacement for cash or card.
            </p>
          </div>

          <div>
            <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
              Common Mistakes
            </h3>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Bringing too little cash
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Assuming everywhere accepts cards
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Not using an IC card
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Exchanging too much money at the airport
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
              Reality Check
            </h3>
            <p className="article-body mb-3">
              Japan payment setup is easy once you use all three: card, cash,
              and IC card.
            </p>
            <p className="article-body">
              You do not need to optimize beyond that.
            </p>
          </div>

          <div>
            <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
              Bottom Line
            </h3>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Bring card and cash.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use an IC card daily.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Withdraw when needed.
              </li>
            </ul>
          </div>

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
