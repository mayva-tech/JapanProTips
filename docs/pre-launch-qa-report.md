# Pre-launch QA report

**Date:** 2026-05-20  
**Scope:** Japan Pro Tips static QA before production deploy (no new editorial content).

---

## 1. What was checked

### Link audit

Internal `href` paths were reviewed on:

| Area | Files / routes |
| --- | --- |
| Homepage | `app/page.tsx`, `HomeResidentCta`, `ToolRecommendationStrip` (`SITE_TOOLS`) |
| Tools hub | `app/tools/page.tsx` |
| Five tool pages | All `app/tools/*/page.tsx` slugs in `lib/site-tools.ts` |
| Residents hub | `app/residents/page.tsx`, `ResidentStarterPath` items |
| Resident starter funnel | `lib/resident-starter-path.ts` (5 steps) |
| Starter guide pages | Health insurance, living cost, pay bills, renting, moving checklist |
| Major guides (sample) | SIM, packing list, airport first steps |
| Crosslinks | `ResidentsCrosslinks`, tool page breadcrumbs |

Automated pass: ad-hoc route scan of the files above against `app/**/page.tsx` routes (188 app routes).

### Monetization audit

- `npm run audit:affiliate` (full CLI output reviewed)
- Placeholder behavior: `TrackedAffiliateRecommendationLink`, `TrackedRecommendationLink`, `RecommendationItemHeader`
- Disclosure dedup: `showDisclosure` usage across recommendation grids, gear/service boxes, `sim-card-japan` cluster

### SEO / schema sanity

Metadata and JSON-LD reviewed on:

- `/tools` (CollectionPage + ItemList of 5 tools)
- `/tools/japan-trip-budget-calculator`
- `/tools/japan-packing-generator`
- `/tools/can-i-bring-this-to-japan`
- `/tools/japanese-address-formatter`
- `/tools/japan-monthly-cost-calculator`
- `/residents/japan-living-cost` (WebPage, Article, BreadcrumbList)
- `/resources/moving-to-japan-checklist` (WebPage, ItemList checklist, Article, BreadcrumbList)

### Analytics labels (code + DOM contract)

Verified implementations set `data-cta-label` where applicable:

| Label family | Components |
| --- | --- |
| `tool_click:*` | `TrackedToolLink`, `ToolsHubToolCard`, `ToolRecommendationStrip`, navbar Tools link |
| `resident_starter:*` | `ResidentStarterPath`, `HomeResidentCta` (non-tool targets) |
| `recommendation_click:*` | `TrackedRecommendationLink` (affiliate + guide fallback CTAs) |

### Build

- `npx tsc --noEmit`
- `npm run build`

---

## 2. Fixes made

**None in this pass.** No confidently broken internal app routes were found. Build and typecheck already pass.

Optional follow-ups (not blocking deploy) are listed under remaining risks.

---

## 3. Results by area

### Links

| Result | Detail |
| --- | --- |
| Pass | Homepage, tools hub, all 5 tool routes, resident starter hrefs, and sampled guide links resolve to existing `app/**/page.tsx` routes |
| Pass | `public/downloads/japan-emergency-card.pdf` exists (checklist PDF link; not an app route) |
| Note | Route-only scanners flag `/downloads/*.pdf` as missing; treat as static asset under `public/` |

### Monetization

| Result | Detail |
| --- | --- |
| Expected | `npm run audit:affiliate`: **47** registered keys, **0** live URLs, **101** usages, **0** unknown IDs |
| Pass | Placeholder hrefs render as **non-clickable** `<span>` in gear/service boxes (`isAffiliatePlaceholder`) |
| Pass | Recommendation catalog uses guide fallbacks or checklist text (no fake outbound buy buttons) |
| Pass | Shared disclosure: `RECOMMENDATION_AFFILIATE_DISCLOSURE` via `AffiliateDisclosure` on boxes/grids |
| Pass | `/guides/sim-card-japan`: `RecommendationGrid` `showDisclosure={false}`; adjacent `RecommendedGearBox` shows one disclosure for that cluster |
| Note | Same SIM page: `RecommendedServicesBox` (later in layout) still shows its own disclosure after the comparison block (intentional second block, not stacked with grid+gear) |

### SEO / schema

| Result | Detail |
| --- | --- |
| Pass | Tools hub: canonical, OG/Twitter, `CollectionPage` + 5 `SoftwareApplication` list items |
| Pass | Tool pages: canonical, robots index, `WebPage` + `SoftwareApplication`; most include `BreadcrumbList` |
| Pass | Living cost + moving checklist: Article + breadcrumbs; checklist `ItemList` matches printable sections |
| Minor | `japan-trip-budget-calculator` JSON-LD has no `BreadcrumbList` (other tools do). Valid, not broken |
| Minor | Moving checklist breadcrumb position 2 ("Resources") has no `item` URL (optional in schema.org) |

### Analytics

| Result | Detail |
| --- | --- |
| Pass | `TrackedToolLink` sets `data-cta-label` = `tool_click:{source}:{slug}` |
| Pass | `ResidentStarterPath` / `HomeResidentCta` set `data-cta-label` for `resident_starter:*` or `tool_click:*` on calculator |
| Pass | `TrackedRecommendationLink` sets `data-recommendation-id`, `data-recommendation-context`, `data-cta-label` on live/guide links |
| Note | Residents hub index links use `TrackedCtaLink` + `conversionLabelForHref` (not `resident_starter:*`). Starter path cards use `resident_starter:residents-hub:*` |
| Note | Post-deploy: confirm labels in GA4 DebugView (see `docs/analytics-tracking-checklist.md`) |

### Build

| Check | Status |
| --- | --- |
| `npx tsc --noEmit` | Pass |
| `npm run build` | Pass (191 static pages) |

---

## 4. Remaining risks (pre-affiliate launch)

| Risk | Severity | Mitigation |
| --- | --- | --- |
| All affiliate registry URLs still placeholders | High for monetization | Add live URLs in `lib/affiliate-links.ts`, re-run `npm run audit:affiliate` |
| Hardcoded partner CTAs (e.g. Airalo/Ubigi on SIM guide) | Medium | Separate from registry; verify `rel="sponsored"` and disclosures sitewide |
| En/em dashes on `/guides/sim-card-japan` (title metadata, trust line, table cell) | Low (editorial rule) | Replace with hyphen/comma per `.cursor/rules/no-em-dashes.mdc` |
| Two disclosures on long SIM guide (gear cluster + services box) | Low | Acceptable today; set `showDisclosure={false}` on services if you want one per page |
| GA4 labels not verified in production DebugView | Medium | Run checklist in `docs/analytics-tracking-checklist.md` after deploy |
| 47 in-use affiliate keys with no revenue until URLs added | Expected | Gear/service names stay gray until launch |

---

## 5. Next deployment checklist

### Before merge / deploy

- [ ] `npx tsc --noEmit` and `npm run build` green (confirmed 2026-05-20)
- [ ] Spot-check homepage, `/tools`, one tool page, `/residents`, moving checklist in preview
- [ ] Confirm `NODE_ENV=production` hides `/dev/*` audit routes

### After deploy (staging or production)

- [ ] GA4 Realtime: `tool_click:nav:tools`, `tool_click:home:japan-trip-budget-calculator`
- [ ] GA4: `resident_starter:residents-hub:moving-to-japan-checklist`
- [ ] GA4: `recommendation_click:japan-packing-list:packing-cubes` (guide fallback CTA)
- [ ] Click-test: gear box placeholder name is **not** a link
- [ ] Download checklist PDF from `/resources/moving-to-japan-checklist`
- [ ] Search Console: submit sitemap if not already (`/sitemap.xml`)

### Before affiliate go-live

- [ ] `docs/affiliate-launch-checklist.md` and `docs/affiliate-readiness-checklist.md`
- [ ] Populate `affiliateLinks` for high-traffic keys from audit output
- [ ] Re-run `npm run audit:affiliate` until missing-in-use count is acceptable
- [ ] Click-test one gear and one service CTA with ad blocker off

---

## 6. Related docs

| Doc | Use |
| --- | --- |
| `docs/affiliate-readiness-checklist.md` | Registry, fallbacks, disclosure |
| `docs/affiliate-launch-checklist.md` | Pilot scope and launch sign-off |
| `docs/analytics-tracking-checklist.md` | GA4 label verification |
| `/dev/affiliate-audit` | Dev-only registry table (local) |
