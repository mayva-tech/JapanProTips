import { TrackedCtaLink } from "@/components/TrackedCtaLink";

const BULLETS = [
  "Works immediately after landing",
  "No physical SIM needed",
  "Cheaper than airport options",
] as const;

const cardClass =
  "rounded-xl border border-[#d4c9b0] bg-white px-6 py-6 shadow-sm";
const btnClass =
  "inline-flex w-full items-center justify-center rounded-lg bg-maroon px-6 py-3.5 font-sans text-sm font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust sm:w-auto sm:min-w-[200px]";

export type ESimConversionBlockProps = {
  className?: string;
  href?: string;
  buttonText?: string;
};

/**
 * High-converting eSIM pitch used across guides and key landing pages.
 */
export function ESimConversionBlock({
  className = "",
  href = "/guides/sim-card-japan",
  buttonText = "Get an eSIM →",
}: ESimConversionBlockProps) {
  return (
    <div className={`${cardClass} ${className}`.trim()}>
      <h2 className="font-display text-dark tracking-wide text-2xl leading-tight sm:text-3xl">
        Get Internet Before You Land
      </h2>
      <div className="mt-4 max-w-2xl space-y-3 font-serif text-base leading-relaxed text-muted">
        <p>Skip airport lines and overpriced SIM cards.</p>
        <p>
          Set up your eSIM before arrival and connect instantly when you land.
        </p>
      </div>
      <ul className="mt-4 max-w-2xl list-none space-y-2 pl-0 font-serif leading-relaxed text-muted">
        {BULLETS.map((line) => (
          <li
            key={line}
            className="before:mr-3 before:font-bold before:text-rust before:content-['›']"
          >
            {line}
          </li>
        ))}
      </ul>
      <div className="mt-6 sm:inline-block sm:w-auto">
        <TrackedCtaLink href={href} label="esim" className={btnClass}>
          {buttonText}
        </TrackedCtaLink>
      </div>
    </div>
  );
}
