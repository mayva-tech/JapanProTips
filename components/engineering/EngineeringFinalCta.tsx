import Link from "next/link";

type EngineeringFinalCtaProps = {
  headline: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function EngineeringFinalCta({
  headline,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: EngineeringFinalCtaProps) {
  const primaryIsExternal = /^https?:|^mailto:/i.test(primaryHref);
  const btnClass = "editorial-btn-primary editorial-chevron-cta";

  return (
    <section className="border-t border-paper-edge bg-ink py-12 sm:py-14">
      <div className="page-x mx-auto max-w-3xl text-center">
        <h2 className="editorial-heading mb-4 text-paper-card">{headline}</h2>
        <p className="article-body mx-auto max-w-2xl text-paper-card/75">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {primaryIsExternal ? (
            <a href={primaryHref} className={btnClass}>
              {primaryLabel}
            </a>
          ) : (
            <Link href={primaryHref} className={btnClass}>
              {primaryLabel}
            </Link>
          )}
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="editorial-chevron-link font-sans text-sm font-bold uppercase tracking-widest text-paper-card/90 underline decoration-paper-card/30 underline-offset-2 hover:text-paper-card"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
