import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title:
    "Best Part-Time Jobs in Japan for Foreigners",
  description:
    "Part-time work in Japan for foreigners: konbini, restaurants, English teaching, typical hourly pay bands, visa limits, and what employers actually check.",
};

export default function PartTimeJobsJapanGuidePage() {
  return (
    <GuideArticleShell
      showHotelConversion={false}
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          Best Part-Time Jobs in Japan for Foreigners
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Part-time work (アルバイト, baito) is how a lot of students and
            residents pay rent without burning their visa. The jobs below are the
            ones you actually see on town posters and job sites, not random “side
            hustle” ideas from abroad.
          </p>
          <p>
            Your visa type caps what you can do and how many hours you can work.
            This page is practical framing, not immigration legal advice. If the
            rule is unclear, ask your school coordinator or an immigration
            professional, not Reddit.
          </p>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-12 max-w-2xl">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Convenience store
          </h2>
          <div className="article-body space-y-4">
            <p>
              Lawson, 7-Eleven, FamilyMart, and the rest always need night and
              weekend coverage. Training is standardized. Japanese level can be
              lower than a restaurant kitchen if you are on stocking, cleaning, or
              delivery prep, but the register still expects keigo basics at many
              shops.
            </p>
            <p>
              Shifts are often 4 to 8 hours. You will learn trash rules, temp
              labels, and how to apologize on autopilot. It is boring work with
              predictable pay.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Restaurants
          </h2>
          <div className="article-body space-y-4">
            <p>
              Kitchen and hall staff hiring is constant in chains. Izakaya and
              ramen shops can be faster paced and noisier than konbini, with more
              physical work and tighter teamwork.
            </p>
            <p>
              Front hall roles need clearer spoken Japanese. Dishwashing and prep
              lines are more common entry points if your Japanese is still thin, but
              safety and speed expectations are real.
            </p>
            <p>
              Some kitchens push overtime culture. Read contract hours and break
              rules before you sign.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            English teaching
          </h2>
          <div className="article-body space-y-4">
            <p>
              Conversation cafes, eikaiwa chains, and private tutoring exist on a
              wide spectrum. Some roles want a degree plus teaching experience.
              Some want a native speaker who shows up on time and follows a script.
            </p>
            <p>
              Pay can beat konbini per hour when you land the right slot, but
              schedules are lumpier: peak evenings and weekends, prep time you do
              not always get paid for, contract types that are not “same as full
              teacher.”
            </p>
            <p>
              If you are on a student visa, check whether the employer category and
              hours fit your school rules, not only immigration hours.
            </p>
          </div>
        </section>
        </>
      }
      afterComparison={
        <>
        <section className="mb-12 max-w-2xl">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Expected pay
          </h2>
          <p className="article-body mb-4">
            Prefecture minimum wage sets the floor. Tokyo and other major cities sit
            higher than rural prefectures. Numbers below are rough hourly bands for
            typical baito, not overtime, not every shop.
          </p>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Convenience store:</span>{" "}
              often around ¥1,100 to ¥1,300 in Tokyo in the mid-2020s range, before
              late-night premiums where they apply.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Restaurant hall or kitchen:</span>{" "}
              often similar floor to konbini, sometimes a bit higher if the shop is
              desperate or late-night heavy.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">English conversation / eikaiwa baito:</span>{" "}
              often about ¥1,300 to ¥2,500 depending on brand, location, and whether
              the slot is peak time.
            </li>
          </ul>
          <p className="article-body mt-6">
            Always read the posted wage on the contract. If the shop pays “training
            hourly” below minimum for weeks, walk away.
          </p>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Requirements
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Visa:</span> permission
              to work, or a visa status that already includes work (check your
              card’s 資格外活動許可 for students).
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Japanese:</span> N3
              level conversation is a rough divider for customer-facing roles, not a
              law. Some kitchens hire lower. Register work needs phrases fast.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Bank account:</span>{" "}
              many employers pay transfer only. Sort{" "}
              <Link
                href="/guides/japan-bank-account"
                className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
              >
                banking
              </Link>{" "}
              before your first shift if you can.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Address and phone:</span>{" "}
              standard KYC. Move-in paperwork should match what you tell HR.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Health insurance:</span>{" "}
              you should already be enrolled in national or employee insurance as a
              mid-stay resident. Employers will ask.
            </li>
          </ul>
        </section>

        <section className="mb-12 max-w-2xl border border-[#d4c9b0] bg-white px-6 py-5">
          <p className="article-body-sm">
            If you are building life admin in parallel, the residents hub collects
            bank, bills, phone, and housing guides in one place.
          </p>
          <p className="mt-4">
            <Link
              href="/residents"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Residents hub →
            </Link>
          </p>
        </section>

        <GuideEndCta
          parentHref="/residents"
          parentLabel="Residents hub →"
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
