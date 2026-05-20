import Link from "next/link";
import { notFound } from "next/navigation";
import {
  runAffiliateAudit,
  type AffiliateLinkAuditRow,
} from "@/lib/affiliate-audit";
import { AFFILIATE_LINK_PLACEHOLDER } from "@/lib/affiliate-links";

export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: AffiliateLinkAuditRow["status"] }) {
  const styles: Record<AffiliateLinkAuditRow["status"], string> = {
    live: "bg-[#e0ead8] text-dark",
    missing: "bg-[#ebe4d8] text-rust",
    empty: "bg-[#ebe4d8] text-muted",
  };
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 font-sans text-xs font-bold uppercase tracking-widest ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function AffiliateAuditPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const report = runAffiliateAudit();
  const { summary } = report;
  const missingUsed = report.rows.filter(
    (r) => r.usageCount > 0 && r.status !== "live",
  );

  return (
    <div>
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust mb-2">
        Developer only
      </p>
      <h1 className="editorial-heading mb-2 text-3xl">Affiliate link audit</h1>
      <p className="article-body-sm mb-6 text-muted">
        Scans gear and service presets plus inline guide usage. Not available in
        production builds.
      </p>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Registered keys", value: summary.registeredLinkIds },
          { label: "Live URLs", value: summary.configuredUrls },
          { label: "Missing (in use)", value: summary.missingUrls },
          { label: "Affected routes", value: summary.affectedRoutes },
          { label: "Total usages", value: summary.totalUsages },
          { label: "Used link IDs", value: summary.usedLinkIds },
          { label: "Unused registered", value: summary.unusedRegistered },
          { label: "Unknown IDs", value: summary.unknownLinkIds },
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

      {summary.unknownLinkIds > 0 ? (
        <section className="mb-8 rounded-lg border border-rust/40 bg-[#ebe4d8] px-4 py-3">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-rust mb-2">
            Unknown link IDs
          </h2>
          <p className="article-body-sm text-muted mb-2">
            Used in guides but not listed in{" "}
            <code className="text-dark">AFFILIATE_LINK_IDS</code>.
          </p>
          <ul className="article-body-sm list-none space-y-1 pl-0 font-mono text-sm">
            {report.unknownLinkIds.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mb-10">
        <h2 className="editorial-heading mb-3 text-xl">Routes with boxes</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#d4c9b0] bg-white px-4 py-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-muted mb-2">
              Gear
            </h3>
            <ul className="article-body-sm list-none space-y-1 pl-0">
              {report.routesByBox.gear.map((route) => (
                <li key={route}>
                  <Link href={route} className="text-rust hover:text-maroon">
                    {route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-[#d4c9b0] bg-white px-4 py-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-muted mb-2">
              Services
            </h3>
            <ul className="article-body-sm list-none space-y-1 pl-0">
              {report.routesByBox.service.map((route) => (
                <li key={route}>
                  <Link href={route} className="text-rust hover:text-maroon">
                    {route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {missingUsed.length > 0 ? (
        <section className="mb-10">
          <h2 className="editorial-heading mb-3 text-xl">
            Missing URLs (in use)
          </h2>
          <p className="article-body-sm mb-4 text-muted">
            Add these keys in{" "}
            <code className="text-dark">lib/affiliate-links.ts</code> under{" "}
            <code className="text-dark">affiliateLinks</code>.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse border border-[#d4c9b0] bg-white text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-[#d4c9b0] bg-cream">
                  <th className="px-3 py-2 font-bold uppercase tracking-widest">
                    Link ID
                  </th>
                  <th className="px-3 py-2 font-bold uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-3 py-2 font-bold uppercase tracking-widest">
                    Uses
                  </th>
                  <th className="px-3 py-2 font-bold uppercase tracking-widest">
                    Routes
                  </th>
                </tr>
              </thead>
              <tbody>
                {missingUsed.map((row) => (
                  <tr key={row.linkId} className="border-b border-[#d4c9b0]">
                    <td className="px-3 py-2 font-mono text-xs">{row.linkId}</td>
                    <td className="px-3 py-2">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-3 py-2">{row.usageCount}</td>
                    <td className="px-3 py-2 text-muted">
                      {row.routes.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="editorial-heading mb-3 text-xl">All link IDs</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse border border-[#d4c9b0] bg-white text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-[#d4c9b0] bg-cream">
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Link ID
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Status
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  URL
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Uses
                </th>
                <th className="px-3 py-2 font-bold uppercase tracking-widest">
                  Routes
                </th>
              </tr>
            </thead>
            <tbody>
              {report.rows.map((row) => (
                <tr
                  key={row.linkId}
                  className={`border-b border-[#d4c9b0] ${row.usageCount === 0 ? "opacity-60" : ""}`}
                >
                  <td className="px-3 py-2 font-mono text-xs">{row.linkId}</td>
                  <td className="px-3 py-2">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="max-w-xs truncate px-3 py-2 font-mono text-xs text-muted">
                    {row.url ?? AFFILIATE_LINK_PLACEHOLDER}
                  </td>
                  <td className="px-3 py-2">{row.usageCount}</td>
                  <td className="px-3 py-2 text-muted">
                    {row.routes.length > 0 ? row.routes.join(", ") : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="article-body-sm mt-8 text-muted">
        CLI: <code className="text-dark">npm run audit:affiliate</code>
      </p>
    </div>
  );
}
