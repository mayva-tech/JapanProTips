# Affiliate and recommendation readiness checklist

Internal QA before turning on monetized CTAs. The site is designed so **missing affiliate URLs never render as fake buy buttons** in the recommendation catalog. Legacy gear and service boxes still show non-clickable product names when a URL is pending.

Last automated audit: run `npm run audit:affiliate` locally and refresh the counts in section 2 if URLs change.

---

## 1. Where affiliate links live

| Location | Purpose |
| --- | --- |
| `lib/affiliate-links.ts` | **Single registry.** `AFFILIATE_LINK_IDS`, `affiliateLinks` map, helpers |
| `lib/recommendations.ts` | Editorial recommendation catalog + placements |
| `lib/recommended-gear-presets.ts` | MDX and preset gear lists |
| `lib/recommended-service-presets.ts` | Service recommendation presets |
| `components/recommendations/` | `RecommendationGrid`, `RecommendationBox`, fallbacks |
| `components/RecommendedGearBox.tsx` | Legacy gear lists (still used on some guides) |
| `components/RecommendedServicesBox.tsx` | Service lists on guides |
| `components/TrackedAffiliateRecommendationLink.tsx` | Gear/service link tracking |
| `components/conversion/InlineAffiliate.tsx` | Compact offer blocks (must guard with `isValidAffiliateUrl`) |
| `lib/editorial-copy.ts` | **`RECOMMENDATION_AFFILIATE_DISCLOSURE`** (single disclosure string for all monetization UI) |
| `components/AffiliateDisclosure.tsx` | Renders the shared disclosure line (import constant from editorial-copy) |

**Do not** hardcode partner URLs in page copy. Add or update keys in `affiliateLinks` only.

**Do not** paste one-off disclosure sentences in pages or components. Import `RECOMMENDATION_AFFILIATE_DISCLOSURE` or render `<AffiliateDisclosure />`.

---

## 2. Registry snapshot (expected at pre-launch)

As of the last readiness pass:

| Metric | Typical value before launch |
| --- | --- |
| Registered keys in `AFFILIATE_LINK_IDS` | 47 |
| Keys with a live `https://` URL in `affiliateLinks` | 0 (all pending until you add URLs) |
| Recommendation catalog items | 10 (all enabled) |
| Unique affiliate keys used by recommendation catalog | 10 |
| Recommendation placements | 6 routes |

Run `npm run audit:affiliate` for current **missing (in use)** rows, affected routes, and recommendation catalog table output.

---

## 3. URL helpers (use in new code)

In `lib/affiliate-links.ts`:

| Helper | Use when |
| --- | --- |
| `getAffiliateUrlOrNull(linkId)` | You need a real URL or `null` |
| `isValidAffiliateUrl(href)` | Deciding whether to render `InlineAffiliate` or a buy CTA |
| `isAffiliatePlaceholder(href)` | Detecting `[affiliate-link-here]` and similar filler |
| `resolveAffiliateLink(linkId)` | **Legacy only.** Returns placeholder string when missing |

**Rule:** Recommendation UI must not call `resolveAffiliateLink` for CTAs. Use `lib/recommendations.ts` resolution (`cta.kind`).

---

## 4. Recommendation fallback behavior

When `getAffiliateUrlOrNull` returns `null` for a catalog item:

| Priority | CTA | UI |
| --- | --- | --- |
| 1 | Live affiliate | Title links out (`cta.kind: affiliate`) |
| 2 | `fallbackGuideHref` set | Plain title + **Read related guide →** internal link |
| 3 | No fallback guide | Plain title + *Use this as a checklist item* (no link) |

Catalog entries always stay visible when `enabled: true`. They remain useful without affiliate URLs.

### Recommendation placements

| Placement key | Route |
| --- | --- |
| `japan-packing-list` | `/guides/japan-packing-list` |
| `japan-weather-by-month` | `/guides/japan-weather-by-month` |
| `sim-card-japan` | `/guides/sim-card-japan` |
| `japan-packing-generator` | `/tools/japan-packing-generator` |
| `japan-trip-budget-calculator` | `/tools/japan-trip-budget-calculator` |
| `renting-apartment-japan` | `/residents/renting-apartment-japan` |

### Catalog affiliate keys (all map to registry)

| Recommendation ID | Affiliate key |
| --- | --- |
| `travel-umbrella` | `gear-travel-umbrella` |
| `power-bank-20000` | `gear-portable-power-bank` |
| `universal-travel-adapter` | `gear-universal-travel-adapter` |
| `quick-dry-towel` | `gear-quick-dry-towel` |
| `ic-card-holder` | `gear-ic-card-holder` |
| `packing-cubes` | `gear-packing-cubes` |
| `foldable-duffel` | `gear-foldable-duffel` |
| `document-organizer` | `gear-travel-document-organizer` |
| `waterproof-shoes` | `gear-walking-shoes` |
| `wise-travel-card-note` | `travel-money-card` |

---

## 5. How to add a new affiliate link

1. Add a stable key to `AFFILIATE_LINK_IDS` in `lib/affiliate-links.ts` (kebab-case, prefixed `gear-` or service name).
2. Set the live URL in `affiliateLinks`:
   ```ts
   export const affiliateLinks: Partial<Record<AffiliateLinkId, string>> = {
     "gear-packing-cubes": "https://example.com/partner-packing-cubes",
   };
   ```
3. Reference the key from `lib/recommendations.ts`, a gear preset, or an inline `linkId` in a guide page.
4. Run `npm run audit:affiliate` and confirm status is **live**.
5. Click-test on the affected route in production (ad blocker off).
6. Confirm GA4 `click` label: `recommendation_click:{context}:{id}` or `affiliate_gear:{linkId}`.

---

## 6. How to test recommendation CTAs

1. Open a page with `RecommendationGrid` (for example `/guides/japan-packing-list`).
2. **Before URLs are live:** each item should show a plain title plus **Read related guide →** (not a gray fake product link).
3. **After URLs are live:** title should become the outbound affiliate link; disclosure still visible at bottom of grid.
4. DevTools → inspect link: `data-recommendation-id`, `data-recommendation-context`, `data-cta-label`.
5. GA4 Realtime → `click` event → `label` like `recommendation_click:japan-packing-list:packing-cubes`.
6. See also `docs/analytics-tracking-checklist.md`.

---

## 7. Copy rules (required)

Recommendation and affiliate copy must stay **practical, calm, and operational**.

**Do**

- "If you want the simplest option…"
- "Most travelers eventually end up buying this in Japan anyway."
- "Useful during rainy season and long train days."
- "Compare fees before you fly."

**Do not**

- "MUST BUY", "LIMITED TIME", "Act now"
- Fake urgency or countdown language
- Exaggerated savings ("save 50%", "cheapest ever")
- Travel-blog hype ("game-changer", "insane deal")

---

## 8. Disclosure (shared copy)

All monetization UI uses one string from `lib/editorial-copy.ts`:

> Some recommendations may use affiliate links. We only include items or services that solve practical travel or resident problems.

| Component | `showDisclosure` default | Notes |
| --- | --- | --- |
| `RecommendationGrid` | `true` | Set `false` when a legacy box directly below will disclose |
| `RecommendationBox` | `false` | Enable on standalone singles |
| `RecommendedGearBox` | `true` | Set `false` if another block in the same cluster already discloses |
| `RecommendedServicesBox` | `true` | Same as gear |
| `InlineAffiliate` | `false` | Use `true` for standalone offers; MDX `AffiliateBlock` defaults to `true` |

**Avoid duplicates:** On `/guides/sim-card-japan`, the recommendation grid sets `showDisclosure={false}` and the adjacent gear box keeps the default so the cluster shows one line.

---

## 9. Legacy gear and service boxes

`TrackedAffiliateRecommendationLink` renders a **non-clickable** product name when the href is the placeholder. That is correct for legacy boxes but can feel like a dead link.

Before affiliate launch:

- [ ] Run `npm run audit:affiliate`
- [ ] Fix any **unknown link IDs**
- [ ] Add live URLs for keys with **usageCount > 0** you care about first
- [ ] Spot-check `/dev/affiliate-audit` in development
- [ ] Confirm `InlineAffiliate` only mounts when `isValidAffiliateUrl(href)` is true (packing generator already does)

---

## 10. InlineAffiliate and hardcoded partners

Some guides still use direct partner URLs (for example Airalo on the SIM guide). Those are separate from the registry. When migrating, move URLs into `affiliateLinks` and use presets or the recommendation catalog.

---

## 11. Pre-launch sign-off

| Check | Done |
| --- | --- |
| `npm run audit:affiliate` shows zero unknown IDs | [ ] |
| All high-traffic recommendation placements have live URLs or acceptable guide fallbacks | [ ] |
| No recommendation title renders as placeholder-styled fake link | [ ] |
| Disclosure visible on recommendation grids | [ ] |
| `npx tsc --noEmit` passes | [ ] |
| `npm run build` passes | [ ] |
| Production click-test on one guide + one tool placement | [ ] |

---

## 12. Developer routes

| Route | Purpose |
| --- | --- |
| `/dev/affiliate-audit` | Table of registry keys, usage, missing URLs |
| `/dev/conversion-observability` | Broader conversion map |

Not available in production builds.
