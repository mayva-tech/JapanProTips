import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { ItineraryGuideCta } from "@/components/itinerary/ItineraryGuideCta";
import { NextStepGuides } from "@/components/NextStepGuides";
import { buildPlannerUrl } from "@/lib/itinerary/build-planner-url";

export const metadata: Metadata = {
  title: "Where to Stay in Kyoto for First-Time Visitors",
  description:
    "Best Kyoto neighborhoods for first-time visitors: Kyoto Station, Gion, Kawaramachi, Higashiyama, and Arashiyama compared by vibe, transit, food, walking, and budget.",
};

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
      {items.map((item) => (
        <li
          key={item}
          className="before:mr-3 before:font-bold before:text-rust before:content-['?']"
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

type AreaSectionProps = {
  name: string;
  bestFor: string;
  vibe: string;
  pros: string[];
  cons: string[];
  transit: string;
  foodNightlife: string;
  walking: string;
  extra?: ReactNode;
};

function AreaSection({
  name,
  bestFor,
  vibe,
  pros,
  cons,
  transit,
  foodNightlife,
  walking,
  extra,
}: AreaSectionProps) {
  return (
    <section className="mb-6">
      <H2>{name}</H2>
      <p className="article-body mb-4 max-w-2xl">
        <span className="font-sans font-bold text-ink">Best for: </span>
        {bestFor}
      </p>
      <H3>Vibe</H3>
      <p className="article-body mb-4 max-w-2xl">{vibe}</p>
      <H3>Pros</H3>
      <CheckList items={pros} />
      <H3>Cons</H3>
      <CheckList items={cons} />
      <H3>Transportation</H3>
      <p className="article-body mb-4 max-w-2xl">{transit}</p>
      <H3>Food and nightlife</H3>
      <p className="article-body mb-4 max-w-2xl">{foodNightlife}</p>
      <H3>Walking expectations</H3>
      <p className="article-body mb-4 max-w-2xl">{walking}</p>
      {extra}
    </section>
  );
}

export default function WhereToStayKyotoPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      showHotelConversion={false}
      title={
        <h1
          className="guide-page-title"
        >
          Where to Stay in Kyoto for First-Time Visitors
        </h1>
      }
      intro={<IntroBlock />}
      beforeComparison={<MainContent />}
      afterComparison={<FooterContent />}
    />
  );
}

function IntroBlock() {
  return (
    <div className="article-body max-w-2xl space-y-4">
      <p>
        Kyoto looks compact on a map. In reality, transportation, crowds, and
        walking distances matter more than many first-time visitors expect.
      </p>
      <p>
        Unlike Tokyo, Kyoto is quieter, slower, more traditional, and more spread
        out for sightseeing. Many famous temples are not on major train lines.
        Where you stay affects commute time, walking fatigue, restaurant access,
        and how crowded your mornings feel.
      </p>
      <p>
        For a country-wide lodging overview, start with{" "}
        <Link href="/guides/where-to-stay-japan" className={inlineLink}>
          where to stay in Japan
        </Link>
        . For trip order and pacing, see our{" "}
        <Link href="/guides/japan-itinerary" className={inlineLink}>
          Japan itinerary guide
        </Link>
        .
      </p>
    </div>
  );
}

function MainContent() {
  return (
    <>
      <section className="mb-6">
        <H2>Quick recommendation summary</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse border border-paper-edge bg-paper-card font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-paper-edge bg-paper-elevated">
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Area
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Best for
                </th>
              </tr>
            </thead>
            <tbody className="article-body">
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Kyoto Station
                </td>
                <td className="px-4 py-3">Convenience and transportation</td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">Gion</td>
                <td className="px-4 py-3">Traditional Kyoto atmosphere</td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Kawaramachi
                </td>
                <td className="px-4 py-3">Food, nightlife, shopping</td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Higashiyama
                </td>
                <td className="px-4 py-3">Scenic sightseeing</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Arashiyama
                </td>
                <td className="px-4 py-3">Quiet, nature-focused stays</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-6">
        <H2>Kyoto feels different from Tokyo</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Tokyo feels fast, vertical, and rail-centered. Kyoto feels
            historical, slower, bus-dependent, and walking-heavy. That surprises
            many tourists who expect Tokyo logic everywhere.
          </p>
          <p>
            In Tokyo, trains dominate. In Kyoto, buses often matter more for
            temple areas like Kiyomizu-dera, Gion, and preserved streets. Pack for
            long walking days with our{" "}
            <Link href="/guides/japan-packing-list" className={inlineLink}>
              Japan packing list
            </Link>
            .
          </p>
        </div>
      </section>

      <AreaSection
        name="Kyoto Station area"
        bestFor="First-time visitors, short stays (2 to 4 days), easy transportation, day trips to Osaka or Nara"
        vibe="Modern, efficient, and practical. Less postcard Kyoto, more hub city energy with towers, malls, and constant foot traffic near the station."
        pros={[
          "Best transportation access: Shinkansen, JR, buses, airport links",
          "Luggage forwarding and large hotel selection",
          "Convenience stores, restaurants, and shopping under one roof",
          "Easier late-night arrival and rainy-day movement",
        ]}
        cons={[
          "Less traditional atmosphere than Gion or Higashiyama",
          "Some blocks feel business-oriented, not scenic",
          "You trade aesthetics for efficiency",
        ]}
        transit="Strongest base in Kyoto. Trains, buses, and taxis cluster here. See our guides to Japan trains and Japan transportation for how lines connect."
        foodNightlife="Solid restaurant variety inside and around the station complex. Nightlife is present but not the main reason to stay here."
        walking="Moderate walking to sights. Expect to bus or train to Gion, Higashiyama, and Arashiyama rather than walk everywhere from the hotel."
        extra={
          <p className="article-body max-w-2xl">
            Hotels near Kyoto Station are often compact and modern. Room sizes may
            still feel smaller than Western hotels. If you only stay 2 to 4 days,
            this is usually the safest choice.{" "}
            <Link href="/guides/japan-trains" className={inlineLink}>
              Japan trains guide
            </Link>
            {" "}
            and{" "}
            <Link href="/guides/japan-transportation" className={inlineLink}>
              Japan transportation
            </Link>
            .
          </p>
        }
      />

      <AreaSection
        name="Gion"
        bestFor="Traditional atmosphere, evening walks, cultural first visits, travelers who prioritize scenery over speed"
        vibe="Lantern streets, wooden facades, tea house districts, and riverside paths. At night Gion feels iconic. Early mornings feel magical before tour buses arrive."
        pros={[
          "Strong traditional Kyoto feel and excellent walking atmosphere",
          "Great restaurants and cultural experience",
          "Easy evening exploration on foot",
        ]}
        cons={[
          "More expensive hotels, especially in peak season",
          "Transportation less convenient than Kyoto Station",
          "More walking and crowds during daytime",
        ]}
        transit="Bus-dependent for many sights. Hankyu and Keihan lines help, but you will still use buses or taxis for some temple runs."
        foodNightlife="Excellent dining and atmospheric evenings. Nightlife is refined rather than loud club energy."
        walking="High walking volume on cobbles and narrow streets. Comfortable shoes matter. Not ideal if you dislike hills and stairs near adjacent Higashiyama."
        extra={
          <p className="article-body max-w-2xl">
            Gion is beautiful but not always efficient. If you prioritize luggage
            ease and fast transfers, Kyoto Station may still win.
          </p>
        }
      />

      <AreaSection
        name="Kawaramachi"
        bestFor="Food lovers, shopping, nightlife, younger travelers, social city energy"
        vibe="More energetic than temple districts. Shopping arcades, caf?s, bars, department stores, and riverside dining along the Kamogawa area."
        pros={[
          "Best restaurant and nightlife access in central Kyoto",
          "Strong shopping and walkable downtown location",
          "Good bus and train connections to Gion and Nishiki Market",
        ]}
        cons={[
          "Busier, less peaceful than Higashiyama or Arashiyama",
          "Less old Kyoto feeling on main shopping streets",
          "Daytime crowds on weekends",
        ]}
        transit="Central position on Hankyu and subway lines plus frequent buses. Strong base for mixed train and bus days."
        foodNightlife="Top pick for variety: izakaya, caf?s, bars, and late meals. Best if you want city energy after temple hours."
        walking="Flat central walking with long days still likely. Easy to reach Gion on foot in 15 to 25 minutes depending on your hotel pin."
      />

      <AreaSection
        name="Higashiyama"
        bestFor="Temple-focused sightseeing, photography, quiet mornings, travelers who want iconic streets outside the hotel door"
        vibe="Steep preserved streets, temple gates, and classic Kyoto scenery. Kiyomizu-dera, Sannenzaka, Ninenzaka, and Yasaka Shrine are nearby."
        pros={[
          "Beautiful scenery and strong Kyoto atmosphere",
          "Excellent for early-morning walks before tour buses",
          "Great for photography and slow exploration",
        ]}
        cons={[
          "More uphill walking and limited train access",
          "Daytime crowds on famous slopes",
          "Harder with large luggage on stone paths",
        ]}
        transit="Buses and walking dominate. Trains are not at the doorstep. Plan buffer time compared with Kyoto Station stays."
        foodNightlife="Good local restaurants, quieter evenings than Kawaramachi. Fewer late-night options."
        walking="Expect significant hills and stairs. Many visitors log heavy step counts here. Pair with realistic pacing in your itinerary."
      />

      <AreaSection
        name="Arashiyama"
        bestFor="Nature, relaxation, longer stays, repeat visitors, ryokan-focused trips"
        vibe="Slower riverside pace with bamboo groves, mountain views, and calmer streets. Feels like an escape from central Kyoto crowds."
        pros={[
          "Peaceful atmosphere and excellent ryokan potential",
          "Nature scenery and relaxing pace",
          "Memorable mornings along the river",
        ]}
        cons={[
          "Less nightlife and fewer late-night options",
          "Farther from Gion and Kawaramachi for daily sightseeing",
          "More transit time if you plan central Kyoto every day",
        ]}
        transit="JR Sagano line and buses serve the area. Daily trips into central Kyoto take more effort than staying near Kyoto Station."
        foodNightlife="Local restaurants and caf?s, not a nightlife district. Plan dinners early or commute back central if you want variety."
        walking="Moderate walking along flat river paths plus hills if you explore temples. Less brutal than Higashiyama slopes but still active days."
        extra={
          <p className="article-body max-w-2xl">
            Best when you want relaxation or already visited central Kyoto. Less
            ideal for a 2-day first trip focused on maximum temple coverage.
          </p>
        }
      />

      <section className="mb-6">
        <H2>Kyoto buses vs trains</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Tokyo logic does not fully work here. In Tokyo, trains dominate. In
            Kyoto, buses often connect sightseeing areas better, especially around
            Kiyomizu-dera, Gion, and temple districts.
          </p>
          <p>
            Buses can get crowded, slow in traffic, and uncomfortable with
            luggage. The smart mix is trains for major movement, buses for temple
            zones, and walking for local exploration.
          </p>
          <p>
            Read{" "}
            <Link href="/guides/japan-transportation" className={inlineLink}>
              Japan transportation for visitors
            </Link>{" "}
            and{" "}
            <Link href="/guides/japan-trains" className={inlineLink}>
              how to use trains in Japan
            </Link>{" "}
            before you lock in a hotel pin far from any useful stop.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <H2>Hotel size expectations</H2>
        <p className="article-body max-w-2xl">
          Kyoto hotel rooms are often compact, even at mid-range properties.
          Luggage can dominate the floor space. Twin rooms are common. If you
          travel with large bags, Kyoto Station hotels make check-in and
          forwarding easier than steep Higashiyama streets.
        </p>
      </section>

      <section className="mb-6">
        <H2>Ryokan vs hotel</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            <span className="font-sans font-bold text-ink">Ryokan: </span>
            Traditional inns with tatami, futons, baths, and sometimes kaiseki
            meals. Excellent for cultural stays, slower travel, and special
            nights in Gion or Arashiyama.
          </p>
          <p>
            <span className="font-sans font-bold text-ink">Modern hotels: </span>
            Better for convenience, shorter stays, budget control, and easy
            train access. Most first-time visitors on a 3 to 5 day Kyoto block
            choose hotels near Kyoto Station or Kawaramachi.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <H2>Short stays vs longer stays</H2>
        <CheckList
          items={[
            "2 to 4 days: Kyoto Station for transit and luggage ease",
            "5 to 7 days: mix Kyoto Station or Kawaramachi with one scenic area night in Gion or Higashiyama",
            "Longer or repeat visits: Arashiyama or a ryokan night for slower pace",
          ]}
        />
      </section>

      <section className="mb-6">
        <H2>Best area by travel style</H2>
        <CheckList
          items={[
            "First-time tourist: Kyoto Station",
            "Traditional Kyoto experience: Gion or Higashiyama",
            "Food and nightlife: Kawaramachi",
            "Relaxing nature stay: Arashiyama",
          ]}
        />
      </section>
    </>
  );
}

function FooterContent() {
  return (
    <>
      <section className="mb-6">
        <H2>Final advice</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Most first-time visitors underestimate walking, transportation
            fatigue, and luggage stress. The prettiest area is not always the
            most practical one.
          </p>
          <p>
            If uncertain, choose Kyoto Station. If atmosphere matters most,
            choose Gion or Higashiyama. If food and city energy matter most,
            choose Kawaramachi.
          </p>
          <p>
            Kyoto becomes much more enjoyable once your accommodation matches
            your actual travel style, not just your photo inspiration.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <H2>Related guides</H2>
        <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
          <li>
            <Link href="/guides/where-to-stay-japan" className={linkClass}>
              Where to stay in Japan ?
            </Link>
          </li>
          <li>
            <Link href="/guides/where-to-stay-tokyo" className={linkClass}>
              Where to stay in Tokyo ?
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-itinerary" className={linkClass}>
              Japan itinerary ?
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-trains" className={linkClass}>
              How to use trains in Japan ?
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-transportation" className={linkClass}>
              Japan transportation ?
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-packing-list" className={linkClass}>
              Japan packing list ?
            </Link>
          </li>
        </ul>
      </section>

      <ItineraryGuideCta
        className="my-10"
        plannerHref={buildPlannerUrl({ startCity: "Kyoto" })}
        templateHref="/itinerary-templates/3-day-kyoto-itinerary"
        templateLinkLabel="3-day Kyoto itinerary template"
      />

      <NextStepGuides guideId="where-to-stay-kyoto" />

      <GuideEndCta
        parentHref="/guides/where-to-stay-japan"
        parentLabel="Where to stay in Japan overview ?"
      />
    </>
  );
}
