import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Start Here: Japan Trip Planning",
  description:
    "Step-by-step Japan trip planning: airport arrival, SIM, transport, where to stay, and money.",
};

export default function StartHereJapanFunnelEntryPage() {
  permanentRedirect("/start-here");
}
