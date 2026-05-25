import Link from "next/link";
import { notFound } from "next/navigation";
import {
  runNextStepAudit,
  type NextStepIssue,
  type NextStepIssueKind,
} from "@/lib/next-step-audit";

export const dynamic = "force-dynamic";

function PassBadge({ passed }: { passed: boolean }) {
  return (
    <span
      className={`inline-block rounded px-3 py-1 font-sans text-xs font-bold uppercase tracking-widest ${
        passed ? "bg-[#e0ead8] text-dark" : "bg-[#ebe4d8] text-rust"
      }`}
    >
      {passed ? "Pass" : "Fail"}
    </span>
  );
}

function IssueKindBadge({ kind }: { kind: NextStepIssueKind }) {
  const styles: Record<NextStepIssueKind, string> = {
    broken_link: "bg-[#ebe4d8] text-rust",
    self_link: "bg-[#ebe4d8] text-rust",
    duplicate_link: "bg-[#ebe4d8] text-rust",
    invalid_item_count: "bg-[#ebe4d8] text-rust",
    suspicious_href: "bg-[#ebe4d8] text-muted",
  };
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 font-sans text-xs font-bold uppercase tracking-widest ${styles[kind]}`}
    >
      {kind.replace(/_/g, " ")}
    </span>
  );
}

function IssuesTable({
  title,
  issues,
}: {
  title: string;
  issues: NextStepIssue[];
}) {
  if (issues.length === 0) {
    return null;
  }

  return (
    <section className="mb-6">
      <h2 className="editorial-heading mb-3 text-xl">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse border border-[#d4c9b0] bg-white text-left font-sans text-sm">
          <thead>
            <tr className="border-b border-[#d4c9b0] bg-cream">
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Kind
              </th>
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Preset
              </th>
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Href
              </th>
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
              <tr
                key={`${issue.kind}-${issue.presetId}-${issue.href ?? ""}-${index}`}
                className="border-b border-[#d4c9b0]"
              >
                <td className="px-3 py-2">
                  <IssueKindBadge kind={issue.kind} />
                </td>
                <td className="px-3 py-2 font-mono text-xs">{issue.presetId}</td>
                <td className="px-3 py-2 font-mono text-xs text-muted">
                  {issue.href ? (
                    issue.href.startsWith("/") ? (
                      <Link
                        href={issue.href}
                        className="text-rust hover:text-maroon"
                      >
                        {issue.href}
                      </Link>
                    ) : (
                      issue.href
                    )
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-3 py-2 text-muted">{issue.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function NextStepAuditPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const report = runNextStepAudit();
  const { summary } = report;

  const broken = report.issues.filter((i) => i.kind === "broken_link");
  const self = report.issues.filter((i) => i.kind === "self_link");
  const duplicate = report.issues.filter((i) => i.kind === "duplicate_link");
  const invalidCount = report.issues.filter(
    (i) => i.kind === "invalid_item_count",
  );
  const suspicious = report.issues.filter((i) => i.kind === "suspicious_href");

  return (
    <div>
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust mb-2">
        Developer only
      </p>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="editorial-heading text-3xl">Next Step guides audit</h1>
        <PassBadge passed={report.passed} />
      </div>
      <p className="article-body-sm mb-4 text-muted">
        Scans <code className="text-dark">lib/next-step-guide-presets.ts</code>{" "}
        and article usage in <code className="text-dark">app/**</code> and{" "}
        <code className="text-dark">content/**</code>. Not available in
        production builds.
      </p>
      <p className="article-body-sm mb-6">
        <Link href="/dev/conversion-observability" className="text-rust hover:text-maroon">
          Conversion observability map →
        </Link>
      </p>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Presets", value: summary.totalPresets },
          { label: "Links checked", value: summary.totalLinksChecked },
          { label: "Presets in use", value: summary.presetsInUse },
          { label: "Broken links", value: summary.brokenLinks },
          { label: "Self-links", value: summary.selfLinks },
          { label: "Duplicate links", value: summary.duplicateLinks },
          { label: "Invalid item counts", value: summary.invalidItemCounts },
          { label: "Suspicious hrefs", value: summary.suspiciousHrefs },
          { label: "Unused presets", value: summary.unusedPresets },
          {
            label: "High-value missing",
            value: summary.highValueMissing,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-[#d4c9b0] bg-paper-elevated px-4 py-3"
          >
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted">
              {stat.label}
            </p>
            <p className="font-display text-2xl text-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      {!report.passed ? (
        <section className="mb-6 rounded-lg border border-rust/40 bg-[#ebe4d8] px-4 py-3">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-rust mb-2">
            Audit failed
          </h2>
          <p className="article-body-sm text-muted m-0">
            Fix broken, self, duplicate, invalid count, or suspicious href issues
            before shipping preset changes. Unused presets and missing high-value
            blocks are warnings only.
          </p>
        </section>
      ) : null}

      <IssuesTable title="Broken links" issues={broken} />
      <IssuesTable title="Self-links" issues={self} />
      <IssuesTable title="Duplicate links" issues={duplicate} />
      <IssuesTable title="Invalid item counts" issues={invalidCount} />
      <IssuesTable title="Suspicious hrefs" issues={suspicious} />

      <section className="mb-6">
        <h2 className="editorial-heading mb-3 text-xl">Preset usage</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse border border-[#d4c9b0] bg-white text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-[#d4c9b0] bg-cream">
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Preset
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Source route
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Items
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Status
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Targets
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Files
                </th>
              </tr>
            </thead>
            <tbody>
              {report.presets.map((row) => (
                <tr
                  key={row.presetId}
                  className={`border-b border-[#d4c9b0] ${row.isUsed ? "" : "opacity-60"}`}
                >
                  <td className="px-3 py-2 font-mono text-xs">{row.presetId}</td>
                  <td className="px-3 py-2">
                    <Link
                      href={row.sourceRoute}
                      className="text-rust hover:text-maroon"
                    >
                      {row.sourceRoute}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{row.itemCount}</td>
                  <td className="px-3 py-2">
                    {row.isUsed ? "in use" : "unused"}
                  </td>
                  <td className="max-w-xs px-3 py-2 text-muted">
                    {row.targetRoutes.map((href) => (
                      <span key={href} className="block">
                        <Link
                          href={href}
                          className="text-rust hover:text-maroon"
                        >
                          {href}
                        </Link>
                      </span>
                    ))}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-muted">
                    {row.usedInFiles.length > 0
                      ? row.usedInFiles.join(", ")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {report.unusedPresets.length > 0 ? (
        <section className="mb-6 rounded-lg border border-[#d4c9b0] bg-paper-elevated px-4 py-4">
          <h2 className="editorial-heading mb-3 text-xl">
            Unused presets (warning)
          </h2>
          <ul className="article-body-sm list-none space-y-1 pl-0 font-mono text-sm">
            {report.unusedPresets.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {report.highValueMissing.length > 0 ? (
        <section className="mb-6 rounded-lg border border-[#d4c9b0] bg-paper-elevated px-4 py-4">
          <h2 className="editorial-heading mb-3 text-xl">
            High-value pages missing NextStepGuides (warning)
          </h2>
          <ul className="article-body-sm list-none space-y-1 pl-0">
            {report.highValueMissing.map((route) => (
              <li key={route}>
                <Link href={route} className="text-rust hover:text-maroon">
                  {route}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="article-body-sm mt-6 text-muted">
        CLI: <code className="text-dark">npm run audit:next-steps</code>
        {" · "}
        <Link href="/dev/affiliate-audit" className="text-rust hover:text-maroon">
          Affiliate audit
        </Link>
      </p>
    </div>
  );
}
