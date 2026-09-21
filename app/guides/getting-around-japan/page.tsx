import type { Metadata } from "next";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedGearBox } from "@/components/RecommendedGearBox";
import { LocalTip, OperationalWarning } from "@/components/editorial/field-notes";
import { resolvePageImagePath } from "@/lib/guide-page-images";

const GUIDE_SLUG = "getting-around-japan";

const guideImages = {
  hero: resolvePageImagePath("guides", GUIDE_SLUG, "hero"),
  section01: resolvePageImagePath("guides", GUIDE_SLUG, "section-01"),
  step01: resolvePageImagePath("guides", GUIDE_SLUG, "step-01"),
  mainPhoto: resolvePageImagePath("guides", GUIDE_SLUG, "main-photo"),
} as const;

export const metadata: Metadata = {
  title:
    "Getting Around Japan: Trains, IC Cards & Apps for Beginners",
  description:
    "Learn Japan trains without drowning in maps: IC cards, JR vs metro, Google Maps vs NAVITIME, transfers, and habits that keep first-time visitors moving.",
};

export default function GettingAroundJapanGuidePage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      title={
        <h1 className="guide-page-title">
          Getting Around Japan: Trains, IC Cards & Apps
        </h1>
      }
      intro={
        <div className="article-body space-y-4 lg:max-w-2xl">
          <p>
            Japan&apos;s train maps look busy. That is normal. You do not need to
            learn the whole network. Learn a few habits and follow your phone.
          </p>
          <EditorialImage
            src={guideImages.hero}
            alt="Travelers using trains and ticket gates to get around Japan"
            caption="Trains are the default way to move between airports, neighborhoods, and cities."
            fit="contain"
            priority
            className="max-w-2xl"
          />
        </div>
      }
      beforeComparison={
        <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
          <h2>The Only 3 Things You Need to Know</h2>

          <h3>Trains are the default</h3>
          <p className="article-body mb-3 last:mb-0">
            Trains carry almost everyone for airport runs, moving inside a city,
            and city-to-city travel. You will use them constantly. Tokyo and
            Osaka both rely on rail more than taxis or rental cars for everyday
            movement. Plan around trains first; everything else is secondary.
          </p>

          <h3>Train types: Local, Rapid, Express</h3>
          <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
            <li>
              <strong className="font-sans font-bold text-dark">Local</strong>{" "}
              stops at every station along the route. Slowest, hardest to get
              wrong.
            </li>
            <li>
              <strong className="font-sans font-bold text-dark">Rapid</strong>{" "}
              skips some stations. Faster than Local on the same corridor.
            </li>
            <li>
              <strong className="font-sans font-bold text-dark">Express</strong>{" "}
              (and similar names) skips more stations. Faster when you are going
              far along that line.
            </li>
          </ul>
          <p className="article-body mb-3">
            If you are unsure which train to board, take{" "}
            <strong className="font-sans font-bold text-dark">Local</strong>. You
            may add a few minutes, but you are less likely to skip your stop by
            accident.
          </p>
          <OperationalWarning noteId="getting-around-train-type">
            <p>
              Express saves minutes only when it stops at your station. If the app
              names a train type you do not see on the departure board, pause and
              read the kanji line name again before you commit.
            </p>
          </OperationalWarning>

          <h3>IC cards (Suica / PASMO)</h3>
          <p className="article-body mb-3 last:mb-0">
            An IC card stores money. Tap the reader when you enter the paid area
            and tap again when you exit. The system deducts the correct fare. You
            do not need to buy a paper ticket for each trip. Recharge at machines
            in stations when the balance runs low. Suica and PASMO work the same
            way for most visitors; pick what is easiest to get at the airport or
            station.
          </p>

          <RecommendedGearBox
            gearId="getting-around-japan"
            title="Recommended gear for getting around Japan"
            intro="These are practical items that solve common walking, navigation, and station problems on train-heavy days."
          />

          <LocalTip noteId="getting-around-ic-recharge">
            <p>
              Locals top up IC at machines when balance drops near a few hundred
              yen, not at zero. Gates fail open with an embarrassing beep when you
              forget, usually during a transfer crush.
            </p>
          </LocalTip>

          <EditorialImage
            src={guideImages.section01}
            alt="JR and metro lines on a Japan rail map for first-time visitors"
            caption="JR and metro look different on maps, but your app handles the transfers."
            fit="contain"
            className="max-w-2xl"
          />

          <h2>JR vs Metro (Don&apos;t Overthink This)</h2>
          <p className="article-body mb-3">
            <strong className="font-sans font-bold text-dark">JR</strong> runs many
            intercity and regional lines, including the Yamanote loop in Tokyo and
            useful connectors elsewhere.{" "}
            <strong className="font-sans font-bold text-dark">Metro</strong> (and
            other city subways) run dense networks under the city.
          </p>
          <p className="article-body mb-3 last:mb-0">
            They are different companies and different colors on maps. You do not
            need to memorize which is which. Navigation apps list the lines,
            transfers, and exits. Pay attention to line name, direction, and
            platform, not the owning company.
          </p>

          <h2>What to Actually Use</h2>
          <p className="article-body mb-3">
            Use{" "}
            <strong className="font-sans font-bold text-dark">Google Maps</strong>{" "}
            or{" "}
            <strong className="font-sans font-bold text-dark">NAVITIME</strong> for
            trip planning. Workflow:
          </p>
          <ol className="article-body mb-3 list-decimal space-y-2.5 pl-6 last:mb-0">
            <li>
              Enter your start and end (or pick a place and
              &quot;directions&quot;).
            </li>
            <li>
              Read the suggested route: lines, transfer stations, and approximate
              time.
            </li>
            <li>
              Follow signs in the station toward the line and platform the app
              shows.
            </li>
          </ol>
          <p className="article-body mb-3 last:mb-0">
            Check the platform screen and the train&apos;s destination display
            before you board. If the app and the signs disagree, trust the platform
            signs and station staff.
          </p>

          <EditorialImage
            src={guideImages.step01}
            alt="Phone with Google Maps or NAVITIME open for Japan train directions"
            caption="Open maps, follow the route, and double-check the platform sign before you board."
            fit="contain"
            className="max-w-2xl"
          />
        </div>
      }
      afterComparison={
        <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
          <h2>Situations That Matter</h2>
          <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
            <li>
              <strong className="font-sans font-bold text-dark">Rush hour:</strong>{" "}
              Trains fill up. Allow extra time. Move with the flow when boarding
              and exiting.
            </li>
            <li>
              <strong className="font-sans font-bold text-dark">Last train:</strong>{" "}
              Many lines stop around midnight, not 24 hours. If you stay out late,
              confirm the last train home or budget for a taxi or night bus.
            </li>
            <li>
              <strong className="font-sans font-bold text-dark">Shinkansen:</strong>{" "}
              Use for long-distance legs (for example, Tokyo to Osaka). Separate
              tickets or passes apply. It is not what you use for a few stops
              across town.
            </li>
          </ul>

          <h2>Reality Check</h2>
          <p className="article-body mb-3">
            People expect they must &quot;understand Tokyo before they can ride
            trains.&quot; In practice you need a process, not a geography degree.
          </p>
          <ol className="article-body mb-3 list-decimal space-y-2.5 pl-6 last:mb-0">
            <li>Open maps.</li>
            <li>Follow the directions.</li>
            <li>Arrive.</li>
          </ol>
          <p className="article-body mb-3 last:mb-0">
            You will make small mistakes at first. Wrong platform, wrong exit. Fix
            it by rechecking the app and the overhead signs.
          </p>

          <h2>Bottom Line</h2>
          <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
            <li>Use trains for most trips.</li>
            <li>Use an IC card and tap in and out.</li>
            <li>Follow Google Maps or NAVITIME and read station signs.</li>
          </ul>

          <EditorialImage
            src={guideImages.mainPhoto}
            alt="Japan train platform and IC card gate for everyday travel"
            caption="IC card in, IC card out, and let the app handle the line changes."
            fit="contain"
            className="max-w-2xl"
          />

          <NextStepGuides guideId="getting-around-japan" />

          <GuideEndCta
            parentHref="/guides/japan-itinerary"
            parentLabel="Japan trip itinerary →"
          />
        </div>
      }
    />
  );
}
