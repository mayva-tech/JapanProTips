import type { Metadata } from "next";
import { SiteBrandFooter } from "@/components/brand/SiteBrandFooter";
import Link from "next/link";
import { OperationalWarning, RealityCheck } from "@/components/editorial/field-notes";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedServicesBox } from "@/components/RecommendedServicesBox";

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
          className="guide-page-title"
        >
          How to Get from the Airport to Your Hotel in Japan (Narita, Haneda,
          Kansai)
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>After landing, this is your first real challenge.</p>
          <p>Airport transport options look confusing when you are tired.</p>
          <p>It is straightforward once you know the main choices.</p>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Quick Answer (Don&apos;t Overthink It)
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 mb-6 max-w-2xl">
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
              className="editorial-chevron-link font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
            >
              Narita to Tokyo (detailed)
            </Link>
            <Link
              href="/guides/haneda-to-tokyo"
              className="editorial-chevron-link font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
            >
              Haneda to Tokyo (detailed)
            </Link>
          </div>
          <p className="font-sans font-bold text-dark text-lg max-w-2xl">
            Follow Google Maps. It already knows the best route.
          </p>
          <Link
            href="/guides/japan-trains"
            className="editorial-chevron-link inline-flex font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 mt-5"
          >
            Navigate Japan trains on day one
          </Link>
          <OperationalWarning noteId="airport-to-city-maps-need-data">
            <p>
              Maps only help after your phone has data or a downloaded offline pack.
              Screenshot your hotel kanji block and the nearest exit name while you
              still have airport WiFi, not while you are guessing at a turnstile.
            </p>
          </OperationalWarning>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Before You Leave the Airport
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 mb-6 max-w-2xl">
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
            className="editorial-chevron-cta inline-flex rounded-lg bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-7 py-3.5 hover:bg-rust transition-colors duration-150"
          >
            Get your SIM ready before arrival
          </Link>
          <RealityCheck noteId="airport-to-city-order-of-ops">
            <p>
              Data beats everything else in this checklist. IC and cash help, but
              they do not fix a hotel address you cannot load or translate at the
              gate. Get connectivity stable, then optimize the rest in line.
            </p>
          </RealityCheck>
        </section>

        <RecommendedServicesBox serviceId="japan-airport-to-city" />

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Narita Airport to Tokyo
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Narita Express (NEX)
              </h3>
              <ul className="article-body list-none space-y-3 pl-0">
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
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Keisei Skyliner
              </h3>
              <ul className="article-body list-none space-y-3 pl-0">
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
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Bus (Airport Limousine)
              </h3>
              <ul className="article-body list-none space-y-3 pl-0">
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
          <p className="article-body mt-6 max-w-2xl">
            <Link
              href="/guides/narita-to-tokyo"
              className="editorial-chevron-link font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Narita to Tokyo: best way to your hotel
            </Link>
          </p>
        </section>
        </>
      }
      afterComparison={
        <>
        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Haneda Airport to Tokyo
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Train (Keikyu / Tokyo Monorail)
              </h3>
              <ul className="article-body list-none space-y-3 pl-0">
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Fast and cheap
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Connects to main train lines
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Taxi
              </h3>
              <ul className="article-body list-none space-y-3 pl-0">
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Expensive but possible
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Only practical late at night or with heavy luggage
                </li>
              </ul>
            </div>
          </div>
          <p className="article-body mt-6 max-w-2xl">
            <Link
              href="/guides/haneda-to-tokyo"
              className="editorial-chevron-link font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Haneda to Tokyo: best way to your hotel
            </Link>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Kansai Airport to Osaka
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Nankai Airport Express
              </h3>
              <p className="article-body">
                Best for Namba area.
              </p>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                JR Haruka
              </h3>
              <p className="article-body">
                Best for Osaka and Kyoto.
              </p>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Bus
              </h3>
              <p className="article-body">
                Direct to some hotels.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            What Option Should You Choose?
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
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

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Common Mistakes
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
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

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Reality Check
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>Airports in Japan are well organized.</p>
            <p>Signs are clear and in English.</p>
            <p>Staff can help if needed.</p>
            <p>You will get there without problems.</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Bottom Line
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 mb-6 max-w-2xl">
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

        <NextStepGuides guideId="japan-airport-to-city" />

        <GuideEndCta
          parentHref="/guides/japan-itinerary"
          parentLabel="Japan trip itinerary →"
        />
        <SiteBrandFooter />
        </>
      }
    />
  );
}
