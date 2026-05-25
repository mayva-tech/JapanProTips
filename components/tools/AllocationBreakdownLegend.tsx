export type AllocationLegendRow = {
  key: string;
  label: string;
  pct: number;
  yen: number;
  barClass: string;
  swatchClass: string;
};

type Props = {
  rows: AllocationLegendRow[];
  formatYen: (yen: number) => string;
};

/** Compact legend for narrow result columns (stacked label + stats). */
export function AllocationBreakdownLegend({ rows, formatYen }: Props) {
  return (
    <>
      <div className="mt-4 space-y-3.5 lg:hidden">
        {rows.map((row) => (
          <div key={row.key}>
            <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
              <span className="flex min-w-0 max-w-full items-center gap-2 font-sans text-sm font-semibold text-dark">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-sm ${row.swatchClass}`}
                  aria-hidden
                />
                <span className="min-w-0 truncate">{row.label}</span>
              </span>
              <span className="shrink-0 font-sans text-xs font-bold uppercase tracking-wide text-muted">
                {row.pct.toFixed(1)}%
              </span>
              <span className="w-full shrink-0 text-right font-sans text-sm font-bold tabular-nums text-dark sm:w-auto">
                {formatYen(row.yen)}
              </span>
            </div>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-paper-edge/80">
              <div
                className={`h-full max-w-full rounded-full ${row.barClass} transition-[width] duration-500 ease-out`}
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-4 hidden min-w-0 flex-col gap-3 lg:flex">
        {rows.map((row) => (
          <li key={`legend-${row.key}`} className="flex min-w-0 items-start gap-2">
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-sm ${row.swatchClass}`}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-sm font-semibold leading-snug text-dark">
                {row.label}
              </p>
              <p className="mt-0.5 font-sans text-xs leading-snug tabular-nums text-muted">
                <span>{row.pct.toFixed(1)}%</span>
                <span className="mx-1 text-tan" aria-hidden>
                  ·
                </span>
                <span className="font-bold text-dark">{formatYen(row.yen)}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
