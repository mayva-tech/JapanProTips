import type { Metadata } from "next";
import { TrackedProductDownloadButton } from "@/components/TrackedProductDownloadButton";

export const metadata: Metadata = {
  title: "Moving to Japan: First 30 Days System",
  description:
    "A simple step-by-step system for your first 30 days in Japan: checklist, setup guides, common mistakes, and links. For new residents, students, and workers.",
};

export default function MovingToJapanSystemPage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          Moving to Japan: First 30 Days System
        </h1>

        <div className="font-serif text-muted text-base leading-relaxed mb-12 max-w-2xl space-y-4">
          <p>Moving to Japan is confusing.</p>
          <p>Systems are not always clear.</p>
        </div>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-2xl mb-4">
            What this is
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              A simple step-by-step system
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Covers first 30 days
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-2xl mb-4">
            What&apos;s inside
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              30-day checklist
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Setup guides
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Mistakes to avoid
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Resource links
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-2xl mb-4">
            Who it&apos;s for
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              New residents
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Students
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Workers
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-2xl mb-4">
            Why it helps
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Saves time
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Avoids mistakes
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Reduces confusion
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-2xl mb-4">
            What happens if you don&apos;t have this?
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Tasks pile up in the wrong order, so simple steps take longer than
              they should.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              You find gaps at counters and machines when you are already tired.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              You keep restarting research because nothing is in one place.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-2xl mb-4">
            What happens if you use this?
          </h2>
          <ul className="font-serif text-muted list-none pl-0 space-y-2 leading-relaxed max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              You work through one list instead of ten open tabs.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              You see what is next before a deadline forces it.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              You carry the same order of operations to each office or counter.
            </li>
          </ul>
        </section>

        <div className="pt-4">
          <p className="font-serif text-muted text-base leading-relaxed max-w-2xl mb-4">
            If you want one ordered list instead of scattered tabs, do this:
          </p>
          <p className="font-serif text-muted text-sm leading-relaxed max-w-2xl mb-4">
            Walking through it before move-in week leaves room for paperwork you
            did not expect.
          </p>
          <p className="font-serif text-xs text-muted/70 leading-relaxed max-w-2xl mb-3">
            Based on real use in Japan.
          </p>
          <TrackedProductDownloadButton
            href="#"
            className="inline-block bg-maroon text-white font-sans font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-rust transition-colors duration-150"
          >
            Download the system →
          </TrackedProductDownloadButton>
        </div>
      </article>
    </main>
  );
}
