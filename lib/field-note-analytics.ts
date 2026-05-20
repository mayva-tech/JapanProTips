import type { FieldNoteTone } from "@/lib/field-notes";

/**
 * GA4 field-note engagement. Uses the same `click` + `label` pattern as
 * checklist and CTA tracking so existing explorations keep working.
 *
 * Label shapes:
 * - View (minimum): `field_note_view:{tone}:{slug}` (no note id in label)
 * - With note id: same events also send `field_note_id` for GA4 if you register it.
 * - Other actions: `field_note_{action}:{tone}:{slug}:{noteIdOr_}[:hrefEncoded]`
 */

export type FieldNoteAnalyticsAction =
  | "view"
  | "visible"
  | "link_click"
  | "copy"
  | "expand";

export function guideSlugFromPathname(pathname: string | null): string {
  if (!pathname) return "unknown";
  const m = pathname.match(/^\/(?:guides|residents)\/([^/]+)/);
  return m?.[1] ?? "unknown";
}

function fieldNoteIdParam(noteId?: string): { field_note_id: string } {
  return { field_note_id: noteId ?? "" };
}

function fieldNoteToneSlugParams(tone: FieldNoteTone, slug: string) {
  return {
    field_note_tone: tone,
    field_note_slug: slug,
  };
}

/** Minimum contract: `field_note_view:{tone}:{slug}` on the `label` field. */
export function fieldNoteViewLabel(tone: FieldNoteTone, slug: string): string {
  return `field_note_view:${tone}:${slug}`;
}

function fieldNoteActionLabel(
  action: Exclude<FieldNoteAnalyticsAction, "view">,
  tone: FieldNoteTone,
  slug: string,
  noteId?: string,
  extraSegment?: string,
): string {
  const id = noteId ?? "_";
  return extraSegment
    ? `field_note_${action}:${tone}:${slug}:${id}:${extraSegment}`
    : `field_note_${action}:${tone}:${slug}:${id}`;
}

function safeHrefSegment(href: string): string {
  const trimmed = href.trim();
  if (!trimmed) return "_";
  const clipped = trimmed.length > 120 ? `${trimmed.slice(0, 120)}...` : trimmed;
  return encodeURIComponent(clipped);
}

function emitFieldNote(
  action: FieldNoteAnalyticsAction,
  tone: FieldNoteTone,
  slug: string,
  noteId: string | undefined,
  label: string,
  extra?: Record<string, string>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "click", {
    label,
    ...fieldNoteToneSlugParams(tone, slug),
    ...fieldNoteIdParam(noteId),
    field_note_action: action,
    ...extra,
  });
}

export function trackFieldNoteView(
  tone: FieldNoteTone,
  slug: string,
  noteId?: string,
): void {
  emitFieldNote(
    "view",
    tone,
    slug,
    noteId,
    fieldNoteViewLabel(tone, slug),
  );
}

/** Stronger visibility: note was meaningfully on screen (scroll visibility). */
export function trackFieldNoteVisible(
  tone: FieldNoteTone,
  slug: string,
  noteId?: string,
): void {
  emitFieldNote(
    "visible",
    tone,
    slug,
    noteId,
    fieldNoteActionLabel("visible", tone, slug, noteId),
  );
}

export function trackFieldNoteLinkClick(
  tone: FieldNoteTone,
  slug: string,
  noteId: string | undefined,
  href: string,
): void {
  emitFieldNote(
    "link_click",
    tone,
    slug,
    noteId,
    fieldNoteActionLabel("link_click", tone, slug, noteId, safeHrefSegment(href)),
    { field_note_link_href: href.slice(0, 500) },
  );
}

export function trackFieldNoteCopy(
  tone: FieldNoteTone,
  slug: string,
  noteId?: string,
): void {
  emitFieldNote(
    "copy",
    tone,
    slug,
    noteId,
    fieldNoteActionLabel("copy", tone, slug, noteId),
  );
}

/** Reserved for collapsible field notes; safe to call when expand UI ships. */
export function trackFieldNoteExpand(
  tone: FieldNoteTone,
  slug: string,
  noteId?: string,
): void {
  emitFieldNote(
    "expand",
    tone,
    slug,
    noteId,
    fieldNoteActionLabel("expand", tone, slug, noteId),
  );
}
