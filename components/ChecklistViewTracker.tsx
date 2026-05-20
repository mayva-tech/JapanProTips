"use client";

import { useEffect, type ReactNode } from "react";
import { trackChecklistView } from "@/lib/checklist-analytics";

type ChecklistViewTrackerProps = {
  downloadId: string;
  children: ReactNode;
};

export function ChecklistViewTracker({
  downloadId,
  children,
}: ChecklistViewTrackerProps) {
  useEffect(() => {
    trackChecklistView(downloadId);
  }, [downloadId]);

  return <>{children}</>;
}
