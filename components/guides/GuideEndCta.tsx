import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";
import { stripTrailingArrowFromText } from "@/lib/cta-chevron";
import { conversionLabelForHref } from "@/lib/gtag-events";

const primaryBtn =
  "editorial-chevron-cta inline-flex w-full items-center justify-center rounded-lg bg-maroon px-8 py-4 font-sans text-base font-bold uppercase tracking-widest text-white hover:bg-rust transition-colors duration-150 sm:w-auto sm:min-w-[240px]";
const secondaryBtn =
  "editorial-chevron-cta inline-flex w-full items-center justify-center rounded-lg border border-dark px-6 py-3.5 font-sans text-base font-bold uppercase tracking-widest text-dark hover:bg-dark hover:text-cream transition-colors duration-150 sm:w-auto sm:min-w-[240px]";

function stripTrailingArrow(label: string) {
  return stripTrailingArrowFromText(label);
}

type GuideEndCtaProps = {
  parentHref: string;
  parentLabel: string;
};

export function GuideEndCta({ parentHref, parentLabel }: GuideEndCtaProps) {
  return (
    <section
      data-guide-read-aloud-skip
      className="mt-6 border-t border-tan pt-8"
      aria-labelledby="guide-end-cta-heading"
    >
      <h2
        id="guide-end-cta-heading"
        className="editorial-heading mb-4"
      >
        Next steps
      </h2>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch">
        <TrackedStartHereLink className={primaryBtn}>
          Open the trip planning checklist
        </TrackedStartHereLink>
        <TrackedCtaLink
          href={parentHref}
          label={conversionLabelForHref(parentHref)}
          className={secondaryBtn}
        >
          {stripTrailingArrow(parentLabel)}
        </TrackedCtaLink>
      </div>
    </section>
  );
}
