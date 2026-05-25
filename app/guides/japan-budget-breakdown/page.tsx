import type { Metadata } from "next";
import { SiteBrandFooter } from "@/components/brand/SiteBrandFooter";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { ItineraryGuideCta } from "@/components/itinerary/ItineraryGuideCta";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { buildPlannerUrl } from "@/lib/itinerary/build-planner-url";
import { RecommendedServicesBox } from "@/components/RecommendedServicesBox";

export const metadata: Metadata = {
  title:
    "How Much Does a Japan Trip Cost in 2026 (Real Breakdown)",
  description:
    "Daily budget tiers for Japan in 2026: lodging, food, trains, IC, eSIM vs pocket WiFi, a sample 5-day Tokyo total in yen, and where people actually overspend.",
};

const conversionBox =
  "border border-[#d4c9b0] bg-white px-6 py-5 mb-6 max-w-2xl";

export default function JapanBudgetBreakdownPage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="guide-page-title"
        >
          How Much Does a Japan Trip Cost in 2026 (Real Breakdown)
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            People underestimate Japan in two directions. Some think it is cheap
            everywhere because konbini exists. Some think it is luxury-only because
            they priced Shinjuku on a Saturday and a taxi from Narita in the same
            afternoon.
          </p>
          <p>
            Below is a yen-first breakdown for planning. Exchange rates move, so
            convert at the end. Ranges are for one traveler unless noted.
          </p>
        </div>
      }
      beforeComparison={
        <>
          <div className="mb-6 max-w-full">
            <ToolRecommendationStrip
              headingId="budget-tools-strip"
              title="Try the numbers in the calculator"
              deck="Turn this article into a rough yen band for your own trip length, style, and cities. It is the same editorial lens, just interactive."
              tools={[
                {
                  label: "Japan Trip Budget Calculator",
                  description:
                    "Estimate hotels, food, transport, shopping, emergency buffer, and suggested cash from your inputs.",
                  href: "/tools/japan-trip-budget-calculator",
                },
              ]}
            />
          </div>

        <section className="mb-6 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Daily Budget Overview
          </h2>
          <p className="article-body mb-6">
            “Per day” here means everything typical in a day: sleep, eat, move,
            small misc. It is not hotel-only math.
          </p>
          <ul className="font-serif text-muted list-none pl-0 space-y-4">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Budget traveler:</span>{" "}
              about ¥12,000 to ¥18,000 per day. Capsule or dorm, konbini and
              supermarket meals, metro inside Tokyo, almost no taxis, few paid
              attractions.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Mid-range:</span>{" "}
              about ¥25,000 to ¥40,000 per day. Business hotel near a hub, mix of
              casual restaurants and cheap lunches, normal metro, one bigger meal
              or ticket event some days.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Comfortable:</span>{" "}
              about ¥50,000 to ¥85,000+ per day. Nicer hotel, sit-down dinner more
              often, Shinkansen legs, taxis when tired, less time spent optimizing
              every yen.
            </li>
          </ul>
        </section>

        <RecommendedServicesBox serviceId="japan-budget-breakdown" />

        <section className="mb-6 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Accommodation Costs
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-4">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Capsule:</span> often
              ¥3,500 to ¥7,000 per night in Tokyo if you book early. Weekends and
              peak season jump harder than weekdays.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Business hotel:</span>{" "}
              ¥9,000 to ¥18,000 is a common band for a clean single near a major
              station, not luxury, not a closet.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Airbnb-style rental:</span>{" "}
              wide spread ¥7,000 to ¥25,000+ depending on size and legality of the
              listing. Longer stays can win on space. Short stays still have
              cleaning fees and strict building rules.
            </li>
          </ul>
          <p className="article-body mt-6">
            <Link
              href="/guides/where-to-stay-tokyo"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Where to stay in Tokyo (areas) →
            </Link>
          </p>
        </section>

        <section className="mb-6 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Food Costs
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Convenience store:</span>{" "}
              ¥500 to ¥900 for a simple hot meal or sandwich plus drink if you are
              not buying dessert and beer.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Casual restaurants:</span>{" "}
              set lunches often ¥900 to ¥1,500. Dinner at a normal neighborhood
              spot often ¥1,400 to ¥2,800 per person before drinks.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Ramen:</span> often
              ¥900 to ¥1,300 for a solid bowl in Tokyo. Chain tonkotsu sits in that
              band a lot.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Sushi:</span>{" "}
              conveyor sushi often ¥2,200 to ¥4,500 per person if you eat like a
              human, not a contest. Counter omakase starts where that range ends.
            </li>
          </ul>
        </section>

        <section className="mb-6 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Transportation Costs
          </h2>
          <div className="article-body space-y-4">
            <p>
              Short metro hops in central Tokyo are often around ¥180 to ¥220 per
              ride depending on distance. IC does not make it cheaper, it just
              makes it faster at the gate.
            </p>
            <p>
              A Tokyo-area week of normal tourist hopping might land around ¥2,500
              to ¥5,000 on IC for many people, before any airport express or
              Shinkansen. Add a Tokyo to Osaka Shinkansen non-reserved one-way in
              the low teens of thousands of yen (plan roughly ¥13,000 to ¥15,500
              depending on service and season).
            </p>
            <p>
              Taxis: short hops add up. Narita to central Tokyo by taxi is the
              classic budget killer. Trains exist for a reason.
            </p>
          </div>
        </section>

        <section className="mb-6 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Internet Costs
          </h2>
          <div className="article-body space-y-4">
            <p>
              <span className="font-sans font-bold text-dark">eSIM:</span> often the
              cheapest and least annoying for one person. Think on the order of a
              few thousand yen for a short trip plan, not a flight ticket.
            </p>
            <p>
              <span className="font-sans font-bold text-dark">Pocket WiFi rental:</span>{" "}
              often around ¥800 to ¥1,500 per day depending on company and pickup
              method. Makes sense for groups sharing one device, less for solo
              travelers who already have eSIM.
            </p>
          </div>
        </section>
        </>
      }
      afterComparison={
        <>
        <div className={conversionBox}>
          <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-dark mb-2">
            Sort data before you price the rest of the trip
          </h3>
          <p className="article-body-sm mb-4">
            Bad internet makes you burn money on taxis and wrong tickets because
            you cannot verify a route calmly. Fix connectivity first, then refine
            food and hotel class.
          </p>
          <Link
            href="/guides/sim-card-japan"
            className="font-sans text-base font-bold text-rust hover:text-maroon transition-colors duration-150"
          >
            Best SIM and eSIM for Japan →
          </Link>
        </div>

        <section className="mb-6 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Sample 5-Day Budget (Real Numbers)
          </h2>
          <p className="article-body mb-4">
            One person, Tokyo only, mid-range posture: business hotel, mix of
            konbini and restaurants, metro only, one modest paid activity block, no
            shopping spree, eSIM not pocket WiFi.
          </p>
          <ul className="article-body list-none space-y-3 pl-0 mb-4">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Hotel 5 nights at ¥14,000: ¥70,000
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Food 5 days at ¥3,800 average: ¥19,000
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Metro and airport access (IC + one express): ¥8,000
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              eSIM plan ballpark: ¥3,000
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Museums or one ticketed thing: ¥6,000
            </li>
          </ul>
          <p className="font-sans font-bold text-dark text-lg">
            Rough subtotal: about ¥116,000 for five days, before flights and
            shopping.
          </p>
        </section>

        <section className="mb-6 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Ways to Save Money
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Use convenience stores for breakfast and late snacks. Quality is
              higher than the price suggests.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Eat set lunches, pay normal dinner prices, avoid the tourist-trap
              dinner premium when you are tired and careless.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Avoid taxis for long hops. Use trains even when your feet complain.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Walk ten minutes instead of one metro stop when the weather is fine.
              Small savings, better neighborhood feel.
            </li>
          </ul>
        </section>

        <section className="mb-6 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Final Estimated Total
          </h2>
          <div className="article-body space-y-4">
            <p>
              For a week in Tokyo without flights, a sane spread for many first
              timers is about ¥80,000 on the tight end up to roughly ¥220,000 on
              the “I want a real hotel and real dinners” end, solo, not counting
              shopping.
            </p>
            <p>
              Add intercity Shinkansen legs and the total climbs fast. Add Kyoto for
              two nights and you should think in chunks of tens of thousands of yen,
              not hundreds.
            </p>
            <p>
              <Link
                href="/guides/money-payments-japan"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Money, cards, and cash in Japan →
              </Link>
            </p>
          </div>
        </section>

        <section className="mb-6 max-w-2xl border-t border-tan pt-8">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-4">
            Related guides
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li>
              <Link
                href="/guides/where-to-stay-tokyo"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Where to stay in Tokyo →
              </Link>
            </li>
            <li>
              <Link
                href="/guides/japan-transportation"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Japan transportation hub →
              </Link>
            </li>
            <li>
              <Link
                href="/residents/japan-living-cost"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Monthly cost of living if you move here →
              </Link>
            </li>
          </ul>
        </section>

        <ItineraryGuideCta
          className="my-10"
          plannerHref={buildPlannerUrl({ travelStyle: "budget" })}
        />

        <GuideEndCta
          parentHref="/guides/japan-itinerary"
          parentLabel="Japan itinerary for first-time visitors →"
        />
        <SiteBrandFooter />
        </>
      }
    />
  );
}
