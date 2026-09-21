import type { UpcomingEngineerGuide } from "@/lib/engineering-copy";

type UpcomingGuideGridProps = {
  guides: readonly UpcomingEngineerGuide[];
};

const trackLabel: Record<UpcomingEngineerGuide["track"], string> = {
  career: "Careers in Japan",
  manufacturing: "Manufacturing & product development",
  communication: "Engineering communication",
};

export function UpcomingGuideGrid({ guides }: UpcomingGuideGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide, index) => (
        <article
          key={guide.title}
          className="editorial-card flex flex-col border border-paper-edge bg-paper-card p-5"
        >
          <p className="editorial-kicker mb-1">
            Planned · {trackLabel[guide.track]}
          </p>
          <p className="mb-2 font-sans text-xs font-bold text-muted">
            Roadmap priority {index + 1}
          </p>
          <h3 className="editorial-heading mb-3 text-ink">{guide.title}</h3>
          <p className="article-body mt-auto text-sm text-muted">
            {guide.description}
          </p>
        </article>
      ))}
    </div>
  );
}
