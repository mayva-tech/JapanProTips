import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FIELD_NOTE_HIGH_VALUE_ROUTES,
  FIELD_NOTE_OVERUSE_HARD,
  FIELD_NOTE_OVERUSE_SOFT,
  formatFieldNotePerRouteBlock,
  runFieldNoteAudit,
  type FieldNotePerRoute,
} from "@/lib/field-note-audit";
import { FIELD_NOTE_TONE_ORDER } from "@/lib/field-notes";

export const dynamic = "force-dynamic";

function OveruseBadge({ level }: { level: FieldNotePerRoute["overuse"] }) {
  if (level === "none") {
    return (
      <span className="inline-block rounded px-2 py-0.5 font-sans text-xs font-bold uppercase tracking-widest bg-[#e0ead8] text-dark">
        OK
      </span>
    );
  }
  return (
    <span className="inline-block rounded px-2 py-0.5 font-sans text-xs font-bold uppercase tracking-widest bg-[#ebe4d8] text-rust">
      {level === "soft"
        ? `Soft (min ${FIELD_NOTE_OVERUSE_SOFT})`
        : `Hard (min ${FIELD_NOTE_OVERUSE_HARD})`}
    </span>
  );
}

export default function FieldNoteAuditPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const report = runFieldNoteAudit();
  const { summary } = report;

  const overuseRoutes = report.routes.filter((r) => r.overuse !== "none");
  const withNotes = report.routes.filter((r) => r.count > 0);
  const highValueZero = [...FIELD_NOTE_HIGH_VALUE_ROUTES].filter(
    (hr) => (report.routes.find((r) => r.route === hr)?.count ?? 0) === 0,
  );

  return (
    <div>
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust mb-2">
        Developer only
      </p>
      <h1 className="editorial-heading mb-2 text-3xl">Field Note coverage audit</h1>
      <p className="article-body-sm mb-6 text-muted">
        Scans guide and resident article files for{" "}
        <code className="text-dark">FieldNote</code> family components. Flags
        high-value gaps, overuse, and site-wide tone skew. Not available in
        production.
      </p>

      <nav className="article-body-sm mb-8 flex flex-wrap gap-4">
        <Link href="/dev" className="text-rust hover:text-maroon">
          Dev hub
        </Link>
        <Link href="/dev/conversion-observability" className="text-rust hover:text-maroon">
          Conversion observability
        </Link>
      </nav>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Articles scanned", value: summary.articleRoutes },
          { label: "Routes with notes", value: summary.routesWithNotes },
          { label: "Zero field notes", value: summary.routesWithZeroNotes },
          { label: "Total field notes", value: summary.totalNotes },
          { label: "Avg per article", value: summary.avgNotesPerArticle },
          {
            label: "High-value with zero",
            value: summary.highValueWithZeroNotes,
          },
          { label: "Overuse soft", value: summary.overuseSoftRoutes },
          { label: "Overuse hard", value: summary.overuseHardRoutes },
          { label: "Invalid tags", value: report.issues.length },
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

      {report.imbalanceWarnings.length > 0 ? (
        <section className="mb-8 rounded-lg border border-rust/30 bg-[#ebe4d8] px-4 py-3">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-rust mb-2">
            Tone balance
          </h2>
          <ul className="article-body-sm m-0 list-none space-y-2 pl-0 text-muted">
            {report.imbalanceWarnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mb-10">
        <h2 className="editorial-heading mb-3 text-xl">Site-wide tone totals</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse border border-[#d4c9b0] bg-white text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-[#d4c9b0] bg-cream">
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Tone
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Count
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Share
                </th>
              </tr>
            </thead>
            <tbody>
              {FIELD_NOTE_TONE_ORDER.map((t) => {
                const c = summary.toneTotals[t];
                const share =
                  summary.totalNotes > 0
                    ? ((c / summary.totalNotes) * 100).toFixed(1)
                    : "0";
                return (
                  <tr key={t} className="border-b border-[#d4c9b0]">
                    <td className="px-3 py-2 font-mono text-xs">{t}</td>
                    <td className="px-3 py-2">{c}</td>
                    <td className="px-3 py-2 text-muted">{share}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="editorial-heading mb-3 text-xl">
          High-value catalog routes with zero notes ({highValueZero.length})
        </h2>
        <p className="article-body-sm mb-3 text-muted">
          Same high-value list as Next Step audit. Heuristic{" "}
          <code className="text-dark">recommended</code> tone is a starting point only.
        </p>
        <ul className="article-body-sm m-0 max-h-64 list-none space-y-2 overflow-y-auto pl-0 font-mono text-xs">
          {highValueZero.map((hr) => {
            const slug = hr.replace(/^\/(guides|residents)\//, "");
            const row = report.routes.find((r) => r.route === hr);
            const rec = row?.recommendedTone;
            return (
              <li key={hr}>
                <Link href={hr} className="text-rust hover:text-maroon">
                  {slug}
                </Link>
                {rec ? (
                  <span className="text-muted"> · recommended: {rec}</span>
                ) : (
                  <span className="text-muted"> · no article file in scan</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {overuseRoutes.length > 0 ? (
        <section className="mb-10">
          <h2 className="editorial-heading mb-3 text-xl">Overuse warnings</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse border border-[#d4c9b0] bg-white text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-[#d4c9b0] bg-cream">
                  <th className="px-3 py-2 font-bold uppercase tracking-widest">
                    Slug
                  </th>
                  <th className="px-3 py-2 font-bold uppercase tracking-widest">
                    Count
                  </th>
                  <th className="px-3 py-2 font-bold uppercase tracking-widest">
                    Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {overuseRoutes.map((r) => (
                  <tr key={r.route} className="border-b border-[#d4c9b0]">
                    <td className="px-3 py-2">
                      <Link
                        href={r.route}
                        className="font-mono text-xs text-rust hover:text-maroon"
                      >
                        {r.slug}
                      </Link>
                    </td>
                    <td className="px-3 py-2">{r.count}</td>
                    <td className="px-3 py-2">
                      <OveruseBadge level={r.overuse} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="mb-10">
        <h2 className="editorial-heading mb-3 text-xl">
          Routes with Field Notes ({withNotes.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse border border-[#d4c9b0] bg-white text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-[#d4c9b0] bg-cream">
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Slug
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Count
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Tones
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Overuse
                </th>
              </tr>
            </thead>
            <tbody>
              {withNotes.map((r) => (
                <tr key={r.route} className="border-b border-[#d4c9b0]">
                  <td className="px-3 py-2">
                    <Link
                      href={r.route}
                      className="font-mono text-xs text-rust hover:text-maroon"
                    >
                      {r.slug}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{r.count}</td>
                  <td className="px-3 py-2 font-mono text-xs text-muted">
                    {r.tones.join(", ")}
                  </td>
                  <td className="px-3 py-2">
                    <OveruseBadge level={r.overuse} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="editorial-heading mb-3 text-xl">CLI example output</h2>
        <p className="article-body-sm mb-3 text-muted">
          Run <code className="text-dark">npm run audit:field-notes</code> for the full
          per-article dump. Sample blocks:
        </p>
        <pre className="max-h-96 overflow-auto rounded-lg border border-[#d4c9b0] bg-paper-elevated p-4 font-mono text-xs text-dark">
          {withNotes.length > 0
            ? withNotes
                .slice(0, 3)
                .map((r) => formatFieldNotePerRouteBlock(r))
                .join("\n\n")
            : "(no routes with field notes yet)"}
        </pre>
      </section>

      {report.issues.length > 0 ? (
        <section className="mb-10 rounded-lg border border-rust/40 bg-[#ebe4d8] px-4 py-3">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-rust mb-2">
            Issues
          </h2>
          <ul className="article-body-sm m-0 list-none space-y-1 pl-0">
            {report.issues.map((i, idx) => (
              <li key={`${i.kind}-${idx}`}>
                [{i.kind}] {i.message}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
