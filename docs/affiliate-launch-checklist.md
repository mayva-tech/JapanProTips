# Affiliate launch checklist

Use this checklist before turning on live affiliate URLs or adding recommendation boxes to more guides. The site currently runs a **pilot** on a small set of high-intent tourist articles only.

**Do not expand sitewide until every required item below is checked.**

---

## 1. Partner and program approval

Confirm you are allowed to link and earn from each program you plan to use.

| Program type | Examples in this repo | Approved? | Affiliate URL / notes |
| --- | --- | --- | --- |
| Japan eSIM | `esim-japan` (Airalo, Ubigi, etc.) | [ ] | |
| Pocket WiFi | `pocket-wifi-japan` | [ ] | |
| Visitor SIM | `visitor-sim-long-stay` | [ ] | |
| Hotel booking | `hotel-booking` | [ ] | |
| Activities / tours | `activity-booking` | [ ] | |
| Travel insurance | `travel-insurance`, `travel-insurance-comparison`, `travel-insurance-medical` | [ ] | |
| Amazon / gear | `gear-*` link IDs | [ ] | |
| Airport / transport | `airport-transfer-booking`, `airport-express-booking`, `private-airport-transfer` | [ ] | |
| Luggage | `luggage-delivery`, `airport-luggage-storage`, `hotel-luggage-forwarding` | [ ] | |

- [ ] Terms read for each network (cookie window, geo restrictions, prohibited claims).
- [ ] Disclosure language matches each program’s requirements.
- [ ] No program requires brand names or “best” claims we do not want to make.

---

## 2. Replace placeholder URLs (central registry)

All live URLs belong in **one file only:**

`lib/affiliate-links.ts` → `affiliateLinks`

- [ ] Every **in-use** `linkId` has a real `https://` URL in `affiliateLinks`.
- [ ] No key is set to an empty string unless you intentionally want a non-clickable item.
- [ ] URLs are final affiliate / tracking links (not bare homepage links unless that is the approved destination).
- [ ] Spot-check that each URL lands on the correct product or category page.

**Do not** paste affiliate URLs directly into guide `page.tsx` or MDX. Use `linkId` in presets or `resolveAffiliateLink("your-link-id")` in TSX so the audit and GA4 labels stay consistent.

Helper:

- Full key list: `AFFILIATE_LINK_IDS` in `lib/affiliate-links.ts`
- Gear presets: `lib/recommended-gear-presets.ts`
- Service presets: `lib/recommended-service-presets.ts`

---

## 3. Run the affiliate audit

```bash
npm run audit:affiliate
```

Or open the dev-only UI while running `npm run dev`:

`/dev/affiliate-audit` (404 in production)

- [ ] Command exits **0** (no missing URLs, no empty URLs, no unknown link IDs).
- [ ] **Missing URLs (in use)** section is empty.
- [ ] **Unknown link IDs** count is **0**.
- [ ] Usage counts and routes match what you expect for the pilot.

If the audit fails, fix `affiliateLinks` or remove unused keys from content before launch.

---

## 4. Confirm no placeholder links remain on the site

Placeholders use the literal value `[affiliate-link-here]`. In the UI they render as **non-clickable** gray labels (by design until launch).

- [ ] Audit reports **0** missing URLs for in-use keys (see step 3).
- [ ] Manual spot-check on each pilot route: item names are **links**, not gray placeholder text.
- [ ] Search the repo for accidental raw placeholders outside the registry:

  ```bash
  # Should only hit lib/affiliate-links.ts and docs, not live copy in guides
  rg "\[affiliate-link-here\]" --glob "!docs/**"
  ```

---

## 5. Confirm GA4 click events

Affiliate taps use the existing `trackGtagClick` helper (`lib/gtag-events.ts`).

**Event:** `click`  
**Parameter:** `label`  
**Format:**

- Gear: `affiliate_gear:<linkId>` (example: `affiliate_gear:gear-portable-power-bank`)
- Services: `affiliate_service:<linkId>` (example: `affiliate_service:esim-japan`)

**Verification (staging or local with GA4 DebugView):**

- [ ] `window.gtag` is loaded (see `components/GoogleAnalytics.tsx`).
- [ ] Click one gear item on a pilot page → DebugView shows `click` with `affiliate_gear:...`.
- [ ] Click one service item → `affiliate_service:...`.
- [ ] Placeholder items do **not** fire events (not clickable).
- [ ] Optional: add a GA4 exploration filtered on `label` contains `affiliate_`.

---

## 6. Confirm `rel="sponsored"` on external affiliate links

External links in recommendation boxes go through `components/TrackedAffiliateRecommendationLink.tsx`.

- [ ] External URLs use `rel="noopener noreferrer sponsored"` and `target="_blank"`.
- [ ] Internal paths (`/guides/...`) use Next.js `Link` without `sponsored` (expected).
- [ ] Other affiliate CTAs on the site (for example `TrackedCtaLink`, `InlineAffiliate`) still meet your sitewide policy; this checklist focuses on gear/service boxes.

---

## 7. Confirm affiliate disclosure visibility

Both boxes include disclosure copy inside the component (not only in site-wide footer).

| Component | Disclosure text |
| --- | --- |
| `RecommendedGearBox` | “Some links may be affiliate links. This does not change the price you pay.” |
| `RecommendedServicesBox` | Same |

- [ ] Disclosure is visible on **mobile** and **desktop** without scrolling inside the box.
- [ ] Disclosure is readable (contrast, font size) on cream/paper background.
- [ ] Copy matches your legal / editorial standard sitewide.
- [ ] No em or en dashes added in disclosure or item copy (project rule).

---

## 8. Confirm pilot scope (high-intent articles only)

**Rule:** One gear box and/or one service box per article. Do not add boxes sitewide until this pilot is signed off.

### Current pilot routes (as of checklist creation)

**Gear box (`RecommendedGearBox`):**

| Route | Notes |
| --- | --- |
| `/guides/japan-packing-list` | Inline items in TSX |
| `/guides/japan-rainy-season-guide` | MDX, `gearId` preset |
| `/guides/japan-airport-first-steps` | Inline items in TSX |
| `/guides/japan-luggage-shipping` | Inline items in TSX |
| `/guides/japan-travel-fatigue` | MDX, `gearId` preset |
| `/guides/sim-card-japan` | Inline items in TSX |

**Service box (`RecommendedServicesBox`):**

| Route | Notes |
| --- | --- |
| `/guides/sim-card-japan` | `serviceId` preset |
| `/guides/japan-airport-first-steps` | `serviceId` preset |
| `/guides/japan-airport-to-city` | `serviceId` preset |
| `/guides/japan-travel-insurance` | MDX, `serviceId` preset |
| `/guides/japan-luggage-shipping` | `serviceId` preset |
| `/guides/japan-itinerary` | `serviceId` preset |
| `/guides/japan-budget-breakdown` | `serviceId` preset |

**Routes with both gear and service boxes (extra care on spacing and tone):**

- `/guides/sim-card-japan`
- `/guides/japan-airport-first-steps`
- `/guides/japan-luggage-shipping`

Before adding a new guide:

- [ ] Article is high-intent (connectivity, arrival, money, insurance, packing, itinerary), not general culture or news.
- [ ] Only **one** gear box OR justified use of **one** gear + **one** service box with clear separation in the article.
- [ ] Item lists are 4–6 (gear) or 3–5 (services), practical, no hype wording.
- [ ] Preset or inline `linkId` entries exist in `lib/affiliate-links.ts` before publish.
- [ ] `components/mdx/mdx-guide-components.tsx` already registers MDX components (no change needed unless new MDX-only patterns).

---

## 9. Confirm boxes do not feel spammy

Editorial standard for Japan Pro Tips: field-guide tone, not a deal feed.

- [ ] At most **one** gear box and **one** service box on the same page, placed apart (gear near top on some pilots, services lower).
- [ ] Boxes are not repeated in the same article.
- [ ] Item titles avoid “best ever,” “ultimate,” “must-have,” and similar hype.
- [ ] Reasons describe a real Japan travel problem, not marketing fluff.
- [ ] Boxes sit between major sections, not inside paragraphs or tables.
- [ ] Page still reads like a guide first; the box supports a decision the reader already needs to make.

---

## 10. Pre-launch manual QA (per pilot route)

For each route in section 8 that will go live:

- [ ] Read the full page on mobile and desktop.
- [ ] Every affiliate item opens the correct destination in a new tab.
- [ ] No broken or `javascript:` links.
- [ ] Disclosure and box styling match the rest of the site.
- [ ] No duplicate or competing affiliate modules awkwardly stacked (eSIM sticky CTA, `InlineAffiliate`, comparison table) unless intentional.

---

## 11. Post-launch monitoring (first 7 days)

- [ ] GA4: filter `click` events where `label` contains `affiliate_`; confirm volume is plausible.
- [ ] Affiliate dashboards: clicks align roughly with GA4 (allow for ad blockers and timing).
- [ ] Re-run `npm run audit:affiliate` after any URL or preset change.
- [ ] Note which `linkId` values earn; prune or replace low performers before sitewide expansion.

---

## 12. Sign-off

| Role | Name | Date | Ready for live URLs on pilot routes? |
| --- | --- | --- | --- |
| Editorial | | | [ ] Yes / [ ] No |
| Technical | | | [ ] Yes / [ ] No |

**Sitewide expansion:** Only after pilot sign-off, clean audit, and GA4 verification. Repeat this checklist for each new batch of guides.

---

## Quick reference

| Task | Command or path |
| --- | --- |
| Set URLs | `lib/affiliate-links.ts` |
| Audit CLI | `npm run audit:affiliate` |
| Audit UI (dev) | `/dev/affiliate-audit` |
| GA4 helper | `lib/gtag-events.ts` → `trackAffiliateRecommendationClick` |
| Link component | `components/TrackedAffiliateRecommendationLink.tsx` |
| Gear box | `components/RecommendedGearBox.tsx` |
| Service box | `components/RecommendedServicesBox.tsx` |
