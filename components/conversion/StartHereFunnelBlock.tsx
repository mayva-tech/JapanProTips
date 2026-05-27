"use client";

import Link from "next/link";
import { stripTrailingArrowFromText } from "@/lib/cta-chevron";
import { trackGtagClick } from "@/lib/gtag-events";

const BULLETS = [
  "Airport arrival",
  "SIM cards",
  "Transport system",
  "Where to stay",
] as const;

export type StartHereFunnelBlockProps = {
  className?: string;
  href?: string;
  buttonText?: string;
};

export function StartHereFunnelBlock({
  className = "",
  href = "/guides/start-here-japan",
  buttonText = "Read the Start Here Guide",
}: StartHereFunnelBlockProps) {
  const trackStartHere =
    href === "/start-here" || href === "/guides/start-here-japan";
  const label = stripTrailingArrowFromText(buttonText);

  return (
    <div className={`editorial-cta-block ${className}`.trim()}>
      <p className="editorial-kicker mb-3">First trip</p>
      <h2 className="editorial-heading mb-4 text-ink">New to Japan?</h2>
      <div className="article-body max-w-2xl space-y-3">
        <p>
          If this is your first trip, don&apos;t figure everything out the hard
          way.
        </p>
        <p className="font-bold text-ink">Start with the complete guide:</p>
      </div>
      <ul className="article-body mt-3 max-w-2xl list-none space-y-2.5 pl-0">
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
        <Link
          href={href}
          className="editorial-btn-primary editorial-chevron-cta"
          onClick={() => {
            if (trackStartHere) trackGtagClick("start_here");
          }}
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
