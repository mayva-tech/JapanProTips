import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "Biggest Mistakes First-Time Japan Tourists Make",
  description:
    "Common Japan trip mistakes that tire people out, not derail the trip: packing, walking load, data, cash, trains, hotels, weather, reservations, and realistic fixes.",
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

export default function JapanTouristMistakesPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      showHotelConversion={false}
      title={
        <h1
          className="guide-page-title"
        >
          Biggest Mistakes First-Time Japan Tourists Make
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
        Most first-time surprises in Japan are exhausting, not dangerous. Streets
        are calm, transit is predictable, and locals are generally patient with
        tourists who try basic courtesy. The costly errors are usually the boring
        ones: heavy bags on stairs, weak phone data, and schedules that pretend
        you can teleport between cities after a twelve-hour flight.
      </p>
      <p>
        Think of this as a field guide to save your legs and your budget. Start
        with the foundation in{" "}
        <Link href="/guides/start-here-japan" className={inlineLink}>
          Japan trip planning
        </Link>
        , then use the fixes below like a checklist you can skim the night before
        you fly.
      </p>
    </div>
  );
}

function MainContent() {
  return (
    <>
      <section className="mb-6">
        <H2>Common mistakes and practical fixes</H2>
        <p className="article-body max-w-2xl mb-6">
          Each item below is a pattern we see often. The fix is meant to reduce
          friction on real sidewalks, real ticket gates, and real humid afternoons.
        </p>

        <H3>Overpacking</H3>
        <p className="article-body max-w-2xl">
          Heavy rolling bags turn staircases and tight hotel rooms into a daily
          workout. Pack for laundry, layers, and shoes you have already walked ten
          thousand steps in. Use{" "}
          <Link href="/guides/japan-packing-list" className={inlineLink}>
            the Japan packing list by season
          </Link>{" "}
          as your default template instead of packing for imaginary weather.
        </p>

        <H3>Underestimating walking</H3>
        <p className="article-body max-w-2xl">
          Many visitors log 15k-30k steps without trying because stations are huge
          and sights spread out. Fix: plan one anchor neighborhood per half day,
          wear broken-in shoes, and assume you will walk farther than map apps
          suggest inside major hubs.
        </p>

        <H3>No internet or SIM</H3>
        <p className="article-body max-w-2xl">
          Offline life is possible yet slow for tickets, translations, and backups
          when plans shift. Fix: activate data before you need it in a basement
          corridor. Compare eSIM, SIM, and pocket WiFi in{" "}
          <Link href="/guides/sim-card-japan" className={inlineLink}>
            the Japan SIM guide
          </Link>
          .
        </p>

        <H3>Too much or too little cash</H3>
        <p className="article-body max-w-2xl">
          Some small shops, weekday lunch spots, lockers, and regional taxis still
          prefer yen, while major chains lean on cards and QR. Fix: keep a modest
          yen cushion you can replenish at convenience store ATMs, carry two
          payment types, and read{" "}
          <Link href="/guides/money-payments-japan" className={inlineLink}>
            money, cards, and cash in Japan
          </Link>{" "}
          so expectations match reality.
        </p>

        <H3>Wrong hotel area</H3>
        <p className="article-body max-w-2xl">
          A cheap room far from useful train lines can add an hour of transfers
          twice a day. Fix: prioritize a sane walk to a JR or subway line you
          will actually use, not only the lowest nightly rate. Use{" "}
          <Link href="/guides/where-to-stay-tokyo" className={inlineLink}>
            where to stay in Tokyo
          </Link>{" "}
          as a template for how to read station maps and neighborhoods.
        </p>

        <H3>Too many cities</H3>
        <p className="article-body max-w-2xl">
          Japan rewards depth. Jumping Tokyo, Kyoto, Osaka, and a side trip in one
          week often means checking out more than you experience. Fix: anchor fewer
          bases, add buffer nights, and sketch transfers with honest checkout and
          Shin check-in times using{" "}
          <Link href="/guides/japan-itinerary" className={inlineLink}>
            the Japan itinerary guide
          </Link>
          .
        </p>

        <H3>Train confusion</H3>
        <p className="article-body max-w-2xl">
          Express versus local, reserved versus non-reserved, and duplicate
          company names trip people up more than geography. Fix: learn platform
          discipline once, then reuse it everywhere. Read{" "}
          <Link href="/guides/japan-trains" className={inlineLink}>
            how to use trains in Japan
          </Link>{" "}
          and{" "}
          <Link href="/guides/japan-train-mistakes" className={inlineLink}>
            common train mistakes tourists make
          </Link>{" "}
          before your first shinkansen day.
        </p>

        <H3>Giant luggage on transit</H3>
        <p className="article-body max-w-2xl">
          Full-size suitcases on commuter trains at rush hour annoy everyone,
          including your future self on stairways. Fix: shrink carry-on volume,
          ship bags when hotels cooperate, and read{" "}
          <Link href="/guides/japan-luggage-shipping" className={inlineLink}>
            luggage delivery in Japan
          </Link>{" "}
          so you know when forwarding beats dragging.
        </p>

        <H3>Weather and humidity surprises</H3>
        <p className="article-body max-w-2xl">
          Summer heat and rainy season humidity exhaust people who packed only
          runway outfits. Fix: plan breathable layers, a compact umbrella, and
          realistic outdoor time. Month-by-month context lives in{" "}
          <Link href="/guides/japan-weather-by-month" className={inlineLink}>
            Japan weather by month
          </Link>
          .
        </p>

        <H3>Expecting English everywhere</H3>
        <p className="article-body max-w-2xl">
          You will hear English in plenty of hotels, major stations, and popular
          sights, yet rural buses, small izakaya, and handwritten menus may stay
          Japanese only. Fix: keep an offline translation app, point at photos
          calmly, and learn a handful of polite phrases. Gesture and patience go a
          long way.
        </p>

        <H3>No reservations for popular spots</H3>
        <p className="article-body max-w-2xl">
          High-demand restaurants, some museums, and peak season attractions sell
          out while you are still in line. Fix: book what matters most two weeks
          ahead when possible, build a Plan B neighborhood walk, and avoid pinning
          happiness on a single TikTok table.
        </p>

        <H3>Social media expectations</H3>
        <p className="article-body max-w-2xl">
          Viral clips compress lighting, crop crowds, and skip queue reality.
          Fix: chase the vibe you want, not a shot-for-shot remake of someone
          else&apos;s afternoon, and leave margins for quiet detours that never
          trend online.
        </p>

        <H3>Poor time management</H3>
        <p className="article-body max-w-2xl">
          Underestimating station exits, bag drops, and last trains turns a calm
          day into a sprint. Fix: add thirty to sixty-minute cushions around
          long-distance hops, eat when hungry instead of delaying into hangry
          decisions, and treat &quot;one more shrine&quot; as optional.
        </p>

        <H3>Not using luggage forwarding</H3>
        <p className="article-body max-w-2xl">
          Couriers are boring magic: bags move hotel to hotel while you ride light.
          Fix: ask front desks early, photograph tracking slips, and keep meds and
          valuables on your body, not in forwarded suitcases. Details sit in{" "}
          <Link href="/guides/japan-luggage-shipping" className={inlineLink}>
            luggage delivery in Japan
          </Link>
          .
        </p>

        <H3>Rush hour with luggage</H3>
        <p className="article-body max-w-2xl">
          Tight train cars at 8:00 a.m. and 6:00 p.m. are hard enough without a
          rollaboard pinned against strangers. Fix: travel midmorning when you
          can, taxi short segments with heavy bags, or shift a move day so you
          ride express lines outside the worst window. Pair with{" "}
          <Link href="/guides/japan-trains" className={inlineLink}>
            train basics
          </Link>{" "}
          so you pick platforms with elevators on purpose.
        </p>

        <H3>Restaurant timing and last order</H3>
        <p className="article-body max-w-2xl">
          Kitchens close entries earlier than tourists expect, especially at
          smaller shops with one chef. Fix: aim for standard meal windows, watch
          for &quot;last order&quot; signs, and carry snacks so a missed seating
          becomes a stroll instead of a meltdown. Queue discipline still matters
          even when you are hungry.
        </p>

        <H3>IC card confusion</H3>
        <p className="article-body max-w-2xl">
          Suica-style cards are simple once you know tap in, tap out, and top up.
          Fix: one physical or mobile IC wallet per traveler, charge before long
          days, and do not stress brand names you cannot pronounce. Read{" "}
          <Link href="/guides/suica-pasmo-guide" className={inlineLink}>
            Suica and PASMO explained
          </Link>{" "}
          and keep{" "}
          <Link href="/guides/japan-trains" className={inlineLink}>
            train habits
          </Link>{" "}
          nearby when maps disagree with instinct.
        </p>

        <H3>The cashless myth</H3>
        <p className="article-body max-w-2xl">
          Japan is modern about payments, yet cash still appears in daily life.
          Fix: treat cards as primary, yen as backup, and ignore slogans that say
          you never need bills. The grounded version lives in{" "}
          <Link href="/guides/money-payments-japan" className={inlineLink}>
            the money and payments guide
          </Link>
          .
        </p>

        <H3>Trash bin expectations</H3>
        <p className="article-body max-w-2xl">
          Public bins are scarcer than in many countries, so small trash lingers
          in pockets longer than feels normal. Fix: carry a tiny baggie, recycle
          bottles where marked, and use convenience store disposal thoughtfully.
          Read{" "}
          <Link href="/guides/japan-convenience-store-guide" className={inlineLink}>
            Japanese convenience stores explained
          </Link>{" "}
          for ATM and snack stops, and peek at{" "}
          <Link
            href="/guides/how-to-use-japanese-toilets"
            className={inlineLink}
          >
            toilets, trash, and train etiquette
          </Link>{" "}
          if you want the fuller everyday picture.
        </p>

        <H3>Overplanning every minute</H3>
        <p className="article-body max-w-2xl">
          Spreadsheets are comforting before departure yet brittle on fatigued day
          four. Fix: protect one unscheduled block daily, keep must-see lists
          short, and let interesting side streets win sometimes. You will still
          go home with stories.
        </p>
      </section>

      <section className="mb-6">
        <H2>Harmless mistakes versus genuinely problematic ones</H2>
        <p className="article-body max-w-2xl mb-4">
          Rough categories help you ration stress. Annoying is normal. Fixable is
          the default.
        </p>
        <H3>Usually harmless if you adapt fast</H3>
        <CheckList
          items={[
            "Boarding a local instead of an express once, then correcting at the next stop",
            "Ordering lunch with gestures because the menu stayed in Japanese",
            "Walking an extra ten minutes because an exit looked prettier",
            "Carrying convenience store trash until you find the right bin",
          ]}
        />
        <H3>Worth treating seriously early</H3>
        <CheckList
          items={[
            "No data and no offline map on day one in a major station",
            "Large suitcases during peak commuter crush with tight connections",
            "Ignoring oversize Shinkansen rules and hoping staff look away",
            "Skipping reservations for the one dinner or museum that defined your trip",
            "Running your bank card down to zero with no yen backup in rural blocks",
          ]}
        />
      </section>

      <section className="mb-6">
        <H2>What many tourists say they regret afterward</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Post-trip forums repeat a short list: too many hotel moves, shoes that
            looked cute at home, skipping a pocket router or eSIM because &quot;WiFi
            will be enough,&quot; and chasing famous queues instead of neighborhood
            quality.
          </p>
          <p>
            None of those ruin a country. They just shave hours off relaxation.
            Adjust mid-trip when you feel the drag rather than waiting for the
            flight home to admit it.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <H2>What experienced travelers actually do</H2>
        <CheckList
          items={[
            "Pack light on purpose, then forward or locker whatever is not needed today",
            "Book data before the jet lag hits and screenshot hotel addresses in Japanese",
            "Anchor neighborhoods, not every landmark, and schedule meals like human beings",
            "Keep yen for small shops plus one backup card that actually works abroad",
            "Read train maps once calmly over coffee instead of only while panicked",
            "Leave one hole in each day for laundry, naps, or a random museum wing",
          ]}
        />
      </section>

      <section className="mb-6">
        <H2>Realistic examples</H2>
        <H3>Example: arrival day in Tokyo</H3>
        <p className="article-body max-w-2xl">
          You land hungry at 4:00 p.m., try to squeeze Shibuya crossing, teamLab,
          and a Ginza dinner before midnight, then discover your hotel check-in
          queue eats forty minutes. A lighter plan would have swapped one marquee
          stop for ramen near the hotel and an early sleep. The trip is still a
          win; you only traded calm for trophies.
        </p>
        <H3>Example: Kyoto temple day</H3>
        <p className="article-body max-w-2xl">
          You book three districts in one sunrise-to-sunset arc because blogs said
          you must. By 2:00 p.m. your feet revolt in humid July. The fix that
          saves the memory is not cramming harder; it is picking one late reopen
          slot after iced tea and a sit-down lunch.
        </p>
        <H3>Example: Shin day to Osaka</H3>
        <p className="article-body max-w-2xl">
          You reserve the bullet train correctly but haul two max-size suitcases
          onto a municipal subway transfer. Elevators hide on the wrong side of
          the gate, strangers help, yet you arrive sour. Experienced travelers
          would have forwarded one bag or taken a shorter taxi bridge between
          stations. Lesson learned once, stress drops forever after.
        </p>
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
            Japan forgives a lot when you stay polite, pay attention in stations,
            and treat comfort like part of the itinerary. Fix logistics early,
            expect walking, and leave margin for the moments you cannot photograph
            yet still want to remember.
          </p>
          <p>
            Return to{" "}
            <Link href="/guides/start-here-japan" className={inlineLink}>
              Japan trip planning
            </Link>{" "}
            whenever a new week of bookings opens; the order of operations matters
            more than perfect kanji.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <H2>Related guides</H2>
        <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
          <li>
            <Link href="/guides/start-here-japan" className={linkClass}>
              Japan trip planning
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-packing-list" className={linkClass}>
              Japan packing list by season
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-weather-by-month" className={linkClass}>
              Japan weather by month
            </Link>
          </li>
          <li>
            <Link href="/guides/sim-card-japan" className={linkClass}>
              Best SIM card for Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-trains" className={linkClass}>
              How to use trains in Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-train-mistakes" className={linkClass}>
              Japan train mistakes
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-luggage-shipping" className={linkClass}>
              Luggage delivery in Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/money-payments-japan" className={linkClass}>
              Money, cards, and cash
            </Link>
          </li>
          <li>
            <Link href="/guides/where-to-stay-tokyo" className={linkClass}>
              Where to stay in Tokyo
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-itinerary" className={linkClass}>
              Japan itinerary
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
        </ul>
      </section>

      <GuideEndCta
        parentHref="/guides/start-here-japan"
        parentLabel="Japan trip planning"
      />
    </>
  );
}
