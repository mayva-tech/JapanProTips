import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";

export function SoftExitCta() {
  return (
    <div className="border-t border-paper-edge bg-paper-elevated">
      <div className="mx-auto max-w-4xl px-6 py-8 text-center">
        <TrackedStartHereLink className="editorial-nav-link">
          Still figuring things out? Start here →
        </TrackedStartHereLink>
      </div>
    </div>
  );
}
