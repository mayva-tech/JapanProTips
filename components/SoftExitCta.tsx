import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";

export function SoftExitCta() {
  return (
    <div className="border-t border-[#d4c9b0] bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-8 text-center">
        <TrackedStartHereLink className="font-sans text-sm font-bold tracking-widest uppercase text-muted hover:text-rust transition-colors duration-150">
          Still figuring things out? Start here →
        </TrackedStartHereLink>
      </div>
    </div>
  );
}
