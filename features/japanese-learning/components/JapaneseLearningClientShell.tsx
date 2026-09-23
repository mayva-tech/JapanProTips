"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { speechService } from "../services/speechService";

/**
 * Client boundary for every /learn-japanese route.
 *
 * Browser speech (SpeechSynthesis) is a page-global singleton, so a trainer
 * that is mid-sequence would otherwise keep talking after a client-side
 * route change. The effect cleanup runs whenever the pathname changes and
 * when the whole section unmounts (leaving /learn-japanese), and stops
 * playback through speechService so its generation counter, timers and
 * callbacks settle too, not just the browser queue.
 *
 * `pagehide` covers full page unloads (refresh, external links), where some
 * Chromium builds keep speaking otherwise.
 *
 * Later phases can mount shared section UI (e.g. TalkingHead) here.
 */
export function JapaneseLearningClientShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, [pathname]);

  useEffect(() => {
    const onPageHide = () => speechService.stop();
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, []);

  return <div className="japanese-learning-app">{children}</div>;
}
