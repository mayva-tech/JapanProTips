import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "How Restaurants Work in Japan (Ordering, Payments, Etiquette)",
  description:
    "Japan restaurant flow for tourists: seating, ticket machines, tablets, payment, tipping, solo dining, ramen and izakaya etiquette, allergies, reservations, and budget tips.",
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

export default function JapanRestaurantGuidePage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      showHotelConversion={false}
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          How Restaurants Work in Japan (Ordering, Payments, Etiquette)
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
        Eating out in Japan is easier than it looks once you recognize a few
        repeating patterns. Solo dining is normal, signals are often visual, and
        most shops want you in and out without a vocabulary test.
      </p>
      <p>
        Start with{" "}
        <Link href="/guides/start-here-japan" className={inlineLink}>
          Japan trip planning order
        </Link>{" "}
        if you have not locked SIM, trains, and money basics yet, then use this
        page as a field guide for the meal itself.
      </p>
    </div>
  );
}

function MainContent() {
  return (
    <>
      <section className="mb-12">
        <H2>Step-by-step flow most nights</H2>
        <CheckList
          items={[
            "Enter: check signs for queues, shoes-off zones, or ticket machines near the door",
            "Wait: follow floor stickers or staff direction; some spots want your group counted before seating",
            "Seated: menu, tablet, or QR appears; place bags where shown so aisles stay clear",
            "Order: ticket, tablet, verbal, or counter; match photos or set meal codes when Japanese text wins",
            "Eat: pace matches the format (ramen fast, izakaya slow); keep voice volume near neighbors",
            "Pay: raise a hand or walk to the register with your slip; see counter versus table rules below",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Irasshaimase greeting</H2>
        <p className="article-body max-w-2xl">
          Staff often call a welcome phrase when you enter. A small nod is plenty.
          You do not need to echo it unless you want to; the goal is calm
          acknowledgment, not a scripted exchange.
        </p>
      </section>

      <section className="mb-12">
        <H2>Ticket machine restaurants (ramen, fast casual)</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Insert cash or tap card per machine labels, press the photo or
            button for your set, then take every printed slip. Hand the full
            ticket to staff when called; some shops separate food tickets from
            drink add-ons.
          </p>
          <p>
            If the machine feels stuck, step aside, watch one local cycle, or
            point at the picture you want. Staff usually prefer a clumsy ticket
            over a blocked line.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Tablet ordering (English often available)</H2>
        <p className="article-body max-w-2xl">
          Family chains and some casual spots use tablets with language toggles.
          Tap sets, confirm counts, and send the order; refills or dessert rounds
          use the same device. When English fails, photo rows and allergen icons
          still communicate most picks.
        </p>
      </section>

      <section className="mb-12">
        <H2>Calling staff with Sumimasen</H2>
        <p className="article-body max-w-2xl">
          Raise a hand slightly and say{" "}
          <span className="font-sans font-bold text-ink">Sumimasen</span> at
          moderate volume. It means excuse me, not rudeness. Use it for menus,
          water refills, checks, and allergy questions when you cannot catch eye
          contact.
        </p>
      </section>

      <section className="mb-12">
        <H2>Water and oshibori etiquette</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Cold water often arrives free without asking. Pour for yourself when
            carafes sit on the table; ask softly if nothing arrives during long
            waits.
          </p>
          <p>
            Wet towels clean hands before eating, not your face or phone. Fold
            them tidy on the small dish when done unless staff clears them early.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Menu styles you will actually see</H2>
        <CheckList
          items={[
            "Picture menus with numbered sets and coupon-style add-on rows",
            "Plastic food windows outside that preview portions and noodle depth",
            "Teishoku set plates with rice, soup, pickles, and main labeled as a bundle",
            "Seasonal inserts or tablet-only items that never hit a paper book",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Solo dining culture</H2>
        <p className="article-body max-w-2xl">
          Counter seats, booth dividers, and ramen stools all expect lone
          diners. Bring a book or phone, eat quietly, and do not apologize for
          a party of one. Shops seat singles faster than groups during peaks.
        </p>
      </section>

      <section className="mb-12">
        <H2>Ramen shop etiquette</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Order fast, eat at pace, slurping is acceptable, and finish broth
            only if you want to; leaving some liquid is not shameful. Avoid long
            phone calls or lingering once seats wait at the door.
          </p>
          <p>
            Tight shops want turnover; gather bags before you stand so the next
            guest slides in without a luggage ballet.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Izakaya culture</H2>
        <p className="article-body max-w-2xl">
          Expect slower rounds, shared plates, and drink-first pacing. Order
          plates for the table, pass dishes with clean ends, and match the room
          volume as it rises. Staff may keep small items coming until you pause
          ordering, so say when you are finished.
        </p>
      </section>

      <section className="mb-12">
        <H2>Konbini versus a sit-down meal</H2>
        <p className="article-body max-w-2xl">
          Convenience meals solve hunger at odd hours without seating drama.
          When you want a reset or quieter calories after a long train day, use{" "}
          <Link href="/guides/japan-convenience-store-guide" className={inlineLink}>
            Japanese convenience stores explained
          </Link>{" "}
          for hot cases, ATMs, and drink math before you chase a restaurant queue.
        </p>
      </section>

      <section className="mb-12">
        <H2>Pay at counter versus pay at table</H2>
        <p className="article-body max-w-2xl">
          Many casual shops expect you to carry a printed slip or table card to
          the register. Table payment happens in cafes or some kaiseki formats.
          Watch locals: if everyone queues near the door with a slip, join that
          line after you stand.
        </p>
      </section>

      <section className="mb-12">
        <H2>Cash versus card surprises</H2>
        <p className="article-body max-w-2xl">
          Cities favor tap-to-pay, yet tiny kitchens and old-school bars still
          post cash-only notes without drama. Read stickers at the ticket
          machine before you commit, and keep coins for legacy shops. Full context
          sits inside{" "}
          <Link href="/guides/money-payments-japan" className={inlineLink}>
            money, cards, and cash in Japan
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <H2>Splitting bills is usually awkward</H2>
        <p className="article-body max-w-2xl">
          Separate checks are uncommon; one person often pays and settles later
          by app or cash swap. Large chains with tablets may split, but do not
          assume it. Traveling pairs should agree on a payer before ordering
          rounds.
        </p>
      </section>

      <section className="mb-12">
        <H2>No tipping</H2>
        <p className="article-body max-w-2xl">
          Service is priced into the check. Leaving coins on the tray confuses
          staff and can require a chase to return money. Say thanks, bow lightly
          if you want, and walk out clean.
        </p>
      </section>

      <section className="mb-12">
        <H2>Quietness expectations</H2>
        <p className="article-body max-w-2xl">
          Keep phone calls, videos, and loud laughter contained, especially in
          cubed counter spaces. Match the room: izakaya noise climbs, kaiseki
          stays hushed, commuter-adjacent shops lean practical, not rowdy.
        </p>
      </section>

      <section className="mb-12">
        <H2>Allergy communication and cards</H2>
        <p className="article-body max-w-2xl">
          Carry a Japanese allergy card for serious reactions; show it before
          ordering, not after food arrives. Staff may refuse uncertain dishes
          rather than guess. Translation apps help, yet a printed card reads
          faster in a loud kitchen.
        </p>
      </section>

      <section className="mb-12">
        <H2>Vegetarian and vegan reality</H2>
        <p className="article-body max-w-2xl">
          Dashi from bonito hides in soups, sauces, and pickles even when a photo
          looks plant-only. Ask explicitly about fish-based stock; vegan labels
          are rarer than Western cities. Temple cuisine and some Indian or
          macrobiotic shops are safer anchors when strict rules apply.
        </p>
      </section>

      <section className="mb-12">
        <H2>Reservations versus walk-in</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            High-demand counters, sushi omakase, and popular kaiseki need
            bookings. Casual chains, ramen, and many lunch teishoku spots love
            walk-ins if you avoid exact noon peaks.
          </p>
          <p>
            Hotel concierges and simple Japanese phone phrases help when English
            web forms do not list tourists.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Last order (L.O.) timing</H2>
        <p className="article-body max-w-2xl">
          Kitchens post last order times before closing time. Treat L.O. as a
          hard stop for food and sometimes drinks. Arrive earlier than you think
          on Sundays or after last trains when suburbs shut fast.
        </p>
      </section>

      <section className="mb-12">
        <H2>Restaurant types at a glance</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse border border-paper-edge bg-paper-card font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-paper-edge bg-paper-elevated">
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  What to expect
                </th>
              </tr>
            </thead>
            <tbody className="article-body">
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">Ramen</td>
                <td className="px-4 py-3">
                  Ticket or counter order, fast eat, broth-forward customization
                </td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Izakaya
                </td>
                <td className="px-4 py-3">
                  Small plates, drinks, shared ordering, slower pace
                </td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Family restaurant
                </td>
                <td className="px-4 py-3">
                  Booths, tablets, broad menus, child-friendly volumes
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Kaiten sushi
                </td>
                <td className="px-4 py-3">
                  Plates by color or tablet; watch per-plate math
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <H2>Beginner-friendly chains worth knowing</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            These brands repeat across cities with clear photos and predictable
            payment rails. None are secret gems, but they reduce day-one anxiety.
          </p>
          <CheckList
            items={[
              "Ichiran and similar solo-booth ramen when you want isolation",
              "Gyudon shops: Sukiya, Matsuya, Yoshinoya for rice bowls under bright signage",
              "Saizeriya for budget pasta and sides with tablet or paper simplicity",
              "Kaiten picks such as Sushiro or Kura when you want color-coded plates",
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <H2>Tourist misunderstandings checklist</H2>
        <CheckList
          items={[
            "Waiting for a seating host when the ticket window is the real first step",
            "Tipping after great service and confusing the cashier",
            "Speaking loudly at counters built for three neighbors",
            "Assuming vegetarian photos skip fish-based dashi",
            "Splitting bills five ways without checking tablet limits",
            "Lingering in ramen shops past an obvious queue on the sidewalk",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Budget bands in yen (rough)</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse border border-paper-edge bg-paper-card font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-paper-edge bg-paper-elevated">
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Tier
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Typical range
                </th>
              </tr>
            </thead>
            <tbody className="article-body">
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">Cheap</td>
                <td className="px-4 py-3">About 500 to 1000 for bowls or sets</td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">Mid</td>
                <td className="px-4 py-3">About 1000 to 3000 for casual sit-down</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-ink">Fancy</td>
                <td className="px-4 py-3">Often 5000 plus before drinks</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="article-body max-w-2xl mt-4">
          Layer trains, hotels, and full-trip totals using{" "}
          <Link href="/guides/japan-budget-breakdown" className={inlineLink}>
            Japan trip cost breakdown
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <H2>Lunch versus dinner pricing</H2>
        <p className="article-body max-w-2xl">
          Lunch teishoku and office sets often cost less than the same brand at
          dinner. Look for lunch windows on weekdays when shops push set plates
          with soup and rice. Dinner menus add premium fish cuts and drink pair
          pacing that lift totals.
        </p>
      </section>

      <section className="mb-12">
        <H2>Useful phrases at the table</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse border border-paper-edge bg-paper-card font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-paper-edge bg-paper-elevated">
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Phrase
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  When to use
                </th>
              </tr>
            </thead>
            <tbody className="article-body">
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Sumimasen
                </td>
                <td className="px-4 py-3">Get attention for orders or help</td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Okaikei onegaishimasu
                </td>
                <td className="px-4 py-3">Ask for the check politely</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Arigatou gozaimashita
                </td>
                <td className="px-4 py-3">Thank staff after you pay or leave</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <H2>What to actually do in three messy moments</H2>
        <H3>Ticket machine confusion</H3>
        <p className="article-body mb-4 max-w-2xl">
          Step back, match the largest photo to the bowl you want, insert cash if
          Tap does not light up, and take every slip. Hand the stack to staff and
          point at your seat number if asked.
        </p>
        <H3>You cannot read the menu</H3>
        <p className="article-body mb-4 max-w-2xl">
          Use camera translation slowly, point at plastic models outside, or
          order the set with the most vegetables on the photo when you need a
          safe default. Say{" "}
          <span className="font-sans font-bold text-ink">Osusume</span> for a
          recommendation if the counter is not slammed.
        </p>
        <H3>Ready to pay</H3>
        <p className="article-body max-w-2xl">
          Raise a hand, say{" "}
          <span className="font-sans font-bold text-ink">Okaikei onegaishimasu</span>
          , then walk to the register with your slip or wait for the portable
          terminal. Bag your coins before you reach the door so you do not block
          the exit mat.
        </p>
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
            Let predictable formats do the heavy lifting: tickets, tablets, and
            photo rows exist so you can eat well without fluent Japanese.
          </p>
          <p>
            Pick one rule per meal: clear the line, control your volume, and pay
            the way locals queue. Courtesy beats perfection every time.
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
            <Link
              href="/guides/japan-convenience-store-guide"
              className={linkClass}
            >
              Japanese convenience stores explained
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-budget-breakdown" className={linkClass}>
              Japan trip cost breakdown
            </Link>
          </li>
          <li>
            <Link href="/guides/where-to-stay-tokyo" className={linkClass}>
              Where to stay in Tokyo
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-train-mistakes" className={linkClass}>
              Common transit mistakes
            </Link>
          </li>
          <li>
            <Link href="/guides/start-here-japan" className={linkClass}>
              Japan trip planning order
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
