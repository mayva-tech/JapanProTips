# Analytics tracking checklist

Internal QA for **Google Analytics 4 (GA4)** and **Microsoft Clarity** on JapanProTips. Use this before and after deploys when you change tracking, env vars, or funnel components.

Implementation lives in:

- `components/GoogleAnalytics.tsx` (GA4, SPA `page_path` updates)
- `components/MicrosoftClarity.tsx` (Clarity snippet)
- `lib/gtag-events.ts` (`tool_click`, `resident_starter`, `recommendation_click`, and other `click` labels)
- `components/recommendations/` (`TrackedRecommendationLink`, catalog in `lib/recommendations.ts`)
- `components/tools/TrackedToolLink.tsx`
- `components/guides/ResidentStarterPath.tsx`

---

## 1. Required environment variables

Copy `.env.example` to `.env.local` for local testing. Set the same keys on **Vercel** (or your host) for production.

| Variable | Purpose | Example shape |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity project ID | alphanumeric project id from Clarity settings |

Optional but recommended for correct canonicals and sitemaps (not analytics):

- `NEXT_PUBLIC_SITE_URL` (e.g. `https://japanprotips.com`)

**If either analytics variable is empty, that script does not render.** There is no fallback ID in the repo.

---

## 2. Local setup

1. Add both vars to `.env.local`.
2. Restart the dev server (`npm run dev`) so Next.js picks up env changes.
3. Open the site in a **normal** browser window (see troubleshooting for ad blockers).
4. Confirm in DevTools **Network**:
   - Request to `googletagmanager.com/gtag/js?id=G-...` (GA4)
   - Request to `clarity.ms/tag/...` (Clarity)

---

## 3. How to verify `page_view` (GA4)

The app disables the initial automatic page view (`send_page_view: false` in the inline config), then sends route updates from `GaPageView` via:

```text
gtag('config', MEASUREMENT_ID, { page_path: pathname + query })
```

That pattern should produce **page_view** (or equivalent page activity) on each client navigation.

### GA4 Realtime

1. Open GA4 → **Reports** → **Realtime** (or **Realtime overview**).
2. Load a page on the site (production URL after deploy).
3. Confirm your device appears under users.
4. Navigate to another route (e.g. `/` → `/tools` → a tool page).
5. Confirm the **page path** updates in realtime (may lag 10–30 seconds).

### Browser DevTools (optional)

1. **Network** tab, filter `collect` or `google-analytics.com`.
2. Change routes and look for new hits with updated `dl` / `dp` (page path) parameters.

### What to expect

| Action | Expected |
| --- | --- |
| First load of `/` | Realtime shows activity for `/` |
| Client nav to `/tools` | Path updates to `/tools` |
| Client nav to `/tools/japan-trip-budget-calculator` | Path updates accordingly |

---

## 4. How to verify `tool_click` labels

Tool taps use `TrackedToolLink` and `ToolRecommendationStrip`, which call `trackToolClick(sourceSlug, href)`.

**Label format:**

```text
tool_click:{sourceSlug}:{targetSlug}
```

- `{sourceSlug}`: context where the link was clicked (e.g. `nav`, `home`, `japan-packing-generator`).
- `{targetSlug}`: from `toolSlugFromToolsHref()` in `lib/gtag-events.ts`:
  - `/tools` → `tools`
  - `/tools/japan-monthly-cost-calculator` → `japan-monthly-cost-calculator`

**GA4 event:** `click` with parameter **`label`** set to the full string above.

### Quick test

1. Ensure GA4 is loaded (env var set, no blocker).
2. Open **GA4 Realtime** → **Event count by Event name** (or DebugView if you use debug mode).
3. Click a tracked tool link.
4. Look for event name **`click`** and inspect **`label`**.

### DOM check (before GA4)

Tracked links set `data-cta-label` to the same string, e.g.:

```html
data-cta-label="tool_click:nav:tools"
```

Inspect the element in DevTools before clicking.

### Example labels (reference)

| User action | Example `label` |
| --- | --- |
| Navbar → Tools | `tool_click:nav:tools` |
| Homepage strip → trip budget tool | `tool_click:home:japan-trip-budget-calculator` |
| Packing tool crosslink → bring checker | `tool_click:japan-packing-generator:can-i-bring-this-to-japan` |
| Resident hub card → monthly calculator | `tool_click:residents-hub:japan-monthly-cost-calculator` |
| Tool hub card → any tool | `tool_click:tools:{tool-slug}` |

---

## 4b. How to verify `itinerary_guide_cta_click` labels

Guide pages with `ItineraryGuideCta` call `trackItineraryGuideCtaClick` from `lib/itinerary/itinerary-analytics.ts`.

**Label format:**

```text
itinerary_guide_cta_click
```

**GA4 event:** `click` with parameter **`label`** set to `itinerary_guide_cta_click`, plus params such as `source_page`, `cta_variant`, `target_type` (`planner` | `template`), and `target_path`.

### Quick test

1. Open a guide with the itinerary CTA (e.g. `/guides/japan-itinerary`).
2. Click **Open itinerary planner** or the templates link.
3. In GA4 Realtime (or DebugView), confirm event name **`click`** and label **`itinerary_guide_cta_click`**.

---

## 4c. How to verify `itinerary_hub_cta_click` labels

Hub pages with `ItineraryHubCta` (`/`, `/start-here`, `/tourists`) call `trackItineraryHubCtaClick` from `lib/itinerary/itinerary-analytics.ts`.

**Label format:**

```text
itinerary_hub_cta_click
```

**GA4 event:** `click` with parameter **`label`** set to `itinerary_hub_cta_click`, plus `source_page`, `target_type` (`planner` | `templates` | `template`), `target_path`, and optional `cta_position`.

### Quick test

1. Open `/start-here` or `/tourists`.
2. Click **Open itinerary planner**, **Browse curated templates**, or a featured template link.
3. Confirm **`click`** with label **`itinerary_hub_cta_click`**.

---

## 4d. Itinerary planner event inventory (GA4)

Implementation: `lib/itinerary/itinerary-analytics.ts`. All labels below use event name **`click`** unless noted.

| Label | When |
| --- | --- |
| `itinerary_generate_start` | User clicks Generate |
| `itinerary_generate_success` | Generate succeeded |
| `itinerary_generate_error` | Generate failed |
| `itinerary_save_success` | Share link saved |
| `itinerary_save_error` | Save failed |
| `itinerary_copy_link` | Share URL copied |
| `itinerary_pdf_download` | PDF downloaded |
| `itinerary_edit_action` | Stop moved or removed |
| `itinerary_template_view` | Curated template page viewed |
| `itinerary_template_planner_cta_click` | Template page CTA to planner |
| `itinerary_planner_template_card_click` | Featured template card on planner |
| `itinerary_guide_cta_click` | Guide page itinerary CTA |
| `itinerary_hub_cta_click` | Hub page itinerary CTA |
| `itinerary_gear_box_view` | Gear box shown |
| `itinerary_gear_link_click` | Gear recommendation link clicked |

MVP launch sign-off: [Itinerary planner launch checklist](./itinerary-planner-launch-checklist.md) section F.

---

## 5. How to verify `recommendation_click` labels

Editorial gear and service picks from `RecommendationGrid` / `RecommendationBox` use `TrackedRecommendationLink`.

**Label format:**

```text
recommendation_click:{context}:{recommendationId}
```

- `{context}`: page slug, e.g. `japan-packing-list`, `sim-card-japan`
- `{recommendationId}`: catalog id from `lib/recommendations.ts`, e.g. `packing-cubes`

**GA4 event:** `click` with parameter **`label`**.

**DOM:** `data-recommendation-id`, `data-recommendation-context`, and `data-cta-label` on the link.

### Example labels

| User action | Example `label` |
| --- | --- |
| Packing list → umbrella | `recommendation_click:japan-packing-list:travel-umbrella` |
| Weather guide → shoes | `recommendation_click:japan-weather-by-month:waterproof-shoes` |
| Budget tool → Wise note | `recommendation_click:japan-trip-budget-calculator:wise-travel-card-note` |

---

## 6. How to verify `resident_starter` labels

Resident funnel links use `ResidentStarterPath` and `HomeResidentCta`, which call `trackResidentStarterPathClick()` for guides/resources, and `trackToolClick()` when the target is under `/tools`.

**Label format (guides / resources / residents):**

```text
resident_starter:{sourceSlug}:{targetSlug}
```

- `{targetSlug}` from `slugFromGuideHref()`:
  - `/resources/moving-to-japan-checklist` → `moving-to-japan-checklist`
  - `/residents/japan-health-insurance` → `japan-health-insurance`
  - `/residents` → `residents` (hub browse link on homepage CTA)

**GA4 event:** `click` with parameter **`label`** set to the full string.

### Suggested `sourceSlug` values

| Placement | `sourceSlug` |
| --- | --- |
| `/residents` starter grid | `residents-hub` |
| Compact block on funnel guides | `resident-starter-path` |
| Homepage resident CTA | `home-resident-cta` |

### Example labels (reference)

| User action | Example `label` |
| --- | --- |
| Residents hub → checklist | `resident_starter:residents-hub:moving-to-japan-checklist` |
| Homepage CTA → checklist | `resident_starter:home-resident-cta:moving-to-japan-checklist` |
| Starter path → renting guide | `resident_starter:resident-starter-path:renting-apartment-japan` |
| Homepage CTA → monthly calculator | `tool_click:home-resident-cta:japan-monthly-cost-calculator` (tool URL uses `tool_click`, not `resident_starter`) |

---

## 7. Pages to test

Run through these on **production** after env vars are set and the site is redeployed.

### Core routes

| Page | URL | What to verify |
| --- | --- | --- |
| Homepage | `/` | `page_view` for `/`; `tool_click:home:*` from tool strip; `home-resident-cta` checklist/calculator; optional `resident_starter:home-resident-cta:*` |
| Tools hub | `/tools` | `page_view`; `tool_click:tools:{slug}` on each card |
| Residents hub | `/residents` | `page_view`; `resident_starter:residents-hub:*` on each starter card; `tool_click:residents-hub:japan-monthly-cost-calculator` on calculator card |
| Moving checklist | `/resources/moving-to-japan-checklist` | `page_view`; compact `resident_starter:resident-starter-path:*` (current page omitted from list) |

### All five tool pages

| Tool | URL |
| --- | --- |
| Japan Trip Budget Calculator | `/tools/japan-trip-budget-calculator` |
| Japan Packing Generator | `/tools/japan-packing-generator` |
| Can I Bring This to Japan? | `/tools/can-i-bring-this-to-japan` |
| Japanese Address Formatter | `/tools/japanese-address-formatter` |
| Japan Monthly Cost Calculator | `/tools/japan-monthly-cost-calculator` |

On each tool page:

- [ ] `page_view` for that path
- [ ] Any `ToolRecommendationStrip` / crosslinks fire `tool_click:{page-slug}:{target}` when clicked
- [ ] Navbar **Tools** still fires `tool_click:nav:tools` when used

### Funnel guides (compact starter block)

| Page | URL |
| --- | --- |
| Japan living cost | `/residents/japan-living-cost` |
| Renting an apartment | `/residents/renting-apartment-japan` |
| Japan health insurance | `/residents/japan-health-insurance` |
| Paying bills | `/residents/pay-bills-japan` |

On each:

- [ ] `page_view`
- [ ] Starter block shows four other steps (current URL hidden)
- [ ] Clicks produce `resident_starter:resident-starter-path:*` or `tool_click:resident-starter-path:japan-monthly-cost-calculator` for the calculator link

### Global smoke

- [ ] Navbar → Tools → `tool_click:nav:tools`
- [ ] At least one in-app route change updates Realtime page path without full reload

---

## 8. Deployment reminder (Vercel)

1. In the Vercel project → **Settings** → **Environment Variables**, set:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `NEXT_PUBLIC_CLARITY_PROJECT_ID`
   - `NEXT_PUBLIC_SITE_URL` (production URL)
2. Apply to **Production** (and Preview if you test previews).
3. **Redeploy** after changing env vars (existing deployments do not pick up new values).
4. Test on the **live domain**, not only `localhost`.
5. Confirm scripts load on production using Network tab (see section 2).

---

## 9. Troubleshooting

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| No GA4 or Clarity requests at all | Missing env vars | Set vars on Vercel; redeploy; restart local dev server |
| Works locally, not on production | Vars only in `.env.local` | Add vars to Vercel Production; redeploy |
| `click` events never appear | Ad blocker or privacy extension | Retry in Chrome guest profile, Safari private with blockers off, or another device |
| `page_view` missing in Realtime | Blocker, wrong property, or delay | Wait 30–60s; confirm measurement ID matches GA4 property; check Network for `collect` |
| Realtime shows users but no `click` | Did not click tracked element | Use `data-cta-label` in Elements panel; only `TrackedToolLink` / starter path / tracked CTAs fire custom labels |
| Clarity empty or slow | Clarity ingestion delay | Clarity often lags minutes to hours; GA4 Realtime is faster for click QA |
| Duplicate or missing SPA pages | Cached deploy or old tab | Hard refresh; navigate with in-app links, not only manual URL bar on first load |
| `tool_click:...:unknown` | href not under `/tools/...` | Expected for non-tool URLs if miswired; fix link to use correct `href` |

---

## 10. Related code (change checklist)

When editing tracking, also check:

- [ ] `lib/gtag-events.ts` label helpers still match reporting expectations
- [ ] New tool added to `lib/site-tools.ts` and `/tools/[slug]` route
- [ ] New starter-path item in `lib/resident-starter-path.ts` if funnel order changes
- [ ] `components/dev/conversion-observability` (if used) still documents new labels
- [ ] `lib/itinerary/itinerary-analytics.ts` if itinerary planner or guide CTA labels change

---

## 11. Sign-off

| Check | Done |
| --- | --- |
| GA4 env var set on Production | [ ] |
| Clarity env var set on Production | [ ] |
| Production redeploy after env change | [ ] |
| `page_view` on `/`, `/tools`, one tool page | [ ] |
| `tool_click:nav:tools` from navbar | [ ] |
| `tool_click:home:japan-trip-budget-calculator` (or another home tool link) | [ ] |
| `resident_starter:residents-hub:moving-to-japan-checklist` | [ ] |
| `resident_starter:home-resident-cta:moving-to-japan-checklist` | [ ] |
| Clarity recording visible in dashboard (within normal delay) | [ ] |
