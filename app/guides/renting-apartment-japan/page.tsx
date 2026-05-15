import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title:
    "Renting an Apartment in Japan (Key Money and Reality)",
  description:
    "Key money (reikin), guarantors, real initial costs, foreigner-friendly agencies, and mistakes that waste time when you rent in Japan.",
};

export default function RentingApartmentJapanGuidePage() {
  return (
    <GuideArticleShell
      showHotelConversion={false}
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          Renting an Apartment in Japan (Key Money and Reality)
        </h1>
      }
      intro={
        <div className="font-serif text-muted text-base leading-relaxed max-w-2xl space-y-4">
          <p>
            Japanese rental math is not “first month plus deposit.” It is a stack
            of named fees that can add up to several months of rent before you
            sleep in the room once.
          </p>
          <p>
            Key money is the item that shocks people first. Guarantor rules are
            the item that kills deals second. Read both before you fall in love
            with a floor plan.
          </p>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-12 max-w-2xl">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            Key money explanation
          </h2>
          <div className="font-serif text-muted text-base leading-relaxed space-y-4">
            <p>
              <span className="font-sans font-bold text-dark">Key money (礼金, reikin)</span>{" "}
              is a non-refundable payment to the landlord at signing. Think of it
              as a traditional entry fee, not a deposit you get back when you move
              out.
            </p>
            <p>
              One or two months of rent is a common range in many markets, but not
              every listing uses it. Some properties advertise zero reikin to
              compete. Always read the fee line item, not only the headline rent.
            </p>
            <p>
              Key money is separate from{" "}
              <span className="font-sans font-bold text-dark">敷金 (shikikin)</span>
              , the security deposit, which can be partly returned after move-out
              minus cleaning and damage adjustments.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            Guarantor system
          </h2>
          <div className="font-serif text-muted text-base leading-relaxed space-y-4">
            <p>
              Many leases want a{" "}
              <span className="font-sans font-bold text-dark">連帯保証人</span>, a
              person or company who pays if you default. If you do not have a
              salaried Japanese relative on standby, you usually use a{" "}
              <span className="font-sans font-bold text-dark">保証会社</span>{" "}
              (guarantor company). You pay an initial fee and often an annual
              renewal fee.
            </p>
            <p>
              Guarantor company rules vary by property. Some buildings only accept
              one approved vendor. That is not negotiable at the kitchen table.
              It is a checkbox on the listing.
            </p>
            <p>
              Weak income paperwork or short employment history pushes more risk
              onto the guarantor review. Expect more questions, not fewer, as a new
              foreign resident.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            Initial costs breakdown
          </h2>
          <p className="font-serif text-muted text-base leading-relaxed mb-4">
            Exact numbers depend on the listing. This is the usual stack you should
            mentally model before you celebrate a “cheap” rent.
          </p>
          <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              First month rent (often prorated if mid-month)
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Deposit (敷金), often one to two months
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Key money (礼金), often zero to two months when it exists
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Agency fee (仲介手数料), often roughly one month rent plus tax,
              within legal caps
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Fire insurance and lock replacement fees, sometimes small, sometimes
              not
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Guarantor company setup and renewal fees
            </li>
          </ul>
          <p className="font-serif text-muted text-base leading-relaxed mt-6">
            Running total of four to six months of rent in cash and transfer is not
            rare for a standard lease. Share houses and foreigner-focused operators
            often compress this stack. Read their PDF anyway.
          </p>
        </section>
        </>
      }
      afterComparison={
        <>
        <section className="mb-12 max-w-2xl">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            Foreigner-friendly agencies
          </h2>
          <div className="font-serif text-muted text-base leading-relaxed space-y-4">
            <p>
              Mainstream Japanese agencies can work if your Japanese is strong and
              your paperwork is boringly complete. Many new residents instead start
              with operators that specialize in English-facing leases or share
              housing with simple move-in paths.
            </p>
            <p>
              <span className="font-sans font-bold text-dark">Sakura House</span>{" "}
              and{" "}
              <span className="font-sans font-bold text-dark">Oakhouse</span> are
              two names people actually use in Tokyo when they want fewer landlord
              guessing games early on. They are not the only options. They are
              examples of the category “built for foreigners, priced for
              convenience.”
            </p>
            <p>
              <a
                href="https://www.sakura-house.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Sakura House (external) →
              </a>
            </p>
            <p>
              <a
                href="https://www.oakhouse.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Oakhouse (external) →
              </a>
            </p>
            <p>
              Bilingual real estate shops exist in big cities. Verify what fee
              stack they use before you treat “foreigner OK” as cheap.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            Mistakes to avoid
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Comparing headline rent without summing move-in costs
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Assuming “no key money” means cheap total. Other fees still bite
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Signing a contract you cannot read and hoping Google Translate
              matched legal terms
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Waiting until the last week before visa expiry to hunt housing
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Ignoring bank transfer timing: you need an account that can actually
              send large move-in amounts
            </li>
          </ul>
          <p className="font-serif text-muted text-base leading-relaxed mt-6">
            <Link
              href="/guides/japan-bank-account"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Open a bank account in Japan (guide) →
            </Link>
          </p>
        </section>

        <section className="mb-12 max-w-2xl border border-[#d4c9b0] bg-white px-6 py-5">
          <p className="font-serif text-muted text-sm leading-relaxed">
            For a longer resident-focused version of this topic with the same tone,
            see the dedicated residents article linked below.
          </p>
          <p className="mt-4">
            <Link
              href="/residents/renting-apartment-japan"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Renting an apartment (residents hub article) →
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
