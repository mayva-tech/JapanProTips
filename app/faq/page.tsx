import type { Metadata } from "next";
import Link from "next/link";
import { MagazinePageHeader } from "@/components/editorial/MagazinePageHeader";
import { MagazineShell } from "@/components/editorial/MagazineShell";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about JapanProTips: who we are, how guides work, and how to plan your trip or life in Japan.",
};

const faqItems = [
  {
    question: "What is JapanProTips?",
    answer:
      "JapanProTips is a field guide for Japan travel and daily life. We publish practical guides and tools written for visitors and residents, not package tours or generic listicles.",
  },
  {
    question: "Are you a travel agency?",
    answer:
      "No. We do not sell trips, visas, or bookings. Some pages link to third-party services we use ourselves; those may include affiliate links where noted.",
  },
  {
    question: "Where should I start for a first trip?",
    answer:
      "Use the Start Here checklist, then open guides for SIM cards, trains, and where to stay. The tourist guides hub lists every visitor article in one place.",
  },
  {
    question: "Do you cover living in Japan?",
    answer:
      "Yes. The Living hub and resident guides cover apartments, banks, health insurance, utilities, and day-to-day systems after you move.",
  },
  {
    question: "Will this FAQ grow?",
    answer:
      "Yes. We are adding common questions as readers ask them. For now, browse guides and tools for step-by-step answers.",
  },
] as const;

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-paper font-sans">
      <MagazinePageHeader
        kicker="Help"
        title="Frequently asked questions"
        description="Quick answers about JapanProTips and how to use the site. More questions will be added here over time."
        actions={
          <Link
            href="/start-here"
            className="editorial-btn-primary editorial-chevron-cta"
          >
            Start Here checklist
          </Link>
        }
      />

      <MagazineShell className="py-8 sm:py-10">
        <div className="guide-prose max-w-3xl">
          {faqItems.map((item) => (
            <section key={item.question} className="mb-10 last:mb-0">
              <h2 className="!mt-0 !border-t-0 !pt-0">{item.question}</h2>
              <p>{item.answer}</p>
            </section>
          ))}
        </div>

        <p className="article-body mt-10 max-w-3xl">
          Still planning a trip?{" "}
          <Link
            href="/tourists"
            className="editorial-chevron-link font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
          >
            Browse tourist guides
          </Link>
        </p>
      </MagazineShell>
    </main>
  );
}
