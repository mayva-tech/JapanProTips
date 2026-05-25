import Link from "next/link";
import { notFound } from "next/navigation";

const DEV_TOOLS = [
  {
    href: "/dev/field-note-audit",
    title: "Field Note coverage audit",
    description:
      "Per-article Field Note counts, tones, overuse, high-value gaps, and balance warnings.",
  },
  {
    href: "/dev/conversion-observability",
    title: "Conversion observability",
    description:
      "Operational map: affiliate, Next Step, and checklist coverage plus GA4 label catalog.",
  },
  {
    href: "/dev/affiliate-audit",
    title: "Affiliate audit",
    description: "Link registry health, missing URLs, and route usage.",
  },
  {
    href: "/dev/next-step-audit",
    title: "Next Step audit",
    description: "Preset links, broken hrefs, and high-value coverage.",
  },
] as const;

export default function DevHubPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div>
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust mb-2">
        Developer only
      </p>
      <h1 className="editorial-heading mb-2 text-3xl">Dev tools</h1>
      <p className="article-body-sm mb-6 text-muted">
        Local dashboards and audits. These routes return 404 in production.
      </p>

      <ul className="list-none space-y-4 pl-0">
        {DEV_TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="block rounded-lg border border-[#d4c9b0] bg-paper-elevated px-5 py-4 transition-colors hover:border-rust/50"
            >
              <h2 className="editorial-heading mb-1 text-lg text-rust">
                {tool.title}
              </h2>
              <p className="article-body-sm m-0 text-muted">
                {tool.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="article-body-sm mt-6 text-muted">
        CLI:{" "}
        <code className="text-dark">npm run audit:affiliate</code>,{" "}
        <code className="text-dark">npm run audit:next-steps</code>,{" "}
        <code className="text-dark">npm run audit:checklists</code>,{" "}
        <code className="text-dark">npm run audit:field-notes</code>,{" "}
      </p>
    </div>
  );
}
