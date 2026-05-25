import { StickyCTA } from "@/components/conversion";
import { CONVERSION_STICKY_ESIM_HREF } from "@/components/guides/guide-conversion-defaults";

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pb-8 md:pb-8">{children}</div>
      <StickyCTA href={CONVERSION_STICKY_ESIM_HREF} />
    </>
  );
}
