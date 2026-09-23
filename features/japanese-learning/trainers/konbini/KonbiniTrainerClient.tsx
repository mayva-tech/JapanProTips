"use client";

import dynamic from "next/dynamic";

/**
 * Client-only mount for Konbini Trainer.
 *
 * The trainer reads localStorage in a lazy useState initializer
 * (useProgress) and resolves browser voices on mount. Rendering it on the
 * server would produce "0 known" markup that no longer matches the first
 * client render once saved progress loads, so it is skipped on the server
 * entirely. This also keeps the trainer, its data, and the speech engine in
 * their own chunk that only this route requests.
 */
const KonbiniTrainer = dynamic(() => import("./KonbiniTrainer"), {
  ssr: false,
  loading: () => (
    <p className="py-16 text-center font-sans text-sm font-semibold uppercase tracking-widest text-muted">
      Loading trainer…
    </p>
  ),
});

export function KonbiniTrainerClient() {
  return <KonbiniTrainer />;
}
