import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "Where to Stay in Osaka for First-Time Visitors",
  description:
    "Best Osaka neighborhoods for first-time visitors: Namba, Umeda, Shinsaibashi, Shin-Osaka, and Tennoji compared by vibe, trains, food, nightlife, shopping, and budget.",
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
    <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
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
  shopping: string;
  expectations: string;
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
  shopping,
  expectations,
  extra,
}: AreaSectionProps) {
  return (
    <section className="mb-12">
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
      <H3>Shopping</H3>
      <p className="article-body mb-4 max-w-2xl">{shopping}</p>
      <H3>Realistic expectations</H3>
      <p className="article-body mb-4 max-w-2xl">{expectations}</p>
      {extra}
    </section>
  );
}

export default function WhereToStayOsakaPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      showHotelConversion={false}
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          Where to Stay in Osaka for First-Time Visitors
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
        Osaka is often easier for first-time visitors than Tokyo: signage feels
        approachable, distances between highlights can feel shorter, and the city
        wears its food culture on its sleeve. Even so, your base neighborhood still
        shapes noise levels, walking distance to dinner, and how painful train
        transfers feel after a long flight.
      </p>
      <p>
        Namba and Umeda are the two gravitational centers. Pick wrong for your
        style and you will spend extra time on subways or repeat the same walks.
        Read{" "}
        <Link href="/guides/where-to-stay-japan" className={inlineLink}>
          where to stay in Japan
        </Link>{" "}
        for country-wide lodging logic, then map Osaka nights inside your{" "}
        <Link href="/guides/japan-itinerary" className={inlineLink}>
          Japan itinerary
        </Link>
        .
      </p>
    </div>
  );
}

function MainContent() {
  return (
    <>
      <section className="mb-12">
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
                  Namba
                </td>
                <td className="px-4 py-3">
                  First visits, Dotonbori, food and nightlife (best overall base)
                </td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Umeda
                </td>
                <td className="px-4 py-3">
                  Train hub, day trips to Kyoto, Nara, or Kobe
                </td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Shinsaibashi
                </td>
                <td className="px-4 py-3">
                  Shopping arcades, easy walks toward Dotonbori
                </td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Shin-Osaka
                </td>
                <td className="px-4 py-3">
                  Shinkansen arrivals, one-night transfers, minimal sightseeing
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Tennoji
                </td>
                <td className="px-4 py-3">
                  Budget stays, quieter rhythm, solid train links
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <H2>Osaka feels different from Tokyo</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Tokyo spreads across multiple downtowns and rewards riders who enjoy
            layered train maps. Osaka concentrates nightlife and street energy in
            Namba and Dotonbori, while Umeda stacks department stores and commuter
            lines into one towering west-side hub.
          </p>
          <p>
            Expect louder evenings, neon-backed strolls, and more casual dining
            scenes than polished Ginza pockets in Tokyo. Osaka still runs on
            trains first, but walking between takoyaki stalls matters more here than
            chasing rooftop observatories every night.
          </p>
        </div>
      </section>

      <AreaSection
        name="Namba"
        bestFor="First-time visitors who want Dotonbori on foot, late snacks, comedy clubs, canal walks, and maximum Osaka personality without hunting across town"
        vibe="Bright signage, canal reflections, crowds that spike after dinner, and constant smells from grills and seafood stalls. It looks chaotic on purpose and stays energetic past midnight near core blocks."
        pros={[
          "Strong overall balance of food, nightlife, and landmark strolls",
          "Dotonbori and Namba cores sit within walking distance for many hotels",
          "Excellent subway coverage plus connections toward Tennoji or Umeda",
          "Easy vibe check for visitors who want Osaka loud and memorable",
        ]}
        cons={[
          "Noise and crowds spike near Dotonbori on weekends",
          "Hotel pricing jumps during peak travel seasons",
          "Some alley pockets feel gritty compared with manicured Tokyo wards",
        ]}
        transit="Midosuji and other subway lines stitch Namba to Shinsaibashi, Tennoji, and Umeda with modest transfers. Airport-bound travelers often rely on Nankai departures toward Kansai International Airport from Namba plus JR alternatives depending on passes."
        foodNightlife="This is Osaka&apos;s headline lineup: takoyaki, okonomiyaki bars, standing tachinomiya spots, riverfront patios, international pubs, and comedy theaters clustered tight. Plan calories, not reservations, unless you chase Michelin counters."
        shopping="Amerikamura sneakers and vintage shops mix with mainstream chains closer to Dotonbori. Serious mall shoppers often drift north toward Shinsaibashi arcades during daylight hours."
        expectations="Choose Namba when you want Osaka flavor outside your hotel door and accept bustle as part of the charm. Sleep lightly sensitive travelers should filter hotels away from nightclub alleys."
        extra={
          <p className="article-body max-w-2xl mt-4">
            If you want one neighborhood that sells first-time visitors on Osaka,
            Namba wins more often than it loses.
          </p>
        }
      />

      <AreaSection
        name="Umeda"
        bestFor="Visitors prioritizing JR corridors, Hankyu runs toward Kyoto, Hanshin connections toward Kobe, day-trip pacing, or arrivals via Osaka Station mega-complex"
        vibe="Elevated walkways, department store basements stacked with sweets, evening commuter swell, and skyline viewpoints like Umeda Sky Building hovering nearby. West Osaka&apos;s polished busy heart."
        pros={[
          "Huge interchange point for JR, Hankyu, Hanshin, and subway layers",
          "Day trips to Kyoto, Nara, or Kobe feel simpler than cross-city hops",
          "Premium hotels cluster near stations with predictable luggage routes",
          "Solid underground mall networks help rainy-day navigation",
        ]}
        cons={[
          "Less neon-forward nightlife texture compared with Dotonbori on foot",
          "Maps span vertical stacks that confuse tired arrivals",
          "Evening energy skews commuter polished rather than street carnival",
        ]}
        transit="Treat Osaka Station and neighboring Hankyu Umeda as one organism spread across floors. JR holders lean here naturally; Hankyu speeds you toward Kawaramachi in Kyoto without wrestling Namba transfers first."
        foodNightlife="Department store restaurants, basement food halls, izakaya pockets near alley grids, plus rooftop bars worth booking ahead. Nightlife exists yet Namba still owns the louder sidewalk spectacle."
        shopping="Grand Front Osaka, Lucua, Hankyu Department Store, and underground passages chain together endless fashion and souvenir corridors before you surface for air."
        expectations="Stay in Umeda when trains dictate your itinerary more than neon selfies. Budget extra walking minutes inside station complexes even when maps claim short distances."
      />

      <AreaSection
        name="Shinsaibashi"
        bestFor="Shoppers who still want Dotonbori within a relaxed stroll and travelers who prefer covered arcades during rain bursts"
        vibe="Long shopping arcade ceilings, flagship retailers blending into indie boutiques, café terraces spilling outward. Still urban Osaka, slightly less alley grit than deepest Dotonbori pockets."
        pros={[
          "World-class covered shopping walks without resorting to taxis",
          "Short walks south toward Dotonbori river drama when appetite strikes",
          "Midosuji subway access keeps airport and cross-city hops manageable",
        ]}
        cons={[
          "Retail crowds thicken afternoons and weekends",
          "Hotel inventory skews smaller than Umeda towers",
          "Nightlife buzz sits one neighborhood south; plan shoes accordingly",
        ]}
        transit="Midosuji Line stations such as Shinsaibashi anchor north-south moves while Namba stays walkable southbound. Combine subway hops with pedestrian bridges around Amerikamura side streets."
        foodNightlife="Cafés and dessert parlors dominate daylight hours while izakaya clusters bloom closer to Dotonbori borders after dark. Expect to migrate south for peak midnight snack density."
        shopping="Shinsaibashi-suji arcade chains anchor fast fashion and cosmetics floors before quieter boutique lanes peel sideways toward themed alleys."
        expectations="Perfect compromise base when shopping fills afternoons yet food tourism owns evenings. Noise improves versus deepest Dotonbori pins though weekends stay lively."
      />

      <AreaSection
        name="Shin-Osaka"
        bestFor="Early Shinkansen legs, tight overnight layovers, travelers allergic to suitcase swaps across subway gates"
        vibe="Hotel towers ringing a functional bullet train depot with convenience stores repeating down neon-lit sidewalks. Efficient, beige-forward, tuned for departure boards rather than skyline romance."
        pros={[
          "Immediate Tokaido and Sanyo Shinkansen platform access after coffee",
          "Predictable luggage elevators versus maze-like Namba exits",
          "Quiet evenings ideal if you collapse early before transit mornings",
        ]}
        cons={[
          "Minimal tourist landmarks within romantic walking distance",
          "Nightlife requires subway rides toward Namba or Umeda",
          "Restaurant variety skews practical chains instead of legendary stalls",
        ]}
        transit="JR dominates; subway connectors haul you downtown within roughly fifteen minutes depending on lines and transfers. Perfect pivot between Hiroshima, Kyoto, or Tokyo segments."
        foodNightlife="Hotel buffets, station bentos, katsu chains, and late-night ramen stalls cater to travelers rather than spotlight hunters."
        shopping="Konbini essentials, souvenir kiosks, and compact malls attached to station shells cover basics without boutique wandering."
        expectations="Book Shin-Osaka only when trains outweigh neighborhood charm. Pair it with adventurous dinners elsewhere or accept quieter evenings."
      />

      <AreaSection
        name="Tennoji"
        bestFor="Budget-conscious travelers, slower walkers wanting greenery near Tennoji Park, visitors coupling Osaka Castle mornings with southern lodging savings"
        vibe="Park lawns mixing with zoo families, regional shoppers circulating Abeno Harukas towers, temple pockets carrying calmer moods than Dotonbori flash zones."
        pros={[
          "Often softer hotel pricing versus Namba cores during peak seasons",
          "JR Loop Line connectivity wraps toward Osaka Station smoothly",
          "Quieter evenings plus green relief near expansive park spaces",
        ]}
        cons={[
          "Nightlife clusters thinner than Namba without deliberate hunts",
          "Some blocks feel transitional compared with polished Umeda decks",
          "Expect modest subway hops when chasing Dotonbori midnight snacks",
        ]}
        transit="JR Loop Line anchors circle-route intuition while Midosuji dives north toward Namba quickly. Haruka airport expresses serve Tennoji travelers aiming toward KIX without doubling through Namba."
        foodNightlife="Tower dining floors mix department store basement snacks with casual izakaya streets spreading east from stations."
        shopping="Harukas observatory decks merge with mall floors stacking lifestyle brands aimed at domestic shoppers plus travelers chasing panorama tickets."
        expectations="Tennoji rewards planners who value calm quarters yet accept quick subway hops for neon evenings. Strong compromise when budgets tighten without sacrificing JR pragmatism."
      />

      <section className="mb-12">
        <H2>Universal Studios Japan stays</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Universal Studios Japan sits northwest along Osaka Bay. Dedicated fans
            booking park-heavy itineraries often anchor{" "}
            <span className="font-sans font-bold text-ink">
              one or two nights
            </span>{" "}
            near Universal City Station for rope-drop mornings, then return toward{" "}
            <span className="font-sans font-bold text-ink">Namba</span> or{" "}
            <span className="font-sans font-bold text-ink">Umeda</span> for food
            tourism afterward.
          </p>
          <p>
            Namba stays simplify evening meals after park days thanks to subway
            legs toward bay-front lines. Umeda stays trim JR-centric hops toward
            connecting gateways when combined with broader Kansai touring.
          </p>
          <CheckList
            items={[
              "Park-focused trips: Universal City hotels for 1 to 2 nights",
              "Mixed Osaka eats plus rides: Namba core between bay trips",
              "Train-heavy itineraries already staged from Umeda: stay west-side nights before Universal mornings",
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <H2>Train convenience matters first</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Osaka rewards travelers who preload Suica-style IC basics and skim line
            maps before checkout. Platforms stack vertically here similar to Tokyo,
            yet Dotonbori temptations distract from practicing transfers early.
          </p>
          <p>
            Start with{" "}
            <Link href="/guides/japan-trains" className={inlineLink}>
              how to use trains in Japan
            </Link>{" "}
            for ticketing etiquette, then widen scope via{" "}
            <Link href="/guides/japan-transportation" className={inlineLink}>
              Japan transportation for visitors
            </Link>{" "}
            so Hankyu, Hanshin, JR, and subway stacks feel intentional rather than
            improvised mid-trip.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Hotel room size expectations</H2>
        <p className="article-body max-w-2xl">
          Osaka rooms mirror broader Japanese norms: compact doubles, efficient wet
          baths, clever shelving that disappears once suitcases open. Higher floors
          in Umeda towers sometimes yield slightly wider footprints yet rarely match
          Western suburban proportions. Twin layouts beat squeezing couples into
          semi-double widths when luggage piles grow.
        </p>
      </section>

      <section className="mb-12">
        <H2>Kansai International Airport access</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            KIX arrivals funnel toward Osaka through competing corridors. Namba
            pairs naturally with{" "}
            <span className="font-sans font-bold text-ink">
              Nankai Railway expresses
            </span>{" "}
            aiming toward southern hubs. Tennoji aligns well with limited-stop{" "}
            <span className="font-sans font-bold text-ink">Haruka</span> runs when
            JR passes fit your broader itinerary.
          </p>
          <p>
            JR-focused travelers sometimes chase Haruka toward Shin-Osaka or loop
            connections depending on hotel pins and rail passes. Compare baggage
            ease versus fare math before defaulting purely on nostalgia for one
            brand.
          </p>
          <p>
            Dive deeper inside{" "}
            <Link href="/guides/japan-airport-to-city" className={inlineLink}>
              Japan airport-to-city transfers
            </Link>{" "}
            before locking lodging purely off vibes.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Short stays vs longer stays</H2>
        <CheckList
          items={[
            "1 to 3 Osaka nights: prioritize Namba or Shinsaibashi for instant food tourism payoff",
            "4 to 6 nights with heavy day trips: favor Umeda for Hankyu or JR symmetry toward Kyoto and Kobe",
            "Bullet train pivots only: Shin-Osaka overnight keeps mornings humane",
            "Budget stretches or slower pacing: Tennoji balances savings with workable subway hops",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Best area by travel style</H2>
        <CheckList
          items={[
            "Classic Osaka introduction: Namba",
            "Rail-centric explorers chasing multi-city hops: Umeda",
            "Retail afternoons plus neon dinners on foot: Shinsaibashi",
            "Express transfers without sightseeing guilt: Shin-Osaka",
            "Budget lodging without surrendering JR intuition: Tennoji",
          ]}
        />
      </section>
    </>
  );
}

function FooterContent() {
  return (
    <>
      <section className="mb-12">
        <H2>Final advice</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Osaka forgives navigation mistakes faster than Tokyo yet still punishes
            hotels picked purely off glossy photos. Align nights with whether trains,
            meals, or theme parks dominate your daylight hours.
          </p>
          <p>
            When unsure, begin with Namba or Shinsaibashi for tactile Osaka energy,
            slide toward Umeda if Kyoto day trips trump midnight alley wandering,
            and treat Shin-Osaka as infrastructure lodging rather than cultural base
            camps.
          </p>
          <p>
            Bundle patience for compact rooms, neon-soaked evenings, and generous
            snack budgets. Osaka shines brightest once logistics fade behind genuine
            appetite for the city&apos;s blunt charm.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Related guides</H2>
        <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
          <li>
            <Link href="/guides/where-to-stay-japan" className={linkClass}>
              Where to stay in Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/where-to-stay-tokyo" className={linkClass}>
              Where to stay in Tokyo
            </Link>
          </li>
          <li>
            <Link href="/guides/where-to-stay-kyoto" className={linkClass}>
              Where to stay in Kyoto
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-itinerary" className={linkClass}>
              Japan itinerary
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-trains" className={linkClass}>
              How to use trains in Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-transportation" className={linkClass}>
              Japan transportation for visitors
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-packing-list" className={linkClass}>
              Japan packing list
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-airport-to-city" className={linkClass}>
              Japan airport-to-city transfers
            </Link>
          </li>
        </ul>
      </section>

      <GuideEndCta
        parentHref="/guides/where-to-stay-japan"
        parentLabel="Where to stay in Japan overview"
      />
    </>
  );
}
