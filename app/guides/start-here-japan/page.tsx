import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Start Here: Japan Trip Planning",
  description:
    "Step-by-step Japan trip planning: airport arrival, SIM, transport, where to stay, and money.",
};

export default function StartHereJapanFunnelEntryPage() {
  return (
    <main className="page-x mx-auto max-w-3xl py-12">
      <p className="editorial-kicker mb-3">Start Here</p>
      <h1 className="guide-page-title mb-4">Start Here has moved</h1>
      <p className="article-body mb-6">
        The Japan trip checklist now lives on the main Start Here page.
      </p>
      <Link href="/start-here" className="editorial-btn-primary">
        Open Start Here
      </Link>
    </main>
  );
}
