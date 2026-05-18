import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "Japanese Convenience Stores Explained (7-Eleven, Lawson, FamilyMart)",
  description:
    "How 7-Eleven, Lawson, and FamilyMart work in Japan: food, ATMs, hot meals, coffee, tickets, shipping, payments, etiquette, and what tourists should actually buy.",
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

type ChainSectionProps = {
  name: string;
  tagline: string;
  vibe: string;
  strengths: string[];
  watchFor: string;
};

function ChainSection({
  name,
  tagline,
  vibe,
  strengths,
  watchFor,
}: ChainSectionProps) {
  return (
    <section className="mb-12">
      <H2>{name}</H2>
      <p className="article-body mb-4 max-w-2xl">
        <span className="font-sans font-bold text-ink">In short: </span>
        {tagline}
      </p>
      <H3>What it feels like</H3>
      <p className="article-body mb-4 max-w-2xl">{vibe}</p>
      <H3>Known for</H3>
      <CheckList items={strengths} />
      <H3>Realistic note</H3>
      <p className="article-body mb-4 max-w-2xl">{watchFor}</p>
    </section>
  );
}

export default function JapanConvenienceStoreGuidePage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      showHotelConversion={false}
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          Japanese Convenience Stores Explained (7-Eleven, Lawson, FamilyMart)
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
        Japanese konbini act like mini life-support stations, not just snack
        shops. They stack hot food, ATMs, printers, ticket kiosks, and overnight
        essentials into blocks you can reach on foot from almost any downtown
        corner.
      </p>
      <p>
        Pair this guide with{" "}
        <Link href="/guides/money-payments-japan" className={inlineLink}>
          money, cards, and cash in Japan
        </Link>{" "}
        so withdrawals and tap-to-pay habits stay calm, and skim{" "}
        <Link href="/guides/japan-airport-first-steps" className={inlineLink}>
          first steps at the airport
        </Link>{" "}
        so arrival purchases feel familiar before you hit neighborhood shelves.
      </p>
    </div>
  );
}

function MainContent() {
  return (
    <>
      <section className="mb-12">
        <H2>Quick chain comparison</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse border border-paper-edge bg-paper-card font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-paper-edge bg-paper-elevated">
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Chain
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Strength
                </th>
              </tr>
            </thead>
            <tbody className="article-body">
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  7-Eleven
                </td>
                <td className="px-4 py-3">
                  Best overall default for visitors: broad meals, strong ATMs,
                  dense coverage
                </td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Lawson
                </td>
                <td className="px-4 py-3">
                  Dessert shelves and limited-time collabs locals chase on repeat
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  FamilyMart
                </td>
                <td className="px-4 py-3">
                  Famichiki culture plus balanced bentos and everyday staples
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <H2>Convenience store culture in Japan</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Expect bright aisles, polite counter rhythm, and packaging tuned for
            eating on trains or hotel desks. Staff cycle stock aggressively, so
            cold cases often feel fresher than visitors assume for &quot;grab and
            go&quot; food.
          </p>
          <p>
            Konbini fill gaps hotels cannot: midnight hunger, sudden rain,
            headache tablets, duplicate prints, and charging cables when your bag
            felt complete at departure.
          </p>
        </div>
      </section>

      <ChainSection
        name="7-Eleven"
        tagline="The widest practical net for travelers who want meals, ATMs, and predictable basics without hunting specialty formats."
        vibe="High-turnover shelves, multilingual ATM screens at many shops, and dense sandwich plus bento rows hugging cold vault doors."
        strengths={[
          "ATM corners that frequently accept foreign debit cards inside the store footprint",
          "Meal variety from salads to simmered sides with steady restocking",
          "Ubiquitous placement near stations, residential corners, and hospital blocks",
        ]}
        watchFor="Registers spike before commuter peaks; seating is rare at tight formats, so plan standing meals or hotel returns."
      />

      <ChainSection
        name="Lawson"
        tagline="A dessert-forward lane with collab snacks that rotate faster than most travelers can sample."
        vibe="Pastry cases and chilled sweets zones often steal attention before you reach savory rows; seasonal branding piles near doors."
        strengths={[
          "Premium dessert lines and bakery-adjacent picks tourists photograph",
          "Collaboration packaging that mirrors anime, games, and beverage drops",
          "Strong coffee corners inside newer storefront layouts",
        ]}
        watchFor="Hot food breadth varies by footprint; chase flagship desserts, verify savory stock when stores sit inside quiet office towers."
      />

      <ChainSection
        name="FamilyMart"
        tagline="Famichiki fame anchors a balanced konbini routine between fried comfort and lighter chilled plates."
        vibe="Blue-green signage, hot cases staged near registers, and Famichiki chatter among locals grabbing midnight protein."
        strengths={[
          "Famichiki and fried chicken culture worth one honest taste test",
          "Balanced bento rotation plus salads when you want greens between ramen nights",
          "Everyday staples across cities without gimmick fatigue",
        ]}
        watchFor="ATM availability can trail 7-Eleven density; scan storefront signage before assuming withdrawals indoors."
      />

      <section className="mb-12">
        <H2>What tourists actually buy</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Think in three lanes: meals that replace a restaurant hour, snacks
            that fuel walks, and drinks that beat vending-machine curiosity when
            you want shelves side by side.
          </p>
          <CheckList
            items={[
              "Meals: bentos, noodle cups, salads, simmer kits, microwave plates",
              "Snacks: chips with unfamiliar flavors, petite desserts, share packs for trains",
              "Drinks: teas, coffees, electrolyte bottles, seasonal sodas, small milks",
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <H2>Food quality reality</H2>
        <p className="article-body max-w-2xl">
          Chilled chains move inventory quickly, so sandwiches and rice balls often
          taste fresher than visitors expect from convenience labeling. Prices stay
          approachable versus sit-down meals, yet seasoning can still shock anyone
          comparing home-country gas station tiers. Treat konbini food as engineered
          daily nutrition with occasional standout gems, not random leftovers.
        </p>
      </section>

      <section className="mb-12">
        <H2>Best bites and surprisingly good picks</H2>
        <CheckList
          items={[
            "Egg sandwich rows when labels promise thicker omelet cuts",
            "Onigiri triangles with clear filling markers once you learn wrap tabs",
            "Custard or pudding cups that locals quietly rank by brand",
            "Famichiki at FamilyMart when you want crunchy chicken without a queue ticket",
            "Lawson Karaage-kun cups for bite-sized fried chicken train snacks",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Healthy options checklist</H2>
        <CheckList
          items={[
            "Chilled salads with separate dressing pockets",
            "Vegetable-heavy bentos labeled with calorie counts when present",
            "Yogurt, fruit cups, and boiled egg packs",
            "Sugar-free teas plus sparkling waters instead of dessert drinks",
            "Protein bars tucked near fitness-oriented shelves at larger stores",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Breakfast combinations</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse border border-paper-edge bg-paper-card font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-paper-edge bg-paper-elevated">
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Style
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Build
                </th>
              </tr>
            </thead>
            <tbody className="article-body">
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Budget
                </td>
                <td className="px-4 py-3">
                  Onigiri duo plus small juice or milk tea under bright ceiling
                  lights
                </td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Better
                </td>
                <td className="px-4 py-3">
                  Egg sandwich, salad cup, and canned coffee before a walking day
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Healthy
                </td>
                <td className="px-4 py-3">
                  Yogurt, fruit, boiled eggs, unsweetened tea, minimal fried trays
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <H2>Onigiri packaging trick</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Peel numbered tabs in order so plastic releases without ripping nori.
            Most wrappers hide a sequence printed along edges; follow it slowly
            the first time instead of attacking corners like a snack panic.
          </p>
          <p>
            If seaweed feels soft, you peeled out of sequence. Grab a fresh
            triangle when budgets allow rather than fighting sticky rice battles on
            a moving train.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Hot food counters</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Fried chicken, croquettes, and steamed buns wait under heat lamps or
            sealed drawers. Point, nod, or hold up fingers for counts when phrases
            fail; staff bag items fast before payment queues lengthen.
          </p>
          <p>
            Sauce packets sometimes sit adjacent trays; grab sparingly so counters
            stay tidy for locals ordering behind you.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Coffee machines</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Buy the cup or tumbler SKU at the register first when signage demands
            it. After the barcode beeps, pour at the self-serve machine using size
            buttons that match your sleeve color.
          </p>
          <p>
            Listen for grind hiss versus instant pours; some chains separate fresh
            grind lanes from budget mixes. Recycle bins near exits sort lids versus
            liquids at conscientious stores.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Microwaves and staff heating</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Dedicated microwave bays sit near exits at many formats. Press labeled
            buttons matching your bento barcode suggestion when stickers specify
            seconds.
          </p>
          <p>
            Ask staff softly with{" "}
            <span className="font-sans font-bold text-ink">
              Atatamemasu ka?
            </span>{" "}
            when counters guard heating. Offer{" "}
            <span className="font-sans font-bold text-ink">Onegaishimasu</span>{" "}
            with a nod if they prefer handling trays themselves during rush waves.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Eating areas and etiquette</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Use provided counters or park benches when available instead of
            blocking aisle traffic with wide luggage sprawls. Keep voices low;
            konbini bustle rewards efficiency.
          </p>
          <p>
            Walking while eating draws side-eye in many districts even when you feel
            harmless. Step aside near building alcoves or seating pockets before
            biting into hot sandwiches.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>ATMs for foreign cards</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            7-Eleven ATM corners remain the most dependable indoor withdrawal stops
            for many overseas debit cards, though networks still vary by issuer.
            Read limits, weekend timing quirks, and tap-to-pay overlap inside{" "}
            <Link href="/guides/money-payments-japan" className={inlineLink}>
              money, cards, and cash in Japan
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Cashless payments</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            IC transit cards, domestic QR rails, and foreign contactless cards
            work at countless registers, yet rural pockets or tiny franchises may
            flash cash-only moments without warning.
          </p>
          <p>
            Carry modest yen anyway for lockers, shrines, rural taxis, and the odd
            machine that rejects your card brand despite optimistic stickers.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Bill payment for residents</H2>
        <p className="article-body max-w-2xl">
          Long-term residents scan barcoded slips at counters or multifunction
          kiosks, then settle with cash or cards depending on invoice type.
          Tourists rarely touch this lane unless apartment invoices arrive during
          extended stays, yet noticing the queue explains why registers suddenly
          prioritize paperwork ahead of onigiri buyers.
        </p>
      </section>

      <section className="mb-12">
        <H2>Ticket and service kiosks</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Lawson Loppi terminals, FamilyMart multi-copy style kiosks, and similar
            multifunction machines sell concert vouchers, museum timed slots, and
            domestic travel extras without wrestling Japanese-only websites on
            spotty hotel WiFi.
          </p>
          <p>
            Expect Japanese-forward menus; screenshot reservation codes, lean on
            translation apps slowly, and queue behind locals handling utility bills
            when deadlines collide after five.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Luggage shipping counters</H2>
        <p className="article-body max-w-2xl">
          Yamato or comparable courier desks inside larger konbini forward suitcases
          between airports and hotels when paperwork feels intimidating elsewhere.
          Bring hotel addresses in Japanese printouts when possible, confirm
          cutoff hours, and photograph tracking slips before wandering off for
          ramen.
        </p>
      </section>

      <section className="mb-12">
        <H2>SIM cards and prepaid phones</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Some stores stock prepaid data SIMs or refill cards, yet inventory
            swings wildly by prefecture. Visitors increasingly skip shelves for
            eSIM installs planned before departure or at airport kiosks with clearer
            English prompts.
          </p>
          <p>
            Compare routes inside{" "}
            <Link href="/guides/sim-card-japan" className={inlineLink}>
              SIM cards and eSIM for Japan
            </Link>{" "}
            before assuming konbini solves connectivity overnight.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Trash bins etiquette</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Public bins remain scarce outside parks and konbini fronts. Use store
            cans politely, split burnable versus recyclables when labeled panels
            demand discipline, and never dump unrelated household trash into tourist
            kindness cans.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Late-night usefulness</H2>
        <p className="article-body max-w-2xl">
          Urban flagship shops stay open around the clock while suburban siblings
          post midnight closures. Night arrivals lean on bright aisles for water,
          toiletries, phone cables, and calm ATM corners when streets feel hollow.
        </p>
      </section>

      <section className="mb-12">
        <H2>Seasonal products</H2>
        <p className="article-body max-w-2xl">
          Sakura sweets, summer citrus coolers, autumn sweet potato desserts, and
          winter stews rotate through chillers with hype stickers. Treat limited
          drops as low-risk souvenirs when luggage space allows; flavors fade fast
          once campaigns end.
        </p>
      </section>

      <section className="mb-12">
        <H2>Emergency travel uses</H2>
        <CheckList
          items={[
            "USB chargers and batteries when luggage adapters vanish",
            "Compact umbrellas beside doorway buckets during sudden storms",
            "Basic medicine aisles for headache, allergy, or stomach relief labels you can translate slowly",
            "Copy and print services when hotels botch boarding passes",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Common tourist mistakes</H2>
        <CheckList
          items={[
            "Skipping quiet corners before eating and blocking narrow aisles instead",
            "Microwaving sealed trays without vent peels and staining microwave bays",
            "Assuming every register accepts every foreign card without backup yen",
            "Ignoring numbered onigiri tabs and blaming seaweed texture on the brand",
            "Buying coffee cups before scanning barcodes and confusing machine queues",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Which chain wins your trip</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse border border-paper-edge bg-paper-card font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-paper-edge bg-paper-elevated">
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Scenario
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Lean toward
                </th>
              </tr>
            </thead>
            <tbody className="article-body">
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  First konbini meal plus ATM confidence
                </td>
                <td className="px-4 py-3">7-Eleven</td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Dessert crawl or collab hunting
                </td>
                <td className="px-4 py-3">Lawson</td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Fried chicken benchmark night
                </td>
                <td className="px-4 py-3">FamilyMart</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Balanced everyday staples without overthinking
                </td>
                <td className="px-4 py-3">
                  Any major chain nearest your hotel door
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
            Let konbini shrink travel anxiety: they exist so you can solve hunger,
            weather, paperwork, and banking without heroic Japanese vocabulary.
          </p>
          <p>
            Rotate chains when curiosity strikes, yet default to whichever bright
            storefront sits between your hotel door and the subway stairs. Speed and
            kindness beat chasing mythical single-best snacks every night.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Related guides</H2>
        <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
          <li>
            <Link href="/guides/money-payments-japan" className={linkClass}>
              Money, cards, and cash in Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/sim-card-japan" className={linkClass}>
              SIM cards and eSIM for Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-airport-first-steps" className={linkClass}>
              First 60 minutes at the airport
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-trains" className={linkClass}>
              How to use trains in Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-budget-breakdown" className={linkClass}>
              Japan trip cost breakdown
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-living-cost" className={linkClass}>
              Japan living costs overview
            </Link>
          </li>
        </ul>
      </section>

      <GuideEndCta
        parentHref="/guides/start-here-japan"
        parentLabel="Japan trip planning"
      />
    </>
  );
}
