import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moving to Japan: First 30 Days Checklist",
  description:
    "A simple first-30-days checklist for moving to Japan: bank, SIM, bills, apartment setup. Download and work through it in order.",
};

export default function MovingToJapanChecklistPage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          Moving to Japan: First 30 Days Checklist
        </h1>

        <div className="article-body mb-12 max-w-2xl">
          <p>Moving to Japan is confusing. This checklist keeps the first month to a short list you can actually finish.</p>
        </div>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-4">
            What&apos;s inside
          </h2>
          <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Bank
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              SIM
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Bills
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Apartment setup
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-4">
            Who it&apos;s for
          </h2>
          <p className="article-body max-w-2xl">
            New residents, expats on work visas, and students who already have a
            move date and need a boring, practical order of operations.
          </p>
        </section>

        <div className="pt-4">
          <p className="article-body-sm max-w-2xl mb-4">
            Having a printed copy avoids hunting links on slow hotel WiFi.
          </p>
          <a
            href="/downloads/moving-to-japan-checklist.pdf"
            download
            className="inline-block bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-8 py-4 hover:bg-rust transition-colors duration-150"
          >
            Download the first-30-days checklist →
          </a>
        </div>
      </article>
    </main>
  );
}
