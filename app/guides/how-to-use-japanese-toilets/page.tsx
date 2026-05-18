import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "How to Use Japanese Toilets, Trash Rules, and Public Etiquette",
  description:
    "Japanese toilet buttons, bidets, trash rules, train etiquette, queues, and public behavior for first-time visitors. Practical tips to avoid common mistakes.",
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

export default function HowToUseJapaneseToiletsPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      showHotelConversion={false}
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          How to Use Japanese Toilets, Trash Rules, and Public Etiquette
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
        Japan stays considerate toward shared spaces rather than impossibly strict
        with tourists. Rules read intense online, yet daily sidewalks stay human:
        locals forgive honest mistakes when you slow down and follow the crowd.
        Learning as you go is normal, not scandalous.
      </p>
      <p>
        Use this guide as one layer of grounding, then build your rhythm with{" "}
        <Link href="/guides/start-here-japan" className={inlineLink}>
          Japan trip planning
        </Link>{" "}
        so phones, trains, lodging, and money feel sorted before quirks show up at
        a restroom stall.
      </p>
    </div>
  );
}

function MainContent() {
  return (
    <>
      <section className="mb-12">
        <H2>Why these systems exist</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Public comfort leans on cleanliness habits, respectful use of crowded
            rooms, and shared awareness that everyone rotates through the same
            corridors. Rules often encode those goals instead of policing personal
            style for its own sake.
          </p>
          <CheckList
            items={[
              "Cleanliness: restrooms, kitchens, transit, and shops stay workable when mess stays controlled",
              "Shared spaces: apartment blocks, cafes, temples, malls, trains: small courtesies add up fast",
              "Awareness: when you glance at signage and others, friction drops without anyone lecturing tourists",
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <H2>Japanese toilet controls</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Panels vary by maker, yet patterns repeat once you stare calmly for two
            seconds. Bidets may label rear versus front washes, dryer fans, nozzle
            position, seat heat, deodorizer tiers, plus a decisive stop icon.
          </p>
          <CheckList
            items={[
              "Rear versus front wash: start gentle pressure if you toggle strength dials instead of presets",
              "Dry: airflow feels odd at first but beats soggy trousers when you rush to a gate",
              "Stop button: if spray surprises you, slap stop immediately; nothing rude about resetting",
              "Flush: lever on tank, touch panel icons, sensors on wall, foot pedals in older rooms: hunt once per restroom",
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <H2>Heated seats feel normal by winter</H2>
        <p className="article-body max-w-2xl">
          Heated seats sit on by default indoors when cold nights arrive. If you do
          not want warmth, sniff around the panel or wall remote for seat heat icons
          and tap them dim. Hotels and malls often preset comfort levels that feel
          hot to newcomers from mild climates.
        </p>
      </section>

      <section className="mb-12">
        <H2>Privacy sound buttons (Otohime)</H2>
        <p className="article-body max-w-2xl">
          Some stalls play gentle water melodies or synthetic stream noise labeled
          with notes or kanji implying sound princess branding. Purpose: mask
          natural bathroom audio for neighbor comfort. Tap once if silence feels too
          sharp; skipping it hurts nobody when stalls sit empty anyway.
        </p>
      </section>

      <section className="mb-12">
        <H2>Squat toilets still appear</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Face the hooded end unless signage shows otherwise because plumbing aims
            that direction. Grip stable rails when present because wet porcelain
            betrays slippery shoes fast.
          </p>
          <p>
            If balance or knees wobble, pick a Western stall whenever another door
            stands open nearby. Stations and roadside parks occasionally keep one
            squat stall for throughput, not torture.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Toilet slippers are not hallway shoes</H2>
        <p className="article-body max-w-2xl">
          Raised floors at older ryokan, clinic restrooms, temple wings, tiny
          restaurants sometimes stash plastic slippers purely for tiled toilet rooms.
          Never tramp them back toward tatami corridors or hotel bedrooms. Pause,
          swap, exit, swap back without drama.
        </p>
      </section>

      <section className="mb-12">
        <H2>Public restrooms: what to expect</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Stations, malls, parks, highways: major facilities skew clean and tended.
            Fancy washlets appear less often overseas, yet soap and toilet paper stay
            common in rebuilt hubs now.
          </p>
          <CheckList
            items={[
              "Paper towels and air dryers may vanish: plan for quick hand shakes or your own towel",
              "Rare stalls still signal bring-your-own tissues: keep backup packs handy",
              "Soap sometimes runs empty overnight: gel sanitizer in your sling bag saves grouchiness",
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <H2>Carry pocket tissues and a small towel</H2>
        <p className="article-body max-w-2xl">
          Convenience stores hawk tiny tissue packs beside registers; snag a clip
          for your sling bag plus a washable hand towel for drying when dryers sit
          broken. That combo survives rural stops, vending pit stops, noodle shops
          with single shared cloths, awkward airport nights.
        </p>
      </section>

      <section className="mb-12">
        <H2>Trash cans stay scarce outside</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            After security scares ages ago, sidewalks ditched overflowing bins en
            masse in many wards. Tourists confuse it with hostility; it mixes
            policy, cleanliness discipline, letting shops handle packaging at source.
          </p>
          <CheckList
            items={[
              "Stash snack wrappers inside a tiny zip sack until konbini, hotel room, hub bin",
              "Never shove picnic trash into private mail slots, planter beds, vending cubbies",
              "Hotels gladly accept tied bags from your daytime walks when front desks stay staffed",
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <H2>Trash separation basics for tourists</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Household blocks expect burnable versus recyclables buckets; visitors
            mainly touch hotel rooms and train station triple bins. Icons usually
            show bottles, plastics, combustibles split.
          </p>
          <CheckList
            items={[
              "Empty drink bottles inside bottle slots when bins pair narrow inserts",
              "Food-soiled wrappers follow burnable or general waste panels when labels confuse you",
              "When doubtful at a konbini tri-bin, quietly watch the person ahead",
            ]}
          />
        </div>
      </section>

      <section className="mb-12">
        <H2>Convenience store trash etiquette</H2>
        <p className="article-body max-w-2xl">
          Store bins politely accept packaging from purchases you ate or drank on
          site or near the storefront. Tossing unrelated park trash disrespects staff
          who sort bags nightly. Dive deeper inside{" "}
          <Link
            href="/guides/japan-convenience-store-guide"
            className={inlineLink}
          >
            Japanese convenience stores explained
          </Link>{" "}
          before you hog register minutes with mystery garbage.
        </p>
      </section>

      <section className="mb-12">
        <H2>Eating while walking</H2>
        <p className="article-body max-w-2xl">
          Stations and commuter trains discourage wandering bites because crumbs clog
          cleaning budgets and backpacks smack elbows. Tourist districts still soften
          the vibe during lantern festivals where stall culture expects nibbling
          while shuffling sideways. Pause near walls or seating pockets elsewhere.
        </p>
      </section>

      <section className="mb-12">
        <H2>Train etiquette anchors calm cars</H2>
        <div className="article-body space-y-4 max-w-2xl">
          <p>
            Voices stay subdued, headphones leak stays minimal, loudspeaker games
            wait until sidewalks. Calls on speaker invite glares everywhere except
            empty late-night expresses.
          </p>
          <p>
            Build habits with{" "}
            <Link href="/guides/japan-trains" className={inlineLink}>
              how to use trains in Japan
            </Link>{" "}
            layered over{" "}
            <Link href="/guides/getting-around-japan" className={inlineLink}>
              getting around Japan
            </Link>{" "}
            so IC taps, signage, crowded platforms fuse into muscle memory faster.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Backpacks on crowded trains</H2>
        <p className="article-body max-w-2xl">
          Pivot packs to chest height or hoist them overhead when commuters pack
          together. Guards watch for strap sweeps knocking phones onto tracks;
          preempt it before someone taps your shoulder politely yet firmly.
        </p>
      </section>

      <section className="mb-12">
        <H2>Priority seating awareness</H2>
        <p className="article-body max-w-2xl">
          Mildly tinted seats near doors signal seniors, riders with limb injuries,
          pregnancy badges, stroller families. Yield without theatrics whenever
          someone visibly needs support even if etiquette strip stays empty halfway
          through your ride.
        </p>
      </section>

      <section className="mb-12">
        <H2>Escalator norms shift by metro</H2>
        <p className="article-body max-w-2xl">
          Tokyo commuter belts often anchor standers on left while climbers rush
          right. Osaka and Kansai pockets frequently flip that habit with stand-right
          culture. Tourist fix: mimic the rider ahead ten meters before you hog the
          fast lane blindly.
        </p>
      </section>

      <section className="mb-12">
        <H2>Queue culture and floor decals</H2>
        <p className="article-body max-w-2xl">
          Stations paint shoe pairs, snack shops tape arrows, ramen lines wrap
          columns with vinyl cordons. Sliding ahead because you misunderstand the
          serpentine earns annoyance quicker than embarrassment. Freeze, read arrows,
          ask softly with gestures if staff hovers bilingual.
        </p>
      </section>

      <section className="mb-12">
        <H2>Smoking only where marked</H2>
        <p className="article-body max-w-2xl">
          Major cities outlaw walking cigarettes between blocks unless posted
          otherwise. Dedicated smoking rooms cling to malls, hubs, karaoke towers.
          Sneaking vape clouds near kids at temple gates wastes goodwill fast.
        </p>
      </section>

      <section className="mb-12">
        <H2>Speaking volume in public</H2>
        <p className="article-body max-w-2xl">
          Sidewalk energy stays conversational, subway cars drop another notch toward
          hush. Traveling groups escalate volume without noticing themselves; pretend
          you already wear headphones broadcasting your voice back at you once per
          trip.
        </p>
      </section>

      <section className="mb-12">
        <H2>Tokyo, Osaka, and rural pockets compared</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse border border-paper-edge bg-paper-card font-sans text-base text-dark">
            <thead>
              <tr className="border-b border-paper-edge bg-paper-elevated">
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Region
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Vibe
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-widest">
                  Tourist takeaway
                </th>
              </tr>
            </thead>
            <tbody className="article-body">
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Greater Tokyo
                </td>
                <td className="px-4 py-3">
                  Dense choreography, multilingual signage tiers, quieter cars
                  default
                </td>
                <td className="px-4 py-3">
                  Follow taped floor guides, deflate backpack early, dodge phone
                  calls underground
                </td>
              </tr>
              <tr className="border-b border-paper-edge/60">
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Osaka hubs
                </td>
                <td className="px-4 py-3">
                  Warmer chatter near Dotonbori, banter-heavy shop floors, flipped
                  escalator lanes sometimes
                </td>
                <td className="px-4 py-3">
                  Match locals loosening vibes without assuming trains tolerate the
                  same volume
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-sans font-bold text-ink">
                  Rural prefectures
                </td>
                <td className="px-4 py-3">
                  Fewer English prompts, narrower sidewalks, restrooms may retrofit
                  slower
                </td>
                <td className="px-4 py-3">
                  Pack tissues towels cash patience, nod thanks when neighbors guide
                  you gently
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <H2>Mistakes people shrug off versus mistakes that sting</H2>
        <H3>Usually forgiven when you apologize once</H3>
        <CheckList
          items={[
            "Pressing mysterious washlet buttons loudly then stopping fast",
            "Standing on escalator guessed lane before you glance up",
            "Carrying ramen smell through hotel lobby unaware until staff smiles",
          ]}
        />
        <H3>Reads as rude fastest</H3>
        <CheckList
          items={[
            "Shouting FaceTime audio across quiet train rows",
            "Tracking toilet slippers halfway down hallways coated in slippers rules",
            "Stuffing unrelated trash into konbini cans right after staff emptied them",
          ]}
        />
      </section>

      <section className="mb-12">
        <H2>What to actually do: quick scenarios</H2>
        <H3>Toilet stalls run out of toilet paper mid-clean</H3>
        <p className="article-body mb-4 max-w-2xl">
          Knock softly on neighboring stall divider only if etiquette allows, call
          staff with intercom handset when wall-mounted, unwrap emergency tissue from
          your pocket pack quietly, blot with damp towel only as last resort knowing
          you carry soap later anyway.
        </p>
        <H3>You carry trash thirty minutes but see zero bins</H3>
        <p className="article-body mb-4 max-w-2xl">
          Fold wrappers inside your zip sack, tuck into sling bottom, dump at konbini
          only if remnants match merchandise you grabbed there, surrender tied bags at
          hotel desk before supper so rooms stay sweet.
        </p>
        <H3>Rush-hour train threatens rib compression</H3>
        <p className="article-body max-w-2xl">
          Pivot backpack forward immediately, widen stance slightly for balance but
          keep ankles soft, tuck elbows, exit one stop early during peak windows if
          claustrophobia spikes. Kindness survives when you grin apologetic instead of
          shoving blindly.
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
            Let locals model micro-habits: copy shoe lines, restroom slipper swaps,
            trash sorting panels without debating theory mid-trip. Observation beats
            memorizing encyclopedic etiquette lists taped above your suitcase.
          </p>
          <p>
            Effort outweighs flawless performance; honest mistakes heal when you
            pause, apologize softly, and adapt next block. Confidence grows when you
            repeat small courtesies until they feel dull, because dull usually means
            automatic.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <H2>Related guides</H2>
        <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
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
            <Link
              href="/guides/japan-convenience-store-guide"
              className={linkClass}
            >
              Japanese convenience stores explained
            </Link>
          </li>
          <li>
            <Link href="/guides/japan-train-mistakes" className={linkClass}>
              Train and transit mistakes to avoid in Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/money-payments-japan" className={linkClass}>
              Money, cards, and cash in Japan
            </Link>
          </li>
          <li>
            <Link href="/guides/start-here-japan" className={linkClass}>
              Japan trip planning
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
