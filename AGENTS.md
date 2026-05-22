# JapanProTips — agent context

Quick orientation for new chats. Detailed rules live in `.cursor/rules/` (always loaded by Cursor).

## What this is

Next.js 15 editorial site: practical Japan travel and resident guides at [japanprotips.com](https://japanprotips.com).

## Defaults

- **Tourist guides:** `GuideArticleShell` in `app/guides/<slug>/page.tsx`
- **Copy:** No em/en dashes; use `EDITORIAL_COPY` from `@/lib/editorial-copy`
- **New visitor guide:** Also update `app/sitemap.ts`, `lib/tourist-guides.ts`, and `lib/tourist-guide-slugs.ts`
- **Scope:** Small, focused diffs; no full rebuilds unless asked

## MDX

Not implemented yet. Follow `.cursor/rules/mdx-content-roadmap.mdc` when adding content architecture.

## Key paths

| Area | Path |
|------|------|
| Guide shell | `components/guides/GuideArticleShell.tsx` |
| Tourist index data | `lib/tourist-guides.ts` |
| Sitemap | `app/sitemap.ts` |
| Site constants | `lib/site.ts` |
| Downloadable checklists | `lib/downloadable-checklists.ts`, `lib/checklist-pdf-spec.ts`, `public/downloads/*.pdf` |
| Regenerate checklist PDFs | `npm run generate:checklist-pdfs` (needs network for fonts) |
| Field Note blocks (MDX + TSX) | `components/editorial/field-notes/`, `lib/field-notes.ts` |
| Field Note coverage audit | `npm run audit:field-notes`, `lib/field-note-audit.ts`, `/dev/field-note-audit` |
| Itinerary planner launch | `docs/itinerary-planner-launch-checklist.md` |
