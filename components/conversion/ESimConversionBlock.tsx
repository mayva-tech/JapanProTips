import { TrackedCtaLink } from "@/components/TrackedCtaLink";

const BULLETS = [
  "Works immediately after landing",
  "No physical SIM needed",
  "Cheaper than airport options",
] as const;

export type ESimConversionBlockProps = {
  className?: string;
  href?: string;
  buttonText?: string;
};

export function ESimConversionBlock({
  className = "",
  href = "/guides/sim-card-japan",
  buttonText = "Get an eSIM →",
}: ESimConversionBlockProps) {
  return (
    <div className={`editorial-cta-block ${className}`.trim()}>
      <p className="editorial-kicker mb-3">Connectivity</p>
      <h2 className="editorial-heading mb-4 text-ink">
        Get Internet Before You Land
      </h2>
      <div className="article-body max-w-2xl space-y-3">
        <p>Skip airport lines and overpriced SIM cards.</p>
        <p>
          Set up your eSIM before arrival and connect instantly when you land.
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
      <div className="mt-8">
        <TrackedCtaLink href={href} label="esim" className="editorial-btn-primary">
          {buttonText}
        </TrackedCtaLink>
      </div>
    </div>
  );
}
