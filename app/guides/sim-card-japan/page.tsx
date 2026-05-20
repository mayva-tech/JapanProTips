import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { RecommendedGearBox } from "@/components/RecommendedGearBox";
import { resolveAffiliateLink } from "@/lib/affiliate-links";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedServicesBox } from "@/components/RecommendedServicesBox";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedOutboundSimLink } from "@/components/TrackedOutboundSimLink";

export const metadata: Metadata = {
  title:
    "Best SIM Card for Japan (2026) – eSIM vs Pocket WiFi (What Actually Works)",
  description:
    "Choosing a SIM for Japan? Here\u2019s what actually works. eSIM, pocket WiFi, and physical SIM compared with real recommendations for your trip.",
};

const AIRALO_URL = "https://www.airalo.com/";
const UBIGI_URL = "https://www.ubigi.com/";

const productCtaClass =
  "font-sans font-bold text-rust text-base tracking-wide hover:text-maroon transition-colors duration-150 border-b-2 border-rust hover:border-maroon pb-0.5";

export default function SimCardJapanGuidePage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      maxWidthClass="max-w-4xl"
      title={
        <>
          <p className="font-display text-rust text-2xl tracking-widest mb-2">
            TRIP PREP ///
          </p>
          <h1
            className="guide-page-title"
          >
            BEST SIM CARD FOR JAPAN (2026)
            <br />
            <span className="text-rust">NO BS GUIDE</span>
          </h1>
        </>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Most SIM card guides for Japan are outdated, overly complicated, or
            quietly sponsored.
          </p>
          <p className="article-body">
            Most people overcomplicate this. You don&apos;t need to.
          </p>
          <p className="text-dark font-sans font-bold">
            This one is simple: what actually works, what to avoid, and what to
            buy depending on your trip.
          </p>
          <p>
            Tested across Tokyo, Osaka, and rural areas.
          </p>
          <p className="font-sans text-muted text-sm font-bold tracking-widest uppercase pt-1">
            Independent. Engineer based in Japan—not a travel agency.
          </p>
        </div>
      }
      beforeComparison={
        <>
        <div className="border-t-2 border-dark mb-10" />

        <RecommendedGearBox
          title="Recommended gear for staying connected in Japan"
          intro="These are practical items that solve common problems travelers run into with phones, data setup, and long days on transit."
          items={[
            {
              name: "eSIM-compatible phone (check before you fly)",
              reason:
                "Most smooth data setup starts with a phone that supports eSIM and is unlocked for travel.",
              linkId: "gear-esim-phone-check",
              href: resolveAffiliateLink("gear-esim-phone-check"),
            },
            {
              name: "Portable power bank",
              reason:
                "Navigation, QR tickets, and translation apps drain battery faster than at home.",
              linkId: "gear-portable-power-bank",
              href: resolveAffiliateLink("gear-portable-power-bank"),
            },
            {
              name: "Phone crossbody strap or lanyard",
              reason:
                "Keeps your phone secure when both hands are on luggage and ticket gates.",
              linkId: "gear-phone-strap",
              href: resolveAffiliateLink("gear-phone-strap"),
            },
            {
              name: "Spare charging cable",
              reason:
                "Borrowed hotel cables fail at the worst time. A short backup cable fits any bag.",
              linkId: "gear-spare-charging-cable",
              href: resolveAffiliateLink("gear-spare-charging-cable"),
            },
            {
              name: "Waterproof phone pouch",
              reason:
                "Rainy season and sudden showers are common. A pouch protects maps when umbrellas fail.",
              linkId: "gear-waterproof-phone-pouch",
              href: resolveAffiliateLink("gear-waterproof-phone-pouch"),
            },
          ]}
        />

        <section className="mb-12 max-w-2xl">
          <h2
            className="font-display text-dark tracking-wide mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            More connectivity guides
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li>
              <Link
                href="/guides/esim-vs-pocket-wifi-japan"
                className="font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150"
              >
                eSIM vs pocket WiFi in Japan →
              </Link>
            </li>
            <li>
              <Link
                href="/guides/airalo-vs-ubigi-japan"
                className="font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150"
              >
                Airalo vs Ubigi for Japan →
              </Link>
            </li>
            <li>
              <Link
                href="/residents/japan-mobile-phone-plans"
                className="font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150"
              >
                Phone plans for residents (Rakuten, UQ, IIJmio) →
              </Link>
            </li>
            <li>
              <Link
                href="/guides/do-you-need-sim-japan"
                className="font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150"
              >
                Do you need a SIM in Japan? →
              </Link>
            </li>
          </ul>
        </section>

        {/* Quick Answer */}
        <section className="mb-12 max-w-2xl">
          <h2
            className="font-display text-dark tracking-wide mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Best SIM for Japan (Quick Answer)
          </h2>
          <p className="font-serif text-muted mb-4">
            If you just want the answer:
          </p>
          <div className="bg-white border border-[#d4c9b0] p-6 font-serif text-muted text-lg space-y-2">
            <p>
              <span className="font-sans font-bold text-dark">Best overall:</span>{" "}
              Airalo eSIM
            </p>
            <p>
              <span className="font-sans font-bold text-dark">
                Best for short trips (3–7 days):
              </span>{" "}
              eSIM (Airalo or Ubigi)
            </p>
            <p>
              <span className="font-sans font-bold text-dark">
                Best for longer stays (2+ weeks):
              </span>{" "}
              Physical SIM with high data cap
            </p>
            <p>
              <span className="font-sans font-bold text-dark">Avoid:</span>{" "}
              Buying at the airport unless you have no other choice
            </p>
          </div>
          <p className="font-sans font-bold text-dark mt-6">
            If your phone supports eSIM, this is the simplest and best option. No
            reason to use anything else.
          </p>
          <p className="font-serif text-muted mt-6">
            If you want maps and trains working before you leave the airport, do
            this:
          </p>
          <p className="article-body-sm mt-2">
            This is easier to do before arrival.
          </p>
          <p className="article-body-sm text-sm text-muted/70 mt-2 mb-2">
            Based on real use in Japan.
          </p>
          <ul className="mt-3 space-y-3 list-none pl-0 font-serif text-muted">
            <li>
              <TrackedOutboundSimLink
                href={AIRALO_URL}
                className={productCtaClass}
              >
                Airalo eSIM →
              </TrackedOutboundSimLink>
            </li>
            <li>
              <TrackedOutboundSimLink
                href={UBIGI_URL}
                className={productCtaClass}
              >
                Ubigi eSIM →
              </TrackedOutboundSimLink>
            </li>
          </ul>
          <TrackedCtaLink
            href="/guides/airalo-vs-ubigi-japan"
            label="esim"
            className="inline-block font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150 mt-5"
          >
            Not sure between Airalo and Ubigi? Open the side-by-side guide →
          </TrackedCtaLink>
        </section>
        </>
      }
      afterComparison={
        <>
        <RecommendedServicesBox serviceId="sim-card-japan" />

        {/* Comparison */}
        <section className="mb-12">
          <h2
            className="font-display text-dark tracking-wide mb-6 max-w-2xl"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            COMPARISON (SIMPLE AND PRACTICAL)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse border border-[#d4c9b0] bg-white font-sans text-base text-dark">
              <thead>
                <tr className="border-b border-[#d4c9b0] bg-cream">
                  <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                    Option
                  </th>
                  <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                    Setup
                  </th>
                  <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                    Price
                  </th>
                  <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                    Speed
                  </th>
                  <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr className="border-b border-[#d4c9b0]">
                  <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                    eSIM
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    Instant
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">$$</td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    Fast
                  </td>
                  <td className="px-4 py-3">Most travelers</td>
                </tr>
                <tr className="border-b border-[#d4c9b0]">
                  <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                    Physical SIM
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    Delivery/pickup
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    $$–$$$
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    Fast
                  </td>
                  <td className="px-4 py-3">Longer stays</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                    Pocket WiFi
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    Pickup/return
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">$$$</td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    Very fast
                  </td>
                  <td className="px-4 py-3">Groups / multiple devices</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* What actually matters */}
        <section className="mb-12 max-w-2xl space-y-10">
          <h2
            className="font-display text-dark tracking-wide mb-2"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            What actually matters (ignore most blogs)
          </h2>
          <p className="article-body mb-3">
            You will rely on maps and trains constantly.
          </p>
          <Link
            href="/guides/japan-trains"
            className="inline-block font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150 mb-10"
          >
            Navigate Japan trains on day one →
          </Link>

          <div>
            <h3 className="font-sans font-bold text-dark text-lg mb-3">
              1. Does your phone support eSIM?
            </h3>
            <p className="article-body mb-2">
              If yes → use eSIM. No reason to complicate your life.
            </p>
            <p className="article-body">
              If no → physical SIM.
            </p>
          </div>

          <div>
            <h3 className="font-sans font-bold text-dark text-lg mb-3">
              2. &quot;Unlimited&quot; is usually not unlimited
            </h3>
            <p className="article-body mb-3">
              Most plans:
            </p>
            <ul className="font-serif text-muted list-none pl-0 space-y-2 mb-3">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Slow down after a certain amount
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Or limit daily usage
              </li>
            </ul>
            <p className="article-body mb-2">
              If you&apos;re:
            </p>
            <ul className="font-serif text-muted list-none pl-0 space-y-2 mb-3">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Watching videos
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Uploading content
              </li>
            </ul>
            <p className="font-sans font-bold text-dark">
              → get a higher data plan
            </p>
          </div>

          <div>
            <h3 className="font-sans font-bold text-dark text-lg mb-3">
              3. Airport SIMs are overpriced
            </h3>
            <p className="article-body mb-3">
              Convenient, yes. But:
            </p>
            <ul className="font-serif text-muted list-none pl-0 space-y-2 mb-3">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Limited options
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Higher price
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Staff may rush you
              </li>
            </ul>
            <p className="font-sans font-bold text-dark">
              Better: set everything up before your flight.
            </p>
            <p className="article-body mt-4 mb-2">
              Need help after landing?
            </p>
            <Link
              href="/guides/japan-airport-to-city"
              className="inline-block font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150"
            >
              From airport to hotel →
            </Link>
          </div>

          <div>
            <h3 className="font-sans font-bold text-dark text-lg mb-3">
              4. Coverage is generally good, but not perfect
            </h3>
            <p className="article-body mb-2">
              In cities: no issue
            </p>
            <p className="article-body mb-3">
              In rural areas: slower, sometimes weak
            </p>
            <p className="article-body mb-2">
              If your trip includes:
            </p>
            <ul className="font-serif text-muted list-none pl-0 space-y-2 mb-3">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Countryside
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Mountains
              </li>
            </ul>
            <p className="font-sans font-bold text-dark">
              → don&apos;t go ultra-cheap
            </p>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mb-12 max-w-2xl">
          <h2
            className="font-display text-dark tracking-wide mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            COMMON MISTAKES (AVOID THESE)
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Buying SIM at the airport without checking options
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Choosing the cheapest plan and running out of data
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Not checking if phone is unlocked
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Waiting until arrival to figure everything out
            </li>
          </ul>
        </section>

        {/* What you should do */}
        <section className="mb-12 max-w-2xl">
          <h2
            className="font-display text-dark tracking-wide mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            WHAT YOU SHOULD ACTUALLY DO
          </h2>
          <p className="article-body mb-4">
            If you are a normal traveler (most people):
          </p>
          <p className="font-sans font-bold text-dark mb-6">
            → Get an eSIM before your trip
          </p>
          <p className="article-body mb-4">
            If your phone doesn&apos;t support eSIM:
          </p>
          <p className="font-sans font-bold text-dark mb-6">
            → Order a physical SIM for delivery or pickup
          </p>
          <p className="article-body mb-4">
            If you are traveling as a group:
          </p>
          <p className="font-sans font-bold text-dark">
            → Consider Pocket WiFi, but only if multiple people need connection
          </p>
        </section>

        {/* Recommendation */}
        <section className="mb-12 max-w-2xl">
          <h2
            className="font-display text-dark tracking-wide mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            RECOMMENDATION (SIMPLE)
          </h2>
          <p className="article-body mb-4">
            If you want the easiest option:
          </p>
          <ul className="font-sans font-bold text-dark list-none pl-0 space-y-3">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Use an eSIM like Airalo
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Set it up before your flight
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Turn it on when you land
            </li>
          </ul>
          <p className="font-display text-dark text-3xl tracking-wide mt-8">
            {`That's it. No complicated setup, no wasted time.`}
          </p>
          <p className="article-body mt-6">
            {`If it doesn't work, you can still buy a SIM at the airport, but you probably won't need to.`}
          </p>
        </section>

        {/* Final note */}
        <section className="mb-12 max-w-2xl">
          <h2
            className="font-display text-dark tracking-wide mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            FINAL NOTE
          </h2>
          <p className="article-body mb-3">
            Your internet connection affects:
          </p>
          <ul className="font-serif text-muted list-none pl-0 space-y-2 mb-6">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Maps
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Train navigation
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Payments
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Communication
            </li>
          </ul>
          <p className="article-body mb-3 mt-12">
            This is not a small detail. If this fails, everything else becomes
            harder.
          </p>
          <p className="font-sans font-bold text-dark">
            Get this right, and your entire trip is smoother.
          </p>
          <Link
            href="/guides/japan-trains"
            className="inline-block font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150 mt-6"
          >
            Navigate Japan trains on day one →
          </Link>
        </section>

        {/* Affiliate / price check: swap hrefs for your tracked links */}
        <section className="mb-12">
          <div className="bg-dark px-8 py-10 max-w-2xl">
            <h2
              className="font-display text-tan tracking-widest text-2xl mb-6"
            >
              CHECK LATEST PRICES ///
            </h2>
            <p className="article-body-sm text-[#aab4be] mb-6">
              If you want current prices before you pay, do this:
            </p>
            <p className="article-body-sm text-sm text-[#aab4be] mb-4">
              Doing this when you have time beats trying to compare plans on
              arrivals WiFi.
            </p>
            <p className="article-body-sm text-sm text-[#8a96a6] mb-4">
              Based on real use in Japan.
            </p>
            <p className="font-sans font-bold text-sm text-tan mb-4 tracking-wide">
              Recommended options
            </p>
            <ul className="space-y-5 list-none pl-0">
              <li>
                <p className="font-sans font-bold text-sm tracking-widest uppercase text-tan mb-2">
                  Best overall
                </p>
                <TrackedOutboundSimLink
                  href={AIRALO_URL}
                  className={productCtaClass}
                >
                  Airalo eSIM →
                </TrackedOutboundSimLink>
              </li>
              <li>
                <p className="font-sans font-bold text-sm tracking-widest uppercase text-tan mb-2">
                  Alternative
                </p>
                <TrackedOutboundSimLink
                  href={UBIGI_URL}
                  className={productCtaClass}
                >
                  Ubigi eSIM →
                </TrackedOutboundSimLink>
              </li>
              <li>
                <p className="font-sans font-bold text-sm tracking-widest uppercase text-tan mb-2">
                  If you need physical
                </p>
                <TrackedCtaLink
                  href="https://www.klook.com/en-us/search/results/?query=japan%20sim%20card"
                  label="esim"
                  rel="noopener noreferrer"
                  className={productCtaClass}
                >
                  Physical SIM options →
                </TrackedCtaLink>
              </li>
            </ul>
            <div className="border-t border-[#3a3a3a] mt-8 pt-6">
              <p className="font-sans text-sm font-bold uppercase leading-snug tracking-widest text-[#667788]">
                If something is recommended here, it&apos;s because it works, not
                because it&apos;s sponsored.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 max-w-2xl">
          <h2
            className="font-display text-dark tracking-wide mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Frequently Asked Questions
          </h2>
          <dl className="space-y-8">
            <div>
              <dt className="font-sans font-bold text-maroon text-lg mb-2">
                Can I use my SIM card in Japan?
              </dt>
              <dd className="article-body m-0">
                Usually no, unless your carrier supports roaming. It&apos;s
                expensive.
              </dd>
            </div>
            <div>
              <dt className="font-sans font-bold text-maroon text-lg mb-2">
                Is eSIM better than pocket WiFi?
              </dt>
              <dd className="article-body m-0">
                For most travelers, yes. It&apos;s cheaper, easier, and requires
                no device.{" "}
                <Link
                  href="/guides/esim-vs-pocket-wifi-japan"
                  className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
                >
                  eSIM vs pocket WiFi →
                </Link>
              </dd>
            </div>
            <div>
              <dt className="font-sans font-bold text-maroon text-lg mb-2">
                What happens if I run out of data?
              </dt>
              <dd className="article-body m-0">
                You can top up or buy another plan. Most eSIM apps support this.
              </dd>
            </div>
            <div>
              <dt className="font-sans font-bold text-maroon text-lg mb-2">
                Can I buy a SIM at the airport?
              </dt>
              <dd className="article-body m-0">
                Yes, but it&apos;s more expensive and limited. Set it up before
                arrival.
              </dd>
            </div>
          </dl>
        </section>

        <NextStepGuides guideId="sim-card-japan" />

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
