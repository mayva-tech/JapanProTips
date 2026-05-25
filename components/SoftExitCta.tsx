import { SiteLogo } from "@/components/brand/SiteLogo";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";

export function SoftExitCta() {
  return (
    <div className="border-t border-paper-edge bg-paper-elevated">
      <div className="page-x mx-auto flex max-w-4xl flex-col items-center gap-6 py-8">
        <SiteLogo variant="sm" />
        <TrackedStartHereLink className="editorial-nav-link">
          Still figuring things out? Start here →
        </TrackedStartHereLink>
      </div>
    </div>
  );
}
