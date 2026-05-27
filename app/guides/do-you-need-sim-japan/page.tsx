import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";
import { LocalTip, RealityCheck } from "@/components/editorial/field-notes";

export const metadata: Metadata = {
  title: "Do You Need a SIM Card in Japan?",
  description:
    "Do you need a SIM in Japan? Yes for most trips: maps, trains, and payments get easier with data. When you can skip it, and how to pick eSIM or pocket WiFi.",
};

export default function DoYouNeedSimJapanPage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="guide-page-title"
        >
          Do You Need a SIM Card in Japan?
        </h1>
      }
      intro={
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            A lot of people ask if they need a SIM for Japan. The question sounds
            small, but it affects every day of the trip.
          </p>
          <p className="font-sans font-bold text-dark">
            In most cases, yes. You want your own data.
          </p>
        </div>
      }
      beforeComparison={
        <>
          <section className="mb-6">
            <h2 className="editorial-heading mb-4">
              Quick Answer
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-6 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Yes, you need internet in Japan
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use eSIM if your phone supports it
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                It affects maps, trains, payments
              </li>
            </ul>
            <RealityCheck noteId="do-you-need-sim-quick">
              <p>
                Free WiFi at hotels and stations is a backup, not a plan. Ticket
                gates, translation, and split groups all assume your phone can
                reach the internet when you need it.
              </p>
            </RealityCheck>
            <Link
              href="/guides/sim-card-japan"
              className="editorial-chevron-cta inline-flex rounded-lg bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-8 py-4 hover:bg-rust transition-colors duration-150"
            >
              Compare SIM paths for your trip
            </Link>
            <ul className="article-body list-none space-y-3 pl-0 mt-6 max-w-2xl">
              <li>
                <Link
                  href="/guides/esim-vs-pocket-wifi-japan"
                  className="font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150"
                >
                  eSIM vs pocket WiFi →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/airalo-vs-ubigi-japan"
                  className="font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150"
                >
                  Airalo vs Ubigi →
                </Link>
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="editorial-heading mb-4">
              When You Need a SIM
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                First-time visitors
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Using maps
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Navigating trains
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Translating
              </li>
            </ul>
          </section>

          <LocalTip noteId="do-you-need-sim-patterns">
            <p>
              Locals still carry data everywhere. Visitors who try to &quot;save
              money&quot; by staying offline often burn more time asking staff to
              repeat directions than they save in yen.
            </p>
          </LocalTip>

          <section className="mb-6">
            <h2 className="editorial-heading mb-4">
              When You Might Not Need One
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Traveling with someone who has internet
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Using pocket WiFi
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Very short stays
              </li>
            </ul>
          </section>
        </>
      }
      afterComparison={
        <>
          <section className="mb-6">
            <h2 className="editorial-heading mb-4">
              Reality Check
            </h2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>You can survive without it.</p>
              <p>But it makes everything harder.</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="editorial-heading mb-4">
              Bottom Line
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-6 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Get a SIM
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Don&apos;t overthink it
              </li>
            </ul>
          </section>

          <NextStepGuides guideId="do-you-need-sim-japan" />

          <GuideEndCta
            parentHref="/guides/sim-card-japan"
            parentLabel="Best SIM card for Japan →"
          />
        </>
      }
    />
  );
}
