import type { ReactNode } from "react";
import { JapaneseLearningClientShell } from "@/features/japanese-learning/components/JapaneseLearningClientShell";
import { JapaneseLearningNav } from "@/features/japanese-learning/components/JapaneseLearningNav";

/**
 * Shared layout for the Japanese Learning section. The main site navbar
 * comes from the root layout; this adds only the section sub-nav and the
 * client boundary that owns browser speech.
 */
export default function LearnJapaneseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <JapaneseLearningNav />
      <JapaneseLearningClientShell>{children}</JapaneseLearningClientShell>
    </>
  );
}
