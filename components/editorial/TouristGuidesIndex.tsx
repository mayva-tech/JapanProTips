import { PopularGuideCard } from "@/components/editorial/PopularGuideCard";
import { TOURIST_GUIDE_SECTIONS } from "@/lib/tourist-guides";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";

export function TouristGuidesIndex() {
  return (
    <>
      {TOURIST_GUIDE_SECTIONS.map((section, index) => (
        <section
          key={section.label}
          className={`border-b border-paper-edge py-12 sm:py-14 ${
            index % 2 === 0 ? "bg-paper" : "bg-paper-elevated"
          }`}
        >
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="editorial-heading mb-6 text-ink">{section.label}</h2>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <li key={item.href} className="min-h-0">
                  <PopularGuideCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="bg-ink py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="border border-paper-edge/20 px-8 py-10 sm:px-10 sm:py-12">
            <p className="editorial-kicker mb-3 text-tan">Before you land</p>
            <h2 className="editorial-heading mb-4 text-paper-card">
              New to Japan? Start with the checklist.
            </h2>
            <p className="article-body max-w-2xl text-paper-card/75">
              The Start Here flow walks through SIM, trains, lodging, and money
              in the order that saves the most headaches on arrival.
            </p>
            <TrackedStartHereLink className="editorial-btn-primary mt-8">
              Open the trip planning checklist →
            </TrackedStartHereLink>
          </div>
        </div>
      </section>
    </>
  );
}
