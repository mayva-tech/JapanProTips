import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "Do You Need a SIM Card in Japan?",
  description:
    "Do you need a SIM in Japan? Yes for most trips: maps, trains, and payments get easier with data. When you can skip it, and how to pick eSIM or pocket WiFi.",
};

export default function DoYouNeedSimJapanPage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          Do You Need a SIM Card in Japan?
        </h1>
      }
      intro={
        <div className="font-serif text-muted text-base leading-relaxed space-y-4 max-w-2xl">
          <p>
            A lot of people ask if they need a SIM for Japan. The question sounds
            small, but it affects every day of the trip.
          </p>
          <p className="font-sans font-bold text-dark">
            In most cases, yes. You want your own data.
          </p>
        </div>
      }
      beforeComparison={
        <>
          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Quick Answer
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed mb-8 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Yes, you need internet in Japan
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use eSIM if your phone supports it
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                It affects maps, trains, payments
              </li>
            </ul>
            <Link
              href="/guides/sim-card-japan"
              className="inline-block bg-maroon text-white font-sans font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-rust transition-colors duration-150"
            >
              Compare SIM paths for your trip →
            </Link>
            <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed mt-6 max-w-2xl">
              <li>
                <Link
                  href="/guides/esim-vs-pocket-wifi-japan"
                  className="font-sans font-bold text-sm text-rust hover:text-maroon transition-colors duration-150"
                >
                  eSIM vs pocket WiFi →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/airalo-vs-ubigi-japan"
                  className="font-sans font-bold text-sm text-rust hover:text-maroon transition-colors duration-150"
                >
                  Airalo vs Ubigi →
                </Link>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              When You Need a SIM
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                First-time visitors
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Using maps
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Navigating trains
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Translating
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              When You Might Not Need One
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Traveling with someone who has internet
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Using pocket WiFi
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Very short stays
              </li>
            </ul>
          </section>
        </>
      }
      afterComparison={
        <>
          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Reality Check
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-4 max-w-2xl">
              <p>You can survive without it.</p>
              <p>But it makes everything harder.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Bottom Line
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed mb-8 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Get a SIM
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Don&apos;t overthink it
              </li>
            </ul>
          </section>

          <GuideEndCta
            parentHref="/guides/sim-card-japan"
            parentLabel="Best SIM card for Japan →"
          />
        </>
      }
    />
  );
}
