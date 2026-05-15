"use client";

import Link from "next/link";
import { trackGtagClick } from "@/lib/gtag-events";

const BULLETS = [
  "Airport arrival",
  "SIM cards",
  "Transport system",
  "Where to stay",
] as const;

const cardClass =
  "rounded-xl border border-[#d4c9b0] bg-white px-6 py-6 shadow-sm";
const btnClass =
  "inline-flex w-full items-center justify-center rounded-lg bg-maroon px-6 py-3.5 font-sans text-sm font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust sm:w-auto sm:min-w-[240px]";

export type StartHereFunnelBlockProps = {
  className?: string;
  href?: string;
  buttonText?: string;
};

/**
 * Funnels first-time visitors to the Start Here checklist.
 */
export function StartHereFunnelBlock({
  className = "",
  href = "/guides/start-here-japan",
  buttonText = "Read the Start Here Guide →",
}: StartHereFunnelBlockProps) {
  const trackStartHere =
    href === "/start-here" || href === "/guides/start-here-japan";

  return (
    <div className={`${cardClass} ${className}`.trim()}>
      <h2 className="font-display text-dark tracking-wide text-2xl leading-tight sm:text-3xl">
        New to Japan?
      </h2>
      <div className="mt-4 max-w-2xl space-y-3 font-serif text-base leading-relaxed text-muted">
        <p>
          If this is your first trip, don&apos;t figure everything out the hard
          way.
        </p>
        <p className="font-sans font-bold text-dark">
          Start with the complete guide:
        </p>
      </div>
      <ul className="mt-3 max-w-2xl list-none space-y-2 pl-0 font-serif leading-relaxed text-muted">
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
        <Link
          href={href}
          className={btnClass}
          onClick={() => {
            if (trackStartHere) trackGtagClick("start_here");
          }}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
