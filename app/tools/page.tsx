import type { Metadata } from "next";
import Link from "next/link";
import { MagazinePageHeader } from "@/components/editorial/MagazinePageHeader";
import { MagazineShell } from "@/components/editorial/MagazineShell";
import { ToolsHubToolCard } from "@/components/tools/ToolsHubToolCard";
import { IMAGES } from "@/lib/images";
import { siteUrl, SITE_NAME } from "@/lib/site";
import {
  TOOL_GROUP_LABELS,
  TOOL_GROUP_ORDER,
  toolsInGroup,
} from "@/lib/site-tools";

const PATH = "/tools";
const CANONICAL = `${siteUrl()}${PATH}`;
const BUDGET_CALC_URL = `${siteUrl()}/tools/japan-trip-budget-calculator`;
const PACKING_GEN_URL = `${siteUrl()}/tools/japan-packing-generator`;
const CAN_I_BRING_URL = `${siteUrl()}/tools/can-i-bring-this-to-japan`;
const ADDRESS_FORMATTER_URL = `${siteUrl()}/tools/japanese-address-formatter`;
const MONTHLY_COST_URL = `${siteUrl()}/tools/japan-monthly-cost-calculator`;

const description =
  "Practical Japan travel and resident tools: trip budgets, packing, customs, addresses, and monthly living cost bands. Plan with numbers, not guesswork.";

export const metadata: Metadata = {
  title: "Japan Travel Tools",
  description,
  keywords: [
    "Japan travel tools",
    "Japan trip calculator",
    "Japan budget planner",
    "Japan travel planning",
    "JapanProTips tools",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "Japan Travel Tools",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Travel Tools",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: "Japan Travel Tools",
      description,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: siteUrl(),
      },
      breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
      mainEntity: {
        "@type": "ItemList",
        name: "JapanProTips travel tools",
        numberOfItems: 6,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "SoftwareApplication",
              name: "Japan Trip Budget Calculator",
              description:
                "Estimate hotels, food, transport, shopping, emergency buffer, and suggested cash.",
              url: BUDGET_CALC_URL,
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "SoftwareApplication",
              name: "Japan Itinerary Planner",
              description:
                "Set trip length, start city, theme, travel style, and pace for a day-by-day route outline.",
              url: `${siteUrl()}/tools/japan-itinerary-planner`,
              applicationCategory: "TravelApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "SoftwareApplication",
              name: "Japan Packing Generator",
              description:
                "Build a practical packing checklist from month, trip length, cities, laundry, activities, and rain risk.",
              url: PACKING_GEN_URL,
              applicationCategory: "TravelApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "SoftwareApplication",
              name: "Can I Bring This to Japan? Checker",
              description:
                "High level guidance on medicine, food, plants, vapes, alcohol, power banks, cash, and more before you pack.",
              url: CAN_I_BRING_URL,
              applicationCategory: "TravelApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 5,
            item: {
              "@type": "SoftwareApplication",
              name: "Japanese Address Formatter",
              description:
                "Build Japanese order, English-friendly blocks, and delivery-style lines from postal code, prefecture, ward, chome, ban, go, building, room, and name.",
              url: ADDRESS_FORMATTER_URL,
              applicationCategory: "TravelApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 6,
            item: {
              "@type": "SoftwareApplication",
              name: "Japan Monthly Cost Calculator",
              description:
                "Rough monthly band for rent, food, utilities, transport, phone, internet, optional insurance and childcare add-ons, move-in warning, and emergency savings target for residents.",
              url: MONTHLY_COST_URL,
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl(),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tools",
          item: CANONICAL,
        },
      ],
    },
  ],
};

const comingSoon: { title: string; body: string }[] = [];

export default function ToolsHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-paper font-sans">
        <div className="border-b border-paper-edge bg-paper/90">
          <MagazineShell className="py-4">
            <nav
              className="font-sans text-sm font-semibold text-muted"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="text-rust hover:text-maroon">
                Home
              </Link>
              <span aria-hidden className="mx-2 text-tan">
                /
              </span>
              <span className="text-dark">Tools</span>
            </nav>
          </MagazineShell>
        </div>

        <MagazinePageHeader
          kicker="Tools"
          title="Japan Travel Tools"
          description="Practical calculators and checkers for planning Japan without guessing. Start with what is live, then dig into the guides when you want narrative context."
          imageSrc={IMAGES.hero.ticketing}
          imageAlt="Japan train station ticketing area"
        />

        <article className="pb-8 pt-8 sm:pb-8 sm:pt-8">
          <MagazineShell>

          <section aria-labelledby="tools-live-heading" className="mb-6">
            <h2
              id="tools-live-heading"
              className="editorial-heading mb-6 text-xl text-dark sm:text-2xl"
            >
              Available now
            </h2>
            <div className="space-y-8">
              {TOOL_GROUP_ORDER.map((groupId) => {
                const tools = toolsInGroup(groupId);
                const meta = TOOL_GROUP_LABELS[groupId];
                const gridClass =
                  tools.length >= 2
                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
                    : "grid max-w-xl grid-cols-1 gap-4";
                return (
                  <div key={groupId}>
                    <div className="mb-4 border-l-2 border-rust/35 pl-3 sm:mb-5">
                      <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
                        {meta.title}
                      </h3>
                      <p className="article-body-sm mt-1 max-w-2xl text-muted">
                        {meta.description}
                      </p>
                    </div>
                    <div className={gridClass}>
                      {tools.map((t) => (
                        <ToolsHubToolCard
                          key={t.slug}
                          href={t.href}
                          title={t.title}
                          description={t.description}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {comingSoon.length > 0 ? (
            <section aria-labelledby="tools-soon-heading" className="mb-6">
              <h2
                id="tools-soon-heading"
                className="editorial-heading mb-2 text-xl text-dark sm:text-2xl"
              >
                Coming next
              </h2>
              <p className="article-body-sm mb-6 max-w-2xl text-muted">
                These are on the roadmap. Cards stay visible so you know what we
                are building toward, not as placeholders that look abandoned.
              </p>
              <div className="grid max-w-xl gap-4">
                {comingSoon.map((tool) => (
                  <div
                    key={tool.title}
                    className="flex flex-col rounded-lg border border-dashed border-paper-edge bg-paper-elevated/70 p-5 shadow-inner sm:p-6"
                  >
                    <span className="inline-flex w-fit rounded border border-paper-edge bg-paper px-2 py-1 font-sans text-[0.65rem] font-bold uppercase tracking-widest text-muted">
                      Coming later
                    </span>
                    <h3 className="font-display mt-4 text-lg font-bold text-dark sm:text-xl">
                      {tool.title}
                    </h3>
                    <p className="article-body-sm mt-2 flex-1 leading-relaxed text-muted">
                      {tool.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section
            className="rounded-lg border border-paper-edge bg-paper-card/90 p-6 shadow-editorial sm:p-8"
            aria-labelledby="tools-guides-heading"
          >
            <h2
              id="tools-guides-heading"
              className="font-display text-xl font-bold italic text-dark sm:text-2xl"
            >
              Pair tools with guides
            </h2>
            <p className="article-body-sm mt-2 max-w-2xl text-muted">
              Numbers help you set expectations. Guides explain the why behind
              the line items.
            </p>
            <ul className="mt-6 flex flex-col gap-3 font-sans text-sm font-semibold sm:flex-row sm:flex-wrap">
              <li>
                <Link
                  href="/guides/start-here-japan"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Start here: Japan trip checklist →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/japan-budget-breakdown"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan budget breakdown →
                </Link>
              </li>
              <li>
                <Link
                  href="/residents/japan-living-cost"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Monthly cost of living in Japan →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/japan-packing-list"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan packing list →
                </Link>
              </li>
            </ul>
          </section>
          </MagazineShell>
        </article>
      </main>
    </>
  );
}
