import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "Luggage Delivery in Japan (Yamato, Airport Shipping, Hotels)",
  description:
    "How Yamato luggage forwarding works in Japan: airport to hotel, hotel to hotel, costs, timing, Shinkansen baggage rules, and when shipping beats dragging suitcases.",
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

export default function JapanLuggageShippingPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      showHotelConversion={false}
      title={
        <h1
          className="guide-page-title"
        >
          Luggage Delivery in Japan (Yamato, Airport Shipping, Hotels)
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
        Japan luggage forwarding is underused by many tourists compared with how
        often locals rely on it. You can ride trains with a light bag while
        suitcases move by truck and courier network to your next hotel or the
        airport.
      </p>
      <p>
        Pair this guide with{" "}
        <Link href="/guides/japan-airport-first-steps" className={inlineLink}>
          first steps at the airport
        </Link>{" "}
        and{" "}
        <Link href="/guides/japan-packing-list" className={inlineLink}>
          what to pack for Japan
        </Link>{" "}
        so you split carry-on essentials from bags that can travel separately on
        a slower schedule.
      </p>
    </div>
  );
}

function MainContent() {
  return (
    <>
      <section className="mb-12">
        <H2>What luggage forwarding is</H2>
        <p className="article-body max-w-2xl">
          Forwarding means your suitcase travels as freight that is unrelated to
          your JR ticket or airplane boarding pass. A courier collects it at one
          address, attaches a barcoded label with your destination kanji printed
          for staff, routes it overnight or across one or two days, and drops it
          at a staffed hotel lobby or predefined airport desk. You still need a
          daypack for tickets, valuables, meds, chargers, and a change of shirt.
        </p>
      </section>

      <section className="mb-12">
        <H2>Why forwarding helps on Japan trains</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Stations have stairs between platforms, tighter ticket gates during
            rush hour, narrow hotel elevators, and long walks inside megastations.
            A Shinkansen car is roomy for seated passengers yet still awkward for
            a full-size suitcase in the doorway during peak boarding. Forwarding is
            the clean way to dodge that drama when your route allows it.
          </p>
          <p>
            Read{" "}
            <Link href="/guides/japan-trains" className={inlineLink}>
              how trains work in Japan
            </Link>{" "}
            for IC cards and platform flow, then think of courier bags as freeing
            you to move like commuters instead of hauling half your closet.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Yamato Transport and Kuroneko</H2>
        <p className="article-body max-w-2xl">
          Visitors usually meet{" "}
          <span className="font-sans font-bold text-ink">
            Yamato Transport
          </span>{" "}
          at airport counters or hotel front desks through their luggage service
          (often referenced by the smiling black cat{" "}
          <span className="font-sans font-bold text-ink">Kuroneko</span>{" "}
          branding most English signage uses). Bags change hands fewer times than
          you expect, pickups are trackable online or by receipt number, staff are
          used to handwriting foreign names next to kanji addresses, and missed
          delivery windows are uncommon when hotels confirm participation.
        </p>
      </section>

      <section className="mb-12">
        <H2>Common forwarding types</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse border border-[#d4c9b0] bg-white font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-[#d4c9b0] bg-cream">
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                  Type
                </th>
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                  Typical pickup
                </th>
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                  Typical drop-off
                </th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Airport to hotel
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Arrival floor Yamato desk or kiosk
                </td>
                <td className="px-4 py-3">
                  Reception stores bag until evening or next afternoon
                </td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Hotel to hotel
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Front desk collects morning batch
                </td>
                <td className="px-4 py-3">
                  Next property signs for courier delivery
                </td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Hotel to airport
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Concierge prepares tag one or two mornings early
                </td>
                <td className="px-4 py-3">
                  Claim at airport Yamato desk before international check-in
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Ski gear
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  City hotel or airport bulky counter
                </td>
                <td className="px-4 py-3">
                  Resort bell desk or cooperating lodge
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <H2>Why Japanese travelers swear by it</H2>
        <p className="article-body max-w-2xl">
          Domestic commuters already minimize rollaboard chaos on commuter lines.
          Couriers solved the last mile for silver week trips, honeymoon moves
          between ryokan, anime convention hauls, and golf club shipments decades
          before tourists noticed. Reliable timing plus cash or card acceptance at
          counters makes forwarding feel boring in the best way.
        </p>
      </section>

      <section className="mb-12">
        <H2>Shinkansen oversized baggage reservations</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            JR now requires oversized luggage reservations on certain trains for
            large suitcases in specified deck zones. Booking the slot solves the
            rule, yet you still lift the case up steps, tuck it under strangers’
            legs in lines, and stress about elevators that skip your platform bag.
            Compliance is tiring even when technically allowed.
          </p>
          <p>
            Forwarding between cities turns the bullet train segment into an
            easy chair ride rather than wrestling day.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Train and station realities with big bags</H2>
        <CheckList
          items={[
            "Urban subway transfers expect quick stair sprints unless you memorize every elevator map",
            "Local train doors stay open briefly; bulky bags snag on poles and backpacks",
            "Coin lockers disappear during holidays around major hubs while forwarding slots keep moving",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Same-day versus next-day expectations</H2>
        <p className="article-body max-w-2xl">
          Airport to central Tokyo hotels often arrives same evening if dropped
          before the lunch cutoff, while hotel-to-hotel moves across regions
          usually budget one full transit day plus an afternoon buffer.
          Domestic flight connections deserve at least two lead days when baggage
          must greet you at Haneda baggage service before departure. Always ask
          the counter for guaranteed arrival windows tied to your checkout time.
        </p>
      </section>

      <section className="mb-12">
        <H2>Step-by-step: Narita Airport to a Tokyo hotel</H2>
        <H3>Counter flow</H3>
        <CheckList
          items={[
            "After customs, follow bilingual signs to Yamato or airport luggage desks near train gates",
            "Fill the triplicate forwarding form using hotel postal address staff print next to kanji labels",
            "Pay by card when available; yen cash still common, so split payment types if splitting bags",
            "Keep passport, meds, chargers, valuables, toiletries, overnight clothing in your backpack only",
            "Ride the Narita Express or limousine bus lightly loaded; suitcases reunite evening or early next afternoon",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Step-by-step: Tokyo hotel to Kyoto hotel</H2>
        <H3>Front desk morning batch</H3>
        <CheckList
          items={[
            "Night before departure, notify front desk you need courier pickup before checkout time",
            "Morning of travel, concierge fills Yamato airway bill with Kyoto property name kanji spelling",
            "Expect roughly ¥1500-¥3000 per standard suitcase intra-Kanto/Kansai, more for oversize wardrobes",
            "Board Shinkansen with daypack plus souvenirs; concierge texts tracking stub number if branded apps fail",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Step-by-step: Before a domestic flight</H2>
        <p className="article-body max-w-2xl">
          Domestic flights charge steep oversize baggage and sometimes lack belt
          space for odd shapes. Ship one to two mornings early to Haneda Narita or
          Itami counters so skis, golf bags, or second suitcases greet you landside.
          Carry only TSA-needed liquids sized for security and personal comfort
          items that fit under the seat ahead.
        </p>
      </section>

      <section className="mb-12">
        <H2>Shipping from airports and to airports</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Arrival desks lighten your jet lag immediately. Departure desks do the
            inverse: Osaka hotel staff often suggest shipping two mornings before an
            international flight so bulky bags clear customs-ready zones without
            last-minute trolley panic.
          </p>
          <p>
            Always photograph both receipt halves and stash phone offline copies so
            lost luggage desks can correlate serial numbers instantly.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Convenience store Yamato support</H2>
        <p className="article-body max-w-2xl">
          FamilyMart and Lawson locations with attached parcel corners sell boxes,
          tape, prepaid labels where supported, and print pickup QR codes Yamato
          routes to drivers. Skill varies by franchise, yet it rescues rainy days
          when hotel desks close early. Background reading:{" "}
          <Link
            href="/guides/japan-convenience-store-guide"
            className={inlineLink}
          >
            Japanese convenience stores explained
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <H2>Hotel participation and planning ahead</H2>
        <p className="article-body max-w-2xl">
          Boutique machiya, mountain huts, and tiny business hotels occasionally
          skip courier partnerships. Email before booking confirmation or pivot to
          a nearby chain with bell service. Larger properties batch pickups at
          9:00 a.m.; missing the window means hauling bags yourself anyway.
        </p>
      </section>

      <section className="mb-12">
        <H2>Costs and size limits</H2>
        <H3>Quick reference</H3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse border border-[#d4c9b0] bg-white font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-[#d4c9b0] bg-cream">
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                  Topic
                </th>
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                  Ballpark visitor notes
                </th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Standard suitcase intra-region
                </td>
                <td className="px-4 py-3">
                  Often ¥1500-¥3000; airport premiums add surcharge bands
                </td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Combined dimensions
                </td>
                <td className="px-4 py-3">
                  Linear sum limits apply; clerks refuse overweight pieces politely
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Payment flexibility
                </td>
                <td className="px-4 py-3">
                  Carry IC-friendly cards plus yen for rural counters lacking tap
                  readers
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <H2>Ski and snowboard deliveries</H2>
        <p className="article-body max-w-2xl">
          Specialty ski bags route from Haneda lockers to Hakuba lodges when snow
          season peaks. Shops wrap edges in corrugated armor; declare expensive
          bindings at counters for optional insurance tiers. Resorts expect late
          evening arrivals aligned with housekeeping shifts, so screenshot drop-off
          promise times.
        </p>
      </section>

      <section className="mb-12">
        <H2>Paper forms and English help</H2>
        <p className="article-body max-w-2xl">
          Airport counters usually stock bilingual overlays; hotel staffs often
          prewrite kanji postal codes blocking tourist handwriting errors.
          Memorize pronunciation of phonetic spelling for your surname so clerks
          match audio notes on drivers’ tablets.
        </p>
      </section>

      <section className="mb-12">
        <H2>Keep-on-your-person essentials</H2>
        <CheckList
          items={[
            "Passport, printed visa authorization or QR whichever applies",
            "Prescription meds, glasses, allergy kit, menstrual supplies",
            "Chargers including USB-C bricks and destination plug adapters already tested",
            "One complete outfit layering for weather swings plus underwear",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Tracking and photographing receipts</H2>
        <p className="article-body max-w-2xl">
          Receipts duplicate customer and driver halves. Snap QR codes linking to
          status pages even if text is kanji-heavy; courier English portals exist
          for major tracking prefixes. Offline photos save you during WiFi outages
          in rural onsen towns.
        </p>
      </section>

      <section className="mb-12">
        <H2>Fragile items warning</H2>
        <p className="article-body max-w-2xl">
          Courier trucks stack vertically overnight. Wrapped ceramics survive when
          double-boxed inside rigid luggage, yet museum artwork and loose bottles
          prefer carry-on cushioning. Liquids exceeding airline rules still violate
          security if you forward them onto planes.
        </p>
      </section>

      <section className="mb-12">
        <H2>Busy seasons deserve earlier shipping</H2>
        <CheckList
          items={[
            "Golden Week: add one night buffer versus normal overnight promises",
            "New Year: rural routes pause; airports maintain skeleton crews yet queue longer",
            "Cherry blossom weeks: lockers vanish fastest, forwarding slots sell out midday",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Coin lockers versus forwarding</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse border border-[#d4c9b0] bg-white font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-[#d4c9b0] bg-cream">
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                  Coin lockers
                </th>
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                  Yamato forwarding
                </th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  DIY drag between platforms; limited oversized bays
                </td>
                <td className="px-4 py-3">
                  Trucks handle lifts; concierge signs at each end when hotels agree
                </td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Same-day hourly rent; risk forgetting PIN or late fees
                </td>
                <td className="px-4 py-3">
                  Overnight schedule; prepaid flat fee avoids meter anxiety
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Great half-day Kyoto temple loops with one backpack
                </td>
                <td className="px-4 py-3">
                  Better multi-city itineraries with nightly hotel swaps
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <H2>Worth it versus skip forwarding</H2>
        <CheckList
          items={[
            "Ship when you change neighborhoods every night across metro regions",
            "Ship when elbows or joints struggle with JR stair counts",
            "Skip when staying one walkable ward with elevator subway exits only",
            "Skip ultra short trips where courier fees outweigh pain of one taxi haul",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Common mistakes first-timers repeat</H2>
        <CheckList
          items={[
            "Leaving passport sealed inside forwarded luggage hours before outbound flight",
            "Writing romaji-only hotel addresses without clerks rewriting kanji",
            "Skipping hotel confirmation desks at tiny inns allergic to outsiders",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>Plan trains and lodging together</H2>
        <p className="article-body max-w-2xl">
          Courier drop-offs behave better when arrival stations sit near concierge
          desks instead of labyrinth mall exits.
          Use{" "}
          <Link href="/guides/japan-airport-to-city" className={inlineLink}>
            airport-to-city logistics
          </Link>{" "}
          alongside{" "}
          <Link href="/guides/where-to-stay-tokyo" className={inlineLink}>
            Tokyo neighborhood picks for first timers
          </Link>{" "}
          so your suitcase path matches whichever rail corridor you mastered on
          day one.
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
            Treat Yamato pickups like boarding passes you schedule instead of gamble.
            Carry light for the sweaty transfer segments, stash tracking photos
            before you roam without signal, and reconfirm hotel cooperation on
            check-in night one.
          </p>
          <p>
            If something feels ambiguous at the counter, point at timestamps on the
            form and mimic your intended checkout hour. Humans correct routing
            faster than apps mistranslated from romaji guesses.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Related guides</H2>
        <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
          <li>
            <Link
              href="/guides/japan-airport-first-steps"
              className={linkClass}
            >
              First 60 minutes at the airport
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-airport-to-city" className={linkClass}>
              Airport to your hotel
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-trains" className={linkClass}>
              How to use trains in Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-packing-list" className={linkClass}>
              Japan packing list by season
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
        </ul>
      </section>

      <GuideEndCta
        parentHref="/guides/japan-airport-first-steps"
        parentLabel="First steps at the airport"
      />
    </>
  );
}
