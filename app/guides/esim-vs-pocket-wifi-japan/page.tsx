import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";

export const metadata: Metadata = {
  title:
    "eSIM vs Pocket WiFi in Japan (Which Should You Choose)",
  description:
    "eSIM or pocket WiFi for Japan: speed, price, battery, solo vs group picks, Airalo and Ubigi picks, airport rental mistakes, and a simple default recommendation.",
};

const conversionBox =
  "border border-[#d4c9b0] bg-white px-6 py-5 mb-12 max-w-2xl";

export default function EsimVsPocketWifiJapanPage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="guide-page-title"
        >
          eSIM vs Pocket WiFi in Japan (Which Should You Choose)
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Internet in Japan is not a luxury add-on. It is how you buy the right
            train ticket, read the platform screen, message your hotel, and not
            waste an hour because you guessed a kanji sign wrong.
          </p>
          <p>
            The only real fork for most tourists is phone-native data (eSIM) versus
            a small WiFi hotspot you carry and share. Both work. Pick the one that
            matches how many devices you run and how much friction you tolerate.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/guides/japan-airport-first-steps"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
            >
              First 60 minutes at Narita or Haneda →
            </Link>
            <Link
              href="/guides/airalo-vs-ubigi-japan"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
            >
              Airalo vs Ubigi for Japan →
            </Link>
          </div>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            What is eSIM
          </h2>
          <div className="article-body space-y-4">
            <p>
              An eSIM is a digital SIM profile you install on a compatible phone. You
              buy a Japan data plan from an app or website, scan or tap through the
              install flow, then your phone uses Japanese networks like a normal
              local data line.
            </p>
            <p>
              You usually keep your home number on the primary SIM if you want, and
              run Japan data on the eSIM line. You do not pick up a plastic card at
              the airport unless you also buy one for other reasons.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            What is Pocket WiFi
          </h2>
          <div className="article-body space-y-4">
            <p>
              Pocket WiFi is a battery-powered hotspot with a Japanese SIM inside.
              It creates a WiFi network your phone, laptop, and second phone can all
              join at once.
            </p>
            <p>
              You rent it online or at the airport, pick it up from a counter or
              locker, carry it all day, charge it at night, then return it in an
              envelope or at a counter before you fly out. More steps than eSIM,
              more sharing power.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Speed Comparison
          </h2>
          <div className="article-body space-y-4">
            <p>
              Both eSIM plans and decent pocket WiFi units usually land on the same
              major domestic networks in practice. Speed is rarely the deciding
              factor for maps and chat.
            </p>
            <p>
              What changes speed more than the format is network congestion, your
              phone antenna, and whether you bought a cheap plan with aggressive
              throttling after a daily cap. Read the plan limits, not the marketing
              word “unlimited.”
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Price Comparison
          </h2>
          <div className="article-body space-y-4">
            <p>
              For one person on a normal trip, eSIM is usually cheaper all-in when
              you include time and pickup hassle. You pay the app, you are done.
            </p>
            <p>
              Pocket WiFi is often priced per day in a way that only wins when you
              split it across two, three, or four people who all need data at the
              same time. Solo travelers sometimes pay hotspot prices for no sharing
              benefit.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Battery and Convenience
          </h2>
          <div className="article-body space-y-4">
            <p>
              eSIM does not add a second battery to worry about. Your phone battery
              is still your phone battery, but you are not babysitting a hotspot.
            </p>
            <p>
              Pocket WiFi means one more thing to charge, one more cable in the bag,
              and one more device to forget on a restaurant table. If you share it
              with family, you also share the pain when someone walks away with the
              only internet.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Best for Solo Travelers
          </h2>
          <div className="article-body space-y-4">
            <p>
              If your phone supports eSIM and you are traveling alone, default to
              eSIM. It is fewer objects, fewer counters, fewer return deadlines.
            </p>
            <p>
              Pocket WiFi for one person is usually extra cost and extra admin
              unless you have a specific reason (work laptop plus phone all day on
              separate heavy tasks, or a phone that cannot do eSIM).
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Best for Groups
          </h2>
          <div className="article-body space-y-4">
            <p>
              If three or four people need working maps at the same time, one
              pocket WiFi can be simpler than buying and troubleshooting four
              separate installs, especially if someone has an older phone or a
              locked device.
            </p>
            <p>
              Split the daily rental across heads and it often beats four medium
              data plans. You still carry the unit and you still deal with pickup
              and return, so make sure one adult owns that job.
            </p>
          </div>
        </section>
        </>
      }
      afterComparison={
        <>
        <div className={conversionBox}>
          <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-dark mb-2">
            Pick a plan before you land
          </h3>
          <p className="article-body-sm mb-4">
            Most travelers who can use eSIM do fine with{" "}
            <span className="font-sans font-bold text-dark">Airalo</span> or{" "}
            <span className="font-sans font-bold text-dark">Ubigi</span> for Japan
            data. Compare caps and app quality in the main SIM guide, then install
            on hotel or home WiFi before your flight if possible.
          </p>
          <Link
            href="/guides/sim-card-japan"
            className="font-sans text-base font-bold text-rust hover:text-maroon transition-colors duration-150"
          >
            Best SIM and eSIM for Japan (full guide) →
          </Link>
        </div>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Common Mistakes
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Renting pocket WiFi at the airport blindly because the counter is the
              first thing you see after customs. You pay for convenience you did not
              need if eSIM would have worked.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Buying pocket WiFi for one person out of habit, then carrying a brick
              for a week.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Waiting until arrival to read whether your phone is unlocked or
              eSIM-capable. That is a bad surprise at midnight.
            </li>
          </ul>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Final Recommendation (Simple)
          </h2>
          <div className="article-body space-y-4">
            <p>
              Solo or couple, modern phone: eSIM first. Group with multiple phones
              that all need data together: pocket WiFi can win on simplicity and
              split cost.
            </p>
            <p>
              If you are unsure, open the SIM guide, pick one path, and stop
              re-opening ten tabs. The wrong move is not “eSIM vs WiFi.” The wrong
              move is deciding tired at a counter.
            </p>
          </div>
        </section>

        <NextStepGuides guideId="esim-vs-pocket-wifi-japan" />

        <GuideEndCta
          parentHref="/guides/japan-airport-first-steps"
          parentLabel="First 60 minutes at Narita or Haneda →"
        />

        <div className="border-t border-tan pt-8 mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
          >
            JapanProTips homepage <span className="text-lg">‹‹‹</span>
          </Link>
        </div>
        </>
      }
    />
  );
}
