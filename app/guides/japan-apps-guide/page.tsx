import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "Best Apps for Japan Travel (Navigation, Trains, Translation, Food)",
  description:
    "Which Japan travel apps actually help: maps, train apps, translation, food listings, IC cards, taxis, weather, and SIM data habits before you land.",
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

function H4({ children }: { children: ReactNode }) {
  return (
    <h4 className="font-sans font-bold text-dark text-base tracking-wide mb-2 mt-4">
      {children}
    </h4>
  );
}

type AppBlockProps = {
  name: string;
  bestFor: string;
  needIt: string;
  pros: string[];
  cons: string[];
  offline: string;
  english: string;
  mistakes: string;
};

function AppBlock({
  name,
  bestFor,
  needIt,
  pros,
  cons,
  offline,
  english,
  mistakes,
}: AppBlockProps) {
  return (
    <div className="mb-6 border border-[#d4c9b0] bg-white p-5 max-w-2xl">
      <H4>{name}</H4>
      <p className="article-body text-sm text-muted mb-2">
        <span className="font-bold text-dark">Best for:</span> {bestFor}
      </p>
      <p className="article-body text-sm text-muted mb-4">
        <span className="font-bold text-dark">Need level:</span> {needIt}
      </p>
      <p className="article-body text-sm font-bold text-dark mb-1">Pros</p>
      <ul className="article-body list-disc pl-5 space-y-1 mb-3 text-sm text-muted">
        {pros.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className="article-body text-sm font-bold text-dark mb-1">Cons</p>
      <ul className="article-body list-disc pl-5 space-y-1 mb-3 text-sm text-muted">
        {cons.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="article-body text-sm text-muted mb-2">
        <span className="font-bold text-dark">Offline:</span> {offline}
      </p>
      <p className="article-body text-sm text-muted mb-2">
        <span className="font-bold text-dark">English:</span> {english}
      </p>
      <p className="article-body text-sm text-muted">
        <span className="font-bold text-dark">Common mistakes:</span> {mistakes}
      </p>
    </div>
  );
}

export default function JapanAppsGuidePage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      showHotelConversion={false}
      title={
        <h1
          className="guide-page-title"
        >
          Best Apps for Japan Travel (Navigation, Trains, Translation, Food)
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
        The right apps reduce friction in stations, izakaya lines, and late
        night taxi calls. None of them replace politeness, signage, and a paper
        yen stash, but they save hours when you stack maps, translation, and
        data in the right order.
      </p>
      <p>
        Start with internet. Most &quot;offline Japan&quot; fantasies break the
        moment you need a platform change, a QR ticket, or a fresh timetable.
        Line up data options in{" "}
        <Link href="/guides/sim-card-japan" className={inlineLink}>
          the Japan SIM and pocket WiFi guide
        </Link>{" "}
        before you debate which train icon looks prettiest.
      </p>
    </div>
  );
}

function MainContent() {
  return (
    <>
      <section className="mb-6">
        <H2>Quick picks before the deep blocks</H2>
        <p className="article-body max-w-2xl mb-6">
          Use this table when you want a fast default. Add depth only when your
          trip demands it, not because a forum thread listed twenty icons.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full min-w-[520px] border-collapse border border-[#d4c9b0] bg-white font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-[#d4c9b0] bg-cream">
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                  Job
                </th>
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                  First app
                </th>
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                  When to add another
                </th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Ground truth map
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Google Maps
                </td>
                <td className="px-4 py-3">
                  Swap or double check with NAVITIME or Yahoo for brutal transfers
                </td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Train brain
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  NAVITIME or Yahoo Transit
                </td>
                <td className="px-4 py-3">
                  Add the other if your first pick feels wrong at midnight
                </td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Menus and counters
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Google Translate
                </td>
                <td className="px-4 py-3">
                  Paste polish into DeepL for messages, not for shouting
                </td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Food research
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Tabelog mindset
                </td>
                <td className="px-4 py-3">
                  Gurunavi when you want a reservation path on select listings
                </td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Pay and ride
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  IC card or mobile IC
                </td>
                <td className="px-4 py-3">
                  PayPay when you see the pink logo often in your neighborhood
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <H3>Train and navigation</H3>
        <p className="article-body max-w-2xl mb-4">
          Pair{" "}
          <Link href="/guides/getting-around-japan" className={inlineLink}>
            getting around Japan
          </Link>{" "}
          habits with the app that fits your patience for transfers. Read{" "}
          <Link href="/guides/japan-trains" className={inlineLink}>
            how to use trains in Japan
          </Link>{" "}
          when phrases like rapid, express, and limited express still blur
          together.
        </p>
        <AppBlock
          name="Google Maps"
          bestFor="Walking routes, store hours, and a familiar map when you are tired."
          needIt="Essential baseline."
          pros={[
            "Comfortable if you already live in Maps at home.",
            "Download offline areas for patchy basement corridors.",
            "Business hours help when shrines or shops close early.",
          ]}
          cons={[
            "Transit detail can lag behind Japan-first apps in complex hubs.",
            "Exit suggestions still need a glance at station signs.",
          ]}
          offline="Offline map regions help walking; live routing wants data."
          english="Strong."
          mistakes="Following a pin blindly into a station exit far from the locker you visualized."
        />
        <AppBlock
          name="Japan Travel by NAVITIME"
          bestFor="Door to door routing that respects Japanese operators and transfer times."
          needIt="High for train heavy weeks."
          pros={[
            "Strong multimodal habits for visitors who ride often.",
            "Helpful when compare mode matters more than vibe.",
          ]}
          cons={[
            "Busier UI than Maps if you only need a straight walk.",
            "Feature labels change over time, stay flexible.",
          ]}
          offline="Assume online for the most trustworthy live transfers."
          english="Usually workable for tourists in supported builds."
          mistakes="Ignoring whether the route prefers fewer transfers versus earlier arrival."
        />
        <AppBlock
          name="Yahoo! Transit (Yahoo乗換案内)"
          bestFor="Last train math and a local style timetable mindset."
          needIt="High if you stay out late."
          pros={[
            "Deep culture around last trains and platforms.",
            "Excellent when you already read a bit of Japanese or lean on icons.",
          ]}
          cons={[
            "English is thinner than Google on some screens.",
            "Takes a night to feel intuitive if you are brand new.",
          ]}
          offline="Assume data for fresh cancellations or delays."
          english="Mixed. Pair with patience or a backup app."
          mistakes="Skipping the on platform board when a last train is non negotiable."
        />

        <H3>Translation</H3>
        <AppBlock
          name="Google Translate"
          bestFor="Camera scans of plastic menu sheets and quick counter phrases."
          needIt="Essential."
          pros={[
            "Offline Japanese packs for subway dead zones.",
            "Conversation mode when noise is low enough.",
          ]}
          cons={[
            "Specialty food words can still read oddly.",
            "Long speeches confuse busy clerks; show text instead.",
          ]}
          offline="Download Japanese for offline use before you fly."
          english="UI stays English friendly."
          mistakes="Reading a paragraph aloud instead of showing one calm sentence on screen."
        />
        <AppBlock
          name="DeepL"
          bestFor="Polished wording when you paste Japanese into English or back."
          needIt="Medium. Nice for planners, not mandatory on day one."
          pros={[
            "Natural sounding sentences for hotel email or Instagram DM.",
            "Great when you have time to copy text.",
          ]}
          cons={[
            "Less grab and go than camera translate on a noodle ticket line.",
            "Still needs your judgement for honorific tone.",
          ]}
          offline="Treat it as mostly online unless you confirmed otherwise in your build."
          english="Strong UI support."
          mistakes="Sounding like a textbook when a short phrase would solve the queue."
        />

        <H3>Food discovery</H3>
        <p className="article-body max-w-2xl mb-4">
          Pair these apps with real queue manners: ticket machines, tablets, and
          last order clocks still beat whatever score you screenshotted at the
          hotel.
        </p>
        <AppBlock
          name="Tabelog"
          bestFor="Rating culture and deeper restaurant browsing when you read some Japanese or lean on icons."
          needIt="Medium for food centered trips."
          pros={[
            "Respected local scoring when you filter thoughtfully.",
            "Helps shortlist neighborhoods before you wander hungry.",
          ]}
          cons={[
            "Account friction appears for some overseas users.",
            "Top lists can crowd out modest shops with no marketing team.",
          ]}
          offline="Minimal. Expect online research."
          english="Partial. Use filters slowly or translate reviews."
          mistakes="Only chasing the highest numeric scores and skipping small lines with happy locals."
        />
        <AppBlock
          name="Gurunavi"
          bestFor="Reservation flows on participating shops and tourist friendly write ups in spots."
          needIt="Medium."
          pros={[
            "Sometimes smoother English explanations on listings.",
            "Can double as a planning sketch when listings match your style.",
          ]}
          cons={[
            "Not every standout shop opts in.",
            "Still verify hours for holidays.",
          ]}
          offline="Minimal."
          english="Often friendlier than pure domestic blogs."
          mistakes="Assuming every rural favorite appears in the database."
        />

        <H3>Payment and IC</H3>
        <p className="article-body max-w-2xl mb-4">
          Cash still appears when QR fails or small shops test your patience.
          Read{" "}
          <Link href="/guides/money-payments-japan" className={inlineLink}>
            money, cards, and cash in Japan
          </Link>{" "}
          so card expectations match reality. For tap at gates, use{" "}
          <Link href="/guides/suica-pasmo-guide" className={inlineLink}>
            Suica and PASMO explained
          </Link>{" "}
          before you panic at a pink error screen.
        </p>
        <AppBlock
          name="PayPay"
          bestFor="QR payments at storefronts that show the pink PayPay mark."
          needIt="Medium. Depends on your wallet habits and regions."
          pros={[
            "Common at chains and plenty of neighborhood shops with signage.",
            "Keeps hands free when you already use QR at home.",
          ]}
          cons={[
            "Setup varies by nationality and card paths.",
            "Dead phone means fall back to yen or plastic.",
          ]}
          offline="No meaningful offline pay flow."
          english="Varies by device language; move slowly during setup."
          mistakes="Forgetting convenience store ATMs and yen when a side street has no QR."
        />
        <AppBlock
          name="Mobile Suica and mobile IC apps"
          bestFor="Phone taps through train gates without digging for plastic."
          needIt="High when you want phone first movement."
          pros={[
            "Fast entry when balance is healthy and readers are green.",
            "Pairs with the same IC habits you learn on day two.",
          ]}
          cons={[
            "Issuing and top up quirks show up for some foreign cards.",
            "Dead battery ends the magic fast.",
          ]}
          offline="Some gate reads work with cached balance stories; top up often wants data."
          english="Improving, still read screens calmly."
          mistakes="Installing the wrong regional wallet variant, skipping top up before long days, or trusting a dead battery at the gate."
        />
        <p className="article-body max-w-2xl text-sm text-muted -mt-4 mb-6">
          Need the wallet setup path? Use{" "}
          <Link href="/guides/suica-pasmo-guide" className={inlineLink}>
            Suica and PASMO explained
          </Link>{" "}
          and set IC before you pretend you can ride on screenshots alone.
        </p>

        <H3>Taxi</H3>
        <AppBlock
          name="GO Taxi"
          bestFor="Hailing style taxi dispatch in major Japanese cities when you need a ride home."
          needIt="Medium late night."
          pros={[
            "Widely recognized by drivers in supported zones.",
            "Clear pickup pins when maps cooperate.",
          ]}
          cons={[
            "Rural coverage thins fast.",
            "Still watch for pickup etiquette on narrow streets.",
          ]}
          offline="Weak without data."
          english="Often usable for visitors who read slowly."
          mistakes="Dropping the pin on the wrong side of a massive station hedge."
        />
        <AppBlock
          name="Uber"
          bestFor="Familiar app flow where Uber partners operate black or taxi style service."
          needIt="Medium in cities where coverage exists."
          pros={[
            "English first menus when your brain is fried.",
            "Familiar receipts for some expense trackers.",
          ]}
          cons={[
            "Not a blanket replacement for every rural ride.",
            "Surge pricing language still applies in storms or holidays.",
          ]}
          offline="Dispatch needs data."
          english="Strong."
          mistakes="Assuming identical coverage to your home country after midnight."
        />

        <H3>Lodging</H3>
        <AppBlock
          name="Booking.com"
          bestFor="Central place for confirmations, maps to properties, and change requests in one thread."
          needIt="High if you booked there."
          pros={[
            "Offline friendly if you screenshot confirmation codes.",
            "Clear address blocks you can show drivers.",
          ]}
          cons={[
            "Notification spam if you forget to trim alerts.",
            "Still verify final door codes in host messages.",
          ]}
          offline="Screenshots beat arguing with a dead signal."
          english="Strong."
          mistakes="Skipping a Japanese line address copy for taxi doors."
        />
        <AppBlock
          name="Airbnb"
          bestFor="House rules, check in flows, and host messaging for apartment stays."
          needIt="High if you booked there."
          pros={[
            "Keeps trash sorting notes and WiFi posts in one place.",
            "Helpful photo trails for tricky entries.",
          ]}
          cons={[
            "Hosts vary wildly in response speed.",
            "Cleaning fee surprises if you skim too fast.",
          ]}
          offline="Download PDFs or pin messages before hiking rural lanes."
          english="Strong."
          mistakes="Airplane mode before you saved the lockbox animation."
        />

        <H3>Daily messaging</H3>
        <AppBlock
          name="LINE"
          bestFor="Hosts, friends, and some small shops that live on LINE chats."
          needIt="Low unless someone told you they only use LINE."
          pros={[
            "Dominant chat culture in Japan.",
            "Sticker plus text blends match local humor.",
          ]}
          cons={[
            "Another account and notification lane.",
            "Not every hotel monitors chat instantly.",
          ]}
          offline="Queues messages until you reconnect."
          english="UI available."
          mistakes="Expecting instant replies during festival weekends."
        />

        <H3>Weather and official info</H3>
        <p className="article-body max-w-2xl mb-4">
          Seasonal detail lives in{" "}
          <Link href="/guides/japan-weather-by-month" className={inlineLink}>
            Japan weather by month
          </Link>
          . Apps below cover hour by hour drama.
        </p>
        <AppBlock
          name="Japan Meteorological Agency linked tools and pages"
          bestFor="Official watches, warnings, and typhoon track seriousness."
          needIt="High during storm season or mountain days."
          pros={[
            "Authoritative when headlines run hot on social media.",
            "Helps you trust airport decisions.",
          ]}
          cons={[
            "Dense meteorology words at first glance.",
            "Not as cute as snack sized apps.",
          ]}
          offline="Limited. Assume data for the freshest warning."
          english="Some English products exist; cross check carefully."
          mistakes="Trusting a random repost instead of timestamps and prefecture names."
        />
        <AppBlock
          name="WeatherNews (Weathernews)"
          bestFor="Local style minute rain habits and radar culture on wet days."
          needIt="Medium when luggage hates sudden sheets of rain."
          pros={[
            "Locals treat Weathernews like background music.",
            "Helpful when you need to decide umbrella versus konbini pause.",
          ]}
          cons={[
            "Japanese heavy menus in parts.",
            "Easy to obsess over radar loops.",
          ]}
          offline="Assume online for the newest radar frames."
          english="Mixed. Pair with Google translate if needed."
          mistakes="Watching radar for twenty minutes instead of stepping under eaves."
        />
      </section>

      <section className="mb-6">
        <H2>Internet and SIM dependency</H2>
        <p className="article-body max-w-2xl mb-4">
          Translation packs, map downloads, and IC top ups still love data. Start
          with a calm connectivity plan in{" "}
          <Link href="/guides/sim-card-japan" className={inlineLink}>
            the Japan SIM guide
          </Link>
          , then treat offline features as backup, not the whole plan.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse border border-[#d4c9b0] bg-white font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-[#d4c9b0] bg-cream">
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                  Task
                </th>
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                  Data hungry?
                </th>
                <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                  Offline habit
                </th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  IC top up
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Often yes for mobile wallets
                </td>
                <td className="px-4 py-3">Keep some yen for machines if the app sulks</td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Camera translate
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Lower if packs live on device
                </td>
                <td className="px-4 py-3">Download Japanese offline before wheels up</td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Taxi dispatch
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Yes for live maps
                </td>
                <td className="px-4 py-3">Hotel phone or stand queue as legacy backup</td>
              </tr>
              <tr className="border-b border-[#d4c9b0]">
                <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                  Typhoon checks
                </td>
                <td className="px-4 py-3 border-r border-[#d4c9b0]">
                  Yes for radar loops
                </td>
                <td className="px-4 py-3">Screenshot official bulletins when signal wavers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-6">
        <H2>Essential before landing checklist</H2>
        <CheckList
          items={[
            "Maps: install Google Maps and download offline chunks for your first base city.",
            "Translate: install Google Translate with Japanese offline packs activated.",
            "Data: confirm eSIM, SIM, or pocket WiFi pickup using the SIM guide so day one works in the basement.",
            "Hotel access: screenshot address blocks in Japanese and English, plus door codes.",
            "Payment backup: one IC path plus yen from a convenience ATM plan in the konbini guide mindset.",
          ]}
        />
        <p className="article-body max-w-2xl mt-4">
          Konbini ATM habits pair with{" "}
          <Link
            href="/guides/japan-convenience-store-guide"
            className={inlineLink}
          >
            Japanese convenience stores explained
          </Link>
          .
        </p>
      </section>

      <section className="mb-6">
        <H2>What experienced travelers actually use</H2>
        <CheckList
          items={[
            "Two navigation ideas max: Maps plus one Japan first train app.",
            "Translate camera on the lock screen folder, not buried on page six.",
            "IC sorted before TikTok queues for coffee art.",
            "Weather and official alerts favor boring reliability over viral clips.",
            "Screenshots of hotel and IC balance when battery anxiety starts.",
          ]}
        />
      </section>

      <section className="mb-6">
        <H2>Overrated panic installs</H2>
        <H3>Too many apps</H3>
        <p className="article-body max-w-2xl">
          Twenty icons do not equal twenty times smarter focus. Pick one train
          companion and learn it on a calm morning, not in a turning crowd
          underground.
        </p>
        <H3>Social first planning</H3>
        <p className="article-body max-w-2xl">
          Reels hide humidity, stairs, and how far Exit B really feels. Enjoy
          clips after you protect maps, data, and yen basics described in{" "}
          <Link href="/guides/japan-tourist-mistakes" className={inlineLink}>
            biggest mistakes first time tourists make
          </Link>
          .
        </p>
        <H3>Apps versus walking sense</H3>
        <p className="article-body max-w-2xl">
          Sometimes the winning move is looking up at the brown signage, not
          orbiting the blue dot forever. The app is a lens, not a leash.
        </p>
      </section>

      <section className="mb-6">
        <H2>Battery reality</H2>
        <p className="article-body max-w-2xl">
          Translation camera, maps, and brightness on summer days drain faster
          than you expect. Carry a slim power bank you already trust, shorten
          screen timeout, and screenshot critical gates before underground
          stretches. Dead phone plus no written address is the real boss fight,
          not kanji on a menu.
        </p>
      </section>

      <section className="mb-6">
        <H2>Scenario field notes</H2>
        <H3>Shinjuku navigation</H3>
        <p className="article-body max-w-2xl">
          Pick your east or west target before you enter the station web. Maps
          help, but locals still win by reading the brown overhead strips,
          matching exit numbers to your hotel screenshot, and not chasing every
          underground mall shortcut on day one.
        </p>
        <H3>Menu translation</H3>
        <p className="article-body max-w-2xl">
          Scan the plastic sheet, point calmly, say thanks, pay how they ask.
          DeepL can wait until you need a polite sentence for allergy text, not
          for yelling across a busy counter.
        </p>
        <H3>Last train</H3>
        <p className="article-body max-w-2xl">
          Use Yahoo or NAVITIME style thinking, then verify the electronic board
          for cancellations. When in doubt, ask station staff with your phone
          screen showing the destination kanji. Missed last train pairs with GO
          if you already installed it, or a legal taxi stand outside the chaos.
        </p>
        <H3>Late night taxi with GO</H3>
        <p className="article-body max-w-2xl">
          Set your pickup pin where a driver can stop without blocking bikes.
          Keep cash if the terminal hiccups, and stay visible under light, not
          hidden behind vending machines.
        </p>
        <H3>Typhoon alerts</H3>
        <p className="article-body max-w-2xl">
          Cross official JMA style information with your airline app, not random
          group chats. Give yourself time buffers, especially if you read{" "}
          <Link href="/guides/japan-weather-by-month" className={inlineLink}>
            month by month weather
          </Link>{" "}
          and already know your season skews stormy.
        </p>
      </section>
    </>
  );
}

function FooterContent() {
  return (
    <>
      <section className="mb-6">
        <H2>Final read</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Apps support the boring pillars:{" "}
            <Link href="/guides/sim-card-japan" className={inlineLink}>
              data
            </Link>
            ,{" "}
            <Link href="/guides/japan-trains" className={inlineLink}>
              trains
            </Link>
            , translation, and cash backups from{" "}
            <Link href="/guides/money-payments-japan" className={inlineLink}>
              money habits
            </Link>
            . Keep the home screen boring so your trip stays interesting
            offline too.
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
            <Link href="/guides/getting-around-japan" className={linkClass}>
              Getting around Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/money-payments-japan" className={linkClass}>
              Money, cards, and cash
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
            <Link href="/guides/japan-weather-by-month" className={linkClass}>
              Japan weather by month
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-tourist-mistakes" className={linkClass}>
              Biggest mistakes first time tourists make
            </Link>
          </li>
          <li>
            <Link href="/guides/suica-pasmo-guide" className={linkClass}>
              Suica and PASMO explained
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
