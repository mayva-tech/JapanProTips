import { TrackedCtaLink } from "@/components/TrackedCtaLink";

const BULLETS = [
  "Easy transport access",
  "More food options nearby",
  "Less walking with luggage",
] as const;

export type HotelConversionBlockProps = {
  className?: string;
  href?: string;
  buttonText?: string;
};

export function HotelConversionBlock({
  className = "",
  href = "/guides/where-to-stay-tokyo",
  buttonText = "Find Hotels in Tokyo →",
}: HotelConversionBlockProps) {
  return (
    <div className={`editorial-cta-block ${className}`.trim()}>
      <p className="editorial-kicker mb-3">Lodging</p>
      <h2 className="editorial-heading mb-4 text-ink">
        Find a Hotel Near a Station
      </h2>
      <div className="article-body max-w-2xl space-y-3">
        <p>In Japan, location matters more than luxury.</p>
        <p>
          Stay near a major train station to save time and energy every day.
        </p>
      </div>
      <ul className="article-body mt-4 max-w-2xl list-none space-y-2.5 pl-0">
        {BULLETS.map((line) => (
          <li
            key={line}
            className="before:mr-3 before:font-bold before:text-rust before:content-['›']"
          >
            {line}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <TrackedCtaLink href={href} label="hotel" className="editorial-btn-primary">
          {buttonText}
        </TrackedCtaLink>
      </div>
    </div>
  );
}
