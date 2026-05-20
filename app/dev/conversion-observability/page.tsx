import Link from "next/link";
import { notFound } from "next/navigation";
import {
  runConversionObservability,
  type ConversionPageRow,
  type ConversionSystemKey,
} from "@/lib/conversion-observability";

export const dynamic = "force-dynamic";

function HealthBadge({
  label,
  ok,
}: {
  label: string;
  ok: boolean;
}) {
  return (
    <span
      className={`inline-block rounded px-3 py-1 font-sans text-xs font-bold uppercase tracking-widest ${
        ok ? "bg-[#e0ead8] text-dark" : "bg-[#ebe4d8] text-rust"
      }`}
    >
      {label}: {ok ? "OK" : "Review"}
    </span>
  );
}

function SystemDot({ active, title }: { active: boolean; title: string }) {
  return (
    <span
      title={title}
      className={`inline-block h-2.5 w-2.5 rounded-full ${
        active ? "bg-rust" : "bg-[#d4c9b0]"
      }`}
      aria-hidden
    />
  );
}

function PageSystems({ row }: { row: ConversionPageRow }) {
  const flags: { key: ConversionSystemKey; label: string }[] = [
    { key: "affiliate_gear", label: "Gear" },
    { key: "affiliate_service", label: "Service" },
    { key: "next_step", label: "Next" },
    { key: "checklist", label: "PDF" },
    { key: "guide_end_cta", label: "End CTA" },
    { key: "field_note", label: "Note" },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {flags.map(({ key, label }) => (
        <SystemDot
          key={key}
          active={row.systemsActive.includes(key)}
          title={label}
        />
      ))}
    </div>
  );
}

function ConversionPageTable({
  title,
  description,
  rows,
  showHints = false,
}: {
  title: string;
  description?: string;
  rows: ConversionPageRow[];
  showHints?: boolean;
}) {
  if (rows.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="editorial-heading mb-2 text-xl">{title}</h2>
      {description ? (
        <p className="article-body-sm mb-4 text-muted">{description}</p>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse border border-[#d4c9b0] bg-white text-left font-sans text-sm">
          <thead>
            <tr className="border-b border-[#d4c9b0] bg-cream">
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Route
              </th>
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Stack
              </th>
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Depth
              </th>
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Gear
              </th>
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Service
              </th>
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Next Step
              </th>
              <th className="px-3 py-2 font-bold uppercase tracking-widest">
                Checklist
              </th>
              {showHints ? (
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Drop-off notes
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.route}
                className="border-b border-[#d4c9b0] align-top"
              >
                <td className="px-3 py-2">
                  <Link
                    href={row.route}
                    className="font-mono text-xs text-rust hover:text-maroon"
                  >
                    {row.route}
                  </Link>
                  <p className="mt-1 text-xs text-muted">
                    {row.audience}
                    {row.isHighValue ? " · high-value" : ""}
                    {row.isChecklistPilot ? " · checklist pilot" : ""}
                  </p>
                </td>
                <td className="px-3 py-2">
                  <PageSystems row={row} />
                </td>
                <td className="px-3 py-2 font-mono text-xs">{row.funnelDepth}</td>
                <td className="px-3 py-2 font-mono text-xs text-muted">
                  {row.gearPresetId ?? (row.hasInlineAffiliateGear ? "inline" : "N/A")}
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted">
                  {row.servicePresetId ?? "N/A"}
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted">
                  {row.nextStepGuideId ?? "N/A"}
                  {row.nextStepTargetCount > 0
                    ? ` (${row.nextStepTargetCount})`
                    : ""}
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted">
                  {row.checklistDownloadId ?? "N/A"}
                </td>
                {showHints ? (
                  <td className="px-3 py-2 text-xs text-muted">
                    <ul className="m-0 list-none space-y-1 pl-0">
                      {row.dropOffHints.map((hint) => (
                        <li key={hint}>{hint}</li>
                      ))}
                    </ul>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function ConversionObservabilityPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const report = runConversionObservability();
  const { summary } = report;

  const checklistPilots = report.pages.filter((p) => p.isChecklistPilot);
  const thinStack = report.pages
    .filter((p) => p.funnelDepth <= 1)
    .sort((a, b) => a.funnelDepth - b.funnelDepth);
  const fullStack = report.pages.filter((p) => p.funnelDepth >= 3);
  const withChecklist = report.pages.filter((p) => p.checklistDownloadId);

  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust mb-2">
        Developer only
      </p>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="editorial-heading text-3xl">
          Conversion observability
        </h1>
      </div>
      <p className="article-body-sm mb-4 text-muted">
        Operational map of affiliate, Next Step, and checklist instrumentation
        across articles. Pair with GA4 Explore using the label patterns below.
        Not available in production.
      </p>

      <nav className="article-body-sm mb-8 flex flex-wrap gap-4">
        <Link href="/dev" className="text-rust hover:text-maroon">
          Dev hub
        </Link>
        <Link href="/dev/affiliate-audit" className="text-rust hover:text-maroon">
          Affiliate audit
        </Link>
        <Link href="/dev/next-step-audit" className="text-rust hover:text-maroon">
          Next Step audit
        </Link>
        <Link href="/dev/field-note-audit" className="text-rust hover:text-maroon">
          Field Note audit
        </Link>
      </nav>

      <div className="mb-6 flex flex-wrap gap-2">
        <HealthBadge label="Affiliate registry" ok={report.health.affiliateOk} />
        <HealthBadge label="Next Step presets" ok={report.health.nextStepOk} />
        <HealthBadge label="Checklists" ok={report.health.checklistOk} />
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Articles scanned", value: summary.articleRoutes },
          { label: "Affiliate gear pages", value: summary.affiliateGearRoutes },
          {
            label: "Affiliate service pages",
            value: summary.affiliateServiceRoutes,
          },
          { label: "Next Step pages", value: summary.nextStepRoutes },
          { label: "Checklist pages", value: summary.checklistRoutes },
          { label: "Guide end CTA", value: summary.guideEndCtaRoutes },
          {
            label: "Journey + affiliate",
            value: summary.fullFunnelRoutes,
          },
          { label: "No stack", value: summary.minimalRoutes },
          { label: "High-value routes", value: summary.highValueRoutes },
          {
            label: "HV missing affiliate",
            value: summary.highValueWithoutAffiliate,
          },
          {
            label: "HV missing Next Step",
            value: summary.highValueWithoutNextStep,
          },
          {
            label: "Checklist pilots",
            value: summary.checklistPilotRoutes,
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

      <section className="mb-10 rounded-lg border border-[#d4c9b0] bg-paper-elevated px-4 py-4">
        <h2 className="editorial-heading mb-3 text-xl">GA4 event catalog</h2>
        <p className="article-body-sm mb-4 text-muted">
          All systems use{" "}
          <code className="text-dark">gtag(&quot;event&quot;, &quot;click&quot;, {"{"} label {"}"})</code>
          . In GA4 Explore, filter Event name = click, then dimension or filter on{" "}
          <code className="text-dark">label</code> (event parameter).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse border border-[#d4c9b0] bg-white text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-[#d4c9b0] bg-cream">
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  System
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Label pattern
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  When it fires
                </th>
              </tr>
            </thead>
            <tbody>
              {report.ga4Catalog.map((entry) => (
                <tr
                  key={`${entry.system}-${entry.labelPattern}`}
                  className="border-b border-[#d4c9b0]"
                >
                  <td className="px-3 py-2 font-mono text-xs">{entry.system}</td>
                  <td className="px-3 py-2 font-mono text-xs text-dark">
                    {entry.labelPattern}
                  </td>
                  <td className="px-3 py-2 text-muted">{entry.firedWhen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="article-body-sm mt-4 mb-0 text-muted">
          Funnel read: compare checklist_view → checklist_submit →
          checklist_download on the same downloadId. Compare next_step clicks
          from a source guideId to affiliate clicks on that route.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="editorial-heading mb-3 text-xl">Stack legend</h2>
        <p className="article-body-sm mb-3 text-muted">
          Dots per page: gear, service, next step, checklist PDF, guide end CTA.
          Funnel depth counts gear, service, next step, and checklist (not end CTA).
        </p>
        <p className="article-body-sm m-0 font-mono text-xs text-muted">
          affiliate_gear:* · affiliate_service:* · next_step:source:target ·
          checklist_view:* · checklist_submit:* · checklist_download:*
        </p>
      </section>

      {report.gapGroups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="mb-8 rounded-lg border border-[#d4c9b0] bg-white px-4 py-4"
        >
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-rust mb-1">
            {group.title} ({group.routes.length})
          </h2>
          <p className="article-body-sm mb-3 text-muted">{group.description}</p>
          <ul className="article-body-sm m-0 max-h-40 list-none space-y-1 overflow-y-auto pl-0 font-mono text-xs">
            {group.routes.map((route) => (
              <li key={route}>
                <Link href={route} className="text-rust hover:text-maroon">
                  {route}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <ConversionPageTable
        title="Checklist pilot pages"
        description="Expected download funnels. Validate view vs submit vs download ratios in GA4."
        rows={checklistPilots}
        showHints
      />

      <ConversionPageTable
        title="Thin stack (depth 0-1)"
        description="Pages to improve before scaling traffic or ads."
        rows={thinStack}
        showHints
      />

      <ConversionPageTable
        title="Full stack (depth 3+)"
        description="Affiliate plus journey plus checklist on one article."
        rows={fullStack}
      />

      <section className="mb-10">
        <h2 className="editorial-heading mb-3 text-xl">
          Top Next Step hubs (outbound targets)
        </h2>
        <ul className="article-body-sm list-none space-y-2 pl-0">
          {report.topNextStepSources.map((item) => (
            <li key={item.route}>
              <Link href={item.route} className="text-rust hover:text-maroon">
                {item.route}
              </Link>
              <span className="text-muted">
                {" "}
                · {item.guideId} · {item.outboundTargets} links
              </span>
            </li>
          ))}
        </ul>
      </section>

      <ConversionPageTable
        title="All checklist pages"
        rows={withChecklist}
        showHints
      />

      <ConversionPageTable
        title="Complete operational map"
        description={`${report.pages.length} articles. Generated ${report.generatedAt}.`}
        rows={report.pages}
      />
    </div>
  );
}
