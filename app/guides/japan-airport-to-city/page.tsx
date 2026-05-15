import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title:
    "How to Get from Narita, Haneda, or Kansai Airport to Your Hotel",
  description:
    "Narita, Haneda, and Kansai airport to hotel: trains, IC cards, SIM setup, Narita Express, Skyliner, and picking the right route for your Tokyo or Osaka stay.",
};

export default function JapanAirportToCityPage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          How to Get from the Airport to Your Hotel in Japan (Narita, Haneda,
          Kansai)
        </h1>
      }
      intro={
        <div className="font-serif text-muted text-base leading-relaxed max-w-2xl space-y-4">
          <p>After landing, this is your first real challenge.</p>
          <p>Airport transport options look confusing when you are tired.</p>
          <p>It is straightforward once you know the main choices.</p>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            Quick Answer (Don&apos;t Overthink It)
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed mb-6 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Tokyo (Narita): Use Narita Express or Keisei Skyliner
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Tokyo (Haneda): Use train or monorail
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Osaka (Kansai Airport): Use Nankai or JR train
            </li>
          </ul>
          <div className="flex flex-col gap-2 mb-6 max-w-2xl">
            <Link
              href="/guides/narita-to-tokyo"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
            >
              Narita to Tokyo (detailed) →
            </Link>
            <Link
              href="/guides/haneda-to-tokyo"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
            >
              Haneda to Tokyo (detailed) →
            </Link>
          </div>
          <p className="font-sans font-bold text-dark text-base max-w-2xl">
            Follow Google Maps. It already knows the best route.
          </p>
          <Link
            href="/guides/japan-trains"
            className="inline-block font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 mt-5"
          >
            Navigate Japan trains on day one →
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            Before You Leave the Airport
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed mb-6 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Get your IC card (Suica / PASMO)
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Activate your SIM or eSIM
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Have your hotel address ready
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Withdraw some cash if needed
            </li>
          </ul>
          <Link
            href="/guides/sim-card-japan"
            className="inline-block bg-maroon text-white font-sans font-bold text-sm tracking-widest uppercase px-7 py-3.5 hover:bg-rust transition-colors duration-150"
          >
            Get your SIM ready before arrival →
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-6">
            Narita Airport → Tokyo
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark tracking-wide text-2xl mb-2">
                Narita Express (NEX)
              </h3>
              <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed">
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Direct to major stations (Tokyo, Shinjuku, Shibuya)
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Comfortable, good for luggage
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Slightly more expensive
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-2xl mb-2">
                Keisei Skyliner
              </h3>
              <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed">
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Faster to Ueno area
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Good if staying in Ueno or nearby
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Requires transfer for some areas
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-2xl mb-2">
                Bus (Airport Limousine)
              </h3>
              <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed">
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Direct to some hotels
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Good with heavy luggage
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Slower depending on traffic
                </li>
              </ul>
            </div>
          </div>
          <p className="font-serif text-muted text-base leading-relaxed mt-6 max-w-2xl">
            <Link
              href="/guides/narita-to-tokyo"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Narita to Tokyo: best way to your hotel →
            </Link>
          </p>
        </section>
        </>
      }
      afterComparison={
        <>
        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-6">
            Haneda Airport → Tokyo
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark tracking-wide text-2xl mb-2">
                Train (Keikyu / Tokyo Monorail)
              </h3>
              <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed">
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Fast and cheap
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Connects to main train lines
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-2xl mb-2">
                Taxi
              </h3>
              <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed">
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Expensive but possible
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Only practical late at night or with heavy luggage
                </li>
              </ul>
            </div>
          </div>
          <p className="font-serif text-muted text-base leading-relaxed mt-6 max-w-2xl">
            <Link
              href="/guides/haneda-to-tokyo"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Haneda to Tokyo: best way to your hotel →
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-6">
            Kansai Airport → Osaka
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark tracking-wide text-2xl mb-2">
                Nankai Airport Express
              </h3>
              <p className="font-serif text-muted text-base leading-relaxed">
                Best for Namba area.
              </p>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-2xl mb-2">
                JR Haruka
              </h3>
              <p className="font-serif text-muted text-base leading-relaxed">
                Best for Osaka and Kyoto.
              </p>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-2xl mb-2">
                Bus
              </h3>
              <p className="font-serif text-muted text-base leading-relaxed">
                Direct to some hotels.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            What Option Should You Choose?
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              With luggage: Narita Express or bus
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Budget: regular train
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Staying near Ueno: Skyliner
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Late night: taxi or hotel near airport
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            Common Mistakes
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Not setting up SIM before arrival
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Not knowing hotel station
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Choosing cheapest route without checking transfers
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Getting overwhelmed by signs
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            Reality Check
          </h2>
          <div className="font-serif text-muted text-base leading-relaxed space-y-4 max-w-2xl">
            <p>Airports in Japan are well organized.</p>
            <p>Signs are clear and in English.</p>
            <p>Staff can help if needed.</p>
            <p>You will get there without problems.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
            Bottom Line
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed mb-8 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Use train for most cases
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Choose based on hotel location
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Set up SIM before arrival
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Follow Google Maps
            </li>
          </ul>

        </section>

        <GuideEndCta
          parentHref="/guides/japan-itinerary"
          parentLabel="Japan trip itinerary →"
        />

        <div className="border-t border-tan pt-8 mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
          >
            JapanProTips homepage <span className="text-base">‹‹‹</span>
          </Link>
        </div>
        </>
      }
    />
  );
}
