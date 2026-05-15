import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "Japan Transportation for Visitors (Trains, IC, Apps)",
  description:
    "How to move around Japan without drama: IC cards, JR vs metro, airport transfers, and the apps that keep first-time visitors from getting stuck.",
};

export default function JapanTransportationPage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          Japan Transportation for Visitors
        </h1>
      }
      intro={
        <div className="font-serif text-muted text-base leading-relaxed space-y-4 max-w-2xl">
          <p>
            Japan is not hard to move through if you accept one idea: you do not
            need the whole network in your head. You need a tap card, a map app
            habit, and a few rules about express vs local trains.
          </p>
          <p>
            This page is a hub. The deep guides below are what you actually read on
            the plane.
          </p>
        </div>
      }
      beforeComparison={
        <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed max-w-2xl mb-12">
          <li>
            <Link
              href="/guides/getting-around-japan"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Getting around Japan (trains and apps) →
            </Link>
          </li>
          <li>
            <Link
              href="/guides/japan-trains"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              How to use trains in Japan →
            </Link>
          </li>
          <li>
            <Link
              href="/guides/suica-pasmo-guide"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Suica and PASMO explained (tourists) →
            </Link>
          </li>
          <li>
            <Link
              href="/guides/suica-vs-pasmo"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Suica vs PASMO →
            </Link>
          </li>
          <li>
            <Link
              href="/guides/japan-airport-to-city"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Airport to city →
            </Link>
          </li>
        </ul>
      }
      afterComparison={
        <GuideEndCta
          parentHref="/guides/where-to-stay-tokyo"
          parentLabel="Where to stay in Tokyo →"
        />
      }
    />
  );
}
