import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { MagazinePageHeader } from "@/components/editorial/MagazinePageHeader";
import { MagazineShell } from "@/components/editorial/MagazineShell";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about JapanProTips: travel and resident guides, engineering career resources, and engineering communication services for Japan.",
};

type FaqItem = {
  question: string;
  answer: ReactNode;
};

const inlineLink =
  "font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon";

const faqItems: FaqItem[] = [
  {
    question: "What is JapanProTips?",
    answer: (
      <>
        JapanProTips is a practical field guide for Japan. We publish visitor
        guides and tools for travel planning, resident guides for daily life
        after you move, and engineering resources for foreign engineers working
        inside Japanese manufacturing and product development organizations. It
        is not a travel agency, package tour seller, or generic consulting site.
      </>
    ),
  },
  {
    question: "Are you a travel agency?",
    answer: (
      <>
        No. We do not sell trips, visas, or bookings. Some travel pages link to
        third-party services we use ourselves; those may include affiliate links
        where noted. Engineering services are separate and focus on technical
        communication and documentation support, not travel sales.
      </>
    ),
  },
  {
    question: "Where should I start for a first trip?",
    answer: (
      <>
        Use the{" "}
        <Link href="/start-here" className={inlineLink}>
          Start Here checklist
        </Link>
        , then open guides for SIM cards, trains, and where to stay. The{" "}
        <Link href="/tourists" className={inlineLink}>
          tourist guides hub
        </Link>{" "}
        lists every visitor article in one place.
      </>
    ),
  },
  {
    question: "Do you cover living in Japan?",
    answer: (
      <>
        Yes. The{" "}
        <Link href="/residents" className={inlineLink}>
          Living hub
        </Link>{" "}
        and resident guides cover apartments, banks, health insurance,
        utilities, and day-to-day systems after you move.
      </>
    ),
  },
  {
    question: "Do you offer engineering services?",
    answer: (
      <>
        Yes.{" "}
        <Link href="/engineering-services" className={inlineLink}>
          Engineering Services
        </Link>{" "}
        covers engineering documentation review, technical communication
        support, engineer career positioning, and product development
        documentation. Work is grounded in more than 25 years of experience
        inside Japanese manufacturing and product development organizations.
        You can request a free sample review to start; there is no payment
        system on the site yet.
      </>
    ),
  },
  {
    question: "What is the Engineer hub?",
    answer: (
      <>
        The{" "}
        <Link href="/engineer" className={inlineLink}>
          Engineer hub
        </Link>{" "}
        is a long-term authority section for foreign engineers in Japan. It
        covers career topics such as visas, job hunting, manufacturing culture,
        product development, CAD and CAE paths, supplier coordination, and
        cross-cultural engineering communication. Featured guides are being
        added over time; placeholder cards mark topics planned for publication.
      </>
    ),
  },
  {
    question: "Is this automation consulting or influencer content?",
    answer: (
      <>
        No. The engineering vertical is not positioned as automation consulting,
        generic English editing, or expat lifestyle blogging. Authority comes from
        manufacturing, automotive, and product development experience inside
        Japanese organizations, plus practical lessons on engineering
        communication and documentation.
      </>
    ),
  },
  {
    question: "Can you review engineering reports or supplier emails?",
    answer: (
      <>
        Yes, that is a core use case for{" "}
        <Link href="/engineering-services" className={inlineLink}>
          Engineering Services
        </Link>
        . Typical requests include validation reports, test reports, supplier
        communication, technical presentations, and engineering change
        documentation. NDAs are available. See the services page FAQ for scope
        details.
      </>
    ),
  },
  {
    question: "Will this FAQ grow?",
    answer: (
      <>
        Yes. We add questions as readers ask them. For step-by-step travel and
        resident answers, browse guides and tools. For engineering career topics,
        start at the{" "}
        <Link href="/engineer" className={inlineLink}>
          Engineer hub
        </Link>
        . For documentation or communication support, see{" "}
        <Link href="/engineering-services" className={inlineLink}>
          Engineering Services
        </Link>
        .
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-paper font-sans">
      <MagazinePageHeader
        kicker="Help"
        title="Frequently asked questions"
        description="Quick answers about JapanProTips: travel and resident guides, the Engineer hub, and engineering communication services. More questions will be added here over time."
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

        <div className="article-body mt-10 max-w-3xl space-y-3">
          <p>
            Planning a trip?{" "}
            <Link href="/tourists" className={`editorial-chevron-link ${inlineLink}`}>
              Browse tourist guides
            </Link>
          </p>
          <p>
            Working in Japan as an engineer?{" "}
            <Link href="/engineer" className={`editorial-chevron-link ${inlineLink}`}>
              Visit the Engineer hub
            </Link>
          </p>
          <p>
            Need documentation or communication support?{" "}
            <Link
              href="/engineering-services"
              className={`editorial-chevron-link ${inlineLink}`}
            >
              Explore Engineering Services
            </Link>
          </p>
        </div>
      </MagazineShell>
    </main>
  );
}
