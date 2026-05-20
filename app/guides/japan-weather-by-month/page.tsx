import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedGearBox } from "@/components/RecommendedGearBox";

export const metadata: Metadata = {
  title: "Japan Weather by Month (What to Expect Before You Go)",
  description:
    "Japan weather month by month for Tokyo, Osaka, Kyoto, and Hokkaido: temperatures, humidity, rain, snow, cherry blossoms, typhoons, crowds, and what to pack each season.",
};

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
      {items.map((item) => (
        <li
          key={item}
          className="before:mr-3 before:font-bold before:text-rust before:content-['›']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const linkClass =
  "font-sans font-bold text-base uppercase tracking-widest text-rust transition-colors duration-150 hover:text-maroon";

const inlineLink =
  "font-sans font-bold text-rust hover:text-maroon transition-colors duration-150";

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="editorial-heading mb-4">
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-sans font-bold text-dark text-lg tracking-wide mb-3 mt-6">
      {children}
    </h3>
  );
}

export default function JapanWeatherByMonthPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      title={
        <h1
          className="guide-page-title"
        >
          Japan Weather by Month (What to Expect Before You Go)
        </h1>
      }
      intro={<Intro />}
      beforeComparison={<MainMonths />}
      afterComparison={<FooterSections />}
    />
  );
}

function Intro() {
  return (
    <div className="article-body space-y-4 max-w-2xl">
      <p>
        One of the biggest mistakes travelers make is assuming Japan has the
        same climate everywhere. It does not.
      </p>
      <p>
        Japan stretches far north to south. Hokkaido may still have snow while
        Tokyo already feels like spring. Kyoto summers can feel hotter than many
        tropical countries because of humidity. Winter mornings in Tokyo can feel
        colder than expected because of dry wind.
      </p>
      <p>
        Understanding weather helps you pack properly, avoid seasonal surprises,
        and plan a realistic{" "}
        <Link href="/guides/japan-itinerary" className={inlineLink}>
          Japan itinerary
        </Link>
        . Match what you bring with our{" "}
        <Link href="/guides/japan-packing-list" className={inlineLink}>
          seasonal packing list
        </Link>
        .
      </p>
    </div>
  );
}

function MainMonths() {
  return (
    <>
      <section className="mb-12">
        <H2>Quick seasonal overview</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse border border-paper-edge bg-paper-card font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-paper-edge bg-paper-elevated">
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Season
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Months
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  General feel
                </th>
              </tr>
            </thead>
            <tbody className="article-body">
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">Winter</td>
                <td className="px-4 py-3">December to February</td>
                <td className="px-4 py-3">Cold, dry, clear skies</td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">Spring</td>
                <td className="px-4 py-3">March to May</td>
                <td className="px-4 py-3">Mild, cherry blossoms</td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Rainy season
                </td>
                <td className="px-4 py-3">June</td>
                <td className="px-4 py-3">Humid, wet</td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">Summer</td>
                <td className="px-4 py-3">July to August</td>
                <td className="px-4 py-3">Hot, humid, festivals</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-ink">Autumn</td>
                <td className="px-4 py-3">September to November</td>
                <td className="px-4 py-3">Cool, comfortable, foliage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <RecommendedGearBox
        gearId="japan-weather-by-month"
        title="Recommended gear for Japan weather by season"
        intro="These are practical items that solve common heat, rain, and walking problems tied to each season."
      />

      <MonthJanuary />
      <MonthFebruary />
      <MonthMarch />
      <MonthApril />
      <MonthMay />
      <MonthJune />
      <MonthJuly />
      <MonthAugust />
      <MonthSeptember />
      <MonthOctober />
      <MonthNovember />
      <MonthDecember />
      <RegionComparison />
    </>
  );
}

function MonthJanuary() {
  return (
    <section className="mb-12">
      <H2>January in Japan</H2>
      <H3>What it feels like</H3>
      <p className="article-body mb-4 max-w-2xl">
        January is cold but usually sunny in Tokyo and Osaka. The air is dry and
        mornings can feel sharp and windy. Hokkaido becomes a full snow destination.
      </p>
      <H3>Typical temperatures</H3>
      <CheckList
        items={[
          "Tokyo: about 2°C to 10°C",
          "Osaka and Kyoto: about 1°C to 9°C",
          "Hokkaido: below freezing",
        ]}
      />
      <H3>What to expect</H3>
      <CheckList
        items={[
          "Clear skies and fewer tourists after New Year",
          "Cold mornings, dry skin and lips",
          "Winter illuminations and scenic snow in the north",
        ]}
      />
      <H3>What to wear</H3>
      <p className="article-body max-w-2xl">
        Winter coat, sweater, thermal layers, gloves, and scarf. See the{" "}
        <Link href="/guides/japan-packing-list" className={inlineLink}>
          winter section of our packing list
        </Link>
        .
      </p>
    </section>
  );
}

function MonthFebruary() {
  return (
    <section className="mb-12">
      <H2>February in Japan</H2>
      <p className="article-body mb-4 max-w-2xl">
        February stays cold but is often less crowded than cherry blossom season.
        Snow season peaks in northern regions. Great for ski trips, snow festivals,
        and winter photography.
      </p>
      <H3>Sapporo Snow Festival</H3>
      <p className="article-body mb-4 max-w-2xl">
        Massive snow sculptures draw visitors worldwide. Hotels in snow regions
        book out early. Tokyo remains manageable compared with April crowds.
      </p>
    </section>
  );
}

function MonthMarch() {
  return (
    <section className="mb-12">
      <H2>March in Japan</H2>
      <p className="article-body mb-4 max-w-2xl">
        March is transitional. Early March can still feel cold. Late March warms
        up and cherry blossom season often starts toward the end of the month in
        Tokyo.
      </p>
      <CheckList
        items={[
          "Cool mornings, mild afternoons",
          "Unpredictable temperature swings",
          "Layering becomes essential",
        ]}
      />
      <p className="article-body mt-4 max-w-2xl">
        Pack a light jacket, sweater, long sleeves, and comfortable walking shoes.
      </p>
    </section>
  );
}

function MonthApril() {
  return (
    <section className="mb-12">
      <H2>April in Japan</H2>
      <H3>One of the best months to visit</H3>
      <p className="article-body mb-4 max-w-2xl">
        April is peak cherry blossom season in many areas. Weather is comfortable
        and parks fill with hanami gatherings.
      </p>
      <CheckList
        items={[
          "Tokyo: about 10°C to 20°C",
          "Kyoto: comfortable days, cool evenings",
          "High tourist crowds and pricier hotels in popular areas",
        ]}
      />
      <p className="article-body max-w-2xl">
        Bloom timing shifts every year. Do not book solely on predictions made
        months in advance. For neighborhoods and hotels, see{" "}
        <Link href="/guides/where-to-stay-tokyo" className={inlineLink}>
          where to stay in Tokyo
        </Link>{" "}
        and plan early.
      </p>
    </section>
  );
}

function MonthMay() {
  return (
    <section className="mb-12">
      <H2>May in Japan</H2>
      <p className="article-body mb-4 max-w-2xl">
        May is one of the most comfortable travel months. Humidity stays relatively
        low and temperatures are pleasant for walking and day trips.
      </p>
      <H3>Golden Week warning</H3>
      <p className="article-body mb-4 max-w-2xl">
        Late April through early May includes Golden Week, one of Japan&apos;s
        busiest travel windows. Expect crowded trains, expensive hotels, and busy
        sights. Book early if your dates overlap. Learn how{" "}
        <Link href="/guides/japan-trains" className={inlineLink}>
          Japan trains
        </Link>{" "}
        handle peak demand.
      </p>
    </section>
  );
}

function MonthJune() {
  return (
    <section className="mb-12">
      <H2>June in Japan (rainy season)</H2>
      <p className="article-body mb-4 max-w-2xl">
        June brings rainy season. That does not mean nonstop storms all day. Expect
        frequent rain, cloudy skies, humidity, and wet sidewalks.
      </p>
      <CheckList
        items={[
          "Tokyo, Osaka, Kyoto: about 20°C to 28°C, humid air",
          "Compact umbrella and waterproof shoes",
          "Quick-dry clothing",
        ]}
      />
      <p className="article-body max-w-2xl">
        Convenience stores sell umbrellas everywhere. Full rainy-season packing
        tips are in our{" "}
        <Link href="/guides/japan-packing-list" className={inlineLink}>
          packing list
        </Link>
        .
      </p>
    </section>
  );
}

function MonthJuly() {
  return (
    <section className="mb-12">
      <H2>July in Japan</H2>
      <p className="article-body mb-4 max-w-2xl">
        Many first-time visitors underestimate July. Humidity can feel exhausting,
        especially in cities. Kyoto gets especially intense because heat collects
        in the basin geography.
      </p>
      <CheckList
        items={[
          "About 28°C to 35°C with high humidity",
          "Strong afternoon sun",
          "Portable fans, cooling wipes, hydration, breathable clothing",
        ]}
      />
    </section>
  );
}

function MonthAugust() {
  return (
    <section className="mb-12">
      <H2>August in Japan</H2>
      <p className="article-body mb-4 max-w-2xl">
        August is peak summer heat. Tourism stays high because of school vacations
        and festivals. Many travelers feel constant sweat, afternoon fatigue, and
        crowded attractions.
      </p>
      <H3>Upsides of August</H3>
      <CheckList
        items={[
          "Fireworks festivals and summer matsuri",
          "Beach trips and lively evenings",
        ]}
      />
      <p className="article-body mt-4 max-w-2xl">
        Plan outdoor activities for early morning or evening. Save indoor sights
        for peak afternoon heat.
      </p>
    </section>
  );
}

function MonthSeptember() {
  return (
    <section className="mb-12">
      <H2>September in Japan</H2>
      <p className="article-body mb-4 max-w-2xl">
        September cools slightly but early weeks still feel humid. This is typhoon
        season: trains and flights can delay, with heavy rain and wind. Most trips
        continue normally, but flexible schedules help.
      </p>
      <p className="article-body max-w-2xl">
        For how disruptions usually play out on the ground, read{" "}
        <Link href="/guides/getting-around-japan" className={inlineLink}>
          getting around Japan
        </Link>{" "}
        and{" "}
        <Link href="/guides/japan-train-mistakes" className={inlineLink}>
          common train mistakes
        </Link>
        .
      </p>
    </section>
  );
}

function MonthOctober() {
  return (
    <section className="mb-12">
      <H2>October in Japan</H2>
      <p className="article-body mb-4 max-w-2xl">
        October offers comfortable temperatures and lower humidity. Walking cities
        becomes much easier than in summer.
      </p>
      <CheckList
        items={[
          "Tokyo: about 15°C to 23°C",
          "Kyoto: pleasant days, cool evenings",
          "Great for city exploration, hiking, day trips, photography",
        ]}
      />
    </section>
  );
}

function MonthNovember() {
  return (
    <section className="mb-12">
      <H2>November in Japan</H2>
      <p className="article-body mb-4 max-w-2xl">
        November is peak autumn foliage season. Kyoto becomes extremely popular for
        fall colors. Expect crisp air, comfortable walking weather, crowded foliage
        spots, and cooler nights.
      </p>
      <p className="article-body max-w-2xl">
        Bring a light coat, layers, and comfortable shoes. Book Kyoto lodging
        early if leaves are your main goal.
      </p>
    </section>
  );
}

function MonthDecember() {
  return (
    <section className="mb-12">
      <H2>December in Japan</H2>
      <p className="article-body mb-4 max-w-2xl">
        December feels festive and calm in many cities. Winter illuminations appear
        everywhere. Expect cold mornings, dry weather, and clear skies.
      </p>
      <p className="article-body mb-4 max-w-2xl">
        Crowds increase toward Christmas and New Year. Many businesses close around
        New Year holidays, so plan transit and meals ahead.
      </p>
    </section>
  );
}

function RegionComparison() {
  return (
    <section className="mb-12">
      <H2>Tokyo vs Kyoto vs Osaka vs Hokkaido</H2>
      <H3>Tokyo</H3>
      <p className="article-body mb-4 max-w-2xl">
        Best overall balance: moderate winters, hot summers, convenient year-round.
      </p>
      <H3>Kyoto</H3>
      <p className="article-body mb-4 max-w-2xl">
        Beautiful but weather feels more extreme: hot humid summers, cold winter
        mornings, heavy seasonal tourism in spring and autumn.
      </p>
      <H3>Osaka</H3>
      <p className="article-body mb-4 max-w-2xl">
        Similar to Tokyo but slightly warmer with strong evening energy year-round.
      </p>
      <H3>Hokkaido</H3>
      <p className="article-body max-w-2xl">
        Completely different climate: long winters, heavy snow, mild summers.
        Excellent for skiing, nature, and escaping Tokyo heat in summer.
      </p>
    </section>
  );
}

function FooterSections() {
  return (
    <>
      <section className="mb-12">
        <H2>Best time to visit Japan</H2>
        <p className="article-body mb-4 max-w-2xl">
          Most travelers prefer April, May, October, and November for comfortable
          weather, scenery, and walkability.
        </p>
      </section>

      <section className="mb-12">
        <H2>Cheapest times to visit</H2>
        <p className="article-body mb-4 max-w-2xl">
          January (after New Year), February, and early June often see lower flight
          and hotel prices outside major holidays.
        </p>
        <Link href="/guides/japan-budget-breakdown" className={linkClass}>
          Japan trip cost breakdown →
        </Link>
      </section>

      <section className="mb-12">
        <H2>Most difficult months for some travelers</H2>
        <p className="article-body mb-4 max-w-2xl">
          July and August challenge visitors with humidity, heat exhaustion risk,
          and crowds. Still enjoyable with the right pacing and packing.
        </p>
      </section>

      <section className="mb-12">
        <H2>Final advice</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            First-time visitors who want the safest balance of comfort and scenery
            usually choose spring or autumn.
          </p>
          <p>
            If budget matters more, winter and rainy season can offer lower prices.
            If festivals and energy matter more, summer rewards preparation despite
            the heat.
          </p>
          <p>
            Japan works year-round. The key is knowing what weather experience you
            are signing up for before you arrive.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Related guides</H2>
        <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
          <li>
            <Link href="/guides/japan-packing-list" className={linkClass}>
              Japan packing list by season →
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-itinerary" className={linkClass}>
              Japan itinerary →
            </Link>
          </li>
          <li>
            <Link href="/guides/where-to-stay-tokyo" className={linkClass}>
              Where to stay in Tokyo →
            </Link>
          </li>
          <li>
            <Link href="/guides/where-to-stay-japan" className={linkClass}>
              Where to stay in Japan →
            </Link>
          </li>
          <li>
            <Link href="/guides/getting-around-japan" className={linkClass}>
              Getting around Japan →
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-trains" className={linkClass}>
              How to use trains in Japan →
            </Link>
          </li>
        </ul>
      </section>

      <NextStepGuides guideId="japan-weather-by-month" />

      <GuideEndCta
        parentHref="/guides/japan-packing-list"
        parentLabel="Seasonal packing list →"
      />
    </>
  );
}
