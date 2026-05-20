import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { DownloadChecklistBox } from "@/components/DownloadChecklistBox";
import { NextStepGuides } from "@/components/NextStepGuides";
import { SeasonalNote, TouristMistakeNote } from "@/components/editorial/field-notes";
import { RecommendationGrid } from "@/components/recommendations";

export const metadata: Metadata = {
  title: "Japan Packing List for Every Season",
  description:
    "What to pack for Japan in any season: documents, tech, shoes for high city steps, weather by region, rainy season, winter layers for Tokyo, Kyoto, and Hokkaido, luggage size, and what you can leave home.",
};

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
      {items.map((item) => (
        <li
          key={item}
          className="before:content-['›'] before:text-rust before:font-bold before:mr-3"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const linkClass =
  "font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150 uppercase tracking-widest";

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

export default function JapanPackingListPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      title={
        <h1
          className="guide-page-title"
        >
          Japan Packing List for Every Season
        </h1>
      }
      intro={
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            The classic mistake is packing for a fantasy version of the trip.
            Extra outfits, bulky shoes, and just-in-case gadgets add weight fast,
            but they rarely add comfort.
          </p>
          <p>
            Japan&apos;s weather shifts by season and by region. Tokyo, Kyoto,
            ski country, and Okinawa are not interchangeable. The goal is to
            bring the right things, not the most things.
          </p>
          <p>
            Start with the big picture of your days, then narrow the list. Our{" "}
            <Link href="/guides/japan-itinerary" className={inlineLink}>
              Japan itinerary planning guide
            </Link>{" "}
            helps you line up pace, transit, and stops before you fold a single
            shirt.
          </p>
          <div>
            <Link href="/guides/japan-itinerary" className={linkClass}>
              Build your Japan itinerary →
            </Link>
          </div>
        </div>
      }
      beforeComparison={
        <>
          <div className="mb-12 max-w-full">
            <ToolRecommendationStrip
              headingId="packing-tools-strip"
              title="Plan the bag with the tools"
              deck="Build a checklist from your trip profile, then sanity check customs-sensitive items. Both stay high level: you still read official rules before you fly."
              tools={[
                {
                  label: "Japan Packing Generator",
                  description:
                    "Month, trip length, cities, laundry, activities, and rain: grouped checklist you can copy or share.",
                  href: "/tools/japan-packing-generator",
                },
                {
                  label: "Can I Bring This to Japan?",
                  description:
                    "Plain-language flags for medicine, food, plants, vapes, power banks, cash, and more.",
                  href: "/tools/can-i-bring-this-to-japan",
                },
              ]}
            />
          </div>

          <RecommendationGrid
            placement="japan-packing-list"
            context="japan-packing-list"
            title="Practical gear for packing a Japan trip"
            intro="If you want the simplest options before you fly, these solve the problems we see most on walking-heavy, train-first trips."
          />

          <section className="mb-12">
            <H2>Quick rules before you pack</H2>
            <ol className="article-body list-decimal space-y-3 pl-6 max-w-2xl">
              <li>
                Assume you will walk a lot. Comfortable shoes beat a fourth pair
                of heels. Read{" "}
                <Link href="/guides/getting-around-japan" className={inlineLink}>
                  getting around Japan
                </Link>{" "}
                for transit and street reality.
              </li>
              <li>
                Trains reward small bags. Know how{" "}
                <Link href="/guides/japan-trains" className={inlineLink}>
                  Japan trains
                </Link>{" "}
                work, and avoid the luggage surprises in{" "}
                <Link
                  href="/guides/japan-train-mistakes"
                  className={inlineLink}
                >
                  common train mistakes
                </Link>
                .
              </li>
              <li>
                Layer instead of bulk. One light jacket you can wear three ways
                beats a heavy coat you need twice.
              </li>
              <li>
                Buy small consumables here if you need them. Sunscreen, towels,
                and snacks are easy at convenience stores.
              </li>
              <li>
                Leave room for laundry or repeat outfits. Hotel rooms are tight,
                especially in Tokyo, so a lean bag feels better on day five.
              </li>
            </ol>
            <TouristMistakeNote noteId="packing-fantasy-wardrobe">
              <p>
                The expensive mistake is a fantasy wardrobe for a walking trip.
                If you have not worn it on a 20,000 step day at home, it is not
                going to feel better on cobbles and station stairs.
              </p>
            </TouristMistakeNote>
          </section>

          <section className="mb-12">
            <H2>Universal packing list</H2>
            <H3>Documents and money basics</H3>
            <CheckList
              items={[
                "Passport and a digital copy stored offline",
                "Visa rules confirmation if required for your nationality",
                "Travel insurance details and emergency contacts",
                "Hotel confirmations and any rail passes you booked in advance",
              ]}
            />
            <p className="article-body mt-4 max-w-2xl">
              First landing steps matter for pace and calm. Use{" "}
              <Link
                href="/guides/japan-airport-first-steps"
                className={inlineLink}
              >
                Japan airport first steps
              </Link>{" "}
              as your arrival checklist.
            </p>
            <H3>Tech and power</H3>
            <CheckList
              items={[
                "Phone, charger, and a small battery pack for long sightseeing days",
                "Headphones for trains and crowds",
                "Outlet adapter if your plugs are not Type A: Japan uses 100V and two flat pins",
              ]}
            />
            <p className="article-body mt-4 max-w-2xl">
              Pick your data path early with{" "}
              <Link href="/guides/sim-card-japan" className={inlineLink}>
                SIM card options for Japan
              </Link>{" "}
              and{" "}
              <Link
                href="/guides/esim-vs-pocket-wifi-japan"
                className={inlineLink}
              >
                eSIM vs pocket WiFi
              </Link>{" "}
              so maps and payments stay smooth.
            </p>
          </section>

          <section className="mb-12">
            <H2>Shoes: the real MVP</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                Many travelers log 15,000 to 30,000 steps without trying. Cobbles,
                station stairs, and long platforms add up fast.
              </p>
              <p>
                Bring supportive sneakers or walking shoes you already trust. Skip
                brand new pairs, thin soles, and anything that rubs at home.
              </p>
              <p>
                <Link href="/guides/getting-around-japan" className={inlineLink}>
                  Getting around Japan
                </Link>{" "}
                explains how much ground you will cover and why footwear choices
                matter.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <H2>Spring (March to May)</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                Spring is mild overall, but mornings and evenings can feel cool,
                especially early in the season. Rain showers appear, and pollen
                can be intense for sensitive travelers.
              </p>
            </div>
            <H3>Clothing and extras</H3>
            <CheckList
              items={[
                "Light layers: long sleeve tees, a mid layer, and a packable light jacket",
                "One slightly warmer layer for cool nights or mountain day trips",
                "A compact umbrella or a reliable rain shell",
                "Comfortable pants and one nicer outfit if you have a special dinner",
              ]}
            />
            <H3>Pollen and allergies</H3>
            <CheckList
              items={[
                "Your preferred antihistamines or nose spray if you react to pollen",
                "Sunglasses on bright, breezy days when pollen drifts",
              ]}
            />
          </section>

          <section className="mb-12">
            <H2>Summer (June to August)</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                Summer brings heat, stick humidity, and crowded sidewalks. Breathable
                fabrics and a plan for shade beat heavy layers every time.
              </p>
            </div>
            <H3>Clothing</H3>
            <CheckList
              items={[
                "Light, quick dry shirts you can wash and rotate",
                "Shorts or airy pants based on your comfort and temple etiquette plans",
                "A hat with a real brim, not just fashion coverage",
              ]}
            />
            <H3>Cooling helpers</H3>
            <CheckList
              items={[
                "A small towel or cooling wipes for platform waits",
                "Reusable water bottle: fill at hotels and stations when you can",
                "Portable fan if you truly run hot, optional but nice in August",
              ]}
            />
            <H3>Convenience store wins</H3>
            <p className="article-body max-w-2xl">
              Lawson, FamilyMart, and 7-Eleven sell cooling sheets, cheap
              umbrellas, and ice drinks when you need a reset. You do not need to
              pack a week of every snack.
            </p>
          </section>

          <section className="mb-12">
            <H2>Rainy season (often June)</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                Expect drizzle, sudden showers, and humid air. A light rain shell,
                quick dry clothes, and a backup plan for indoor hours help.
              </p>
              <p>
                Do not stress if you forget a fancy umbrella. Inexpensive umbrellas
                are everywhere, and hotels often have loaners. Focus on keeping
                documents and electronics dry.
              </p>
            </div>
            <SeasonalNote noteId="packing-tsuyu-dry-core">
              <p>
                Tsuyu is as much humidity management as rain. Dry bags for passports
                and a quick dry shirt beat a heavy coat you peel off every time you
                step indoors into AC.
              </p>
            </SeasonalNote>
            <CheckList
              items={[
                "Packable rain jacket that breathes better than a thick parka",
                "Water resistant shoe treatment or shoes that handle wet pavement",
                "Zip bags or a small dry sack for passports and cables",
              ]}
            />
          </section>

          <section className="mb-12">
            <H2>Autumn (September to November)</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                Autumn is a layering season. Early fall can still feel summery in
                parts of Japan, while late fall turns crisp, especially after dark.
              </p>
            </div>
            <H3>Clothing</H3>
            <CheckList
              items={[
                "Breathable base layers you can add under a sweater or light jacket",
                "A packable mid layer for golden hour walks and rooftop views",
                "Scarf or light gloves by late November in cooler cities",
              ]}
            />
          </section>

          <section className="mb-12">
            <H2>Winter (December to February)</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                Winter is not one story nationwide. Tokyo nights can feel cold and
                dry, Kyoto can dip colder in the mornings, and Hokkaido is real
                winter with snow and wind. Pack for your actual route, not an
                average of the whole country.
              </p>
            </div>
            <H3>Clothing</H3>
            <CheckList
              items={[
                "Warm base layers for Hokkaido or mountain towns",
                "Insulated jacket or a shell plus mid layer combo you can adjust",
                "Gloves, hat, and a scarf if you will be outside after sunset",
              ]}
            />
            <p className="article-body max-w-2xl">
              Uniqlo Heattech or similar thin thermals are easy to find in Japan if
              you want to add warmth without stuffing a huge coat. Buy locally if
              your suitcase is tight.
            </p>
            <H3>Footwear</H3>
            <CheckList
              items={[
                "Grip friendly shoes on icy sidewalks or station approaches",
                "Water resistant boots if snow is likely where you stay",
              ]}
            />
          </section>

          <section className="mb-12">
            <H2>Luggage size that works</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                A medium suitcase plus a comfortable day backpack hits the sweet
                spot for trains, hotel closets, and airport queues. Oversized
                rollers look heroic until you meet a narrow turnstile or a full
                rush hour car.
              </p>
              <p>
                <Link href="/guides/japan-airport-to-city" className={inlineLink}>
                  Airport to city transfers
                </Link>{" "}
                explains how to move bags cleanly from landing to your first sleep.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <H2>Hotel reality check</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                Tokyo rooms often run smaller than people expect. Two large
                suitcases can turn a cute room into an obstacle course. If you hop
                cities, luggage forwarding between hotels can save your shoulders,
                but you still need a bag that fits comfortably on local transit.
              </p>
              <p>
                Choose neighborhoods and lodging with your packing style in mind.
                See{" "}
                <Link
                  href="/guides/where-to-stay-tokyo"
                  className={inlineLink}
                >
                  where to stay in Tokyo
                </Link>{" "}
                for practical tradeoffs.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <H2>Medicine and toiletries</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                Bring prescription meds in original packaging with clear labels.
                For OTC favorites, pack a small supply, then buy local equivalents
                if you need more. Pharmacies work well, but brand names differ.
              </p>
              <CheckList
                items={[
                  "Pain relief and stomach remedies you already trust",
                  "Blister care and any foot tape you like for long walks",
                  "Sunscreen if you prefer a specific formula for sensitive skin",
                ]}
              />
            </div>
          </section>

          <section className="mb-12">
            <H2>Cash and wallet setup</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                Cards work in many places, but smaller shops and some rural stops
                still prefer cash. A slim coin pouch helps because change piles up
                fast.
              </p>
              <p>
                Read{" "}
                <Link
                  href="/guides/money-payments-japan"
                  className={inlineLink}
                >
                  money and payments in Japan
                </Link>{" "}
                before you decide how much yen to carry on day one.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <H2>Things you usually do not need</H2>
            <CheckList
              items={[
                "Full size towels: hotels provide them, and you can buy cheap extras",
                "Multiple guidebooks you will not open after day two",
                "A hair dryer unless you have special hair needs: most rooms include one",
                "Bulky snacks from home unless you have strict dietary limits",
              ]}
            />
          </section>

          <section className="mb-12">
            <H2>Smart packing strategy</H2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                Lay out everything, then remove two items you packed out of fear,
                not use. Roll or fold consistently so repacking at hotels takes
                minutes. Keep chargers, adapters, and documents in one pouch so
                security checks stay smooth.
              </p>
              <p>
                If you add souvenirs, compress dirty laundry into a separate bag so
                clean clothes stay fresh. One empty tote folded flat can save a
                fragile purchase on the flight home.
              </p>
            </div>
          </section>
        </>
      }
      afterComparison={
        <>
          <section className="mb-12">
            <H2>Final advice: three priorities</H2>
            <CheckList
              items={[
                "Comfortable shoes that already match your feet",
                "Layers that fit the season on your route, not a generic Japan average",
                "A lean bag that moves easily on trains and fits your actual hotel",
              ]}
            />
          </section>

          <section className="mb-12">
            <H2>Related guides</H2>
            <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
              <li>
                <Link href="/guides/japan-itinerary" className={linkClass}>
                  Japan itinerary →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/japan-airport-first-steps"
                  className={linkClass}
                >
                  Japan airport first steps →
                </Link>
              </li>
              <li>
                <Link href="/guides/sim-card-japan" className={linkClass}>
                  SIM card for Japan →
                </Link>
              </li>
              <li>
                <Link href="/guides/getting-around-japan" className={linkClass}>
                  Getting around Japan →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/japan-train-mistakes"
                  className={linkClass}
                >
                  Japan train mistakes →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/japan-airport-to-city"
                  className={linkClass}
                >
                  Airport to city transfers →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/money-payments-japan"
                  className={linkClass}
                >
                  Money and payments in Japan →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/where-to-stay-tokyo"
                  className={linkClass}
                >
                  Where to stay in Tokyo →
                </Link>
              </li>
            </ul>
          </section>

          <DownloadChecklistBox downloadId="japan-packing-checklist" />

          <NextStepGuides guideId="japan-packing-list" />

          <GuideEndCta
            parentHref="/start-here"
            parentLabel="Open Japan trip basics →"
          />
        </>
      }
    />
  );
}
