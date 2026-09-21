import fs from "node:fs";
import path from "node:path";
import { StayAreaAffiliateCard } from "@/components/guides/StayAreaAffiliateCard";
import { resolvePageImagePath } from "@/lib/guide-page-images";
import { IMAGES } from "@/lib/images";
import { TOKYO_STAY_BOOKING_URLS } from "@/lib/tokyo-stay-booking-urls";

const GUIDE_SLUG = "best-area-tokyo-first-time";

const STAY_AREA_AFFILIATE_DISCLOSURE =
  "Some links may be affiliate links. This helps support Japan Pro Tips at no extra cost to you.";

/**
 * Neighborhood stay cards for /guides/best-area-tokyo-first-time.
 * Expected image files under public/images/guides/best-area-tokyo-first-time/:
 * TODO(image): shinjuku-night.webp
 * TODO(image): shibuya-crossing.webp
 * TODO(image): asakusa-sensoji.webp
 * TODO(image): ueno-park.webp
 * TODO(image): tokyo-station.webp
 * TODO(image): ginza-street.webp
 */
const STAY_AREA_CARDS = [
  {
    id: "shinjuku",
    name: "Shinjuku",
    caption: "Strong first-trip default: dense dining, late trains, and easy day trips.",
    cta: "See stays in Shinjuku",
    href: TOKYO_STAY_BOOKING_URLS.shinjuku,
    imageBasename: "shinjuku-night",
    imageAlt: "Shinjuku district at night with neon signs and transit access",
  },
  {
    id: "shibuya",
    name: "Shibuya",
    caption: "Best when your trip centers on nights out, shopping, and nearby districts.",
    cta: "See stays in Shibuya",
    href: TOKYO_STAY_BOOKING_URLS.shibuya,
    imageBasename: "shibuya-crossing",
    imageAlt: "Shibuya crossing and surrounding streets in Tokyo",
  },
  {
    id: "asakusa",
    name: "Asakusa",
    caption: "Classic Tokyo feel with temples, river walks, and budget-friendly pockets.",
    cta: "See stays in Asakusa",
    href: TOKYO_STAY_BOOKING_URLS.asakusa,
    imageBasename: "asakusa-sensoji",
    imageAlt: "Asakusa street scene near Senso-ji temple",
  },
  {
    id: "ueno",
    name: "Ueno",
    caption: "Lower room rates, park space, and solid JR and metro links east.",
    cta: "See stays in Ueno",
    href: TOKYO_STAY_BOOKING_URLS.ueno,
    imageBasename: "ueno-park",
    imageAlt: "Ueno Park and station area in Tokyo",
  },
  {
    id: "tokyo-station",
    name: "Tokyo Station / Marunouchi",
    caption: "Quiet hallways, bullet train day trips, and polished business-district access.",
    cta: "See stays near Tokyo Station",
    href: TOKYO_STAY_BOOKING_URLS.tokyoStation,
    imageBasename: "tokyo-station",
    imageAlt: "Tokyo Station and Marunouchi district exterior",
  },
  {
    id: "ginza",
    name: "Ginza",
    caption: "Upscale base for calm evenings, classic shopping, and central sightseeing.",
    cta: "See stays in Ginza",
    href: TOKYO_STAY_BOOKING_URLS.ginza,
    imageBasename: "ginza-street",
    imageAlt: "Ginza shopping street in central Tokyo",
  },
] as const;

function stayAreaImageSrc(basename: string): string {
  const resolved = resolvePageImagePath("guides", GUIDE_SLUG, basename);
  const absolutePath = path.join(process.cwd(), "public", resolved.replace(/^\//, ""));

  if (fs.existsSync(absolutePath)) {
    return resolved;
  }

  return IMAGES.ui.placeholder;
}

export function StayAreaAffiliateCards() {
  const cards = STAY_AREA_CARDS.map((card) => ({
    ...card,
    imageSrc: stayAreaImageSrc(card.imageBasename),
  }));

  return (
    <section className="mb-10 max-w-5xl">
      <h2 className="editorial-heading mb-3">Where to stay in Tokyo</h2>
      <p className="article-body-sm mb-6 max-w-2xl text-muted">
        {STAY_AREA_AFFILIATE_DISCLOSURE}
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <StayAreaAffiliateCard
            key={card.id}
            href={card.href}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            name={card.name}
            caption={card.caption}
            cta={card.cta}
          />
        ))}
      </div>
    </section>
  );
}
